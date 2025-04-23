<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const savedCompositions = ref([]);

async function goToComposition(name) {
  const encodedName = encodeURIComponent(name);
  window.location.href = `CanvasView.html?from=profile&title=${encodedName}`;
}

async function fetchSavedCompositions() {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendUrl}/get_compositions`, { withCredentials: true });
    savedCompositions.value = response.data;
  } catch (error) {
    console.error("Error fetching compositions:", error);
  }
}

onMounted(async () => {
  await authStore.checkAuthStatus();
  if (authStore.isAuthenticated) {
    await fetchSavedCompositions();
  }
});
</script>

<template>
  <Navbar />
  <div class="profile-container">
    
    <h1>User Profile</h1>
    <button class="logout-button" @click="authStore.logout">Logout</button>
    <p v-if="authStore.isAuthenticated">
      You are logged in!
    </p>
    
    <p v-else>
      Please log in to view account details.
    </p>
    
    <section v-if="authStore.isAuthenticated">
      <h2>Your Saved Compositions</h2>
      <ul v-if="savedCompositions.length">
        <li
          v-for="(composition, index) in savedCompositions"
          :key="index"
          @click="goToComposition(composition.name)"
        >
          {{ composition.name }}
        </li>
      </ul>
      <p v-else>No saved compositions found.</p>
    </section>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #d9e9f4, #98c8e0);
  padding: 5vw 3vw;
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: #333;
  position: relative; /* Needed for absolute positioning of the button */
}

.logout-button {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: #1d4ed8;
  color: white;
}

.logout-button:hover {
  background-color: #2563eb;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: rgb(45, 47, 55);
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.75rem;
  color: rgb(56, 59, 67);
  margin-top: 2rem;
  text-align: center;
}

p {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

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
  cursor: pointer;
  color: #1d4ed8;
  text-decoration: underline;
}

li:hover {
  transform: scale(1.02);
  color: #2563eb;
}
</style>
