import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Плагін Tailwind додається поруч із плагіном React
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
