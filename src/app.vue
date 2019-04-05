<template lang="pug">
    #app
        vv-table(:entries="entries" :hide="colToHide" :icons="icons", v-on:update="update" :canEdit="true")
</template>

<script>
// Ensure the index.html is included in the build
import './index.html'

import vv_table from './vv-table.vue'

// Ensure favicon is included
// import './favicon.ico'

export default {
    components: {
        'vv-table': vv_table,
    },
    data () {
        return {
            entries: [
                {
                    name: 'bob',
                    email: '@',
                    phone: '789',
                    status: 'alive',
                    size: 'xl',
                    _id: '001'
                },
                {
                    name: 'rob',
                    email: '#',
                    phone: '456',
                    status: 'dead',
                    size: 's',
                    _id: '002'
                },
                {
                    name: 'lob',
                    email: '%',
                    phone: '123',
                    status: 'alive',
                    size: 'm',
                    _id: '003'
                },
                {
                    name: 'nob',
                    email: '&',
                    phone: '555',
                    status: 'alive',
                    size: 'xl',
                    _id: '004'
                },
            ],
            icons: {
                name: '⚡',
                email: '❤',
                phone: '❄',
                status: '☂',
                size: '♫'
            },
            colToHide: ['status', '_id'],
        }
    },
    methods: {
        update(payload) {
            this.entries.forEach((element, i) => {
                if(element._id === payload[0]._id) {
                    const k = payload[1]
                    const v = payload[2]
                    element[k] = v
                    this.entries[i] = element
                    console.log(k, v)
                }
            })
        }
    }
}
</script>
