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
        }
    ]
}
