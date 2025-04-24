<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const savedCompositions = ref([]);
const deleteTitle = ref(""); 
const deleteUsername = ref(""); 
const deletePassword = ref(""); 

const deletionVisible = ref(false);

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

async function deleteComposition() {
  if (!deleteTitle.value.trim()) {
    alert("Please enter a composition title.");
    return;
  }

  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    await axios.post(`${backendUrl}/delete_composition`, { name: deleteTitle.value }, { withCredentials: true });
    alert("Composition deleted successfully.");
    fetchSavedCompositions(); 
  } catch (error) {
    console.error("Error deleting composition:", error);
    alert("Failed to delete composition. Please try again.");
  }
}

async function deleteUserAccount() {
  const confirmed = confirm("Are you sure you want to permanently delete your account?");
  if (!confirmed) return;

  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    await axios.post(`${backendUrl}/delete_user`, { username: deleteUsername.value, password: deletePassword.value }, { withCredentials: true });
    alert("Your account has been deleted.");
    await authStore.logout();
    window.location.href = "/";
  } catch (error) {
    console.error("Error deleting account:", error);
    alert("Failed to delete account. Please try again.");
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
    <p v-if="authStore.isAuthenticated">
      You are logged in!
      <button class="logout-button" @click="authStore.logout">Logout</button>
      <!-- Saved Compositions Section -->
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

      <!-- Toggle Deletion Button -->
      <section v-if="authStore.isAuthenticated">
        <button @click="deletionVisible = !deletionVisible" class="btn toggle-deletion-btn">
          {{ deletionVisible ? 'Hide Deletion Options' : 'Show Deletion Options' }}
        </button>
      </section>

      <!-- Deletion Sections (Visibility Controlled by deletionVisible) -->
      <section v-if="deletionVisible && authStore.isAuthenticated">
        <h2>Delete a Composition</h2>
        <div class="input-group">
          <input v-model="deleteTitle" type="text" placeholder="Enter composition title to delete" class="input" />
          <button @click="deleteComposition" class="btn delete-btn">Delete Composition</button>
        </div>
      </section>

      <section v-if="deletionVisible && authStore.isAuthenticated">
        <h2>Delete Account</h2>
        <div class="input-group">
          <input v-model="deleteUsername" type="text" placeholder="Re-enter your username" class="input" />
          <input v-model="deletePassword" type="password" placeholder="Enter your password" class="input" />
          <button @click="deleteUserAccount" class="btn delete-btn">Delete Account</button>
        </div>
      </section>
    </p>
    
    <p v-else>
      Please log in to view account details.
    </p>
    
    
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #d9e9f4, #98c8e0);
  padding: 5vw 3vw;
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: #333;
  position: relative;
  min-height: 100vh;
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
  z-index: 10;
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
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.btn:hover {
  background-color: #2563eb;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.toggle-deletion-btn {
  background-color: #f39c12;
}

.toggle-deletion-btn:hover {
  background-color: #e67e22;
}
</style>
