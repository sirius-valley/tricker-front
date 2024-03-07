// vite.config.ts
import { defineConfig } from "file:///C:/Users/matia/Desktop/tricker-front/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/matia/Desktop/tricker-front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\matia\\Desktop\\tricker-front";
var vite_config_default = defineConfig({
  define: {
    "process.env": process.env
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(path.join(__vite_injected_original_dirname, "/src/components"))
      },
      {
        find: "@utils",
        replacement: path.resolve(path.join(__vite_injected_original_dirname, "/src/utils"))
      },
      {
        find: "@hooks",
        replacement: path.resolve(path.join(__vite_injected_original_dirname, "/src/hooks"))
      },
      {
        find: "@styles",
        replacement: path.resolve(path.join(__vite_injected_original_dirname, "/src/styles"))
      },
      {
        find: "@pages",
        replacement: path.resolve(path.join(__vite_injected_original_dirname, "/src/pages"))
      },
      {
        find: "@assets",
        replacement: path.resolve(path.join(__vite_injected_original_dirname, "/src/assets"))
      },
      {
        find: "@redux",
        replacement: path.resolve(path.join(__vite_injected_original_dirname, "/src/redux"))
      },
      {
        find: "@data-provider",
        replacement: path.resolve(path.join(__vite_injected_original_dirname, "/src/data-provider"))
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYXRpYVxcXFxEZXNrdG9wXFxcXHRyaWNrZXItZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1hdGlhXFxcXERlc2t0b3BcXFxcdHJpY2tlci1mcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbWF0aWEvRGVza3RvcC90cmlja2VyLWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBkZWZpbmU6IHtcclxuICAgICdwcm9jZXNzLmVudic6IHByb2Nlc3MuZW52XHJcbiAgfSxcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6ICdAY29tcG9uZW50cycsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnL3NyYy9jb21wb25lbnRzJykpXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnQHV0aWxzJyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsICcvc3JjL3V0aWxzJykpXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnQGhvb2tzJyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsICcvc3JjL2hvb2tzJykpXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnQHN0eWxlcycsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnL3NyYy9zdHlsZXMnKSlcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6ICdAcGFnZXMnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUocGF0aC5qb2luKF9fZGlybmFtZSwgJy9zcmMvcGFnZXMnKSlcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6ICdAYXNzZXRzJyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsICcvc3JjL2Fzc2V0cycpKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0ByZWR1eCcsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnL3NyYy9yZWR1eCcpKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0BkYXRhLXByb3ZpZGVyJyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsICcvc3JjL2RhdGEtcHJvdmlkZXInKSlcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UyxTQUFTLG9CQUFvQjtBQUNyVSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLGVBQWUsUUFBUTtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxRQUFRLEtBQUssS0FBSyxrQ0FBVyxpQkFBaUIsQ0FBQztBQUFBLE1BQ25FO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsS0FBSyxLQUFLLGtDQUFXLFlBQVksQ0FBQztBQUFBLE1BQzlEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsS0FBSyxLQUFLLGtDQUFXLFlBQVksQ0FBQztBQUFBLE1BQzlEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsS0FBSyxLQUFLLGtDQUFXLGFBQWEsQ0FBQztBQUFBLE1BQy9EO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsS0FBSyxLQUFLLGtDQUFXLFlBQVksQ0FBQztBQUFBLE1BQzlEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsS0FBSyxLQUFLLGtDQUFXLGFBQWEsQ0FBQztBQUFBLE1BQy9EO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsS0FBSyxLQUFLLGtDQUFXLFlBQVksQ0FBQztBQUFBLE1BQzlEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsS0FBSyxLQUFLLGtDQUFXLG9CQUFvQixDQUFDO0FBQUEsTUFDdEU7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
