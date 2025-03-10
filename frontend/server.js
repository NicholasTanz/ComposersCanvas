import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 8080;

// Convert import meta URL to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve CanvasView.html directly from the dist folder (static HTML page)
app.get('/CanvasView.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'CanvasView.html'));
});

// Catch all route to serve index.html for all other Vue Router-based routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
