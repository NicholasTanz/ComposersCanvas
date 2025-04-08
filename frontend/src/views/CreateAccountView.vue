<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const username = ref('');
const password = ref('');
const email = ref('');
const response = ref(null);
import { useAuthStore } from '@/stores/auth'; // Import the Pinia store
const authStore = useAuthStore(); // Initialize store

const handleSubmit = async (event) => {
  try {
    const res = await axios.post(backendUrl+"/register", {
      username: username.value,
      password: password.value,
      email: email.value
    }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
  });

    const login_res = await axios.post(backendUrl+"/login", {
      username: username.value,
      password: password.value,
      email: email.value
    }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      withCredentials: true,
    });

    await authStore.checkAuthStatus(); // Check if user is authenticated
    response.value = res.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    response.value = "Error: " + (error.response?.data?.error || error.message);
  }
};
</script>

<template>
    <div class="container">
      <Navbar />
      <h2>Create Account</h2>
      <form @submit="handleSubmit">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required class="input-field"/>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required class="input-field"/>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required class="input-field"/>
        </div>
        <button type="submit" class="btn-primary">Submit</button>
      </form>
    </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Input Fields */
.input-field {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 18px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #f9f9f9;
}

/* Submit Button */
.btn-primary {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
}
</style>
