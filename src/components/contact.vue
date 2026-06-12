<template>
  <div class="contact-info">
    <div class="info-item" v-for="item in infos" :key="item.label">
      <span class="info-icon">{{ item.icon }}</span>
      <div>
        <h4 class="info-label">{{ item.label }}</h4>
        <p class="info-value">{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>
 
<script setup>
const infos = [
  { icon: '📧', label: 'Email', value: 'contact@shopeasy.fr' },
  { icon: '📞', label: 'Téléphone', value: '01 23 45 67 89' },
  { icon: '📍', label: 'Adresse', value: '12 rue du Commerce, Paris 75001' },
  { icon: '🕐', label: 'Horaires', value: 'Lun–Ven 9h–18h' },
]
</script>
 
