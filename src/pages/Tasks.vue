<script setup>
  import { computed } from 'vue'
  import axios from 'axios'
  import { useUserStore } from '../../stores/user'
  import { useRoute } from 'vue-router'
  import toYMDFormat from '../utilities/toYMDFormat'

  const userData = useUserStore()
  const route = useRoute()

  const filteredTasks = computed(() => {
    if (route.params.filter == 'mai') {
      return userData.user.tasks.filter(
        task => task.due_date.substring(0, 10) == toYMDFormat(new Date())
      )
    }
    if (route.params.filter == 'lejárt') {
      return userData.user.tasks.filter(
        task => task.due_date.substring(0, 10) < toYMDFormat(new Date())
      )
    }
    return userData.user.tasks
  })

  const deleteTask = taskId => {
    userData.user.tasks = userData.user.tasks.filter(t => t.id !== taskId)

    // TODO headers-t egy helyen definiáljuk
    axios
      .delete(`${import.meta.env.VITE_APP_API_URL}task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${userData.user.token}`,
          Accept: 'application/json',
        },
      })
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }

  const editTask = taskId => {
    if (taskId == userData.user.editTask) {
      userData.user.editTask = null
      return
    }
    userData.user.editTask = taskId
  }
</script>

<template>
  {{ route.params.filter }}
  <section
    v-for="task in filteredTasks"
    :class="{ editing: task.id == userData.user.editTask }"
  >
    <p class="df">
      {{ task.task }}
      <font-awesome-icon icon="pen-nib" @click="editTask(task.id)" />
    </p>
    <ul class="df">
      <li>
        <font-awesome-icon icon="fire-alt" />
        {{ task.due_date.substring(0, 10) }}
      </li>
      <li>
        <font-awesome-icon icon="calendar-day" />
        {{ task.created_at.substring(0, 10) }}
      </li>
      <li @click="deleteTask(task.id)">
        <font-awesome-icon icon="trash" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
  section {
    border-left: 0.5rem solid;
    border-radius: 0.25rem;
    padding-left: 0.5rem;
    margin: 1rem 0 2.5rem 0;
    font-size: 0.75rem;
  }
  section:nth-child(1),
  section:nth-child(4) {
    border-left-color: var(--cr1);
  }
  section:nth-child(2),
  section:nth-child(5) {
    border-left-color: var(--cr2);
  }
  section:nth-child(3),
  section:nth-child(6) {
    border-left-color: var(--cr3);
  }
  section p {
    font-size: 2rem;
    padding-bottom: 1rem;
  }
  section ul {
    justify-content: space-between;
  }
  section .df li {
    gap: 0.5rem;
  }
  p {
    justify-content: space-between;
  }
  p svg {
    font-size: 1.5rem;
  }
  svg {
    opacity: 0.5;
  }

  .editing {
    opacity: 0.5;
  }
</style>
