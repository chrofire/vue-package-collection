import { FORM_DIALOG_OP_STATE } from '@/composables/useFormDialog'
import { ElMessage, ElMessageBox } from 'element-plus'
import { isFunction } from 'lodash-es'
import { nextTick, onMounted, reactive, ref, toValue, unref } from 'vue'

/**
 * useTableCrud
 * @param {import('./useTableCrud.types').UseTableCrudOpts} options 选项
 */
export const useTableCrud = (options = {}) => {
    const {
        searchParams = {},
        listApi = async () => {},
        deleteApi = async () => {},
        isPageList = true,
        withPaginationParams = true,
        getListDataOnMounted = true,
        deleteKey = 'id',
        deleteValueKey = 'id',
        deleteConfirmMessage = '确定要删除这条记录吗?',
        onAfterGetListData
    } = options

    // BaseTable实例 ref
    const BaseTableRef = ref(null)

    // 调用 listApi loading 状态
    const loading = ref(false)

    // 分页数据
    const paginationData = reactive({
        pageNum: 1,
        pageSize: 20,
        total: 0
    })

    // 表格数据
    const tableData = ref([])

    /** 获取数据 */
    const getListData = async () => {
        const { total, ...paginArgs } = paginationData

        const params = {
            ...(withPaginationParams ? paginArgs : {}),
            ...toValue(searchParams)
        }

        try {
            loading.value = true
            const result = await listApi(params)

            // 重置滚动条滚动高度
            resetTableData()
            await nextTick()

            if (isPageList) {
                tableData.value = result.list || []
            } else {
                tableData.value = result || []
            }

            if (isPageList) {
                const { pageNum, pageSize, total } = result
                Object.assign(paginationData, {
                    pageNum,
                    pageSize,
                    total
                })
            }

            if (isFunction(onAfterGetListData)) {
                await onAfterGetListData()
            }
        } catch (error) {
            ElMessage({
                type: 'error',
                message: error?.data?.message || error?.message || '错误',
                grouping: true
            })
        } finally {
            loading.value = false
        }
    }

    /** 页码初始化 */
    const reGetListData = async () => {
        paginationData.pageNum = 1
        await getListData()
    }

    /** 删除记录 */
    const doDelete = async row => {
        try {
            await ElMessageBox.confirm(deleteConfirmMessage, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })

            const params = {
                [deleteKey]: row[deleteValueKey]
            }
            await deleteApi(params)
            ElMessage.success(`删除成功`)
            getListData()
        } catch (error) {
            error !== `cancel` && ElMessage({
                type: 'error',
                message: error?.data?.message || error?.message || '错误',
                grouping: true
            })
        }
    }

    onMounted(() => {
        if (getListDataOnMounted) {
            getListData()
        }
    })

    /** 重置表格数据 */
    const resetTableData = () => {
        tableData.value = []
    }

    return {
        BaseTableRef,
        loading,
        paginationData,
        tableData,
        resetTableData,
        getListData,
        reGetListData,
        doDelete
    }
}

export const useDialogCrudHelper = () => {
    const dialogRef = ref(null)

    const dialogAdd = row => {
        unref(dialogRef).openDialog(FORM_DIALOG_OP_STATE.ADD, row)
    }

    const dialogUpdate = row => {
        unref(dialogRef).openDialog(FORM_DIALOG_OP_STATE.UPDATE, row)
    }

    const dialogView = row => {
        unref(dialogRef).openDialog(FORM_DIALOG_OP_STATE.VIEW, row)
    }

    return {
        dialogRef,
        dialogAdd,
        dialogUpdate,
        dialogView
    }
}

export default useTableCrud
