import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    alias: {
      '@keychi/shared': path.resolve(__dirname, '../../shared/src')
    }
  }
});
