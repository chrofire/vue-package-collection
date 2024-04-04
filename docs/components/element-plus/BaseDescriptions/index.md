# BaseDescriptions

## 基本使用

::: tip title & extra 渲染优先级
`render` > `template` > `props`
:::

<div class="vp-raw overflow-auto">
    <basic></basic>
</div>

<<< @/components/element-plus/BaseDescriptions/basic.vue

## 自定义渲染

::: tip 优先级
`item.valueRender` > `[item.prop]`插槽 > `item.value`

`item.labelRender` > `[${item.prop}Label]`插槽 > `item.label`
:::

<div class="vp-raw overflow-auto">
    <customRender></customRender>
</div>

<<< @/components/element-plus/BaseDescriptions/customRender.vue
<script setup>
import basic from 'docs/components/element-plus/BaseDescriptions/basic.vue'
import customRender from 'docs/components/element-plus/BaseDescriptions/customRender.vue'
</script>
