import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "postbuild",
      closeBundle() {
        try {
          execSync("taskkill /IM zebar.exe /F", { stdio: "inherit" });
        } catch (err) {
          console.log(err.message);
        }
        execSync("start zebar.exe", { stdio: "inherit" });
      },
    },
  ],
  base: "./",
});
