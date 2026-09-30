// แสดงภาพสินค้าจริงจาก public/images/products/ เท่านั้น
// object-fit: contain — รักษาสัดส่วน ห้ามยืด/บีบ/ตัด ภาพอยู่กึ่งกลาง ขนาดสม่ำเสมอ
export default function ProductImage({ product, size = 'medium', className = '' }) {
  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      className={`pimg-real pimg-${size} ${className}`}
    />
  )
}
