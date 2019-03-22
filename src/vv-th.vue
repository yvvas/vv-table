<template lang="pug">
    th(
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="onRelease"
        @dragover.prevent
        @drop.prevent.stop="onDrop"
        draggable="true"
    ).cell
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
            startPos: { x: 0 },
            canDrag: false
        }
    },
    methods: {
        startDrag(e) {
            this.startPos.x = e.clientX
        },
        onDrag(e) {
            const xPos = e.clientX - this.startPos.x
            this.$emit('drag-start', { name: this.name, x: xPos })
        },
        onDrop(e){
            this.$emit('drop', {target: this.name})
        },
        onRelease(e) {
            this.evalAction(e)
            this.startPos.x = 0
        },
        evalAction(e, n) {
            const xPos = Math.abs(e.clientX - this.startPos.x)
            if(xPos < 10 && this.canSort) {
                this.sortBy(this.name)
            }
        }
    }
}
</script>
