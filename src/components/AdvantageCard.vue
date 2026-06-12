<template>
  <div class="advantage-card">
    <div class="advantage-icon">{{ icon }}</div>
    <h3 class="advantage-title">{{ title }}</h3>
    <p class="advantage-desc">{{ description }}</p>
  </div>
</template>
 
<script setup>
defineProps({
  icon: String,
  title: String,
  description: String
})
</script>
 
<style scoped>
.advantage-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
}
.advantage-card:hover {
  border-color: #2563eb;
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(37,99,235,0.1);
}
.advantage-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}
.advantage-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
}
.advantage-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}
</style>
 