import type { MaybeRefOrGetter } from 'vue'

export type UseScrollSyncOpts = {
    list: MaybeRefOrGetter<(HTMLElement | undefined | null)[]>,
    x?: MaybeRefOrGetter<boolean>,
    y?: MaybeRefOrGetter<boolean>
}
