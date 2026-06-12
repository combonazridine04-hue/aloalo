import { createApp } from 'vue'
import { createPinia } from 'pinia'
 
import App from './App.vue'
import router from './router'
import './assets/css/App.css'
import './assets/css/cart.css'
import './assets/css/Cartletem.css'
import './assets/css/CartSummary.css'
import './assets/css/contact.css'
import './assets/css/contactForm.css'
import './assets/css/ContactView.css'
import './assets/css/Footer.css'
import './assets/css/footersection.css'
import './assets/css/Hero.css'
import './assets/css/Home.css'
import './assets/css/Navbar.css'
import './assets/css/productCard.css'
import './assets/css/productDetail.css'
import './assets/css/products.css'
import './assets/css/Globebackground.css'




 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
 
const app = createApp(App)
 
app.use(createPinia())
app.use(router)
 
app.mount('#app')