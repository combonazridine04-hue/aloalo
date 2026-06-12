<template>
  <div class="cart-item">
    <img :src="item.thumbnail" :alt="item.title" class="cart-item-img" />
    <div class="cart-item-info">
      <h4 class="cart-item-title">{{ item.title }}</h4>
      <span class="cart-item-cat">{{ item.category }}</span>
    </div>
    <div class="cart-item-qty">
      <button @click="emit('decrease', item.id)" class="qty-btn">−</button>
      <span class="qty-num">{{ item.quantity }}</span>
      <button @click="emit('increase', item)" class="qty-btn">+</button>
    </div>
    <div class="cart-item-price">
      {{ (item.price * item.quantity).toFixed(2) }}€
    </div>
    <button @click="emit('remove', item.id)" class="remove-btn" title="Supprimer">
      🗑️
    </button>
  </div>
</template>
 
<script setup>
defineProps({ item: Object })
const emit = defineEmits(['remove', 'increase', 'decrease'])
</script>
 
