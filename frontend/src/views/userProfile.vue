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
      You are logged in!
      <button @click="authStore.logout">Logout</button>
    </p>
    
    <p v-else>
      Please log in to view account details.
    </p>
    
    <!-- testing save endpoint -->
    <section v-if="authStore.isAuthenticated">
      <h2>Test API Endpoint</h2>
      <input v-model="inputText" type="text" placeholder="Enter some text"/>
      <button @click="sendTextToBackend">
        Send to Backend
      </button>
      
      <div v-if="apiResponse">
        <strong>Response:</strong> {{ apiResponse }}
      </div>
      
      <div v-if="errorMessage">
        <strong>Error:</strong> {{ errorMessage }}
      </div>
    </section>
    
    <!-- testing fetch endpoint -->
    <section v-if="authStore.isAuthenticated">
      <h2>Your Saved Compositions</h2>
      <button @click="fetchSavedCompositions">
        View Saved Compositions
      </button>
      
      <ul v-if="savedCompositions.length">
        <li v-for="(composition, index) in savedCompositions" :key="index">
          {{ composition }}
        </li>
      </ul>
      
      <p v-else>No saved compositions found.</p>
    </section>
  </div>
</template>

<style scoped>
/* add css styles here */

</style>