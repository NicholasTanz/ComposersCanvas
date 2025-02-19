<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuthStatus();
});
</script>

<template>
  <div>
    <h1>View Compositions</h1>
    
    <p v-if="authStore.isAuthenticated">
      You are logged in! Here you will see your saved compositions.
      <button @click="authStore.logout">Logout</button>
    </p>
    
    <p v-else>
      Please log in to view your saved compositions.
    </p>
  </div>
</template>

<style scoped>
/* Add styles here if needed */
</style>
