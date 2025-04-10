<template>
  <!-- html logic -->
    <div class="container">
      <Navbar />
      
      <div class="hero">
        <div class="hero-text">
          <h1>Compose Your Music</h1>
          <p>A web-based tool that allows you to create, edit, and save musical compositions on a virtual canvas using VexFlow.</p>
          <a href="/CanvasView.html" class="btn-primary">Start Composing</a>
        </div>
      </div>

      <!-- Footer -->
      <footer class="footer">
        <h2>Created by:</h2>
        <p>Anjali V., Peter K., Nicholas T.</p>
      </footer>
    </div>
</template>

<script>
// JS logic. 
import Navbar from '../components/Navbar.vue';
export default {
  name: "HomePage",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
/* CSS logic. */
.container {
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  transition: background 0.5s ease, color 0.5s ease;
}

/* Hero Section */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 80px;
}

.btn-primary {
  display: inline-block;
  background: #f3f2ed;
  color: black;
  padding: 12px 20px;
  border-radius: 8px;
}

.footer {
  text-align: center;
}

.footer h2 {
  font-size: 18px;
}

</style>
