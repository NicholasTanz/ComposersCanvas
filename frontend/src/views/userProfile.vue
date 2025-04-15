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
const deleteUsername = ref('')
const deletePassword = ref('')

const redirectTitle = ref("");
async function redirectToTargetPageWithTitle() {
  if (!redirectTitle.value.trim()) {
    alert("Please enter a title before continuing.");
    return;
  }

  try {
    // validate that the comp exists in the db (backend route)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/get_composition`,
     { name: redirectTitle.value },
     {withCredentials: true} // Ensures cookies are sent with the request
    );

    const encodedTitle = encodeURIComponent(redirectTitle.value);
    window.location.href = `CanvasView.html?from=profile&title=${encodedTitle}`;
  } catch (error) {
    console.error("Error fetching title:", error);
    alert("Failed to find a composition with that name.");
  }
}


onMounted(() => {
  authStore.checkAuthStatus();
});

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

async function confirmDeleteAccount() {
  if (deleteUsername.value.trim() === "" || deletePassword.value.trim() === "") {
    alert("Please fill in both fields.");
    return;
  }

  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/delete_user`, {
      username: deleteUsername.value,
      password: deletePassword.value
    }, { withCredentials: true });

    authStore.logout();
    alert("Account deleted successfully.");
      window.location.href = ""; // Redirect to the home page.
  } catch (error) {
    console.error("Error deleting account:", error);
    alert("Failed to delete account. Please check your credentials.");
  }
}

</script>

<template>
  <Navbar />
  <div>
    <h1>User Profile</h1>
    <p v-if="authStore.isAuthenticated">
      <button @click="authStore.logout">Logout</button>
    </p>
    <p v-else>
      Please login to view your profile.
    </p>
    
    <ul v-if = "authStore.isAuthenticated">
  
      <!-- fetch endpoint -->
      <h2>your compositions: </h2>
        <button @click="fetchSavedCompositions">
          fetch saved compositions
        </button>
      
        <ul v-if="savedCompositions.length">
          <li v-for="(composition, index) in savedCompositions" :key="index">
            {{ composition }}
          </li>
        </ul>
        
        <p v-else>No saved compositions found.</p>

      <!-- Redirect to another page -->
      <h2> Edit Composition </h2>
        <input v-model="redirectTitle" type="text" placeholder="Enter a composition to edit"/>
          <button @click="redirectToTargetPageWithTitle">
            Edit Composition
          </button>

      <!-- Delete Account Section -->
      <h2>Delete Account</h2>
      <input
        type="text"
        v-model="deleteUsername"
        placeholder="Re-enter your username"
      />
      <input
        type="password"
        v-model="deletePassword"
        placeholder="Enter your password"
      />
      <button @click="confirmDeleteAccount">
        Delete Account
      </button>
    </ul>
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
