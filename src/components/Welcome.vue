<script setup>
  import axios from 'axios'
  import { ref } from 'vue'
  import { useUserStore } from '../../stores/user'
  import router from '../router'

  const email = ref('')
  const pass = ref('')
  const error = ref('')

  const userData = useUserStore()

  const waitingForServerResponse = ref(false)

  const login = () => {
    if (!email.value || !pass.value) {
      error.value = 'Töltsd ki mindkét mezőt!'
      return
    }

    waitingForServerResponse.value = true
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}login`, {
        email: email.value,
        password: pass.value,
      })
      .then(resp => {
        userData.user = resp.data.data.user
        userData.user.token = resp.data.data.token
        localStorage.setItem('userData', JSON.stringify(userData.user))
        localStorage.setItem('lastApiCall', new Date().getTime())
        //waitingForServerResponse.value = false
        router.push('/tasks')
      })
      .catch(err => (error.value = 'Hibás bejelentkezés, próbáld meg újra'))
  }
</script>

<template>
  <h1>taskR</h1>
  <div class="df">
    <h2>A leg<strong>cool</strong>abb task kezelő evör</h2>
    <img alt="logo" src="../assets/logo.png" />
  </div>

  <div class="df spinner" v-show="waitingForServerResponse">
    <font-awesome-icon icon="spinner" spin="true" />
  </div>

  <form class="df" @submit.prevent="login" v-show="!waitingForServerResponse">
    <font-awesome-icon icon="user-astronaut" />

    {{ error }}

    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="jelszó" v-model="pass" />
    <button>Login</button>
  </form>
</template>

<style scoped>
  h1 {
    font-size: 7rem;
    text-align: center;
  }
  h2 {
    font-size: 2rem;
    text-align: right;
    font-weight: normal;
  }

  img {
    width: 100px;
    height: 100px;
  }

  form {
    background-color: var(--blue);
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    margin-top: 2rem;
  }

  svg {
    font-size: 3rem;
  }

  input {
    font-size: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--inputBg);
    padding: 0.5rem;
  }

  button {
    background-color: var(--blue);
    color: #fff;
    border: none;
    font-size: 1.5rem;
  }

  .spinner {
    justify-content: center;
  }
</style>
