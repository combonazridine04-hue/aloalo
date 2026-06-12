<template>
  <nav class="navbar navbar-expand-lg fixed-top custom-navbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <span class="brand-icon">🛍️</span>
        <span class="brand-name">ShopEasy</span>
      </RouterLink>

      <div class="navbar-actions">
        <RouterLink to="/cart" class="cart-btn">
          <span>🛒</span>
          <span>Panier</span>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </RouterLink>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><RouterLink class="nav-link" to="/">Accueil</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/products">Produits</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/contact">Contact</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="navbar-glow-line"></div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const { cartCount } = storeToRefs(cartStore)

const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
