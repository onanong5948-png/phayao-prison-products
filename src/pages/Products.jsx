import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, ArrowUpDown } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [params] = useSearchParams()
  const initialCat = CATEGORIES.includes(params.get('cat')) ? params.get('cat') : 'ทั้งหมด'
  const [filter, setFilter] = useState(initialCat)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let out = PRODUCTS.filter((p) => {
      const matchCat = filter === 'ทั้งหมด' || p.category === filter
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      return matchCat && matchQ
    })
    if (sort === 'asc') out = [...out].sort((a, b) => a.price - b.price)
    if (sort === 'desc') out = [...out].sort((a, b) => b.price - a.price)
    return out
  }, [filter, query, sort])

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Products</div>
        <h1>ผลิตภัณฑ์งานฝึกวิชาชีพ</h1>
        <p className="muted" style={{ maxWidth: '70ch' }}>
          ชมผลิตภัณฑ์จากงานฝึกวิชาชีพเรือนจำจังหวัดพะเยา ทั้งงานไม้ งานจักสาน และงานถักมือ
          กดที่ Card เพื่อดูรายละเอียดของสินค้านั้น
        </p>

        <div className="toolbar">
          <label className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาชื่อสินค้า / หมวดหมู่..."
              aria-label="ค้นหาสินค้า"
            />
          </label>
          <label className="sort-box">
            <ArrowUpDown size={16} />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="เรียงราคา">
              <option value="default">เรียง: แนะนำ</option>
              <option value="asc">ราคาต่ำ → สูง</option>
              <option value="desc">ราคาสูง → ต่ำ</option>
            </select>
          </label>
        </div>

        <div className="filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="muted" style={{ marginTop: 12 }}>พบสินค้า {list.length} รายการ</p>
        <div className="grid-products" style={{ marginTop: 12 }}>
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        {list.length === 0 && <p className="muted">ไม่พบสินค้าที่ค้นหา ลองเปลี่ยนคำค้นหรือหมวดหมู่</p>}
      </div>
    </section>
  )
}
