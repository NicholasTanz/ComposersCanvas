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
    username.value = "";
    password.value = "";
    email.value = "";
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
      <h2>Login to Account</h2>
      <form @submit="handleSubmit">

        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required class="input-field" />
        </div>

        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required class="input-field" />
        </div>

        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required class="input-field" />
        </div>

        <button type="submit" class="btn-primary">Submit</button>
      </form>
      <div v-if="submitted" class="status-container">
      <h3>Login Status:</h3>
      <p :class="{'text-green-500': loginStatus === 'Login successful!', 'text-red-500': loginStatus.includes('failed')}" class="status-message">
        {{ loginStatus }}
      </p>
    </div>
    </div>
</template>

<style scoped>
/* General Styles */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Input Fields */
.input-field {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 18px;
  border-radius: 8px;
  background: #f9f9f9;
}

/* Submit Button */
.btn-primary {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
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
