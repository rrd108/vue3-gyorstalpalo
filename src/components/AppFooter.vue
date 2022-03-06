<script setup>
  import { ref } from 'vue'
  import { useUserStore } from '../../stores/user'
  import axios from 'axios'
  import toYMDFormat from '../utilities/toYMDFormat'

  const userData = useUserStore()

  const daysFromNow = 5 // mához képest 5 nap
  const defaultDueDate = toYMDFormat(
    new Date(new Date().getTime() + daysFromNow * 24 * 60 * 60 * 1000)
  )

  const emptyTask = {
    task: '',
    due: defaultDueDate,
  }

  const task = ref({ ...emptyTask })

  userData.$subscribe(mutation => {
    if (mutation.events.key == 'editTask') {
      task.value =
        userData.user.tasks.find(t => t.id == mutation.events.newValue) ||
        emptyTask
    }
  })

  const taskSubmit = () => {
    if (task.value.id) {
      editTask()
      return
    }
    addTask()
  }

  const addTask = () => {
    axios
      .post(
        `${import.meta.env.VITE_APP_API_URL}task`,
        {
          user_id: userData.user.id,
          task: task.value.task,
          due_date: task.value.due,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.user.token}`,
            Accept: 'application/json',
          },
        }
      )
      .then(res => {
        userData.user.tasks.push(res.data.data)
        task.value.task = ''
      })
      .catch(err => console.error(err))
  }

  const editTask = () => {
    axios
      .patch(
        `${import.meta.env.VITE_APP_API_URL}task/${task.value.id}`,
        {
          user_id: userData.user.id,
          task: task.value.task,
          due_date: task.value.due,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.user.token}`,
            Accept: 'application/json',
          },
        }
      )
      .then(res => {
        userData.user.tasks = userData.user.tasks.map(t => {
          if (t.id === task.value.id) {
            return res.data.data
          }
          return t
        })
        task.value.task = ''
        task.value.due = defaultDueDate
        userData.user.editTask = null
      })
      .catch(err => console.error(err))
  }
</script>

<template>
  <footer v-if="userData.user.id">
    <form @submit.prevent="taskSubmit">
      <input type="text" placeholder="Új feladat" v-model="task.task" />
      <input type="date" v-model="task.due" />
      <button>
        <font-awesome-icon :icon="task.id ? 'pen-nib' : 'plus'" />
      </button>
    </form>

    <nav>
      <ul>
        <li>
          <router-link to="/user">
            <font-awesome-icon icon="user-astronaut" />
          </router-link>
        </li>
        <li>
          <router-link to="/tasks">
            <font-awesome-icon icon="igloo" />
          </router-link>
        </li>
        <li>
          <router-link to="/settings">
            <font-awesome-icon icon="cog" />
          </router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>
  footer {
    position: fixed;
    bottom: 0;
    height: 22vh;
    background-color: #302b27;
  }

  footer form {
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;
    background-color: var(--blue);
    border-radius: 0.5rem;
    margin: 0.5rem;
  }
  footer input[type='text'] {
    background-color: var(--blue);
    color: #fff;
    width: 60vw;
    font-size: 1.5rem;
  }
  footer input[type='date'] {
    background-color: var(--blue);
    width: 20vw;
  }
  footer input::placeholder {
    color: #fff8;
  }
  footer button {
    width: 1.75rem;
    height: 1.75rem;
    border: none;
    border-radius: 50%;
    font-size: 1.25rem;
    color: var(--blue);
  }
  nav ul {
    background-color: var(--blue);
    width: 100vw;
    height: 4.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  nav svg {
    font-size: 3rem;
  }
  nav li {
    padding-bottom: 0.25rem;
    border-radius: 0.25rem;
  }
  .router-link-active {
    padding-bottom: 0.5em;
    border-bottom: 0.25rem solid #fff;
  }
  a {
    color: #fff;
  }
</style>
