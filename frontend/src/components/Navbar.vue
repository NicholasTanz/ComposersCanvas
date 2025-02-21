<template>
    <nav class="navbar">
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/createAccount" class="nav-link">Create an Account</RouterLink>
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
        <a class="nav-link" href="/CanvasView.html">Create Composition</a>
        <RouterLink to="/saved" class="nav-link">View Saved Compositions</RouterLink>
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
    right: 0;
    background: #121212;  /* Darker background */
    padding: 20px;
    border-bottom-left-radius: 15px;
    z-index: 100;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-link {
    color: #fff;
    font-size: 18px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    padding: 10px 15px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.3);
  }
  
  .nav-link:hover {
    color: #ffcc00;
    background: rgba(255, 204, 0, 0.2);
    transform: scale(1.05);
  }
  </style>
  