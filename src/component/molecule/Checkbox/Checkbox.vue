<template>
  <Flex
    class="checkbox"
    vDirection="row"
    vJustify="flex-start"
  >
    <Label
      v-if="( vLabel && vLabelPos === 'before' )"
      :for="( vId )"
      :v-label="( vLabel )"
      class="checkbox__label checkbox__label-before"
      :class="{
        ['checkbox__label--' + vTheme]: vTheme,
      }"
    >
      {{ vLabel }}
    </Label>
    <input
      :required="( $attrs.required as boolean )"
      type="checkbox"
      v-model="( vChecked )"
      :id="( vId )"
      :name="( vName )"
      @change="( handleInputChange )"
    />
    <Label
    v-if="( vLabel && vLabelPos === 'after' )"
      :for="( vId )"
      :v-label="( vLabel )"
      class="checkbox__label checkbox__label-after"
      :class="{
        ['checkbox__label--' + vTheme]: vTheme,
      }"
    >
      {{ vLabel }}
    </Label>
  </Flex>
</template>

<script setup lang="ts">
  import { ref, onUpdated } from "vue"
  import Flex from "@atom/Flex/Flex.vue"
  import Label from "@atom/Label/Label.vue"

  const props = withDefaults(defineProps<{
    vLabel: string,
    vChecked?: boolean,
    vId?: string,
    vName?: string,
    vTheme?: string,
    vLabelPos?: string,
    vTriggerReset?: boolean,
  }>(), {
    vType: 'text',
    vName: 'textfield',
    vLabelPos: 'after',
  })

  const emit = defineEmits<{
    (e: "model:update", value: boolean): void
  }>()

  onUpdated(() => {
    if (props.vTriggerReset) resetState()
  })

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    isChecked.value = target.checked
    emit('model:update', target.checked)
  }

  const resetState = () => {
    isChecked.value = false
  }

  let isChecked = ref(props.vChecked ?? false)
</script>

<style scoped lang="less">
  @import "./Checkbox.less";
</style>