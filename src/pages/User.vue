<script setup>
  import { computed } from 'vue'
  import { useUserStore } from '../../stores/user'
  import UserStats from '../components/UserStats.vue'
  import router from '../router'
  import toYMDFormat from '../utilities/toYMDFormat'

  const userData = useUserStore()

  const openNum = computed(() => userData.user.tasks.length)
  const todayNum = computed(
    () =>
      userData.user.tasks.filter(
        task => task.due_date.substring(0, 10) == toYMDFormat(new Date())
      ).length
  )
  const overduedNum = computed(
    () =>
      userData.user.tasks.filter(
        task => task.due_date.substring(0, 10) < toYMDFormat(new Date())
      ).length
  )

  const cardClicked = data => {
    //console.log(data)
    const filter = data.cardName.toLowerCase().replace(' feladatok', '')
    router.push('/tasks/' + filter)
  }
</script>

<template>
  <h1>Felhasználói adatok</h1>
  <div>
    <UserStats
      statName="Nyitott feladatok"
      :num="openNum"
      color="#1b998b"
      @cardClicked="cardClicked"
    />
    <UserStats
      statName="Mai feladatok"
      :num="todayNum"
      @cardClicked="cardClicked"
    />
    <UserStats
      statName="Lejárt feladatok"
      :num="overduedNum"
      color="#c94277"
      @cardClicked="cardClicked"
    />
  </div>
</template>

<style scoped>
  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>
