<template>
  <section class="footer-section">
    <div class="container text-center py-5">
      <h2 class="cta-title">Prêt à faire vos achats ?</h2>
      <p class="cta-sub">Des milliers de produits vous attendent.</p>
      <RouterLink to="/products" class="cta-shop-btn">Découvrir les produits →</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

