import { defineStore } from 'pinia'

const CART_STORAGE_KEY = 'aloalo-cart'

function loadCartItems() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Impossible de charger le panier', error)
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: loadCartItems()
  }),
  getters: {
    cartCount: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) => state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  actions: {
    saveCart() {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems))
    },
    addToCart(product) {
      const existing = this.cartItems.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
      this.saveCart()
    },
    decreaseFromCart(id) {
      const item = this.cartItems.find(item => item.id === id)
      if (!item) return

      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.cartItems = this.cartItems.filter(item => item.id !== id)
      }
      this.saveCart()
    },
    removeFromCart(id) {
      this.cartItems = this.cartItems.filter(item => item.id !== id)
      this.saveCart()
    },
    clearCart() {
      this.cartItems = []
      this.saveCart()
    }
  }
})
