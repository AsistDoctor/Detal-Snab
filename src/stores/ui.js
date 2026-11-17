import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({ toast: '' }),
  actions: {
    notify(message) {
      this.toast = message
      clearTimeout(this._timer)
      this._timer = setTimeout(() => { this.toast = '' }, 2600)
    },
  },
})
