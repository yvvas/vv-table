<template lang="pug">
table.vv-table.local
    thead
        vv-row
            th
                button(@click="selectAll") ✔
            th(
                v-for="(name,i) in activeColumns"
                :key="`${name}-${i}`"
                @click="sortByDefault(name)"
                @dd-drop="onDrop"
                v-dd="{ name }"
            )
                .colname(@dd-drop="onDrop")
                    p(v-if="icons[name]") {{ icons[name] + ' ' }}
                        span &nbsp;{{ name }}
                        span(v-if="Object.keys(direction).indexOf(name) >= 0") &nbsp;{{ direction[name] }}
                        span(v-else).light &nbsp;▼
                    p(v-else) {{ name }}
                        span(v-if="Object.keys(direction).indexOf(name) >= 0") &nbsp;{{ direction[name] }}
                        span(v-else).light &nbsp;▼
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
                .cell--value(v-show="`${n}-${row[n]}-row-${i}` !== inEdit")
                    label(@dblclick="setEdit(`${n}-${row[n]}-row-${i}`, row[n])") {{ row[n] }}
                    button(v-if="row[n] == '' && canEdit" @click="setEdit(`${n}-${row[n]}-row-${i}`, row[n])") add
                input(
                    v-show="`${n}-${row[n]}-row-${i}` === inEdit && canEdit"
                    v-model="editValue"
                    v-on:blur="$emit('update:entries', [row, n, editValue]); inEdit = false; editValue = ''"
                    @keyup.enter="$emit('update:entries', [row, n, editValue]); inEdit = false; editValue = ''"
                    v-hilite
                ).cell--edit
            td
        tr
            td(:colspan="activeColumns.length + 1").new-row
                button(@click="addRow") +
            td
                p {{editValue}}
</template>

<script>
import vv_th from './vv-th.vue'
import vv_row from './vv-row.vue'
import hilite from 'vv-hilite'
import dd from 'vv-dd'

export default {
    directives: {
        hilite,
        dd
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
            editValue: ''
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
        setEdit(cell, value) {
            if(!this.canEdit) return
            this.editValue = value

            console.log(`vv-table: editing ${cell}`)
            this.inEdit = cell
        },
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
        console.warn('vv-table: using local component')
        this.setActiveColumns()
        this.setEntries()
    },
    watch: {
        entries() {
            console.warn('vv-table: updated entries')
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
        tr
            th
                border-bottom: 1px #cccccc solid
                border-right: 1px #dddddd solid
                &:first-child, &:last-child
                    padding: 0 !important
                    width: 0 !important
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
                    width: 2em
    tr
        background-color: #ededed
        &:nth-child(even)
            background-color: #dddddd
        .cell
            padding: 0.125em 0.25em
            > input
                width: 100%
                border: none
                padding: 0.3em
            &--value > button
                border: none
                opacity: 0.2
        .new-row
            button
                border: none
                background: transparent
                width: 100%
        > td:first-child
            text-align: center
    .light
        color: #dddddd
</style>
