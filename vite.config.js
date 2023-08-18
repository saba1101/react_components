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
        './FormInput' : './src/components/Form/Input/Input.jsx',
        './CheckBox' : './src/components/Form/FormControls/Checkbox/Checkbox.jsx',
        './Radio' : './src/components/Form/FormControls/Radio/Radio.jsx',
        './Toggle' : './src/components/Form/FormControls/Toggle/Toggle.jsx',
        './FormDropdown' : './src/components/Form/Selects/SingleSelect/SingleSelectDropdown.jsx',
        './FormMultiSelectDropdown' : './src/components/Form/Selects/MultiSelect/MultiSelect.jsx',
        './Popup' : './src/components/Modal/Popup.jsx',
        './Notification' : './src/components/Notification/ToastNotification.js',
        './Search' : './src/components/Search/Search.jsx',
        './AdvancedSearch' : './src/components/AdvancedSearch/AdvancedSearch.jsx',
        './TreeNode' : './src/components/Reusable/Tree/TreeNode.jsx',
        './Grid' : './src/components/DataGrid/Grid.jsx',
        './FileUploader' : './src/components/Files/Uploader/FileUploader.jsx',
        './Datepicker' : './src/components/Date/DatePicker.jsx',
        './Card' : './src/components/Cards/SingleCard/Card.jsx',
        './Tooltip': './src/components/Tooltip/Tooltip.jsx',
        './ToogerTrip': './src/components/ToogerTrip/ToogerTrip.jsx',
        './Tag': './src/components/Tags/SingleTag/SingleTag.jsx',
        './Timepicker': './src/components/Timepicker/Timepicker.jsx',
        './Loader' : './src/components/Loader/CircularLoader.jsx'
      },
      // shared: ["react", "react-dom"],
      shared: {
        'react': {
          singleton: true,
        },
        'react-dom': {
          eager: true,
        }
      }
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/global/_Variables.scss" as *;
          @use "@/styles/global/_ColorTokens.scss" as *;
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
