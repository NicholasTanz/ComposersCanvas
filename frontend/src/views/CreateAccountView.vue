<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleSubmit = () => {
    console.log('Username:', username.value);
    console.log('Password:', password.value);

    return { username, password, handleSubmit };
};

</script>

<template>
  <div class="container">
    <h2>Create Account</h2>
    <form @submit="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
