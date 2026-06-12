<script setup>
import HeroImage from '../assets/img/hero-aloalo-training.png'
</script>

<template>
  <main class="hero-section" id="accueil">
    <img :src="HeroImage" alt="" class="hero-bg">
    <div class="hero-overlay"></div>

    <div class="container hero-content">
      <div class="hero-copy">
        <p class="hero-kicker">Centre de formation a Mayotte</p>
        <h1>ALOALO Mayotte Competences</h1>
        <p class="hero-lead">
          Des formations concretes pour developper vos competences, gagner en
          confiance et construire votre avenir professionnel a Mayotte.
        </p>

        <div class="hero-actions">
          <RouterLink to="/training" class="btn btn-hero-primary">Voir nos formations</RouterLink>
          <RouterLink to="/contact" class="btn btn-hero-secondary">Nous contacter</RouterLink>
        </div>

        <div class="hero-highlights" aria-label="Points forts du centre">
          <span>Formations professionnelles</span>
          <span>Accompagnement personnalise</span>
          <span>Ancrage local</span>
        </div>
      </div>
    </div>
  </main>
</template>
