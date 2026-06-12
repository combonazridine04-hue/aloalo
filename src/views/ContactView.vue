<template>
  <div class="contact-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Nous contacter</h1>
        <p class="page-sub">Une question ? Nous répondons sous 24h.</p>
      </div>
    </div>

    <div class="container py-5">
      <div class="row g-5">
        <div class="col-lg-7">
          <div class="form-card">
            <h2 class="form-card-title">Envoyez-nous un message</h2>
            <ContactForm />
          </div>
        </div>
        <div class="col-lg-5">
          <div class="info-card">
            <h3 class="info-card-title">Informations de contact</h3>
            <ContactInfo />
          </div>
          <div class="faq-card mt-4">
            <h3 class="faq-title">Questions fréquentes</h3>
            <div class="faq-item" v-for="faq in faqs" :key="faq.q">
              <button class="faq-q" @click="faq.open = !faq.open">
                <span>{{ faq.q }}</span>
                <span>{{ faq.open ? '▲' : '▼' }}</span>
              </button>
              <div v-if="faq.open" class="faq-a">{{ faq.a }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import ContactForm from '../components/ContactForm.vue'
import ContactInfo from '../components/contact.vue'

const faqs = reactive([
  { q: 'Quels sont les délais de livraison ?', a: 'Livraison sous 24h à 5 jours selon votre adresse.', open: false },
  { q: 'Comment retourner un article ?', a: 'Contactez-nous sous 30 jours avec votre numéro de commande.', open: false },
  { q: 'Le paiement est-il sécurisé ?', a: 'Oui, toutes les transactions sont protégées par SSL.', open: false },
])
</script>

