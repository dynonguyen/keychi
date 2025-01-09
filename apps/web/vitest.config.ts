import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    watch: false,
    alias: {
      '@keychi/shared': path.resolve(__dirname, '../../shared/src')
    }
  }
});
