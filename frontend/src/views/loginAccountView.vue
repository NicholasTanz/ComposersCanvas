<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

import { useAuthStore } from '@/stores/auth'; // Import the Pinia store
const authStore = useAuthStore(); // Initialize store

const username = ref('');
const password = ref('');
const email = ref('');
const response = ref(null);
const loginStatus = ref('');
const submitted = ref(false);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const handleSubmit = async (event) => {
  event.preventDefault();
  submitted.value = true;
  try {
    const res = await axios.post(backendUrl+"/login", {
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
    loginStatus.value = "Login Successful!";
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    response.value = "Error: " + (error.response?.data?.error || error.message);
    loginStatus.value = "Login Failed!";
  }
};
</script>

<template>
    <div class="container">
      <Navbar />
      <h2 class="text-3xl font-bold text-yellow-300">Login to Account</h2>
      <form @submit="handleSubmit" class="space-y-6 mt-6">
        <div>
          <label for="username" class="text-lg text-gray-700 dark:text-gray-300">Username:</label>
          <input type="text" id="username" v-model="username" required class="input-field" />
        </div>
        <div>
          <label for="password" class="text-lg text-gray-700 dark:text-gray-300">Password:</label>
          <input type="password" id="password" v-model="password" required class="input-field" />
        </div>
        <div>
          <label for="email" class="text-lg text-gray-700 dark:text-gray-300">Email:</label>
          <input type="email" id="email" v-model="email" required class="input-field" />
        </div>
        <button type="submit" class="btn-primary">Submit</button>
      </form>
      <div v-if="submitted" class="status-container">
      <h3 class="status-title">Login Status:</h3>
      <p :class="{'text-green-500': loginStatus === 'Login successful!', 'text-red-500': loginStatus.includes('failed')}" class="status-message">
        {{ loginStatus }}
      </p>
    </div>
    </div>
</template>

<style scoped>
/* General Styles */
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #00ffccd5, #0342e0);
  color: #333;
  padding: 20px;
  position: relative;
  transition: background 0.5s ease, color 0.5s ease;
}

h2 {
  font-size: 2rem;
  color: #ffcc00;
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
  transition: all 0.3s ease-in-out;
}

.input-field:focus {
  outline: none;
  border-color: #ffcc00;
  background: #fffbe6; /* Light yellow focus background */
}

/* Submit Button */
.btn-primary {
  width: 100%;
  padding: 14px;
  background-color: #ffcc00;
  color: black;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s ease;
}

.btn-primary:hover {
  background-color: #ffdb4d;
  transform: scale(1.05);
}

.status-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffcc00;
}

.status-message {
  font-size: 1.2rem;
  font-weight: bold;
}

.text-green-500 {
  color: #28a745;
}

.text-red-500 {
  color: #dc3545;
}

</style>
