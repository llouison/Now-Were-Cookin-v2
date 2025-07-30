import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: './client',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', //api (localhost:3000) is a proxy path pre-fix
    },
  },
});
