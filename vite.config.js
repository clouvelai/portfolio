import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { prepareGuide } from './src/content/guides.js'

const guideDir = path.resolve('src/content/guides')

function fieldGuides() {
  const read = (name) => prepareGuide(fs.readFileSync(path.join(guideDir, name), 'utf8'))

  return {
    name: 'field-guides',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.startsWith('/guides/')) return next()
        const name = path.basename(url)
        const file = path.join(guideDir, name)
        if (!name.endsWith('.html') || !file.startsWith(guideDir) || !fs.existsSync(file)) return next()
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('Cache-Control', 'no-cache')
        res.end(read(name))
      })
    },
    generateBundle() {
      for (const name of fs.readdirSync(guideDir)) {
        if (!name.endsWith('.html')) continue
        this.emitFile({ type: 'asset', fileName: `guides/${name}`, source: read(name) })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), fieldGuides()],
})
