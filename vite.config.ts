import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import optimizeLocales from '@react-aria/optimize-locales-plugin';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    {
      ...optimizeLocales.vite({
        locales: ['en-US', 'fr-FR']
      }),
      enforce: 'pre'
    }
  ],
})
