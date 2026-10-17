import { defineConfig } from 'astro/config';

// Ganti 'site' dan 'base' sesuai username dan nama repository GitHub Anda jika bukan root domain
export default defineConfig({
  output: 'static',
  build: {
    assets: '_astro'
  }
});
