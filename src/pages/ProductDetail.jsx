import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ShoppingCart, Zap, Minus, Plus,
  BadgeCheck, HeartHandshake, Ruler, Package, Factory, Clock3,
} from 'lucide-react'
import { UNKNOWN, formatPrice, getProduct, getRelated, stockStatus, statusText, checkStock } from '../data/products'
import ProductImage from '../components/ProductImage'
import { StatusBadge, stockLine } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'

function SpecRow({ label, value }) {
  return (
    <div className="spec-row">
      <dt>{label}</dt>
      <dd>{value ?? <span className="placeholder-text">{UNKNOWN}</span>}</dd>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { items, add } = useCart()
  const { push } = useToast()
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)

  // เปลี่ยนสินค้า (เช่นกดจากสินค้าแนะนำ) → รีเซ็ตจำนวน/รูป และเลื่อนขึ้นบนสุด
  useEffect(() => {
    setQty(1)
    setActiveImg(0)
    window.scrollTo(0, 0)
  }, [id])

  const related = useMemo(() => (product ? getRelated(product.id, 3) : []), [product])

  if (!product) {
    return (
      <section className="section"><div className="container">
        <h1>ไม่พบสินค้า</h1>
        <Link to="/products" className="btn btn-ghost"><ArrowLeft size={16} /> กลับไปหน้าผลิตภัณฑ์</Link>
      </div></section>
    )
  }

  const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image]
  const out = stockStatus(product) === 'out'
  const inCart = items[product.id] || 0
  const maxQty = typeof product.stock === 'number' ? Math.max(0, product.stock - inCart) : 99
  const shownQty = Math.min(qty, Math.max(1, maxQty))

  const handleAdd = () => {
    const res = checkStock(product, inCart, shownQty)
    if (!res.ok) {
      push(res.message, 'error')
      return
    }
    add(product.id, shownQty)
    push(`เพิ่ม “${product.name}” × ${shownQty} ลงตะกร้าแล้ว`)
  }

  const handleBuy = () => {
    const res = checkStock(product, inCart, shownQty)
    if (!res.ok) {
      push(res.message, 'error')
      return
    }
    add(product.id, shownQty)
    navigate('/cart')
  }

  return (
    <>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link to="/">หน้าแรก</Link><span>/</span>
            <Link to="/products">ผลิตภัณฑ์</Link><span>/</span>
            <Link to={`/products?cat=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span>
            <b>{product.name}</b>
          </nav>

          <div className="detail-grid">
            <div>
              <div className="gallery-main">
                <img src={gallery[activeImg]} alt={product.name} className="pimg-real pimg-large" />
              </div>
              {gallery.length > 1 && (
                <div className="gallery-thumbs">
                  {gallery.map((src, i) => (
                    <button key={src + i} className={`thumb ${i === activeImg ? 'active' : ''}`}
                      onClick={() => setActiveImg(i)} aria-label={`รูปที่ ${i + 1}`}>
                      <img src={src} alt={`${product.name} รูปที่ ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
              <button className="btn btn-ghost" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> ย้อนกลับ
              </button>
            </div>

            <div>
              <span className="tag">{product.category}</span>
              <h1 style={{ margin: '8px 0' }}>{product.name}</h1>
              <div className="price price-lg">{formatPrice(product.price)}</div>
              <div className="detail-status-row">
                <StatusBadge product={product} />
                <small className="muted">{stockLine(product)}</small>
                {inCart > 0 && <small className="muted">ในตะกร้าแล้ว {inCart} ชิ้น</small>}
              </div>
              <p className="muted">{product.shortDesc || product.description}</p>
              <p className="muted">{product.description}</p>

              <div className="buy-row">
                <div className="qty qty-lg">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="ลดจำนวน" disabled={out}><Minus size={16} /></button>
                  <b>{out ? 0 : shownQty}</b>
                  <button onClick={() => setQty((q) => Math.min(Math.max(1, maxQty), q + 1))} aria-label="เพิ่มจำนวน" disabled={out || shownQty >= maxQty}><Plus size={16} /></button>
                </div>
                <button className="btn btn-ghost btn-buy" onClick={handleAdd} disabled={out}>
                  <ShoppingCart size={18} /> {out ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
                </button>
                <button className="btn btn-primary btn-buy" onClick={handleBuy} disabled={out}>
                  <Zap size={18} /> {out ? 'สินค้าหมด' : 'ซื้อสินค้า'}
                </button>
              </div>
              {typeof product.stock === 'number' && !out && (
                <p className="form-hint">เพิ่มได้อีกสูงสุด {maxQty} ชิ้น (คงเหลือ {product.stock} ชิ้น)</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-info">
          <h2>รายละเอียดสินค้า</h2>
          <dl className="spec spec-table">
            <SpecRow label="วัสดุ" value={product.material} />
            <SpecRow label="สี" value={product.color} />
            <SpecRow label="ขนาด" value={product.size} />
            <SpecRow label="น้ำหนัก" value={product.weight} />
            <SpecRow label="จำนวนคงเหลือ" value={typeof product.stock === 'number' ? `${product.stock} ชิ้น` : null} />
            <SpecRow label="ระยะเวลาการผลิต" value={product.productionTime} />
            <SpecRow label="ผู้ผลิต" value={product.producer} />
          </dl>

          <h2><BadgeCheck size={20} /> จุดเด่นของสินค้า</h2>
          <ul className="highlight-list">
            {(product.highlights || []).map((h) => (
              <li key={h}><BadgeCheck size={18} /><span>{h}</span></li>
            ))}
          </ul>

          <h2><HeartHandshake size={20} /> วิธีดูแลรักษา</h2>
          <p className="muted">{product.care || UNKNOWN}</p>

          <h2><Factory size={20} /> เรื่องราวของสินค้า</h2>
          <p className="muted">{product.story || UNKNOWN}</p>

          <h2><Ruler size={20} /> วิธีใช้งาน</h2>
          <p className="muted">{product.usage || UNKNOWN}</p>

          <h2><Package size={20} /> เหมาะสำหรับ</h2>
          <div className="chip-row">
            {(product.suitableFor || []).map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
          <p className="form-hint" style={{ marginTop: 8 }}><Clock3 size={14} /> ข้อมูลที่ยังไม่ confirmed แสดงเป็น “{UNKNOWN}” — สอบถามหน่วยงานเพิ่มเติมได้ที่หน้าติดต่อเรา</p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head"><div>
            <div className="kicker">Related</div>
            <h2>สินค้าแนะนำ</h2>
          </div></div>
          <div className="grid-products related-grid">
            {related.map((p) => (
              <article key={p.id} className="card card-clickable" onClick={() => navigate(`/products/${p.id}`)} role="link" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/products/${p.id}`) }}>
                <ProductImage product={p} size="medium" />
                <div className="card-body">
                  <span className="tag">{p.category}</span>
                  <h3>{p.name}</h3>
                  <div className="price">{formatPrice(p.price)}</div>
                  <div className="card-actions">
                    <span className="btn btn-ghost btn-sm" style={{ textAlign: 'center' }}>ดูรายละเอียด</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
