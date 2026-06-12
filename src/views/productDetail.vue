<template>
  <div class="detail-page">
    <div class="container py-5">
      <!-- Breadcrumb -->
      <nav class="breadcrumb-nav mb-4">
        <RouterLink to="/">Accueil</RouterLink>
        <span>›</span>
        <RouterLink to="/products">Produits</RouterLink>
        <span>›</span>
        <span class="current">{{ product?.title }}</span>
      </nav>

      <div v-if="loading" class="loading-detail">
        <div class="skeleton-img"></div>
        <div class="skeleton-info">
          <div class="skeleton-line long"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line medium"></div>
        </div>
      </div>

      <div v-else-if="product" class="row g-5">
        <!-- Images -->
        <div class="col-lg-5">
          <div class="img-main">
            <img :src="activeImg" :alt="product.title" class="main-img" />
            <span v-if="product.discountPercentage > 10" class="detail-discount">
              -{{ Math.round(product.discountPercentage) }}%
            </span>
          </div>
          <div class="img-thumbs" v-if="product.images?.length > 1">
            <img
              v-for="(img, i) in product.images"
              :key="i"
              :src="img"
              :class="['thumb', { active: activeImg === img }]"
              @click="activeImg = img"
              :alt="`${product.title} ${i+1}`"
            />
          </div>
        </div>

        <!-- Infos -->
        <div class="col-lg-7">
          <span class="detail-category">{{ product.category }}</span>
          <h1 class="detail-title">{{ product.title }}</h1>
          <div class="detail-rating">
            <span class="stars">{{ starRating }}</span>
            <span class="rating-num">{{ product.rating }} / 5</span>
            <span class="stock-badge" :class="product.stock > 0 ? 'in-stock' : 'out-stock'">
              {{ product.stock > 0 ? `${product.stock} en stock` : 'Rupture' }}
            </span>
          </div>

          <div class="detail-price">
            <span class="price-main">{{ product.price.toFixed(2) }}€</span>
            <span v-if="product.discountPercentage > 5" class="price-original">
              {{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}€
            </span>
          </div>

          <p class="detail-desc">{{ product.description }}</p>

          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">Marque</span>
              <span class="meta-val">{{ product.brand || '—' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Garantie</span>
              <span class="meta-val">{{ product.warrantyInformation || '1 an' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Livraison</span>
              <span class="meta-val">{{ product.shippingInformation || '2-5 jours' }}</span>
            </div>
          </div>

          <div class="detail-actions">
            <button
              class="add-to-cart-btn"
              @click="addToCart"
              :disabled="product.stock === 0"
            >
              🛒 Ajouter au panier
            </button>
            <RouterLink to="/cart" class="go-cart-btn">Voir le panier</RouterLink>
          </div>

          <div v-if="added" class="added-confirm">✅ Produit ajouté au panier !</div>
        </div>
      </div>

      <div v-else class="not-found">
        <span>😕</span>
        <h2>Produit introuvable</h2>
        <RouterLink to="/products" class="back-link">← Retour aux produits</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const activeImg = ref('')
const added = ref(false)

const starRating = computed(() => {
  if (!product.value) return ''
  const filled = Math.round(product.value.rating)
  return '★'.repeat(filled) + '☆'.repeat(5 - filled)
})

onMounted(async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    const data = await res.json()
    product.value = data
    activeImg.value = data.thumbnail
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const addToCart = () => {
  cartStore.addToCart(product.value)
  added.value = true
}
</script>
