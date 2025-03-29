<template>
  <!-- html logic -->

    <div class="container">
      <Navbar />
      
      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-text">
          <h1>Compose Your Music</h1>
          <p>A web-based tool that allows you to create, edit, and save musical compositions on a virtual canvas using VexFlow.</p>
          <a href="/CanvasView.html" class="btn-primary">Start Composing</a>
        </div>
      </div>

      <!-- Visualize Section -->
      <section class="visualize text-center mt-12">
        <h2 class="text-3xl font-bold text-yellow-300">Visualize Your Music</h2>
        <p class="text-md max-w-xl mt-2 text-gray-700 dark:text-gray-300 mx-auto">
          Add notes to the canvas, fine-tune compositions, and bring them to life with real-time playback.
        </p>

        <div class="mt-6">
          <button @click="playbackExample" class="bg-yellow-300 text-black font-bold py-3 px-6 rounded-lg shadow hover:bg-yellow-400 transform hover:scale-105 transition">
            Playback Example
          </button>
        </div>
      </section>

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

/* Hero Section */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 80px;
}

.hero-text h1 {
  font-size: 48px;
  font-weight: bold;
  color: #ffcc00;
}

.hero-text p {
  font-size: 18px;
  max-width: 500px;
  margin-top: 10px;
  color: #555;
}

.btn-primary {
  display: inline-block;
  margin-top: 20px;
  background: #ffcc00;
  color: black;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s, transform 0.3s;
}

.btn-primary:hover {
  background: #ffdb4d;
  transform: scale(1.05);
}

/* Hero Image */
.hero-image {
  margin-top: 20px;
}

.hero-image img {
  width: 300px;
  border-radius: 10px;
  transition: transform 0.3s;
}

.hero-image img:hover {
  transform: scale(1.05);
}

/* Visualize Section */
.visualize {
  margin-top: 50px;
  text-align: center;
}

.visualize h2 {
  font-size: 28px;
  color: #ffcc00;
}

.visualize p {
  font-size: 16px;
  margin-top: 10px;
  color: #555;
}

.visualize img {
  margin-top: 15px;
  width: 300px;
  border-radius: 8px;
  transition: transform 0.3s;
}

.visualize img:hover {
  transform: scale(1.05);
}

/* Footer */
.footer {
  margin-top: 50px;
  text-align: center;
  border-top: 1px solid #ffcc00;
  padding-top: 15px;
}

.footer h2 {
  font-size: 18px;
  color: #ffcc00;
}

.footer p {
  font-size: 14px;
  color: #555;
}

</style>
