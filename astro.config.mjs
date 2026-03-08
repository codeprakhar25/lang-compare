// @ts-check
import { defineConfig } from 'astro/config';
import sst from 'astro-sst';
import tailwindcss from '@tailwindcss/vite';
import { envField } from 'astro/config';
import { loadEnv } from 'vite';

// https://astro.build/config
const env = loadEnv(process.cwd(), '');
const baseUrl = env.BASE_URL || 'http://localhost:4321';

export default defineConfig({
  adapter: sst(),
  site: baseUrl,
  env: {
    schema: {
      BASE_URL: envField.string({
        context: 'client',
        access: 'public',
        url: true,
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
