<script setup>
  const props = defineProps({
    color: {
      type: String,
      default: '#576ca8',
    },
    num: {
      type: Number,
      required: true,
    },
    statName: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['cardClicked'])

  const nameClicked = name => {
    emit('cardClicked', {
      cardName: name,
    })
  }
</script>

<template>
  <section>
    <h2 @click="nameClicked(props.statName)">{{ props.statName }}</h2>
    <p>{{ num }}</p>
  </section>
</template>

<style scoped>
  section {
    margin: 0.5em;
    padding: 0.5em;
    background-color: v-bind(color);
    border-radius: 0.5em;
  }
  p {
    font-size: 5rem;
    text-align: right;
  }
</style>
