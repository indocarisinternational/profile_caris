import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Disable visualizer untuk production build
    process.env.NODE_ENV !== 'production' && visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemap untuk menghemat memory
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@iconify/react', 'lucide-react'],
          carousel: ['react-slick', 'slick-carousel'],
          utils: ['react-helmet-async', 'react-hot-toast']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // Hapus terser config yang mungkin menyebabkan hang
    minify: 'esbuild' // Lebih cepat dan stabil
  },
  
  server: {
    port: 5173
  }
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import { visualizer } from 'rollup-plugin-visualizer';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(), 
//     tailwindcss(),
//     visualizer({
//       filename: 'dist/stats.html',
//       open: false,
//       gzipSize: true,
//       brotliSize: true,
//     })
//   ],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//           router: ['react-router-dom'],
//           ui: ['@iconify/react', 'lucide-react'],
//           carousel: ['react-slick'],
//           seo: ['react-helmet-async']
//         }
//       }
//     },
//     chunkSizeWarningLimit: 1000,
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true,
//         drop_debugger: true
//       }
//     }
//   },
//   server: {
//     port: 5173
//   }
// });
