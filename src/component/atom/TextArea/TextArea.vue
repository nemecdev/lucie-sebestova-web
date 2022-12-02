<template>
  <textarea
    class="textarea"
    :value="( vValue )"
    @change="( handleInputChange )"
  >
  </textarea>
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
  @import "./TextArea.less";
</style>