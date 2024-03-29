/** @type {import('vitepress').DefaultTheme.Sidebar} */
export const sidebar = {
    '/components/': [
        {
            text: 'Demo',
            link: '/components/index.md'
        }
    ],
    '/composables/': [
        {
            text: 'Demo',
            link: '/composables/index.md'
        }
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
        }
    ]
}
