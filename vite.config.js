import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";
import path from 'path'

export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    {
      include: "**/*.jsx",
    },
    federation({
      name: "masterComponents",
      filename: "remoteEntry.js",
      exposes: {
        './MainButton' : './src/components/Button/MainButton.jsx',
        './Input' : './src/components/Form/Input/Input.jsx'

      },
      shared: ["react", "react-dom"],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/global/_Variables.scss" as *;
          @use "@/styles/global/_Mixins.scss" as *;
          @use "@/styles/global/_Fonts.scss" as *;
        `
      }
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
