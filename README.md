# phayao-prison-products — เรือนจำจังหวัดพะเยา (React + Vite)

Prototype นำเสนออาจารย์ — ผลิตภัณฑ์งานฝึกวิชาชีพ 5 รายการเท่านั้น (ห้ามเปลี่ยนชื่อ/ราคา)

## 1. ตรวจสอบโครงสร้าง
```
phayao-prison-products/
├── index.html
├── package.json / vite.config.js
├── public/images/Department_of_Corrections_Logo.png (วางไฟล์จริงที่นี่)
├── public/images/products/
│   ├── wooden-table.jpg
│   ├── bamboo-bag.jpg
│   ├── teak-bead-necklace.jpg
│   ├── thermal-cup-bag.jpg
│   └── crochet-tissue-box.jpg
└── src/
    ├── components/ Header Footer Logo ProductCard ProductImage
    ├── pages/ Home Products ProductDetail Cart Checkout VocationalTraining About Contact
    ├── data/products.js
    ├── context/CartContext.jsx
    ├── App.jsx / main.jsx / index.css
```

## 2. โลโก้ + รูปสินค้า
- โลโก้จริง: `public/images/Department_of_Corrections_Logo.png` (ชื่อตามสเปก) ถ้ายังไม่มีจะขึ้นกรอบ “รท.” ชั่วคราว
- รูปสินค้า: วาง `.jpg` 5 ไฟล์ตามชื่อด้านบน ถ้ายังไม่มีจะใช้ Placeholder ครีมสวยงามอัตโนมัติ (ไม่ดึงเน็ต ไม่มีลิขสิทธิ์)

## 3. สินค้า (คงเดิม)
1. โต๊ะไม้สำหรับใช้งาน — 1,500 — งานไม้
2. กระเป๋าจักสานไม้ไผ่ — 700 — งานจักสาน (เด่นใน Hero)
3. สร้อยคอลูกปัดไม้สักถักโครเชต์ — 300 — งานหัตถกรรม
4. ถุงผ้าสำหรับใส่แก้วเก็บอุณหภูมิ — 150 — งานถัก
5. กล่องใส่กระดาษทิชชูถักโครเชต์ — 150 — งานถัก

## 4. วิธี Run
```powershell
# ใช้ Node portable ที่มีในเครื่อง (ถ้า node หลักยังไม่ลง)
$env:PATH = "C:\Users\xgod\AppData\Local\Temp\opencode\node\node-v24.19.0-win-x64;" + $env:PATH
Set-Location "C:\Users\xgod\Documents\Default Project\phayao-prison-products"
npm install
npm run dev
# เปิด http://localhost:5173/
```

Build:
```powershell
npm run build
npm run preview
```

## 5. Routes
/ → หน้าแรก (Hero + ผลิตภัณฑ์แนะนำ 5)
/products → Filter ทั้งหมด/งานไม้/จักสาน/หัตถกรรม/ถัก
/products/:id → รายละเอียด (วัสดุ/ขนาด/สต็อก = รอข้อมูลจริง)
/cart → ตะกร้า localStorage
/checkout → ฟอร์ม ชื่อ/เบอร์/ที่อยู่/หมายเหตุ + สรุปยอด (ยังไม่ชำระจริง)
/vocational-training /about /contact → Placeholder สุภาพ รอข้อมูลจริง

## 6. Design
แดง #B22222 แดงอ่อน #FFF3F2 ขาว น้ำเงินเทา #2F4355 ตัวอักษร #333/#666 ราคา #B22222
ฟอนต์ Noto Sans Thai + Sarabun, ไอคอน lucide-react (ห้าม emoji ใน UI), Responsive 3/2/1 คอลัมน์
