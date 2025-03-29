<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const inputText = ref(""); // Stores user input
const apiResponse = ref(null); // Stores API response
const errorMessage = ref(null); // Stores error messages
const savedCompositions = ref([]); // Stores fetched compositions

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

async function fetchSavedCompositions() {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendUrl}/get_compositions`, { withCredentials: true });
    savedCompositions.value = response.data;
  } catch (error) {
    console.error("Error fetching compositions:", error);
    errorMessage.value = "Failed to fetch saved compositions.";
  }
}
</script>

<template>
  <div>
    <h1>User Profile</h1>
    
    <p v-if="authStore.isAuthenticated">
      You are logged in! Here you will see your saved compositions.
      <button @click="authStore.logout">Logout</button>
    </p>
    
    <p v-else>
      Please log in to view account details.
    </p>
    
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
    
    <!-- Saved Compositions Section -->
    <section v-if="authStore.isAuthenticated" class="saved-compositions mt-8">
      <h2 class="text-2xl font-bold">Your Saved Compositions</h2>
      <button @click="fetchSavedCompositions" class="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
        View Saved Compositions
      </button>
      
      <ul v-if="savedCompositions.length" class="mt-4">
        <li v-for="(composition, index) in savedCompositions" :key="index" class="p-2 border rounded mt-2">
          {{ composition }}
        </li>
      </ul>
      
      <p v-else class="mt-4">No saved compositions found.</p>
    </section>
  </div>
</template>

<style scoped>
/* Add styles here if needed */
</style>