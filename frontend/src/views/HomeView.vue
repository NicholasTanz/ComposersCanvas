<template>
  <div class="container">
    <Navbar />

    <!-- Combined Hero + Visualize Section -->
    <div class="main-section">
      <div class="left-content">
        <h1 class="text-4xl font-bold mb-4">Compose Your Music</h1>
        <p class="text-lg mb-6">
          A web-based tool that allows you to create, edit, and save musical compositions on a virtual canvas using VexFlow.
        </p>
        <a href="#" class="btn-primary mb-10">Start Composing</a>

        <h2 class="text-2xl font-bold text-blue-500 mb-2">Visualize Your Music</h2>
        <p class="text-md text-gray-700">
          Add notes to the canvas, fine-tune compositions, and bring them to life with real-time playback.
        </p>
      </div>

      <div class="right-content">
        <img src="/music-visual.gif" alt="Music Visualization" />
        <button @click="playbackExample" class="playback-button">
          Playback Example
        </button>
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
import Navbar from '../components/Navbar.vue';

export default {
  name: "HomePage",
  components: {
    Navbar,
  },
  methods: {
    playbackExample() {
      console.log("Playback triggered!");
      // Implement your playback logic here
    }
  }
};
</script>

<style scoped>
/* General Styles */
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

/* Combined Section */
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin-top: 5vh;
}

@media (min-width: 768px) {
  .main-section {
    flex-direction: row;
    justify-content: space-between;
  }
}

.left-content {
  flex: 1;
  max-width: 600px;
  width: 100%;
}

.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.right-content img {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Buttons */
.btn-primary,
.playback-button {
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
  max-width: 300px;
}

.btn-primary:hover,
.playback-button:hover {
  background: #2563eb;
  transform: scale(1.05);
}

.playback-button {
  background: #3b82f6;
}

.playback-button:hover {
  background: #60a5fa;
}

/* Footer */
.footer {
  margin-top: auto;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
}

.footer h2 {
  font-size: 1rem;
  color: #000;
}

.footer p {
  font-size: 0.9rem;
  color: #555;
}
</style>
