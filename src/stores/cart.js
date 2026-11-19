import { defineStore } from 'pinia'

const readCart = () => {
  try { return JSON.parse(localStorage.getItem('ds-cart') || '[]') } catch { return [] }
}

export const useCartStore = defineStore('cart', {
  state: () => ({ items: readCart() }),
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    total: (state) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  },
  actions: {
    persist() { localStorage.setItem('ds-cart', JSON.stringify(this.items)) },
    add(product) {
      const current = this.items.find((item) => item.id === product.id)
      if (current) current.qty += 1
      else this.items.push({
        id: product.id, name: product.name, article: product.article, price: product.price, image: product.image, qty: 1,
        brand: product.brand || product.manufacturer || '—', term: product.term || '1–2 дн.', supplier: product.supplier || 'AES', weight: product.weight || '—',
      })
      this.persist()
    },
    setQty(id, qty) {
      const item = this.items.find((entry) => entry.id === id)
      if (!item) return
      item.qty = Math.max(1, Math.min(99, Number(qty) || 1))
      this.persist()
    },
    remove(id) { this.items = this.items.filter((item) => item.id !== id); this.persist() },
    clear() { this.items = []; this.persist() },
  },
})
