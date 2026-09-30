export default function About() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="kicker">About</div>
        <h1>เกี่ยวกับเรา</h1>
        <p className="muted">
          เรือนจำจังหวัดพะเยา เป็นหน่วยงานในสังกัดกรมราชทัณฑ์ มีภารกิจด้านการควบคุม ดูแล
          และพัฒนาพฤตินิสัย ควบคู่กับการฝึกทักษะวิชาชีพเพื่อเตรียมความพร้อมในการกลับสู่สังคมอย่างมีคุณภาพ
        </p>
        <div className="info-box" style={{ marginTop: 20 }}>
          <h3>ประวัติหน่วยงาน (รอข้อมูลจริง)</h3>
          <p className="muted">พื้นที่สำหรับประวัติความเป็นมาของเรือนจำจังหวัดพะเยา — ใช้ Placeholder ไว้ก่อน แก้ไขได้ภายหลังเมื่อได้รับข้อมูลจริง</p>
        </div>
        <div className="info-box" style={{ marginTop: 16 }}>
          <h3>ภารกิจ (รอข้อมูลจริง)</h3>
          <p className="muted">พื้นที่สำหรับพันธกิจ วิสัยทัศน์ และบทบาทด้านงานฝึกวิชาชีพ — รอข้อมูลจริงจากหน่วยงาน</p>
        </div>
        <div className="info-box" style={{ marginTop: 16 }}>
          <h3>งานฝึกวิชาชีพ (รอข้อมูลจริง)</h3>
          <p className="muted">พื้นที่สำหรับอธิบายสาขาฝึกอาชีพ หลักสูตร และเป้าหมายการพัฒนา — รอข้อมูลจริงจากหน่วยงาน</p>
        </div>
      </div>
    </section>
  )
}
