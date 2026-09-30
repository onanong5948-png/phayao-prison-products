import { MapPin, Phone, Printer, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <section className="section">
      <div className="container detail-grid">
        <div>
          <div className="kicker">Contact</div>
          <h1>ติดต่อเรา</h1>
          <p className="muted">ช่องทางติดต่อเรือนจำจังหวัดพะเยา</p>
          <div className="info-box" style={{ marginTop: 16 }}>
            <p>
              <MapPin size={16} /> เรือนจำจังหวัดพะเยา<br />
              919 หมู่ 1 ตำบลบ้านต๋อม<br />
              อำเภอเมือง จังหวัดพะเยา 56000<br />
              <Phone size={16} /> โทรศัพท์: 054-887-242<br />
              <Printer size={16} /> โทรสาร: 054-887-244<br />
              <Clock size={16} /> เวลาราชการ: วันจันทร์–ศุกร์ 08.30–16.30 น.
            </p>
            <a className="btn btn-primary" href="tel:054887242" style={{ marginTop: 8 }}>
              <Phone size={18} /> โทรติดต่อ
            </a>
          </div>
        </div>
        <div>
          <div className="map-ph">แผนที่ (Placeholder)<br />ฝัง Google Map ของ “เรือนจำจังหวัดพะเยา” ตรงนี้ภายหลัง</div>
          <div className="notice" style={{ marginTop: 12 }}>
            วิธีใส่แผนที่จริง: Google Maps → ค้นหา “เรือนจำจังหวัดพะเยา” → Share → Embed a map → วาง iframe แทนกล่องนี้
          </div>
        </div>
      </div>
    </section>
  )
}
