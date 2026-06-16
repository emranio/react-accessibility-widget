import path from 'node:path'
import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: { react: 'src/react/index.tsx' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    outExtension({ format }) {
      return { js: format === 'esm' ? '.esm.js' : '.cjs.js' }
    },
  },
  {
    // Standalone, no-React drop-in build for non-React sites (CDN / <script>).
    // React is intentionally NOT externalized — the core has no React runtime
    // dependency, so the bundle is self-contained.
    entry: { 'accessibility-widget': 'src/standalone/index.ts' },
    format: ['iife'],
    globalName: 'AccessibilityWidget',
    platform: 'browser',
    minify: true,
    sourcemap: true,
    dts: false,
    clean: false,
    treeshake: true,
    // lucide-react's icon factory imports React only to build components we
    // never render. Alias React to a no-op stub so the real runtime (~70 KB) is
    // not bundled into the drop-in script.
    esbuildOptions(options) {
      options.alias = { ...options.alias, react: path.resolve('src/standalone/react-stub.ts') }
    },
    outExtension() {
      return { js: '.global.js' }
    },
  },
])
