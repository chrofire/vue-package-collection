// stylelint.config.mjs
/* eslint-env node */
// pnpm add stylelint postcss-html postcss-scss @stylistic/stylelint-plugin @stylistic/stylelint-config -D

import stylisticStylelintPlugin from '@stylistic/stylelint-plugin'
import postcssScss from 'postcss-scss'

/** @type {import('stylelint').Config} */
export default {
    plugins: [
        // stylelint 15 之后 弃用了 stylistic 规则, 需要额外导入
        stylisticStylelintPlugin
    ],
    extends: [
        // 拓展默认规则
        '@stylistic/stylelint-config'
    ],
    ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
    overrides: [
        {
            files: ['.vue'].flatMap(ext => [`*${ext}`, `**/*${ext}`]),
            customSyntax: 'postcss-html'
        },
        {
            files: ['.scss'].flatMap(ext => [`*${ext}`, `**/*${ext}`]),
            // customSyntax: 'postcss-scss'
            customSyntax: postcssScss
        }
    ],
    rules: {
        '@stylistic/indentation': 4
    }
}
