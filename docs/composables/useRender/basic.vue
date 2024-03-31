<script lang="jsx" setup>
import { useRender } from '@/composables/useRender'
import { useTimestamp } from '@vueuse/core'

const timestamp = useTimestamp()

useRender(() => {
    return (
        <div>
            timestamp: <span>{timestamp.value}</span>
        </div>
    )
})
</script>

<style lang="scss" scoped></style>
