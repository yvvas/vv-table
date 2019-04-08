<template lang="pug">
    th(v-dd="{ name }").cell
        slot
</template>

<script>
import dd from 'vv-dd'

export default {
    directives: {
        dd
    },
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
