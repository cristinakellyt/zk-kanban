import { defineStore } from 'pinia'

const STORAGE_KEY = 'designColorTheme'

export const useDesignSettingsStore = defineStore({
  id: 'DesignSettingsStore',
  state: () => {
    return {
      theme: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"color": "light"}') as {
        color: string
      }
    }
  },
  getters: {
    getThemeColor(): string {
      return this.theme.color
    }
  },
  actions: {
    setThemeColor(theme: string) {
      this.theme.color = theme
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.theme))
    }
  }
})
