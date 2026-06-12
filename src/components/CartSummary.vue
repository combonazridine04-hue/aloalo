
<template>
  <div class="cart-summary">
    <h3 class="summary-title">Récapitulatif</h3>
    <div class="summary-line">
      <span>Articles ({{ count }})</span>
      <span>{{ total.toFixed(2) }}€</span>
    </div>
    <div class="summary-line">
      <span>Livraison</span>
      <span class="free-ship">Gratuite 🎉</span>
    </div>
    <div class="summary-divider"></div>
    <div class="summary-total">
      <span>Total</span>
      <span>{{ total.toFixed(2) }}€</span>
    </div>
    <button class="checkout-btn" @click="checkout">
      Commander maintenant
    </button>
    <button class="clear-btn" @click="emit('clear')">
      Vider le panier
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  count: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
})
const emit = defineEmits(['clear', 'checkout'])

const checkout = () => {
  alert('🎉 Commande passée avec succès ! Merci pour votre achat.')
  emit('checkout')
}
</script>

