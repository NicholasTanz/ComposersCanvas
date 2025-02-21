import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(localStorage.getItem('jwt') || null);

  // Getters
  const getToken = computed(() => token.value);

  // Actions
  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('jwt', newToken); // Persist token
  }

  function clearToken() {
    token.value = null;
    localStorage.removeItem('jwt'); // Remove token from storage
  }

  return { token, getToken, setToken, clearToken };
});
