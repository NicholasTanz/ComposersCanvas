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
const deleteTitle = ref("");
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

async function deleteComposition() {
  if (!deleteTitle.value.trim()) {
    alert("Please enter a title before continuing.");
    return;
  }

  try {
    // validate that the comp exists in the db (backend route)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/delete_composition`,
     { name: deleteTitle.value },
     {withCredentials: true} // Ensures cookies are sent with the request
    );

    alert("Composition deleted successfully.");
  } catch (error) {
    console.error("Error deleting composition:", error);
    alert("Failed to find a composition with that title. The composition may not exist.");
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
  <div class="profile-page">
    <Navbar />

    <div class="container">
      <h1 class="title">User Profile</h1>

      <div class="auth-section">
        <p v-if="authStore.isAuthenticated">
          <button class="btn logout-btn" @click="authStore.logout">Logout</button>
        </p>
        <p v-else class="login-prompt">
          Please login to view your profile.
        </p>
      </div>

      <div v-if="authStore.isAuthenticated" class="profile-content">

        <!-- Compositions -->
        <section class="compositions-section">
          <h2>Your Compositions</h2>
          <button class="btn" @click="fetchSavedCompositions">Fetch Saved Compositions</button>

          <ul v-if="savedCompositions.length" class="composition-list">
            <li v-for="(composition, index) in savedCompositions" :key="index">
              {{ composition }}
            </li>
          </ul>
          <p v-else>No saved compositions found.</p>
        </section>

        <!-- Edit Composition -->
        <section class="edit-section">
          <h2>Edit Composition</h2>
          <div class="input-group">
            <input
              v-model="redirectTitle"
              type="text"
              placeholder="Enter a composition to edit"
              class="input"
            />
            <button class="btn" @click="redirectToTargetPageWithTitle">Edit Composition</button>
          </div>
        </section>

        <!-- Delete a Composition. -->
        <section class="delete-composition-section">
          <h2>Delete a Composition</h2>
          <div class="input-group">
            <input
              v-model="deleteTitle"
              type="text"
              placeholder="Enter a composition to delete"
              class="input"
            />
            <button class="btn" @click="deleteComposition">Delete Composition</button>
          </div>
        </section>

        <!-- Delete Account -->
        <section class="delete-section">
          <h2>Delete Account</h2>
          <div class="input-group">
            <input
              type="text"
              v-model="deleteUsername"
              placeholder="Re-enter your username"
              class="input"
            />
            <input
              type="password"
              v-model="deletePassword"
              placeholder="Enter your password"
              class="input"
            />
            <button class="btn delete-btn" @click="confirmDeleteAccount">Delete Account</button>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  font-family: Arial, sans-serif;
  padding: 2rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  margin: 3rem 0 1rem 0;
  text-align: center;
}


.auth-section {
  margin-bottom: 2rem;
  text-align: center;
}

.profile-content section {
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.btn {
  padding: 0.6rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.logout-btn {
  background-color: #777;
}

.delete-btn {
  background-color: #e74c3c;
}

.composition-list {
  list-style: disc;
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}
</style>
