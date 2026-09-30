import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../context/CartContext'

const LINKS = [
  { to: '/', label: 'หน้าแรก', end: true },
  { to: '/products', label: 'ผลิตภัณฑ์' },
  { to: '/vocational-training', label: 'งานฝึกวิชาชีพ' },
  { to: '/about', label: 'เกี่ยวกับเรา' },
  { to: '/contact', label: 'ติดต่อเรา' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()
  const navigate = useNavigate()

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>เว็บไซต์หน่วยงานราชการ — เรือนจำจังหวัดพะเยา</span>
          <span className="hide-mobile">เปิดทำการ วันจันทร์–ศุกร์ เวลาราชการ</span>
        </div>
      </div>
      <header className="header">
        <nav className="nav container">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <Logo size={52} />
            <span className="brand-text">
              <strong>เรือนจำจังหวัดพะเยา</strong>
              <small>ผลิตภัณฑ์งานฝึกวิชาชีพ</small>
            </span>
          </Link>

          <div className={`menu ${open ? 'open' : ''}`}>
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <button className="cart-link-mobile" onClick={() => { setOpen(false); navigate('/cart') }}>
              <ShoppingCart size={18} /> ตะกร้า ({count})
            </button>
          </div>

          <div className="header-actions">
            <Link to="/cart" className="cart-btn" aria-label="ตะกร้าสินค้า">
              <ShoppingCart size={18} />
              <span className="hide-mobile">ตะกร้า</span>
              <span className="cart-count">{count}</span>
            </Link>
            <button
              className="hamburger"
              onClick={() => setOpen((v) => !v)}
              aria-label="เมนู"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}
