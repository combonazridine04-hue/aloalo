<template>
  <div>
    <Hero />

    <!-- Avantages -->
    <section class="advantages-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Pourquoi ShopEasy ?</h2>
          <p class="section-sub">Tout ce dont vous avez besoin pour un shopping sans stress.</p>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="advantage in advantages" :key="advantage.title">
            <AdvantageCard
              :icon="advantage.icon"
              :title="advantage.title"
              :description="advantage.description"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Produits populaires -->
    <section class="popular-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Produits populaires</h2>
          <RouterLink to="/products" class="view-all">Voir tout →</RouterLink>
        </div>
        <div v-if="loading" class="loading-grid">
          <div class="skeleton-card" v-for="n in 4" :key="n"></div>
        </div>
        <div v-else class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="product in featuredProducts" :key="product.id">
            <ProductCard :product="product" @added="onAdded" />
          </div>
        </div>
      </div>
    </section>

    <FooterSection />

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="toastVisible" class="toast-notif">
        ✅ Produit ajouté au panier !
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Hero from '../components/Hero.vue'
import AdvantageCard from '../components/AdvantageCard.vue'
import ProductCard from '../components/productCard.vue'
import FooterSection from '../components/FooterSection.vue'

const loading = ref(true)
const featuredProducts = ref([])
const toastVisible = ref(false)

const advantages = [
  { icon: '🚚', title: 'Livraison gratuite', description: 'Dès 30€ d\'achat, livraison offerte partout en France sous 24h.' },
  { icon: '🔒', title: 'Paiement sécurisé', description: 'Transactions 100% sécurisées avec cryptage SSL.' },
  { icon: '↩️', title: 'Retours faciles', description: 'Retournez vos articles sous 30 jours, sans justification.' },
  { icon: '⭐', title: 'Qualité garantie', description: 'Produits sélectionnés et vérifiés par notre équipe.' },
]

onMounted(async () => {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=194&skip=0')
    const data = await res.json()
    featuredProducts.value = Array.isArray(data.products) ? data.products : []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const onAdded = () => {
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}
</script>
