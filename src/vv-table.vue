<template lang="pug">
table.vv-table
    thead
        tr
            th
                button(@click="selectAll") &nbsp;
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
            th
                button(@click="selectAll") +
    tbody
        vv-row(v-for="(row, i) in entriesByRow" :key="`${row}-${i}`" :class="`row-${i}`")
            td
                input(type="checkbox" v-model="selectedRows" :value="i")
            td(
                v-for="(n, j) in activeColumns"
                :key="`${n}-${j}`"
                :class="`row-${i}--cell-${j}`"
            ).cell 
                .cell--value(v-show="`${i}-${row[n]}` !== inEdit")
                    label(@dblclick="inEdit = `${i}-${row[n]}`") {{ row[n] }}
                input(
                    v-show="`${i}-${row[n]}` === inEdit && canEdit"
                    :value="row[n]"
                    v-on:blur="inEdit = false; $emit('update')"
                    @keyup.enter="inEdit = false; $emit('update')"
                    v-edit-hilite
                )
            td
        tr
            td(colspan="6").new-row
                button(@click="addRow") +
    p {{inEdit}}
</template>

<script>
import vv_th from './vv-th.vue'
import vv_row from './vv-row.vue'

export default {
    directives: {
        'editHilite': {
            update: (el) => {
                el.focus()
                el.select()
            }
        }
    },
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
        },
        canEdit: {
            type: Boolean,
            required: false
        }
    },
    data () {
        return {
            activeColumns: [],
            entriesByRow: [],
            direction: {},
            dragging: '',
            selectedRows: [],
            inEdit: false
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
        selectAll() {
            if (this.selectedRows.length === this.entriesByRow.length) {
                this.selectedRows = []
            } else {
                this.selectedRows = this.entriesByRow.reduce((selects, entry, i) => { 
                    selects.push(i)
                    return selects
                }, [])
            }
        },
        addRow() {
            const newRow = this.activeColumns.reduce((row, col) => {
                row[col] = `${col}`
                return row
            }, {})
            this.entriesByRow.push(newRow)
        },
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
    },
    created() {
        this.activeColumns = Object.keys(this.entries[0])
        this.entriesByRow = this.entries.map(entry => {
                return this.activeColumns.reduce((trimmed, col) => {
                    trimmed[col] = entry[col]
                    return trimmed
                }, {})
            })
    },
    watch: {
        entries: function () {
            this.entriesByRow = this.entries.map(entry => {
                return this.activeColumns.reduce((trimmed, col) => {
                    trimmed[col] = entry[col]
                    return trimmed
                }, {})
            })
        },
        hide: function () {
            if(this.hide) {
                this.hide.forEach(col => {
                    if(this.activeColumns.indexOf(col) >= 0) {
                        this.activeColumns.splice(
                            this.activeColumns.indexOf(col),
                            1
                        )
                    }
                })
            }
        }
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
            button
                border: none
                background: transparent
                width: 100%
    tr
        background-color: #ededed
        &:nth-child(even)
            background-color: #dddddd
        .cell
            padding: 0.125em 0.25em
        .new-row
            button
                border: none
                background: transparent
                width: 100%
    .light
        color: #dddddd
</style>
