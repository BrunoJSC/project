import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      react: "https://cdn.skypack.dev/react@18",
      "react-dom": "https://cdn.skypack.dev/react-dom@18",
    },
  },
  plugins: [react()],
});
