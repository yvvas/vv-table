<template lang="pug">
    th(
        @mousedown="onClick"
        @mousemove="onDrag"
        @mouseup="onRelease"
    )
        slot
</template>

<script>
export default {
    props: {
        sortBy: {
            required: false,
            type: Function
        },
        name: {
            required: true,
            type: String
        }
    },
    computed: {
        canSort() {
            return typeof this.sortBy === 'function'
        },
    },
    data() {
        return {
            startPos: { x: 0, y: 0 },
            canDrag: false
        }
    },
    methods: {
        select() {
            console.log(`selecting: ${name}`)
        },
        onClick(e) {
            this.canDrag = true
            this.startPos.x = e.clientX
            this.startPos.y = e.clientY
        },
        onDrag(e) {
            if(this.canDrag) {
                const xPos = Math.abs(e.clientX - this.startPos.x)
                const yPos = Math.abs(e.clientY - this.startPos.y)
                console.log('drag: ', xPos, '|' ,yPos)
            }
        },
        onRelease(e) {
            this.evalAction(e)
            this.startPos.x = 0
            this.startPos.y = 0
            this.canDrag = false
        },
        evalAction(e, n) {
            const xPos = Math.abs(e.clientX - this.startPos.x)
            const yPos = Math.abs(e.clientY - this.startPos.y)
            if(xPos < 5 && yPos < 5 && this.canSort) {
                this.sortBy(this.name)
            }
        }
    }
}
</script>
