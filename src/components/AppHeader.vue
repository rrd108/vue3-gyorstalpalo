<script setup>
  import { useUserStore } from '../../stores/user'
  const userData = useUserStore()
</script>

<template>
  <header v-if="userData.user.id">
    <div>
      <img alt="logo" src="../assets/logo.png" />
      <h1>taskR</h1>
    </div>
    <div>todo</div>
  </header>
</template>

<style scoped>
  header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 10vh;
    padding: 0.25rem;
    display: flex;
    justify-content: space-between;
    background-color: #302b27;
  }

  header div {
    display: flex;
    align-items: center;
  }

  header img {
    height: 100%;
    width: auto;
    margin: 0 0.5rem;
  }

  header h1 {
    display: inline-block;
  }

  header svg {
    margin: 0.25rem;
  }
</style>
