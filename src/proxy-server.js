const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy OpenAI requests
app.use(
  '/api', // Change this to match the API endpoint you're using
  createProxyMiddleware({
    target: 'https://api.openai.com/v1/chat/completions',
    changeOrigin: true,
    // You can add more configuration options here
  })
);

// Serve your frontend or static files
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
