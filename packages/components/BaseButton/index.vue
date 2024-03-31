<script lang="jsx" setup>
import { useLockFn } from '@/composables/useLockFn'
import { useRender } from '@/composables/useRender'
import { ElButton } from 'element-plus'
import { computed, h, reactive, toValue, useAttrs, useSlots, watch } from 'vue'

defineOptions({
    name: 'BaseButton',
    inheritAttrs: false
})

const props = defineProps({
    /** 是否启用锁定 */
    lock: {
        type: Boolean,
        default: false
    },
    /** 延时解锁 */
    unlockDelay: {
        type: Number,
        default: 300
    },
    /** 单击事件 */
    onClick: {
        /** @type {import('vue').PropType<((e: MouseEvent) => void)>} */
        type: Function
    },
    /** 双击事件 */
    onDblclick: {
        /** @type {import('vue').PropType<((e: MouseEvent) => void)>} */
        type: Function
    }
})

const attrs = useAttrs()

const slots = useSlots()

const eventFnMap = reactive({
    onClick: null,
    onDblclick: null
})

watch(
    () => [props.onClick, props.onDblclick],
    newVal => {
        const [_onClick, _onDblclick] = newVal

        Object.assign(eventFnMap, {
            onClick: _onClick ? useLockFn(_onClick, props.unlockDelay) : null,
            onDblclick: _onDblclick ? useLockFn(_onDblclick, props.unlockDelay) : null
        })
    },
    {
        immediate: true
    }
)

const loading = computed(() => {
    if (!props.lock) return false

    if (eventFnMap.onClick) {
        return toValue(eventFnMap.onClick.isLocked)
    }

    if (eventFnMap.onDblclick) {
        return toValue(eventFnMap.onDblclick.isLocked)
    }

    return false
})

defineExpose({
    eventFnMap,
    loading
})

useRender(() => {
    return h(
        ElButton,
        {
            loading: loading.value,
            ...eventFnMap,
            ...attrs
        },
        slots
    )
})
</script>

<style lang="scss" scoped></style>
