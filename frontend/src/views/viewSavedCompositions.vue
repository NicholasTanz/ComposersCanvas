<script setup>
import Navbar from '@/components/Navbar.vue'; // Import the Navbar component

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
  <Navbar />
    <h1>View Compositions</h1>
    
    <p v-if="authStore.isAuthenticated">
      You are logged in! Here you will see your saved compositions.
      <button @click="authStore.logout">Logout</button>
    </p>
    
    <p v-else>
      Please log in to view your saved compositions.
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
/* Page Layout */
div {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #d9e9f4, #98c8e0);
  padding: 5vw 3vw;
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: #333;
}

/* Headings */
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color:rgb(45, 47, 55);
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.75rem;
  color:rgb(56, 59, 67);
  margin-top: 2rem;
  text-align: center;
}

/* Paragraph */
p {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

/* Input field */
input[type="text"] {
  width: 70%;
  max-width: 400px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  transition: all 0.3s ease-in-out;
  font-size: 1rem;
}

input[type="text"]:focus {
  outline: none;
  border-color: #3b82f6;
  background: #eef6ff;
}

/* Button base style */
button {
  margin-top: 1rem;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

/* Specific button colors */
button.bg-blue-500 {
  background-color: #1d4ed8;
  color: white;
}

button.bg-blue-500:hover {
  background-color: #2563eb;
}

button.bg-green-500 {
  background-color: #10b981;
  color: white;
}

button.bg-green-500:hover {
  background-color: #059669;
}

/* Response & Error boxes */
.api-test div,
.saved-compositions div {
  max-width: 600px;
  margin: 0 auto;
}

.bg-green-100 {
  background-color: #d1fae5;
  color: #065f46;
}

.bg-red-100 {
  background-color: #fee2e2;
  color: #991b1b;
}

.border {
  border: 1px solid #ccc;
}

.rounded {
  border-radius: 8px;
}

/* Saved composition list */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: white;
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

li:hover {
  transform: scale(1.02);
}
</style>
