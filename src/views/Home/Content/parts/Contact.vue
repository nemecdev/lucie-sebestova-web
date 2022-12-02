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
  import { MainStore } from '@/stores/MainStore';

  const mainStore = MainStore()
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
      if (responseData.message) mainStore.pushNotification(responseData.message)
      if (responseData.errors.length === 0) Object.assign(data, initialData)
    }).catch((error) => {
      console.error(error)
    })
  }

  let data = reactive({ ...initialData })
</script>

<style scoped lang="scss">
  $linkColor: $accentColor;
  $linkHoverColor: #d8dbff;
  $linkActiveColor: #8f7fa3;

  .contact {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;

    overflow-x: hidden;

    background: $secondaryColor;

    h1 {
      background: linear-gradient(to bottom, $secondaryColorLight 30%, $accentColor 60%);
      background-clip: text;
      -webkit-background-clip: text;
      color: $secondaryColor;
    }

    h2 {
      color: $primaryColor;
    }

    p {
      font-size: 1.2rem;
      color: $primaryColor;

      text-align: center;

      &:first-of-type {
        margin-top: 50px;
      }
    }

    @include link-default;

    .link {
      margin: 20px 0;

      font-size: 1.3rem;
      font-weight: bold;
      text-align: center;
    }
  }

  .contact__form {
    width: 90%;

    margin: 0 auto;
    margin-top: 30px;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    @include since-computer-size {
      width: 25%;
    }
  }

  .contact__form-label {
    align-self: flex-start;

    font-size: 1rem;
    color: $primaryColor;

    text-align: left;
  }

  .contact__form-input {
    width: 100%;

    margin: 20px 0;

    background: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid #ffffff83;

    color: $primaryColor;
    text-align: center;
    font-size: 1.2rem;
  }

  .contact__form-input[type=checkbox] {
    margin-right: 10px;
    width: min-content;
  }

  .contact__form-textarea {
    width: 100%;

    margin: 40px 0;
    min-height: 250px;
    font-size: 1.2rem;
    padding: 10px;
  }

  .contact__form-submit-btn {
    width: 100%;

    margin-top: 30px;
    padding: 0.5rem 1.5rem;

    font-size: 1.2rem;
    font-weight: 500;

    background: $accentColor;
    color: $secondaryColor;
    border-color: transparent;
    border-radius: $borderRadius;

    cursor: pointer;

    @include since-computer-size {
      width: 50%;
      align-self: flex-end;
    }
  }
</style>