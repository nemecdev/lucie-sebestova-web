<template>
  <input
    class="input"
    :value="( vValue )"
    @change="( handleInputChange )"
  />
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    vValue?: string,
  }>(), {
    vValue: '',
  })

  const emit = defineEmits<{
    (e: "model:update", value: string): void
  }>()

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('model:update', target.value)
  }
</script>

<style scoped lang="less">
  @import "./Input.less";
</style>