import { defineConfig } from 'tsup'

export default defineConfig({
  shims: true,
  dts: true,
  format: ['esm', 'cjs'],
})

