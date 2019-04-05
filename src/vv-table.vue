<template lang="pug">
table.vv-table
    thead
        vv-row
            th
                button(@click="selectAll") &nbsp;
            th(
                v-for="(name,i) in activeColumns"
                :key="`${name}-${i}`"
                @click="sortByDefault(name)"
                @dd-drop="onDrop"
                v-dd="{ name }"
            )
                .colname(@dd-drop="onDrop")
                    p {{ icons[name] + ' ' }}
                        span {{ name }}
                        span(v-if="Object.keys(direction).indexOf(name) >= 0") {{ direction[name] }}
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
                .cell--value(v-show="`${entries[i]._id}-${n}-${row[n]}` !== inEdit")
                    label(@dblclick="inEdit = `${entries[i]._id}-${n}-${row[n]}`") {{ row[n] }}
                input(
                    v-show="`${entries[i]._id}-${n}-${row[n]}` === inEdit && canEdit"
                    :value="row[n]"
                    v-on:blur="inEdit = false; $emit('update', [row, n, row[n]])"
                    @keyup.enter="inEdit = false; $emit('update', [row, n, row[n]])"
                    v-hilite
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
import directives from './directives.js'

export default {
    directives: {
        'hilite': directives.hilite,
        'dd': directives.dd
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
            inEdit: false,
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
        onDrop(el, target, ev) {
            const i = this.activeColumns.indexOf(el.name)
            const t = this.activeColumns.indexOf(target)

            this.activeColumns.splice(i, 1)
            this.activeColumns.splice(t, 0, el.name)
        },
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
        sortByDefault(colName) {
            console.log(colName)
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
        setEntries() {
            this.entriesByRow = this.entries.map(entry => {
                return this.activeColumns.reduce((trimmed, col) => {
                    trimmed[col] = entry[col]
                    return trimmed
                }, {})
            })
        },
        setActiveColumns() {
            this.activeColumns = Object.keys(this.entries[0])
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
    },
    created() {
        this.setActiveColumns()
        this.setEntries()
    },
    watch: {
        entries() {
            console.log('updated entries')
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
