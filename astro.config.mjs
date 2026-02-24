// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://finnjs.com', // update with actual domain
  vite: {
    plugins: [tailwindcss()],
  },
});