<template>
    <div class="flex flex-col gap-10px">
        <pre>source: {{ JSON.stringify(source, null, 4) }}</pre>
        <pre>list: {{ JSON.stringify(list, null, 4) }}</pre>
        <pre>map: {{ JSON.stringify(map, null, 4) }}</pre>
    </div>
</template>

<script lang="jsx" setup>
import { createDict } from '@/utils/data'

const source = [
    {
        id: 1,
        name: `name-${1}`,
        children: [
            {
                id: 3,
                name: `name-${3}`
            },
            {
                id: 4,
                name: `name-${4}`
            }
        ]
    },
    {
        id: 2,
        name: `name-${2}`
    }
]

const { list, map } = createDict(source, {
    fromLabel: 'name',
    fromValue: 'id',
    fromChildren: 'children',
    listType: createDict.ListType.TREE
})
</script>

<style lang="scss" scoped></style>
