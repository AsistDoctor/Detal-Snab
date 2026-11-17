import { defineStore } from 'pinia'

const readUser = () => {
  try { return JSON.parse(localStorage.getItem('ds-user') || 'null') } catch { return null }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: readUser() }),
  getters: { isLoggedIn: (state) => Boolean(state.user) },
  actions: {
    login({ email, name }) {
      this.user = { email, name: name || email.split('@')[0], company: 'ООО «Демо-компания»' }
      localStorage.setItem('ds-user', JSON.stringify(this.user))
    },
    logout() { this.user = null; localStorage.removeItem('ds-user') },
  },
})
