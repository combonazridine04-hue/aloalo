<template>
  <div class="contact-form-wrap">
    <div v-if="submitted" class="success-msg">
      <span class="success-icon">✅</span>
      <h3>Message envoyé !</h3>
      <p>Nous vous répondrons dans les 24h.</p>
      <button @click="reset" class="btn-reset">Envoyer un autre message</button>
    </div>
 
    <form v-else @submit.prevent="handleSubmit" novalidate>
      <div class="form-group">
        <label>Nom complet *</label>
        <input
          v-model="form.name"
          type="text"
          :class="['form-input', { error: errors.name }]"
          placeholder="Jean Dupont"
        />
        <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
      </div>
 
      <div class="form-group">
        <label>Email *</label>
        <input
          v-model="form.email"
          type="email"
          :class="['form-input', { error: errors.email }]"
          placeholder="jean@exemple.fr"
        />
        <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
      </div>
 
      <div class="form-group">
        <label>Sujet *</label>
        <select v-model="form.subject" :class="['form-input', { error: errors.subject }]">
          <option value="">-- Choisir un sujet --</option>
          <option value="commande">Ma commande</option>
          <option value="retour">Retour / Remboursement</option>
          <option value="produit">Question produit</option>
          <option value="autre">Autre</option>
        </select>
        <span v-if="errors.subject" class="error-msg">{{ errors.subject }}</span>
      </div>
 
      <div class="form-group">
        <label>Message *</label>
        <textarea
          v-model="form.message"
          :class="['form-input', { error: errors.message }]"
          rows="5"
          placeholder="Votre message..."
        ></textarea>
        <span v-if="errors.message" class="error-msg">{{ errors.message }}</span>
        <span class="char-count">{{ form.message.length }}/500</span>
      </div>
 
      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="loading">Envoi en cours...</span>
        <span v-else>Envoyer le message →</span>
      </button>
    </form>
  </div>
</template>
 
<script setup>
import { ref, reactive } from 'vue'
 
const submitted = ref(false)
const loading = ref(false)
 
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})
 
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})
 
const validate = () => {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''
 
  if (!form.name.trim() || form.name.length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères.'
    valid = false
  }
  if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Adresse email invalide.'
    valid = false
  }
  if (!form.subject) {
    errors.subject = 'Veuillez choisir un sujet.'
    valid = false
  }
  if (!form.message.trim() || form.message.length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères.'
    valid = false
  }
  if (form.message.length > 500) {
    errors.message = 'Le message ne peut pas dépasser 500 caractères.'
    valid = false
  }
  return valid
}
 
const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true
  await new Promise(r => setTimeout(r, 1000))
  loading.value = false
  submitted.value = true
}
 
const reset = () => {
  submitted.value = false
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>
 

 