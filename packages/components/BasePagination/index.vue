<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { ElPagination } from 'element-plus'
import { h, ref, useAttrs, useSlots } from 'vue'

defineOptions({
    name: 'BasePagination',
    inheritAttrs: false
})

const props = defineProps({
    /** 分页器数据 */
    paginationData: {
        /** @type {import('vue').PropType<{ pageNum: number, pageSize: number, total: number }>} */
        type: Object,
        default: () => ({
            pageNum: 1,
            pageSize: 20,
            total: 0
        })
    },
    /** pageNum | pageSize 变化 */
    onChange: {
        /** @type {import('vue').PropType<(context: { type: 'pageNum' | 'pageSize', value: number }) => void>} */
        type: Function,
        default: () => {}
    },
    /** 默认 render */
    render: {
        /** @type {import('vue').PropType<() => import('vue').VNodeChild>} */
        type: Function
    }
})

const attrs = useAttrs()

const slots = useSlots()

const paginationRef = ref(null)

const defaultProps = {
    background: true,
    pageSizes: [10, 20, 100, 300, 500],
    layout: `total, sizes, prev, pager, next, jumper`,
    pagerCount: 7
}

// 选中页改变
const pageNumChange = value => {
    props.onChange({
        type: 'pageNum',
        value
    })
}

// 每页条数改变
const pageSizeChange = value => {
    // 重置选中页
    props.paginationData.pageNum = 1
    props.onChange({
        type: 'pageSize',
        value
    })
}

defineExpose({
    paginationRef
})

useRender(() => {
    return h(
        ElPagination,
        {
            ref: paginationRef,
            ...defaultProps,
            currentPage: props.paginationData.pageNum,
            'onUpdate:currentPage': [
                value => (props.paginationData.pageNum = value),
                pageNumChange
            ],
            pageSize: props.paginationData.pageSize,
            'onUpdate:pageSize': [
                value => (props.paginationData.pageSize = value),
                pageSizeChange
            ],
            total: props.paginationData.total,
            ...attrs
        },
        (props.render && (() => props.render()))
        || (slots.default && (() => slots.default()))
        || null
    )
})
</script>

<style lang="scss" scoped></style>
