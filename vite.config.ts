import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    {
      name: "postbuild",
      closeBundle() {
        const exePath = process.env.ZEBAR_EXE_PATH || "zebar.exe";

        try {
          execSync(`taskkill /IM ${exePath} /F`, { stdio: "inherit" });
        } catch (err) {
          console.log(err.message);
        }
        execSync(`start ${exePath}`, { stdio: "inherit" });
      },
    },
  ],
  base: "./",
});
