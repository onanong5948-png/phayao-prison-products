import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, ShoppingCart, Check } from 'lucide-react'
import ProductImage from './ProductImage'
import { formatPrice, stockStatus, statusText, checkStock, UNKNOWN } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from './Toast'

export function StatusBadge({ product }) {
  const s = stockStatus(product)
  return <span className={`status-badge status-${s}`}>{statusText(product)}</span>
}

export function stockLine(product) {
  if (typeof product.stock === 'number') return `คงเหลือ ${product.stock} ชิ้น`
  return `คงเหลือ: ${UNKNOWN}`
}

export default function ProductCard({ product }) {
  const { items, add } = useCart()
  const { push } = useToast()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const out = stockStatus(product) === 'out'

  const goDetail = () => navigate(`/products/${product.id}`)

  const handleAdd = (e) => {
    e.stopPropagation()
    const res = checkStock(product, items[product.id] || 0, 1)
    if (!res.ok) {
      push(res.message, 'error')
      return
    }
    add(product.id)
    push(`เพิ่ม “${product.name}” ลงตะกร้าแล้ว`)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const handleDetail = (e) => {
    e.stopPropagation()
    goDetail()
  }

  return (
    <article className="card card-clickable" onClick={goDetail} role="link" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') goDetail() }}>
      <div className="card-img-link" aria-label={product.name}>
        <ProductImage product={product} size="medium" />
      </div>
      <div className="card-body">
        <div className="card-top-row">
          <span className="tag">{product.category}</span>
          <StatusBadge product={product} />
        </div>
        <h3>{product.name}</h3>
        <div className="price">{formatPrice(product.price)}</div>
        <small className="muted">{stockLine(product)}</small>
        <div className="card-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleDetail}>
            <Eye size={16} /> ดูรายละเอียด
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleAdd} disabled={out}>
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
            {out ? 'สินค้าหมด' : added ? 'เพิ่มแล้ว!' : 'เพิ่มลงตะกร้า'}
          </button>
        </div>
      </div>
    </article>
  )
}
