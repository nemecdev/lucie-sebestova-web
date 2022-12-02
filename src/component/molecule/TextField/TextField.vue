<template>
  <Flex
    class="text-field"
    vDirection="column"
    vJustify="flex-start"
    @click="focusInput"
  >
    <component
      class="text-field__input"
      :class="{
        ['text-field__input--' + vVariant]: vVariant,
        'text-field__input--filled': isFilled,
        'text-field__input--focused': isFocused,
        ['text-field__input--' + vTheme]: vTheme,
      }"
      :is="( INPUT_COMPONENT )"
      :id="( vId )"
      :name="( vName )"
      :type="( ALLOWED_TYPES.includes(vType) ? vType : 'text' )"
      :v-value="( vValue ?? inputValue )"
      :required="( $attrs.required as boolean )"
      @model:update="( handleInputChange )"
      @focus="( isFocused = true )"
      @blur="( isFocused = false )"
    />
    <Label
      v-if="( vLabel )"
      :for="( vId )"
      :v-label="( vLabel )"
      class="text-field__label"
      :class="{
        ['text-field__label--' + vVariant]: vVariant,
        ['text-field__label--' + vTheme]: vTheme,
      }"
    >
      {{ vLabel }}
    </Label>
  </Flex>
</template>

<script setup lang="ts">
  import { ref, onUpdated } from "vue"
  import { TEXT_FIELD_VARIANTS as VARIANTS } from "@molecule/TextField/TEXT_FIELD_VARIANTS_ENUM"

  import Flex from "@atom/Flex/Flex.vue"
  import Label from "@atom/Label/Label.vue"
  import Input from "@atom/Input/Input.vue"
  import TextArea from "@atom/TextArea/TextArea.vue"

  const props = withDefaults(defineProps<{
    vLabel: string,
    vValue?: string,
    vId?: string,
    vName?: string,
    vType?: string,
    vVariant?: VARIANTS,
    vTheme?: string,
    vTriggerReset?: boolean,
  }>(), {
    vType: 'text',
    vName: 'textfield',
    vVariant: VARIANTS.STANDARD,
  })

  const emit = defineEmits<{
    (e: 'model:update', value: string):void
  }>()

  onUpdated(() => {
    if (props.vValue?.length === 0
      || inputValue.value.length === 0
    ) isFilled.value = false

    if (props.vTriggerReset) resetState()
  })

  const ALLOWED_TYPES = [
    'text',
    'email',
    'search',
    'tel',
    'url',
  ]

  const VARIANT_COMPONENT = {
    standard: Input,
    multiline: TextArea
  }

  const INPUT_COMPONENT = VARIANT_COMPONENT[props.vVariant]

  const focusInput = () => {
    if (props.vId) return
    const el = document.querySelector('input')
    el?.focus()
  }

  const handleInputChange = (value: string) => {
    if (value.length > 0) isFilled.value = true
    else isFilled.value = false
    inputValue.value = value

    emit("model:update", value)
  }

  const resetState = () => {
    inputValue.value = ''
    isFilled.value = false
  }

  let isFilled = ref(false)
  let isFocused = ref(false)
  let inputValue = ref('')
</script>

<style scoped lang="less">
  @import "./TextField.less";
</style>