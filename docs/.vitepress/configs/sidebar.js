/** @type {import('vitepress').DefaultTheme.Sidebar} */
export const sidebar = {
    '/components/': [
        {
            text: 'element-plus',
            collapsed: false,
            items: [
                { text: 'BaseButton 按钮', link: '/components/element-plus/BaseButton/index.md' },
                { text: 'BaseCheckboxGroup 多选框组', link: '/components/element-plus/BaseCheckboxGroup/index.md' },
                { text: 'BaseRadioGroup 单选框组', link: '/components/element-plus/BaseRadioGroup/index.md' },
                { text: 'BaseSelect 选择器', link: '/components/element-plus/BaseSelect/index.md' },
                { text: 'BaseForm 表单', link: '/components/element-plus/BaseForm/index.md' },
                { text: 'BaseSearchForm 查询表单', link: '/components/element-plus/BaseSearchForm/index.md' },
                { text: 'BasePagination 分页', link: '/components/element-plus/BasePagination/index.md' },
                { text: 'BaseTable 表格', link: '/components/element-plus/BaseTable/index.md' },
                { text: 'BaseDialog 对话框', link: '/components/element-plus/BaseDialog/index.md' },
                { text: 'BaseCheckTagGroup 标签组', link: '/components/element-plus/BaseCheckTagGroup/index.md' },
                { text: 'BaseDescriptions 描述列表', link: '/components/element-plus/BaseDescriptions/index.md' },
                { text: 'BaseTabs 标签页', link: '/components/element-plus/BaseTabs/index.md' }
            ]
        },
        {
            text: 'other',
            collapsed: false,
            items: [
                { text: 'BaseRender 渲染器', link: '/components/other/BaseRender/index.md' },
                { text: 'NumTo 数字滚动', link: '/components/other/NumTo/index.md' },
                { text: 'SeamlessScroll 无缝滚动', link: '/components/other/SeamlessScroll/index.md' },
                { text: 'ScaleWrapper 缩放包装盒', link: '/components/other/ScaleWrapper/index.md' },
                { text: 'GanttChart 甘特图', link: '/components/other/GanttChart/index.md' }
            ]
        }
    ],
    '/composables/': [
        { text: 'useData', link: '/composables/useData/index.md' },
        { text: 'useCustomDict', link: '/composables/useCustomDict/index.md' },
        { text: 'useRender', link: '/composables/useRender/index.md' },
        { text: 'useLockFn', link: '/composables/useLockFn/index.md' },
        { text: 'useBaseImageViewer', link: '/composables/useBaseImageViewer/index.md' },
        { text: 'useLoading', link: '/composables/useLoading/index.md' },
        { text: 'useFormDialog', link: '/composables/useFormDialog/index.md' },
        { text: 'useTableCrud', link: '/composables/useTableCrud/index.md' },
        { text: 'useSlotRef', link: '/composables/useSlotRef/index.md' },
        { text: 'useScrollSync', link: '/composables/useScrollSync/index.md' },
        { text: 'useMultiSelect', link: '/composables/useMultiSelect/index.md' }
    ],
    '/utils/': [
        {
            text: 'data',
            collapsed: false,
            items: [
                { text: 'doRequest', link: '/utils/doRequest/index.md' }
            ]
        },
        {
            text: 'tree',
            collapsed: false,
            items: [
                { text: 'createTreeData', link: '/utils/createTreeData/index.md' },
                { text: 'listToTree', link: '/utils/listToTree/index.md' },
                { text: 'treeToList', link: '/utils/treeToList/index.md' },
                { text: 'treeToMap', link: '/utils/treeToMap/index.md' },
                { text: 'filterTreeNodes', link: '/utils/filterTreeNodes/index.md' },
                { text: 'findTreeNode', link: '/utils/findTreeNode/index.md' }
            ]
        },
        {
            text: 'color',
            collapsed: false,
            items: [
                { text: 'randomRgbaColor', link: '/utils/randomRgbaColor/index.md' },
                { text: 'randomRgbColor', link: '/utils/randomRgbColor/index.md' },
                { text: 'randomHexColor', link: '/utils/randomHexColor/index.md' }
            ]
        },
        {
            text: 'time',
            collapsed: false,
            items: [
                { text: 'getYearBetween', link: '/utils/getYearBetween/index.md' },
                { text: 'getMonthBetween', link: '/utils/getMonthBetween/index.md' },
                { text: 'getDateBetween', link: '/utils/getDateBetween/index.md' }
            ]
        },
        {
            text: 'promise',
            collapsed: false,
            items: [
                { text: 'createImperativePromise', link: '/utils/createImperativePromise/index.md' },
                { text: 'createConcurrentTask', link: '/utils/createConcurrentTask/index.md' },
                { text: 'onlyTakeEffectLastPromise', link: '/utils/onlyTakeEffectLastPromise/index.md' }
            ]
        },
        {
            text: 'dom',
            collapsed: false,
            items: [
                { text: 'createEventCleanup', link: '/utils/createEventCleanup/index.md' }
            ]
        },
        {
            text: 'blob',
            collapsed: false,
            items: [
                { text: 'downloadBlob', link: '/utils/downloadBlob/index.md' },
                { text: 'blobToBase64', link: '/utils/blobToBase64/index.md' },
                { text: 'blobToJson', link: '/utils/blobToJson/index.md' }
            ]
        },
        {
            text: 'other',
            collapsed: false,
            items: [
                { text: 'genUUID', link: '/utils/genUUID/index.md' },
                { text: 'genPlaceholderImage', link: '/utils/genPlaceholderImage/index.md' }
            ]
        }
    ]
}
