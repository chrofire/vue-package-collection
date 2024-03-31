# BaseButton

## 自动锁定

`lock` 属性设置为 `true` 时，会包装 `onClick` 和 `onDblclick` 事件，启用内置的 `loading`，自动根据事件函数的 `Promise` 状态修改 `loading` 值。

<lock></lock>

<<< @/components/element-plus/BaseButton/lock.vue

## 延时解锁

`unlockDelay` 默认 `300` 毫秒，用于延时恢复 `loading` 状态为 `false`。

<unlockDelay></unlockDelay>

<<< @/components/element-plus/BaseButton/unlockDelay.vue

<script setup>
import lock from 'docs/components/element-plus/BaseButton/lock.vue'
import unlockDelay from 'docs/components/element-plus/BaseButton/unlockDelay.vue'
</script>
