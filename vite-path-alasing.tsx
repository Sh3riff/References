https://dev.to/avxkim/setup-path-aliases-w-react-vite-ts-poa

Step 1

vite.config.ts:

<!-- vite.config.ts: -->
// also don't forget to `npm i -D @types/node`, so __dirname won't complain // does not work for me

import * as path from 'path'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
})

Step 2

We're adding "~" alias for src directory (ts needs this).

tsconfig.json:
{
  "compilerOptions": {
    // ...rest of the template
    "types": ["node"],
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

Step 3
// this work for me in place of `npm i -D @types/node`

declarations.d.ts

declare module '~/components'
