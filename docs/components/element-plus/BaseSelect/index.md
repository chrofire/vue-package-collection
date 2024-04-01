# BaseSelect

## 基本使用

<basic></basic>

<<< @/components/element-plus/BaseSelect/basic.vue

## 绑定对象

设置 `bindObject` 为 `true` 会启用绑定对象, 将整个 `option` 对象 作为 `value` 值

<bindObject></bindObject>

<<< @/components/element-plus/BaseSelect/bindObject.vue

## 自定义 props

`getGroupProps` 用于自定义 `ElOptionGroup` 组件的 `props`。

`getOptionProps` 用于自定义 `ElOption` 组件的 `props`。

<customProps></customProps>

<<< @/components/element-plus/BaseSelect/customProps.vue

## 自定义字段
`fieldNames` 用于自定义字段，数据源是原始的 `option`，`label` 为 `Option` 显示值字段，`value` 为 `Option` 绑定值字段，`children` 为 `OptionGroup` 里的 `Option` 数组字段。

<fieldNames></fieldNames>

<<< @/components/element-plus/BaseSelect/fieldNames.vue

## 分组

`options` 第一层 传入了 `[fieldNames.children]` 数组 会开启 分组

<group></group>

<<< @/components/element-plus/BaseSelect/group.vue

## prefix 插槽 / empty 插槽

::: tip 优先级
`render` > `template`
:::

<prefixAndEmpty></prefixAndEmpty>

<<< @/components/element-plus/BaseSelect/prefixAndEmpty.vue

## label 插槽

::: tip 优先级
`rawOption.labelRender` > `props.labelRender` > `slots.label` > `rawOption[fieldNames.label]`
:::

<Label></Label>

<<< @/components/element-plus/BaseSelect/label.vue

<script setup>
import basic from 'docs/components/element-plus/BaseSelect/basic.vue'
import bindObject from 'docs/components/element-plus/BaseSelect/bindObject.vue'
import customProps from 'docs/components/element-plus/BaseSelect/customProps.vue'
import fieldNames from 'docs/components/element-plus/BaseSelect/fieldNames.vue'
import group from 'docs/components/element-plus/BaseSelect/group.vue'
import prefixAndEmpty from 'docs/components/element-plus/BaseSelect/prefixAndEmpty.vue'
import Label from 'docs/components/element-plus/BaseSelect/label.vue'
</script>