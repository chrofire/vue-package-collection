import { ref, unref } from 'vue'

export const useBaseTableState = props => {
    let _exposeData = {}

    const getExposeData = () => _exposeData

    const register = data => {
        _exposeData = data
    }

    const componentProps = ref(props)

    const exposeData = {
        _componentProps: componentProps,
        componentProps: unref(componentProps),
        getInstance: () => {
            return unref(getExposeData()?.tableRef)
        },
        setSingleSelect: (...args) => {
            return getExposeData()?.setSingleSelect(...args)
        },
        getSingleSelect: (...args) => {
            return getExposeData()?.getSingleSelect(...args)
        },
        setMultipleSelect: (...args) => {
            return getExposeData()?.setMultipleSelect(...args)
        },
        setSingleItemMultipleSelect: (...args) => {
            return getExposeData()?.setSingleItemMultipleSelect(...args)
        },
        getMultipleSelect: (...args) => {
            return getExposeData()?.getMultipleSelect(...args)
        },
        clearSelection: () => {
            unref(getExposeData()?.tableRef).clearSelection()
        }
    }

    return [register, exposeData]
}
