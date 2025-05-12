import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import path from 'path'
import { loadEnv } from 'vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

const ReactCompilerConfig = {}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      port: Number(env.APP_PORT),
    },
    plugins: [
      TanStackRouterVite({
        autoCodeSplitting: true,
      }),
      viteReact({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
        },
      }),
      tailwindcss(),
      viteTsconfigPaths(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
