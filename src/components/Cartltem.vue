<script setup>
defineProps({
  item: Object
})

const emit = defineEmits(['remove'])
</script>

<template>
  <div class="card mb-2">
    <div class="card-body">

      <h5>{{ item.title }}</h5>

      <p>{{ item.price }} €</p>

      <button
        class="btn btn-danger"
        @click="emit('remove', item.id)"
      >
        Supprimer
      </button>

    </div>
  </div>
</template>