<template>
  <div id="app-shell">
 
    <!-- 🌍 Globe 3D interactif en background -->
    <GlobeBackground />
 
    <NavBar />
 
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
 
    <FooterComponent />
  </div>
</template>
 
<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
import Footer from './components/Footer.vue';
import AboutView from './views/AboutView.vue';
import Cart from './views/Cart.vue';
import AdvantageCard from './components/AdvantageCard.vue';
import Cartltem from './components/Cartltem.vue';
import Cartletem from './components/Cartletem.vue';
import contact from './components/contact.vue';
import FooterComponent from './components/Footer.vue'
import Globebackground from './views/Globebackground.vue';
</script>
