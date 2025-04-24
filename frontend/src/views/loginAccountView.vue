<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

import { useAuthStore } from '@/stores/auth'; // Import the Pinia store
const authStore = useAuthStore(); // Initialize store
const username = ref('');
const password = ref('');
const response = ref(null);
const submitted = ref(false);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const handleSubmit = async (event) => {
  event.preventDefault();
  submitted.value = true;
  try {
    const res = await axios.post(backendUrl+"/login", {
      username: username.value,
      password: password.value,
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
    response.value = res.data.message;
    window.location.href = `profile`;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    response.value = "Error: " + (error.response?.data?.message || error.message);
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

        <button type="submit" class="btn-primary">Submit</button>
      </form>
      <div 
        v-if="response" 
        :class="['alert', response.startsWith('Error:') ? 'alert-danger' : 'alert-success']"
      >
        {{ response }}
      </div>
</div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, #d9e9f4, #98c8e0);
  color: #333;
  padding: 5vw 3vw;
  font-family: "Comic Sans MS", cursive, sans-serif;
  box-sizing: border-box;
  width: 100%;
}

h2 {
  font-size: 2rem;
  color:rgb(56, 56, 57);
  margin-bottom: 1rem;
  text-align: center;
}

/* Form Styling */
form {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Input Fields */
.input-field {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  margin-top: 6px;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  background: #eef6ff;
}

/* Submit Button */
.btn-primary {
  display: inline-block;
  background: #1d4ed8;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  transition: background 0.3s, transform 0.3s;
  font-size: 1rem;
  width: 100%;
}

.btn-primary:hover {
  background: #2563eb;
  transform: scale(1.05);
}

.alert {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
}

.alert-danger {
  background-color: #f8d7da;
  color: #842029;
  border: 1px solid #f5c2c7;
}

.alert-success {
  background-color: #d1e7dd;
  color: #0f5132;
  border: 1px solid #badbcc;
}
</style>
