<template>
  <div class="product-card" @click="goToDetail">
    <div class="product-img-wrap">
      <img :src="product.thumbnail" :alt="product.title" class="product-img" />
      <span class="product-discount" v-if="product.discountPercentage > 10">
        -{{ Math.round(product.discountPercentage) }}%
      </span>
    </div>
    <div class="product-body">
      <span class="product-category">{{ product.category }}</span>
      <h3 class="product-title">{{ product.title }}</h3>
      <div class="product-rating">
        <span class="stars">{{ starRating }}</span>
        <span class="rating-num">{{ product.rating }}</span>
      </div>
      <div class="product-footer">
        <span class="product-price">{{ product.price.toFixed(2) }}€</span>
        <button class="add-btn" @click.stop="addToCart">
          + Panier
        </button>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
 
const props = defineProps({
  product: Object
})
 
const emit = defineEmits(['added'])
const router = useRouter()
const cartStore = useCartStore()
 
const starRating = computed(() => {
  const filled = Math.round(props.product.rating)
  return '★'.repeat(filled) + '☆'.repeat(5 - filled)
})
 
const goToDetail = () => {
  router.push(`/products/${props.product.id}`)
}
 
const addToCart = () => {
  cartStore.addToCart(props.product)
  emit('added', props.product)
}
</script>
 

 
