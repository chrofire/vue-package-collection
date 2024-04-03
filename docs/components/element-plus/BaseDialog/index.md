# BaseDialog

## 函数式调用

<baseDialogInstance></baseDialogInstance>

<<< @/components/element-plus/BaseDialog/baseDialogInstance.vue

## 函数式调用 (promise)

`promise` 状态必定为 `fulfilled`，具体成功失败通过返回值的 `success` 区分

```ts
// 返回值类型
// 成功: `onOk` 或 `onCancel` 返回值 存放到 `data`, `success` 为 `true`
// 失败: `onOk` 或 `onCancel` 捕获错误 存放到 `error`, `success` 为 `false`
type Return = {
    type: 'ok' | 'cancel',
    success: boolean,
    data: null | unknown,
    error: null | unknown
}
```

<baseDialogPromise></baseDialogPromise>

<<< @/components/element-plus/BaseDialog/baseDialogPromise.vue

## 组合式函数

<useBaseDialogState></useBaseDialogState>

<<< @/components/element-plus/BaseDialog/useBaseDialogState.vue

<script setup>
import baseDialogInstance from 'docs/components/element-plus/BaseDialog/baseDialogInstance.vue'
import baseDialogPromise from 'docs/components/element-plus/BaseDialog/baseDialogPromise.vue'
import useBaseDialogState from 'docs/components/element-plus/BaseDialog/useBaseDialogState.vue'
</script>
