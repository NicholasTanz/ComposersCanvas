<template>
  <nav class="navbar">
    <div class="nav-links">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/createAccount" class="nav-link">Create an Account</RouterLink>
      <RouterLink to="/login" class="nav-link">Login</RouterLink>
      <a class="nav-link" href="/CanvasView.html">Create Composition</a>
      <RouterLink to="/profile" class="nav-link">User Profile</RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background:linear-gradient(to bottom right, #d9e9f4,rgb(195, 225, 241)); /* Light blue gradient */
  padding: 15px 30px;
  border-bottom: 2px solidrgba(29, 79, 216, 0.36); /* Black border */
  z-index: 100;
  box-shadow: 0 4px 10px rgba(29, 79, 216, 0.27);
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.nav-links {
  display: flex;
  justify-content: space-evenly; /* Even spacing across the navbar */
  width: 100%;
}

.nav-link {
  color: rgb(0, 0, 0); /* Black text */
  font-size: 18px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 10px 15px;
  border-radius: 8px;
  background: transparent; /* Invisible by default */
}

.nav-link:hover {
  color: #ffffff;
  background: #1d4ed8; /* Blue on hover */
  transform: scale(1.05);
}
</style>
