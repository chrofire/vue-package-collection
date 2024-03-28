// .eslintrc.cjs
/* eslint-env node */
// pnpm add eslint eslint-plugin-vue -D

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    env: {
        browser: true,
        'vue/setup-compiler-macros': true
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['vue'],
    // ESLint 默认忽略 . 开头的 目录/文件
    // 可以在 . 开头的 目录/文件 前面加上 ! 表示 不忽略 该 目录/文件
    ignorePatterns: [
        '!.vitepress',
        '!.eslintrc.cjs',
        '**/*/*.ts',
        'node_modules',
        'dist'
    ],
    rules: {
        // 强制大括号风格
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],

        // 缩进使用 4 个空格，并且 switch 语句中的 Case 需要缩进
        indent: ['error', 4, { SwitchCase: 1, flatTernaryExpressions: true }],

        // 数组的括号内的前后禁止有空格
        'array-bracket-spacing': ['error', 'never'],
        'vue/array-bracket-spacing': ['error', 'never'],

        // 在括号内实施一致的间隔
        'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
        'vue/object-curly-spacing': ['error', 'always', { objectsInObjects: false }],

        // 要求把换行符放在操作符前面
        'operator-linebreak': ['error', 'before'],

        // 禁止空语句, 允许空的 catch 语句
        'no-empty': ['error', { allowEmptyCatch: true }],

        // 禁止在语句末尾使用分号
        semi: ['error', 'never'],

        // 禁用不必要的分号
        'no-extra-semi': 'error',

        // 函数圆括号之前有一个空格
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always', // 匿名函数表达式
                named: 'always', // 命名的函数表达式
                asyncArrow: 'always' // 异步的箭头函数表达式
            }
        ],

        // 禁止行尾有空格
        'no-trailing-spaces': [
            'error',
            {
                skipBlankLines: false // 允许在空行使用空白符
            }
        ],

        // vue模板缩进
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: false,
                ignores: []
            }
        ],

        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['*package', '!', '/', ',', '=']
                },
                block: {
                    // 前后空格是否平衡
                    balanced: false,
                    markers: ['*package', '!', ',', ':', '::', 'flow-include'],
                    exceptions: ['*']
                }
            }
        ],

        // 行尾逗号
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }
        ],

        // 强制使用一致的反引号、双引号或单引号
        quotes: ['error', 'single', { allowTemplateLiterals: true }],

        // 要求对象字面量属性名称用引号括起来
        'quote-props': ['error', 'as-needed'],

        // 强制在圆括号内使用一致的空格
        'space-in-parens': ['error', 'never'],

        // 禁止使用多个空格
        'no-multi-spaces': ['error', { ignoreEOLComments: true }],

        // 强制在对象字面量的属性中键和值之间使用一致的间距
        'key-spacing': ['error', { mode: 'strict' }],

        // 要求操作符周围有空格
        'space-infix-ops': ['error', { int32Hint: false }],

        // 要求箭头函数的参数使用圆括号
        'arrow-parens': ['error', 'as-needed'],

        // 强制在逗号前后使用一致的空格
        'comma-spacing': ['error', { before: false, after: true }],

        // key
        'vue/require-v-for-key': 'error',

        // v-if v-for
        'vue/no-use-v-if-with-v-for': [
            'error',
            {
                allowUsingIterationVar: false
            }
        ],

        // 允许props修改
        'vue/no-mutating-props': 'off',

        // 不允许多个空格
        'vue/no-multi-spaces': [
            'error',
            {
                ignoreProperties: false
            }
        ],

        // 不允许在属性的等号周围有空格
        'vue/no-spaces-around-equal-signs-in-attribute': ['error'],

        // 在{{ value }}插值中加强统一的间距
        'vue/mustache-interpolation-spacing': ['error', 'always'],

        // 关闭组件未使用提示
        'vue/no-unused-components': 'off',

        // 关闭未使用变量提示
        'vue/no-unused-vars': 'off',

        // 闭合标签空格
        'vue/html-closing-bracket-spacing': 'error',

        'vue/multi-word-component-names': 'off',

        'no-unused-vars': 'warn',

        'no-undef': 'off',

        'no-case-declarations': 'off',

        'eol-last': ['error', 'unix'],

        'linebreak-style': ['error', 'unix'],

        'no-async-promise-executor': 'off'
    }
}
