<template>
  <div class="contact" id="contact">
    <h1>Kontakt</h1>
    <h2>Kontakt</h2>
    <p>Můžete mne kontaktovat pomocí emailu</p>
    <a class="link" href="mailto:lucielsebestova@gmail.com">lucielsebestova@gmail.com</a>
    <p>
      <strong>nebo</strong>
    </p>
    <form class="contact__form">
      <input v-model="data.email"
             class="contact__form-input"
             type="email"
             name="email"
             placeholder="Váš Email"
             required
      />
      <input v-model="data.subject"
             class="contact__form-input"
             type="text"
             name="subject"
             placeholder="Předmět"
             required
      />
      <textarea v-model="data.message"
                class="contact__form-textarea"
                name="message"
                placeholder="Zpráva"
                required
      ></textarea>
      <label class="contact__form-label">
        <input v-model="data.agreement"
               class="contact__form-input"
               type="checkbox"
               name="agreement"
               required
        />
        Souhlasím s odesláním pro účely komunikace
      </label>
      <button @click.prevent="sendEmail(data)"
              class="contact__form-submit-btn"
      >Odeslat</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { reactive } from 'vue';
  import { useStore } from '@/stores/Store';

  const store = useStore()
  const initialData = {
    email: '' as string,
    subject: '' as string,
    message: '' as string,
    agreement: false as boolean
  }

  const sendEmail = async (data: any) => {
    await axios({
      method: 'post',
      url: import.meta.env.VITE_API_ENDPOINT_SEND_MAIL as string,
      data: {
        email: data.email,
        subject: data.subject,
        message: data.message,
        agreement: data.agreement
      }
    }).then((response: any) => {
      let responseData: any = response.data
      console.log(responseData)
      if (responseData.message) store.pushNotification(responseData.message)
      if (responseData.errors.length === 0) Object.assign(data, initialData)
    }).catch((error) => {
      console.error(error)
    })
  }

  let data = reactive({ ...initialData })
</script>

<style scoped lang="less">
</style>