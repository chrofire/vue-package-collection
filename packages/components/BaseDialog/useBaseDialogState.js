import { ref, unref } from 'vue'

export const useBaseDialogState = props => {
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
            return unref(getExposeData()?.dialogRef)
        },
        setVisible: bool => {
            getExposeData()?.setVisible(bool)
        }
    }

    return [register, exposeData]
}
