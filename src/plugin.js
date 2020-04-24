import VVtable from './vv-table.vue';

module.exports = {
    install: function ( Vue, options ) {
        Vue.component( 'vv-table', VVtable );
    }
};
