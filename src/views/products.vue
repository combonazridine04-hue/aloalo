<template>
  <div class="products-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Nos Produits</h1>
        <p class="page-sub">{{ total }} articles disponibles</p>
      </div>
    </div>

    <div class="container py-5">
      <!-- Filtres -->
      <div class="filters-bar">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input
            v-model="search"
            type="text"
            placeholder="Rechercher un produit..."
            class="search-input"
          />
        </div>
        <div class="category-filters">
          <button
            v-for="cat in categories"
            :key="cat"
            :class="['cat-btn', { active: selectedCategory === cat }]"
            @click="selectCategory(cat)"
          >
            {{ cat === 'all' ? 'Tous' : cat }}
          </button>
        </div>
        <select v-model="sortBy" class="sort-select">
          <option value="default">Trier par</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating">Mieux notés</option>
        </select>
      </div>

      <!-- Grid -->
      <div v-if="loading" class="row g-4">
        <div class="col-md-6 col-lg-3" v-for="n in 12" :key="n">
          <div class="skeleton-card"></div>
        </div>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <span class="empty-icon">🔍</span>
        <h3>Aucun résultat</h3>
        <p>Essayez d'autres termes de recherche.</p>
      </div>

      <div v-else class="row g-4">
        <div class="col-md-6 col-lg-3" v-for="product in filteredProducts" :key="product.id">
          <ProductCard :product="product" @added="onAdded" />
        </div>
      </div>
    </div>

    <Transition name="toast">
      <div v-if="toastVisible" class="toast-notif">✅ Ajouté au panier !</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/productCard.vue'

const products = ref([])
const loading = ref(true)
const search = ref('')
const selectedCategory = ref('all')
const sortBy = ref('default')
const toastVisible = ref(false)

const total = computed(() => products.value.length)

const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category))]
  return ['all', ...cats]
})

const filteredProducts = computed(() => {
  let list = [...products.value]
  if (selectedCategory.value !== 'all') {
    list = list.filter(p => p.category === selectedCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  if (sortBy.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'rating') list.sort((a, b) => b.rating - a.rating)
  return list
})

const selectCategory = (cat) => { selectedCategory.value = cat }

const loadProducts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=194&skip=0')
    const data = await res.json()
    products.value = Array.isArray(data.products) ? data.products : []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)

const onAdded = () => {
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}
</script>

