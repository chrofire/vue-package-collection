/** @type {import('vitepress').DefaultTheme.Sidebar} */
export const sidebar = {
    '/components/': [
        {
            text: 'Demo',
            link: '/components/index.md'
        }
    ],
    '/composables/': [
        { text: 'useData', link: '/composables/useData/index.md' }
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
