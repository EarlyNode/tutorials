import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/tests/setup-test-environment.ts'],
    include: ['./src/**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // watch: {
    //   ignored:[
    //     '.*\\/node_modules\\/.*',
    //     '.*\\/build\\/.*',
    //     '.*\\/postgres-data\\/.*',
    //   ],
    // },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
