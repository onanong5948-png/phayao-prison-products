// Post-build: คัดลอก index.html ไปทุก route เพื่อกัน 404 ตอนเปิด URL ตรง/Refresh
// ใช้กับ static host ใดก็ได้ (Netlify Drop, GitHub Pages ฯลฯ) โดยไม่ต้องพึ่ง redirects
// asset ใน index.html เป็น absolute path (/assets/*) จึงทำงานได้จากทุกความลึกของ route
const fs = require('fs')
const path = require('path')

const dist = path.join(__dirname, '..', 'dist')
const routes = [
  'products',
  'cart',
  'checkout',
  'vocational-training',
  'about',
  'contact',
  'products/wooden-table',
  'products/bamboo-bag',
  'products/teak-bead-necklace',
  'products/thermal-cup-bag',
  'products/crochet-tissue-box',
]

const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
for (const r of routes) {
  const dir = path.join(dist, r)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}
console.log(`prerendered ${routes.length} routes`)
