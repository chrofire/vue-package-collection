# BaseCheckboxGroup

## 基本使用

<basic></basic>

<<< @/components/element-plus/BaseCheckboxGroup/basic.vue

## 自定义 props

`getOptionProps` 用于自定义 `ElCheckbox` / `ElCheckboxButton` 组件的 `props`。

<customProps></customProps>

<<< @/components/element-plus/BaseCheckboxGroup/customProps.vue

## 自定义字段
`fieldNames` 用于自定义字段，数据源是原始的 `option`，`label` 为显示值字段，`value` 为绑定值字段。 

<fieldNames></fieldNames>

<<< @/components/element-plus/BaseCheckboxGroup/fieldNames.vue

## 自定义渲染

::: tip 优先级
`rawOption.labelRender` > `props.labelRender` > `slots.label` > `rawOption[fieldNames.label]`
:::

<customRender></customRender>

<<< @/components/element-plus/BaseCheckboxGroup/customRender.vue

<script setup>
import basic from 'docs/components/element-plus/BaseCheckboxGroup/basic.vue'
import customProps from 'docs/components/element-plus/BaseCheckboxGroup/customProps.vue'
import fieldNames from 'docs/components/element-plus/BaseCheckboxGroup/fieldNames.vue'
import customRender from 'docs/components/element-plus/BaseCheckboxGroup/customRender.vue'
</script>