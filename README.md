vv-table
========


## Another table component for Vue applications

Drag and drop, editable inline, with built-in sorting. Dynamically add icons and hide columns. Pagination coming soon*

*probably not soon

--------------------


:herb: Usage
------------

1. Import the table `import vvTable from 'vv-table'`
2. Tell Vue to use the imported component in your component declaration `components: { 'vv-table': vvTable }`
3. Use the component tag `<vv-table></vv-table>`
4. Fill your entries for the table to display `<vv-table :entries="yourEntriesArrayGoesHere"></vv-table>`


:page_with_curl: Features
------------------------

## Selection
TBD

## Edit inline
TBD

## Pagination
TBD

## Hide Columns
Hide columns by way of the `hide` attribute. Accepts an Array of strings.

Example:

```
<template>
    <vv-table :entries="yourEntriesArrayGoesHere" :hide="columnsToHide"></vv-table>
</template>
<script>
    export default {
        data() {
            return {
                yourEntriesArrayGoesHere: [ {name: 'example', _id: 1, status: pending } ]
                columnsToHide = ['status', '_id']
            }
        }
    }
</script>
```


## Per Column Icons
Passes unicode icons to columns by way of the `icon` attribute. Accepts an object where each key should match a column key.

Example:

```
<template>
    <vv-table :entries="yourEntriesArrayGoesHere" :icons="icons"></vv-table>
</template>
<script>
    export default {
        data() {
            return {
                yourEntriesArrayGoesHere: [ {name: 'example', _id: 1, status: pending } ]
                icons: {
                    name: '⚡',
                    _id_: '❤',
                    status: '☂'
                }
            }
        }
    }
</script>
```


## Column Click Event Handling
Emits an event per column which is coupled to the function declared under the `update` attribute. Accepts a function.

Example:

```
<template>
    <vv-table :entries="yourEntriesArrayGoesHere" :update="update"></vv-table>
</template>
<script>
    export default {
        data() {
            return {
                yourEntriesArrayGoesHere: [ {name: 'example', _id: 1, status: pending } ]
                icons: {
                    name: '⚡',
                    _id_: '❤',
                    status: '☂'
                }
            }
        },
        methods: {
            update(payload) {
                this.yourEntriesArrayGoesHere.forEach((entry, i) => {
                    if(entry._id === payload[0]._id) {
                        console.log('Do something!')
                    }
                })
            }
        }
    }
</script>
```


## Rearrange Drag & Drop
Turns on drag & drop reordering of columns by way of the `canEdit` attribute. Accepts a Boolean. Uses the vv-dd package.

Example:

```
<template>
    <vv-table :entries="yourEntriesArrayGoesHere" :canEdit="true"></vv-table>
</template>
```