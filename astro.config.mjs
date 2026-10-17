import { defineConfig } from 'astro/config';

// Ganti 'site' dan 'base' sesuai username dan nama repository GitHub Anda jika bukan root domain
export default defineConfig({
  site: 'https://anisahraisy.github.io',
  base: '/my.portofolio',
  output: 'static',
  build: {
    assets: '_astro'
  }
});
