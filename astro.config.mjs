import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/edge'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  input: 'src/',
  site: 'https://www.noscreenwithoutdoom.art/',
  adapter: vercel(),
  integrations: [tailwind(), react()],
  exclude: ['**/api/**/*'],
})
