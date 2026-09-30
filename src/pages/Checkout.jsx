import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { formatPrice, getProduct } from '../data/products'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { items, clear, count } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' })
  const [done, setDone] = useState(false)

  const ids = Object.keys(items).filter((id) => items[id] > 0)
  const total = ids.reduce((s, id) => {
    const p = getProduct(id)
    return s + (p ? p.price * items[id] : 0)
  }, 0)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!ids.length) return
    setDone(true)
    clear()
  }

  if (done) {
    return (
      <section className="section"><div className="container" style={{ textAlign: 'center' }}>
        <CheckCircle2 size={48} color="#B22222" />
        <h1>รับคำสั่งซื้อแล้ว</h1>
        <p className="muted">ขอบคุณ {form.name || 'ท่าน'} — นี่คือ Prototype ยังไม่เชื่อมระบบชำระเงินจริง<br />เจ้าหน้าที่จะติดต่อกลับตามเบอร์ที่ให้ไว้</p>
        <Link to="/products" className="btn btn-primary">เลือกสินค้าต่อ</Link>
      </div></section>
    )
  }

  if (!ids.length) {
    return (
      <section className="section"><div className="container" style={{ textAlign: 'center' }}>
        <h1>ชำระเงิน</h1>
        <p className="muted">ตะกร้ายังว่าง</p>
        <Link to="/products" className="btn btn-primary">ไปเลือกผลิตภัณฑ์</Link>
      </div></section>
    )
  }

  return (
    <section className="section">
      <div className="container checkout-grid">
        <form onSubmit={submit} className="checkout-form">
          <h1>ชำระเงิน</h1>
          <p className="muted">Prototype — ยังไม่เชื่อมระบบชำระเงินจริง</p>
          <label>ชื่อผู้สั่งซื้อ*<input required value={form.name} onChange={set('name')} placeholder="ชื่อ-นามสกุล" /></label>
          <label>เบอร์โทรศัพท์*<input required value={form.phone} onChange={set('phone')} placeholder="08x-xxx-xxxx" /></label>
          <label>ที่อยู่*<textarea required value={form.address} onChange={set('address')} rows={3} placeholder="ที่อยู่จัดส่ง" /></label>
          <label>หมายเหตุ<textarea value={form.note} onChange={set('note')} rows={2} placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)" /></label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-ghost" onClick={() => navigate('/cart')}>กลับตะกร้า</button>
            <button type="submit" className="btn btn-primary">ยืนยันคำสั่งซื้อ ({count} ชิ้น)</button>
          </div>
        </form>
        <aside className="order-summary">
          <h3>สรุปรายการ</h3>
          {ids.map((id) => {
            const p = getProduct(id)
            return <div key={id} className="summary-row"><span>{p.name} × {items[id]}</span><b>{formatPrice(p.price * items[id])}</b></div>
          })}
          <div className="summary-total"><span>ยอดรวม</span><b>{formatPrice(total)}</b></div>
        </aside>
      </div>
    </section>
  )
}
