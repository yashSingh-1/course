import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: [/\.(mdx|md|jsx|tsx|ts|js)$/],
    })
  ],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  assetsInclude: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.gif', '**/*.md'],
});
