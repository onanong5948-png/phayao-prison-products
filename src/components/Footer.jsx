import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <Logo size={48} inFooter />
            <div>
              <strong>เรือนจำจังหวัดพะเยา</strong>
              <small>ผลิตภัณฑ์งานฝีมือ</small>
            </div>
          </div>
          <p className="footer-desc">
            เว็บไซต์นำเสนอผลิตภัณฑ์งานฝึกวิชาชีพและงานฝีมือจากภายในเรือนจำ
            จัดทำเป็น Prototype สำหรับนำเสนอ รายได้สนับสนุนการพัฒนาทักษะอาชีพอย่างยั่งยืน
          </p>
        </div>
        <div>
          <b className="footer-title">เมนูลัด</b>
          <Link to="/">หน้าแรก</Link>
          <Link to="/products">ผลิตภัณฑ์</Link>
          <Link to="/vocational-training">งานฝึกวิชาชีพ</Link>
          <Link to="/about">เกี่ยวกับเรา</Link>
        </div>
        <div>
          <b className="footer-title">ติดต่อเรา</b>
          <span>919 หมู่ 1 ต.บ้านต๋อม อ.เมือง จ.พะเยา 56000</span>
          <span>โทรศัพท์: 054-887-242</span>
          <span>โทรสาร: 054-887-244</span>
          <a href="tel:054887242">โทรติดต่อ</a>
          <Link to="/contact">ช่องทางติดต่อทั้งหมด</Link>
        </div>
      </div>
      <div className="copy">
        <div className="container">© 2569 เรือนจำจังหวัดพะเยา — Prototype เพื่อการนำเสนอ</div>
      </div>
    </footer>
  )
}
