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
.container {
  min-height: 100vh;
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
  color:rgb(38, 39, 41);
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

/* Button */
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
</style>
