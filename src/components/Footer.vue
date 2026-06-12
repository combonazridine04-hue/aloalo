<template>
  <footer class="footer">
    <div class="container">
      <div class="row py-5">
        <div class="col-lg-4 mb-4">
          <div class="footer-brand">🛍️ ShopEasy</div>
          <p class="footer-desc">La boutique en ligne simple et rapide pour tous vos achats du quotidien.</p>
        </div>
        <div class="col-lg-2 col-6 mb-4">
          <h6 class="footer-title">Navigation</h6>
          <ul class="footer-links">
            <li><RouterLink to="/">Accueil</RouterLink></li>
            <li><RouterLink to="/products">Produits</RouterLink></li>
            <li><RouterLink to="/cart">Panier</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>
        <div class="col-lg-3 col-6 mb-4">
          <h6 class="footer-title">Infos</h6>
          <ul class="footer-links">
            <li><a href="#">Livraison gratuite</a></li>
            <li><a href="#">Retours faciles</a></li>
            <li><a href="#">Paiement sécurisé</a></li>
          </ul>
        </div>
        <div class="col-lg-3 mb-4">
          <h6 class="footer-title">Contact</h6>
          <p class="footer-contact">📧 contact@shopeasy.fr</p>
          <p class="footer-contact">📞 01 23 45 67 89</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} ShopEasy — Tous droits réservés</p>
      </div>
    </div>
  </footer>
</template>
 
<script setup>
import { RouterLink } from 'vue-router'
</script>
 
