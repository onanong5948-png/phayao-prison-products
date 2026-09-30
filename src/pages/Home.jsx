import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Hammer, HandHeart, Landmark } from 'lucide-react'
import { PRODUCTS, getProduct } from '../data/products'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'

export default function Home() {
  const heroMain = getProduct('bamboo-bag')
  const heroSubs = ['wooden-table', 'teak-bead-necklace', 'thermal-cup-bag', 'crochet-tissue-box']
    .map(getProduct)
    .filter(Boolean)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge"><i />ผลิตภัณฑ์จากฝีมือภายในเรือนจำ</span>
            <h1>สร้างสรรค์จากฝีมือ<br /><span>สู่โอกาสในชีวิตใหม่</span></h1>
            <p className="lead">
              เรือนจำจังหวัดพะเยา มุ่งมั่นพัฒนาทักษะวิชาชีพและงานฝีมือให้กับผู้ต้องขัง
              เพื่อเตรียมความพร้อมสู่การกลับคืนสู่สังคม ผลิตภัณฑ์ทุกชิ้นสะท้อนความตั้งใจ
              ความประณีต และความหวังสู่อนาคตที่ดีกว่า
            </p>
            <div className="hero-cta">
              <Link to="/products" className="btn btn-primary">ชมผลิตภัณฑ์ <ArrowRight size={18} /></Link>
              <Link to="/vocational-training" className="btn btn-ghost">เรียนรู้เพิ่มเติม</Link>
            </div>
            <div className="hero-meta">
              <div className="mini"><Hammer size={18} /><b>งานฝีมือท้องถิ่น</b><span>ผสานอัตลักษณ์พะเยา</span></div>
              <div className="mini"><HandHeart size={18} /><b>ให้เกียรติผู้ผลิต</b><span>สร้างอาชีพ สร้างโอกาส</span></div>
              <div className="mini"><Landmark size={18} /><b>หน่วยงานราชการ</b><span>น่าเชื่อถือ โปร่งใส</span></div>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="showcase-main">
              <ProductImage product={heroMain} size="large" />
              <div className="showcase-label">กระเป๋าจักสานไม้ไผ่ — สินค้าเด่น</div>
            </div>
            <div className="showcase-sub">
              {heroSubs.map((p) => (
                <div key={p.id} className="showcase-item" title={p.name}>
                  <ProductImage product={p} size="small" />
                </div>
              ))}
            </div>
            <p className="showcase-note">ภาพสินค้าจริงจากงานฝึกวิชาชีพเรือนจำจังหวัดพะเยา</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Featured</div>
              <h2>ผลิตภัณฑ์แนะนำ</h2>
              <p>ผลิตภัณฑ์งานฝึกวิชาชีพ 5 รายการ — เลือกชมรายละเอียดและเพิ่มลงตะกร้าได้</p>
            </div>
            <Link to="/products" className="btn btn-ghost">ดูทั้งหมด <ArrowRight size={16} /></Link>
          </div>
          <div className="grid-products">
            {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="kicker">จากฝีมือ สู่โอกาส</div>
          <h2>ทุกชิ้นงาน คือการเรียนรู้และการเริ่มต้นใหม่</h2>
          <p className="muted" style={{ maxWidth: '70ch' }}>
            ผลิตภัณฑ์ทุกชิ้นเกิดจากความตั้งใจฝึกฝนทักษะวิชาชีพ ทั้งงานไม้ งานจักสาน และงานถักมือ
            รายได้และการสนับสนุนจากท่านมีส่วนช่วยสร้างแรงจูงใจและโอกาสในการประกอบอาชีพ
          </p>
          <div className="story-grid">
            <div className="story-card"><h3>งานไม้และเฟอร์นิเจอร์</h3><p>ฝึกทักษะช่างไม้พื้นฐาน การคัดเลือกวัสดุ การประกอบอย่างแข็งแรงและปลอดภัย</p></div>
            <div className="story-card"><h3>งานจักสานและงานถักมือ</h3><p>สืบสานภูมิปัญญาล้านนา ถ่ายทอดผ่านกระเป๋าไม้ไผ่ งานโครเชต์ และของใช้ในบ้าน</p></div>
          </div>
          <Link to="/vocational-training" className="btn btn-primary" style={{ marginTop: 20 }}>
            <BookOpen size={18} /> รู้จักงานฝึกวิชาชีพ
          </Link>
        </div>
      </section>
    </>
  )
}
