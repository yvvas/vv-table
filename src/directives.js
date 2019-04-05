let transferredData = {}
let dragInProgressKey = null

export default {
    dd: {
        inserted: (el, binding, vnode) => {
            const dragData = binding.value
            const transferKey = +new Date() + ''

            el.setAttribute('draggable', true)

            // Drag
            el.addEventListener('dragstart', ev => {
                dragInProgressKey = transferKey
                transferredData[transferKey] = {
                    dragData,
                    onDropCallback: null // will be set in droppable directive
                }

                ev.dataTransfer.setData('text', transferKey)
                ev.dataTransfer.effectAllowed = 'move'
                ev.dataTransfer.dropEffect = 'move'
            }, false)
            el.addEventListener('dragend', ev => {
                dragInProgressKey = null

                if (transferredData[transferKey]) {
                    if (typeof transferredData[transferKey].onDropCallback === 'function') {
                        const callback = transferredData[transferKey].onDropCallback
                        setTimeout(() => callback(), 0)
                    }
                    delete transferredData[transferKey]
                }
            }, false)

            el.addEventListener('dragover', ev => {
                ev.preventDefault()
            }, false)

            // Drop
            el.addEventListener('drop', ev => {
                ev.stopPropagation()
                ev.preventDefault()

                const transferKey = ev.dataTransfer.getData('text')
                const { dragData } = transferredData[transferKey]
                let target
                if(ev.target.childNodes) {
                    target = ev.target.childNodes[0].data
                }
                // Fire callback defined by dd-drop
                vnode.data.on['dd-drop'](dragData, target, ev)
            }, false)
        }
    },
    hilite: {
        update: (el) => {
            el.focus()
            el.select()
        }
    }
}