<template>
  <section class="hero">
    <div class="container">
      <div class="row align-items-center min-vh-80">
        <div class="col-lg-6">
          <div class="hero-badge">✨ Nouveautés chaque semaine</div>
          <h1 class="hero-title">
            Le shopping<br>
            <span class="gradient-text">simplifié</span>
          </h1>
          <p class="hero-subtitle">
            Des milliers de produits au meilleur prix. Livraison rapide, retours faciles, satisfaction garantie.
          </p>
          <div class="hero-actions">
            <RouterLink to="/products" class="btn-primary-hero">Voir les produits →</RouterLink>
            <RouterLink to="/contact" class="btn-ghost-hero">Nous contacter</RouterLink>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-num">500+</span>
              <span class="stat-label">Produits</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">4.8★</span>
              <span class="stat-label">Note moyenne</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">24h</span>
              <span class="stat-label">Livraison</span>
            </div>
          </div>
        </div>
        <!-- Côté droit vide = laisse voir le globe -->
        <div class="col-lg-6"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

