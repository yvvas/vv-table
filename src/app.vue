<template lang="pug">
    #app
        vv-table(:entries="entries" :hide="colToHide" :icons="icons")
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
                    size: 'xl'
                },
                {
                    name: 'rob',
                    email: '#',
                    phone: '456',
                    status: 'dead',
                    size: 's'
                },
                {
                    name: 'lob',
                    email: '%',
                    phone: '123',
                    status: 'alive',
                    size: 'm'
                },
                {
                    name: 'nob',
                    email: '&',
                    phone: '555',
                    status: 'alive',
                    size: 'xl'
                },
            ],
            icons: {
                name: '⚡',
                email: '❤',
                phone: '❄',
                status: '☂',
                size: '♫'
            },
            colToHide: ['status'],
        }
    },
}
</script>
