// @ts-check
import { defineConfig } from 'astro/config';
import sst from 'astro-sst';
import tailwindcss from '@tailwindcss/vite';
import { envField } from 'astro/config';

const baseUrl = process.env.BASE_URL
if (!baseUrl) {
    throw new Error('Missing required environment variable BASE_URL')
}

// https://astro.build/config
export default defineConfig({
  adapter: sst(),
  site: baseUrl,
  env: {
    schema: {
        BASE_URL: envField.string({
            context: 'client',
            access: 'public',
            url: true,
        }),
    },
},
  vite: {
    plugins: [tailwindcss()]
  }
});