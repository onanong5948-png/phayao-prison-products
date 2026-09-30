import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react'
import { formatPrice, getProduct, checkStock } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'
import ProductImage from '../components/ProductImage'

export default function Cart() {
  const { items, add, decrease, remove } = useCart()
  const { push } = useToast()
  const navigate = useNavigate()
  const ids = Object.keys(items).filter((id) => items[id] > 0)
  const total = ids.reduce((sum, id) => {
    const p = getProduct(id)
    return sum + (p ? p.price * items[id] : 0)
  }, 0)

  const inc = (id) => {
    const p = getProduct(id)
    const res = checkStock(p, items[id] || 0, 1)
    if (!res.ok) {
      push(res.message, 'error')
      return
    }
    add(id)
  }

  if (!ids.length) {
    return (
      <section className="section"><div className="container" style={{ textAlign: 'center' }}>
        <h1>ตะกร้าสินค้า</h1>
        <p className="muted">ตะกร้ายังว่าง — เชิญเลือกชมผลิตภัณฑ์</p>
        <Link to="/products" className="btn btn-primary">ไปเลือกผลิตภัณฑ์ <ArrowRight size={16} /></Link>
      </div></section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <h1>ตะกร้าสินค้า</h1>
        <div className="cart-table">
          {ids.map((id) => {
            const p = getProduct(id)
            if (!p) return null
            const capped = typeof p.stock === 'number' && items[id] >= p.stock
            return (
              <div key={id} className="cart-row">
                <button className="cart-thumb-btn" onClick={() => navigate(`/products/${id}`)} aria-label={p.name}>
                  <ProductImage product={p} size="small" className="cart-thumb" />
                </button>
                <div>
                  <Link to={`/products/${id}`} className="cart-name"><b>{p.name}</b></Link>
                  <br /><small className="muted">{formatPrice(p.price)} / ชิ้น</small>
                  {typeof p.stock === 'number' && <><br /><small className="muted">คงเหลือ {p.stock} ชิ้น</small></>}
                </div>
                <div className="qty">
                  <button onClick={() => decrease(id)} aria-label="ลดจำนวน"><Minus size={16} /></button>
                  <b>{items[id]}</b>
                  <button onClick={() => inc(id)} aria-label="เพิ่มจำนวน" disabled={capped} title={capped ? 'ถึงจำนวนคงเหลือสูงสุดแล้ว' : 'เพิ่มจำนวน'}><Plus size={16} /></button>
                </div>
                <b className="hide-mobile">{formatPrice(p.price * items[id])}</b>
                <button className="btn btn-ghost btn-sm" onClick={() => { remove(id); push(`ลบ “${p.name}” ออกจากตะกร้าแล้ว`) }}><Trash2 size={16} /> ลบ</button>
              </div>
            )
          })}
        </div>
        <div className="cart-footer">
          <Link to="/products" className="btn btn-ghost"><ArrowLeft size={16} /> เลือกสินค้าต่อ</Link>
          <div className="cart-total">
            <h2 style={{ margin: 0 }}>รวม {formatPrice(total)}</h2>
            <Link to="/checkout" className="btn btn-primary">ไปชำระเงิน <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
