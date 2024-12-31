import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Change this to '0.0.0.0' to ensure the server is available on the entire network.
    port: 5174,
    strictPort: true, // Prevent using a different port
    cors: true,
  },
});



