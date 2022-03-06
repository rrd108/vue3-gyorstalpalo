<script setup>
  import { useUserStore } from '../stores/user'
  import AppFooter from './components/AppFooter.vue'
  import AppHeader from './components/AppHeader.vue'
  import router from './router'

  const userData = useUserStore()

  const isLastApiCallRecent =
    new Date().getTime() - localStorage.getItem('lastApiCall') < 1000 * 60 * 5

  if (isLastApiCallRecent && localStorage.getItem('userData')) {
    userData.user = JSON.parse(localStorage.getItem('userData'))
    if (window.location.pathname === '/') {
      router.push('/tasks')
    }
  } else {
    router.push('/')
  }
</script>

<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
  <AppFooter />
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

  :root {
    --blue: #576ca8;
    --inputBg: #444b67;
    --cr1: #c94277;
    --cr2: #1b998b;
    --cr3: #ffd046;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #302b27;
    color: #fff;
    font-family: Quicksand, sans-serif;
  }

  #app {
  }

  main {
    padding: 10vh 0.5rem 22vh 0.5rem;
    overflow: scroll;
  }

  input {
    border: none;
    border-radius: 0.5rem;
    background-color: var(--inputBg);
    color: #fff;
    padding: 0.5rem;
  }

  ul {
    list-style: none;
  }

  .df {
    display: flex;
    gap: 1rem;
  }
</style>
