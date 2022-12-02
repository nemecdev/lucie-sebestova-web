<template>
  <form
    class="contact-form"
    method="post"
    @submit.prevent="( handleSubmit )"
  >
    <TextField
      required
      class="contact-form__field"
      vType="email"
      vId="mail-form-email"
      vName="email"
      vLabel="Email"
      :v-theme="( vTheme )"
      :v-trigger-reset="( vTriggerResetForm )"
      @model:update="( (value: string) => handleValueChange('email', value) )"
    />
    <TextField
      required
      class="contact-form__field"
      vType="text"
      vId="mail-form-subject"
      vName="subject"
      vLabel="Předmět"
      :v-theme="( vTheme )"
      :v-trigger-reset="( vTriggerResetForm )"
      @model:update="( (value: string) => handleValueChange('subject', value) )"
    />
    <TextField
      required
      class="contact-form__field"
      vId="mail-form-message"
      vName="message"
      vLabel="Zpráva"
      :v-variant="( TEXT_FIELD_VARIANTS.MULTILINE )"
      :v-theme="( vTheme )"
      :v-trigger-reset="( vTriggerResetForm )"
      @model:update="( (value: string) => handleValueChange('message', value) )"
    />
    <Checkbox
      required
      class="contact-form__field"
      vId="mail-form-agreement"
      vName="agreement"
      :v-label="( vAgreementTxt )"
      :v-theme="( vTheme )"
      :v-trigger-reset="( vTriggerResetForm )"
      @model:update="( (checked: boolean) => handleValueChange('agreement', String(checked)) )"
    />
    <Button vContent="Odeslat" />
  </form>
</template>

<script setup lang="ts">
  import { reactive, onUpdated } from "vue"

  import { ContactFormDataInterface as IFormData } from "./ContactFormDataInterface"
  import { TEXT_FIELD_VARIANTS } from "@molecule/TextField/TEXT_FIELD_VARIANTS_ENUM"

  import Button from "@atom/Button/Button.vue"

  import TextField from "@molecule/TextField/TextField.vue"
  import Checkbox from "@molecule/Checkbox/Checkbox.vue"


  const props = defineProps<{
    vAgreementTxt: string,
    vTheme?: string,
    vTriggerResetForm?: boolean,
  }>()

  const emit = defineEmits<{
    (e: 'submit:contactForm', data: IFormData): void
  }>()

  onUpdated(() => {
    if (props.vTriggerResetForm) clearForm()
  })

  const clearForm = () => {
    mailForm = Object.assign(mailForm, mailFormInitialState)
  }

  const handleSubmit = () => {
    emit('submit:contactForm', {
      email: mailForm.email,
      subject: mailForm.subject,
      message: mailForm.message,
      agreement: mailForm.agreement,
    })
  }

  const handleValueChange = (formAttrName: string, value: string) => {
    mailForm[formAttrName] = value
  }


  const mailFormInitialState: {
    [key: string]: string
  } = {
    email: '',
    subject: '',
    message: '',
    agreement: '',
  }

  let mailForm = reactive({ ... mailFormInitialState})
</script>

<style scoped lang="less">
  @import "./ContactForm.less";
</style>