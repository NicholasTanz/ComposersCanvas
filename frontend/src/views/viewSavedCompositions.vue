<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const inputText = ref(""); // Stores user input
const apiResponse = ref(null); // Stores API response
const errorMessage = ref(null); // Stores error messages

onMounted(() => {
  authStore.checkAuthStatus();
});

async function sendTextToBackend() {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/store_composition`, 
      { composition: inputText.value },
      { withCredentials: true } // Ensures cookies are sent with the request
    );
    apiResponse.value = response.data;
    errorMessage.value = null;
  } catch (error) {
    console.error("Error sending data:", error);
    apiResponse.value = null;
    errorMessage.value = "Failed to send data to the API. Please try again.";
  }
}
</script>

<template>
  <div>
    <h1>View Compositions</h1>
    
    <p v-if="authStore.isAuthenticated">
      You are logged in! Here you will see your saved compositions.
      <button @click="authStore.logout">Logout</button>

    <!-- API Test Section -->
    <section v-if="authStore.isAuthenticated" class="api-test text-center mt-12">
      <h2 class="text-2xl font-bold">Test API Endpoint</h2>
      <input v-model="inputText" type="text" placeholder="Enter some text" class="mt-4 p-2 border rounded" />
      <button @click="sendTextToBackend" class="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
        Send to API
      </button>
      
      <div v-if="apiResponse" class="mt-4 p-2 border rounded bg-green-100 text-green-700">
        <strong>Response:</strong> {{ apiResponse }}
      </div>
      
      <div v-if="errorMessage" class="mt-4 p-2 border rounded bg-red-100 text-red-700">
        <strong>Error:</strong> {{ errorMessage }}
      </div>
    </section>

    </p>
    
    <p v-else>
      Please log in to view your saved compositions.
    </p>
  </div>
</template>

<style scoped>
/* Add styles here if needed */
</style>
