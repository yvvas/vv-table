<template lang="pug">
    #app
        h3 vv-table
        table
            thead
                tr
                    vv-th(
                        v-for="(n,i) in activeColNames"
                        :key="`${n}-${i}`"
                        :name="n"
                        :sortBy="sortByAlpha"
                    )
                        p {{ n }}
            tbody
                vv-row(v-for="(row, i) in entriesByRow" :key="`${row}-${i}`" :class="`row-${i}`")
                    td(v-for="(n, i) in activeColNames" :key="`${n}-${i}`" :class="`row-${i}--cell-${i}`").cell {{ row[n] }}

        h3 {{ entriesByCol }}
        h3 {{ entriesByRow }}
</template>

<script>
// Ensure the index.html is included in the build
import './index.html'

import vv_th from './vv-th.vue'
import vv_row from './vv-row.vue'

// Ensure favicon is included
// import './favicon.ico'

export default {
    components: {
        'vv-th': vv_th,
        'vv-row': vv_row,
    },
    data () {
        return {
            // Pass as a prop
            hiddenColumns: ['email'],
            entries: [
                {
                    name: 'bob',
                    email: '@',
                    phone: '789'
                },
                {
                    name: 'rob',
                    email: '#',
                    phone: '456'
                },
                {
                    name: 'lob',
                    email: '%',
                    phone: '123'
                },
                {
                    name: 'nob',
                    email: '&',
                    phone: '555'
                },
            ],
            // Set on load
            activeColumns: []
        }
    },
    computed: {
        allColNames() {
            return Object.keys(this.entries[0])
        },
        activeColNames() {
            return Object.keys(this.entriesByRow[0])
        },
        entriesByRow() {
            return this.entries.map(entry => {
                return this.activeColumns.reduce((trimmed, col) => {
                    trimmed[col] = entry[col]
                    return trimmed
                }, {})
            })
        },
        entriesByCol() {
            return this.activeColNames.reduce((columns, name) => {
                columns[name] = this.entriesByRow.map(row => row[name])
                return columns
            }, {})
        }
    },
    methods: {
        sortByAlpha(colName) {
            const col = this.entriesByCol[colName]
            this.sortReverse(col.sort())
            return col.sort()
        },
        sortReverse(sorted) {
            console.log(sorted)
            return sorted.reverse()
        }
    },
    created() {
        this.activeColumns = this.allColNames
        // Remove hidden columns from the activeColumns list
        if(this.hiddenColumns) {
            this.hiddenColumns.forEach(col => {
                if(this.activeColumns.indexOf(col) > 0) {
                    this.activeColumns.splice(1, this.activeColumns.indexOf(col))
                }
            })
        }
    }
}
</script>

<style lang="postcss">
#app
    table, td, th
        border: 1px solid #777
</style>
