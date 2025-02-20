<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const username = ref('');
const password = ref('');
const email = ref('');
const response = ref(null);

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
      <h2 class="text-3xl font-bold text-yellow-300">Create Account</h2>
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

</style>
