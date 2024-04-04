# BaseCheckTagGroup

## 基本使用

<basic></basic>

<<< @/components/element-plus/BaseCheckTagGroup/basic.vue

## 自定义字段
`fieldNames` 用于自定义字段，数据源是原始的 `option`，`label` 为显示值字段，`value` 为绑定值字段。 

<fieldNames></fieldNames>

<<< @/components/element-plus/BaseCheckTagGroup/fieldNames.vue

## 自定义渲染

::: tip 优先级
`rawOption.labelRender` > `props.labelRender` > `slots.label` > `rawOption[fieldNames.label]`
:::

<customRender></customRender>

<<< @/components/element-plus/BaseCheckTagGroup/customRender.vue

<script setup>
import basic from 'docs/components/element-plus/BaseCheckTagGroup/basic.vue'
import fieldNames from 'docs/components/element-plus/BaseCheckTagGroup/fieldNames.vue'
import customRender from 'docs/components/element-plus/BaseCheckTagGroup/customRender.vue'
</script>
