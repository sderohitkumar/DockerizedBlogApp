import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })

export default defineConfig(({ mode }) => {
  // const env = process.env.VITE_APP_ENV || mode || 'production';

  // return {
  //   plugins: [
  //     react(),
  //     tailwindcss(),
  //   ],
  //   define: {
  //     'process.env.VITE_APP_ENV': JSON.stringify(env),
  //   },
  // };

  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env": env,
    },
  };
});
