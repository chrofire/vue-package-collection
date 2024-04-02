<script lang="jsx" setup>
import { BaseForm } from '@/components/BaseForm/index'
import { useData } from '@/composables/data'
import { useRender } from '@/composables/useRender'
import { useElementBounding, useToggle } from '@vueuse/core'
import { ElButton } from 'element-plus'
import { computed, ref, toValue, useAttrs, useSlots, watch } from 'vue'

defineOptions({
    name: 'BaseSearchForm',
    inheritAttrs: false
})

const props = defineProps({
    /** 表单项 */
    formList: {
        type: Array,
        default: () => []
    },
    /** 表单默认值 */
    defaultFormData: {
        type: [Function, Object],
        default: () => ({})
    },
    /** 展开过渡动画 */
    expandAnimation: {
        type: Boolean,
        default: true
    },
    /** 折叠时显示的行数 */
    collapsedRowNum: {
        type: Number,
        default: 1
    },
    /** BaseFrom Props */
    formProps: {
        /** @type {import('element-plus').FormProps} */
        type: Object,
        default: () => ({})
    },
    /** 查询事件 */
    onSearch: {
        type: Function,
        default: () => {}
    },
    /** 重置事件 */
    onReset: {
        type: Function,
        default: () => {}
    },
    /** 注册事件 */
    onRegister: {
        type: Function,
        default: () => {}
    }
})

const attrs = useAttrs()

const slots = useSlots()

const searchFormRef = ref(null)

const leftElRef = ref(null)

const { width: leftElWidth, height: leftElHeight } = useElementBounding(leftElRef)

const {
    data: formData,
    resetData: resetFormData,
    updateDataCache: updateFormDataCache
} = useData({})

watch(
    () => props.defaultFormData,
    () => {
        updateFormDataCache(toValue(props.defaultFormData))
        resetFormData()
    },
    {
        immediate: true,
        deep: true
    }
)

const [isExpand, toggleExpand] = useToggle(false)

const isRangePicker = item => {
    if (item.renderType !== 'date-picker') return false

    const { props: { type = '' }} = item
    if (type.endsWith('range')) return true
    else return false
}

const onSearch = () => {
    props.onSearch({ formData, resetFormData })
}

const onReset = () => {
    resetFormData()
    props.onReset({ formData, resetFormData })
}

const itemSpan = computed(() => {
    const width = leftElWidth.value
    if (width <= 400) return 24
    if (width <= 600) return 12
    if (width <= 800) return 8
    if (width <= 1400) return 6
    return 4
})

// 修改 span 之后的 formList
const modifiedFormList = computed(() => {
    const formList = props.formList.map(item => {
        let span = isRangePicker(item) ? itemSpan.value * 2 : itemSpan.value
        // 左侧宽度 400 以内 强制 一列
        if (leftElWidth.value <= 400) {
            span = 24
        }
        return {
            ...item,
            colProps: {
                span,
                ...item.colProps || {}
            }
        }
    })

    return formList
})

// 截取后的 formList
const sliceFormList = computed(() => {
    let sliceIndex = 0
    let totalSpan = 0

    const oneRowCol = 24
    modifiedFormList.value.some((item, index) => {
        const { colProps: { span }} = item
        const nextTotalSpan = totalSpan + span
        if (nextTotalSpan <= oneRowCol * props.collapsedRowNum) {
            totalSpan = nextTotalSpan
            sliceIndex = index + 1
            return false
        } else {
            sliceIndex = index
            return true
        }
    })

    const sliceFormList = modifiedFormList.value.slice(0, sliceIndex)

    return sliceFormList
})

// 展示的 formList
const showList = computed(() => {
    return isExpand.value ? modifiedFormList.value : sliceFormList.value
})

const exposeData = {
    searchFormRef,
    formData,
    resetFormData,
    updateFormDataCache,
    get data () {
        return formData.value
    }
}

props.onRegister(exposeData)
defineExpose(exposeData)

useRender(() => {
    return (
        <div class="base-search-form" ref={searchFormRef}>
            <div
                class="base-search-form-left-wrapper"

                style={[
                    {
                        overflow: 'hidden'
                    },
                    props.expandAnimation
                        ? {
                            transition: `height 0.3s`,
                            height: leftElHeight.value > 0 ? `${leftElHeight.value}px` : undefined
                        }
                        : {}
                ]}
            >
                <div class="base-search-form-left" ref={leftElRef}>
                    <BaseForm
                        formList={showList.value}
                        formData={formData.value}
                        {...props.formProps}
                    ></BaseForm>
                </div>
            </div>
            <div class="base-search-form-right">
                {props.formList.length > sliceFormList.value.length && (
                    <ElButton type="primary" text onClick={() => toggleExpand(!isExpand.value)}>
                        {isExpand.value ? '收起' : '展开'}
                    </ElButton>
                )}
                <ElButton type="primary" onClick={onSearch}>查询</ElButton>
                <ElButton onClick={onReset}>重置</ElButton>
            </div>
        </div>
    )
})
</script>

<style lang="scss" scoped>
.base-search-form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    .base-search-form-left-wrapper {
        flex: 1 0;
    }
    .base-search-form-left {}
    .base-search-form-right {
        display: flex;
    }
}
</style>
