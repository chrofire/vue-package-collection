<template>
    <div class="flex flex-col gap-10px">
        <BaseSearchForm
            ref="BaseSearchFormRef"
            :formList="searchFormList"
            @search="getListData"
            @reset="reGetListData"
            :formProps="{
                labelWidth: '60px'
            }"
        ></BaseSearchForm>
        <div>
            <ElButton @click="dialogAdd">新增</ElButton>
        </div>
        <div class="h-300px">
            <BaseTable
                ref="BaseTableRef"
                v-bind="tableProps"
                v-loading="loading"
                :data="tableData"
            ></BaseTable>
        </div>
        <div class="flex justify-end">
            <BasePagination :paginationData="paginationData" @change="getListData"></BasePagination>
        </div>
        <EditDialog ref="dialogRef" @submit="getListData" :fullList="fullList"></EditDialog>
    </div>
</template>

<script lang="jsx" setup>
import { BasePagination, BaseSearchForm, BaseTable } from '@/components'
import { useDialogCrudHelper, useTableCrud } from '@/composables/useTableCrud'
import { promiseTimeout } from '@vueuse/core'
import { ElButton, vLoading } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import EditDialog from './basicDialog.vue'

const BaseSearchFormRef = ref()

const searchFormList = reactive([
    {
        renderType: 'input',
        prop: 'field1',
        label: '字段1',
        props: {
            clearable: true
        }
    },
    {
        renderType: 'input',
        prop: 'field2',
        label: '字段2',
        props: {
            clearable: true
        }
    }
])

const tableProps = reactive({
    rowKey: 'id',
    columns: [
        {
            prop: 'field1',
            label: '字段1'
        },
        {
            prop: 'field2',
            label: '字段2'
        },
        {
            prop: '_op',
            label: '操作',
            width: 200,
            render: ({ column, row }) => {
                return (
                    <div class='flex gap-10px'>
                        <span class='text-blue cursor-pointer' onClick={() => dialogView(row)}>
                            查看
                        </span>
                        <span class='text-blue cursor-pointer' onClick={() => dialogUpdate(row)}>
                            编辑
                        </span>
                        <span class='text-red cursor-pointer' onClick={() => doDelete(row)}>
                            删除
                        </span>
                    </div>
                )
            }
        }
    ]
})

const fullList = ref(
    Array.from({ length: 50 }, (_, i) => {
        const id = i + 1
        return {
            id,
            field1: `字段1-${id}`,
            field2: `字段2-${id}`
        }
    })
)

const searchParams = computed(() => {
    const formData = BaseSearchFormRef.value?.data
    return {
        ...formData
    }
})

const {
    BaseTableRef,
    paginationData,
    tableData,
    resetTableData,
    loading,
    doDelete,
    getListData,
    reGetListData
} = useTableCrud({
    searchParams,
    getListDataOnMounted: true,
    listApi: async ({ pageNum, pageSize }) => {
        await promiseTimeout(500)
        const { field1, field2 } = searchParams.value
        const filterList = fullList.value.filter(record => {
            return (
                (typeof field1 === 'undefined' ? true : record.field1.includes(field1))
                && (typeof field2 === 'undefined' ? true : record.field2.includes(field2))
            )
        })
        return {
            list: filterList.slice((pageNum - 1) * pageSize, pageNum * pageSize),
            pageNum,
            pageSize,
            total: filterList.length
        }
    },
    deleteApi: async ({ id }) => {
        await promiseTimeout(200)
        fullList.value = fullList.value.filter(item => item.id !== id)
    }
})

const { dialogRef, dialogAdd, dialogUpdate, dialogView } = useDialogCrudHelper()
</script>

<style lang="scss" scoped></style>
