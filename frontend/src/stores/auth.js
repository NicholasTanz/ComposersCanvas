import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = defineStore('auth', () => {
  // State
  const isAuthenticated = ref(false);

  // Getters
  const getAuthStatus = computed(() => isAuthenticated.value);

  // Actions
  async function logout() {
    try {
      await axios.post(backendUrl+'/logout', {}, { withCredentials: true }); // Backend should clear cookie
      isAuthenticated.value = false;
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  async function checkAuthStatus() {
    try {
      const response = await axios.get(backendUrl+'/check-auth', { withCredentials: true });
      isAuthenticated.value = response.data.authenticated;
    } catch {
      isAuthenticated.value = false;
    }
  }

  return { isAuthenticated, getAuthStatus, logout, checkAuthStatus };
});
