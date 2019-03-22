<template lang="pug">
table.vv-table
    thead
        tr
            vv-th(
                v-for="(n,i) in activeColumns"
                :key="`${n}-${i}`"
                :name="n"
                :sortBy="sortByDefault"
                v-on:drag-start="onDrag"
                v-on:drop="onDrop"
            )
                p {{ icons[n] + ' ' }}{{ n }} 
                    span(v-if="Object.keys(direction).indexOf(n) >= 0") {{ direction[n] }}
                    span(v-else).light ▼
    tbody
        vv-row(v-for="(row, i) in entriesByRow" :key="`${row}-${i}`" :class="`row-${i}`")
            td(
                v-for="(n, i) in activeColumns"
                :key="`${n}-${i}`"
                :class="`row-${i}--cell-${i}`"
            ).cell {{ row[n] }}
</template>

<script>
import vv_th from './vv-th.vue'
import vv_row from './vv-row.vue'


export default {
    components: {
        'vv-th': vv_th,
        'vv-row': vv_row,
    },
    props: {
        entries: {
            type: Array,
            required: true
        },
        hide: {
            type: Array,
            required: false
        },
        icons: {
            type: Object,
            required: false
        }
    },
    data () {
        return {
            activeColumns: [],
            entriesByRow: [],
            direction: {},
            dragging: ''
        }
    },
    computed: {
        entriesByCol() {
            return this.activeColumns.reduce((columns, name) => {
                columns[name] = this.entriesByRow.map(row => row[name])
                return columns
            }, {})
        }
    },
    methods: {
        onDrag({ name, x, y }) {
            this.dragging = name
        },
        onDrop({ target }) {
            const i = this.activeColumns.indexOf(this.dragging)
            const t = this.activeColumns.indexOf(target)
            this.activeColumns.splice(i, 1)
            this.activeColumns.splice(t, 0, this.dragging)
            this.dragging = ''
        },
        sortByDefault(colName) {
            const sorted = this.entriesByRow.sort((a, b) => {
                if( a[colName] < b[colName]) { return -1 }
                if( a[colName] > b[colName]) { return 1 }
                return 0
            })
            const sortedBy = Object.keys(this.direction)[0] !== colName

            if(this.direction[colName] === '▲') {
                sorted.reverse()
                if(sortedBy) { this.direction = {} }
                this.direction[colName] = '▼'
            } else {
                sorted
                if(sortedBy) { this.direction = {} }
                this.direction[colName] = '▲'
            }
        },
        initEntries() {
            this.activeColumns = Object.keys(this.entries[0])
            this.entriesByRow = this.entries.map(entry => {
                return this.activeColumns.reduce((trimmed, col) => {
                    trimmed[col] = entry[col]
                    return trimmed
                }, {})
            })
        },
        deactivateColumns() {
            if(this.hide) {
                this.hide.forEach(col => {
                    if(this.activeColumns.indexOf(col) >= 0) {
                        this.activeColumns.splice(this.activeColumns.indexOf(col), 1)
                    }
                })
            }
        }
    },
    created() {
        this.initEntries()
        this.deactivateColumns()
    }
}
</script>

<style lang="postcss">
table.vv-table
    border-spacing: 0
    vertical-align: baseline
    thead
        th
            border-bottom: 1px #cccccc solid
            border-right: 1px #dddddd solid
            &:nth-last-child(1)
                border-right: none
            p
                padding: 0
                margin: 0
                display: flex
                align-items: center
                justify-content: center
                text-transform: uppercase
    tr
        background-color: #ededed
        &:nth-child(even)
            background-color: #dddddd
        .cell
            padding: 0.125em 0.25em
    .light
        color: #dddddd
</style>
