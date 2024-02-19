import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from "vite";
import dotenv from 'dotenv'

dotenv.config();


export default defineConfig(({ mode }) => {
 
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],

  };
});