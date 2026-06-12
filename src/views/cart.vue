<template>
  <div class="cart-page container py-5">
    <h1 class="mb-4">🛒 Mon panier</h1>

    <!-- Panier vide -->
    <div v-if="cartStore.cartItems.length === 0 && !ordered">
      <p>Ton panier est vide.</p>
      <RouterLink to="/products">← Continuer les achats</RouterLink>
    </div>

    <!-- Confirmation commande -->
    <div v-if="ordered" class="order-confirm">
      <h2>✅ Commande confirmée</h2>
      <p>Merci pour ton achat !</p>
      <RouterLink to="/products">← Retour aux produits</RouterLink>
    </div>

    <!-- Panier rempli -->
    <div v-else-if="cartStore.cartItems.length > 0">
      <!-- Items -->
      <CartItem
        v-for="item in cartStore.cartItems"
        :key="item.id"
        :item="item"
        @decrease="cartStore.decreaseFromCart(item.id)"
        @increase="cartStore.addToCart(item)"
        @remove="cartStore.removeFromCart(item.id)"
      />

        <CartSummary
          :count="cartStore.cartCount"
          :total="cartStore.cartTotal"
          @checkout="handleCheckout"
          @clear="cartStore.clearCart()"
        />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import CartItem from '../components/Cartletem.vue'
import CartSummary from '../components/CartSummary.vue'

const cartStore = useCartStore()
const ordered = ref(false)

function handleCheckout() {
  cartStore.clearCart()
  ordered.value = true
}
</script>
