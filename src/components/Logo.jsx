// โลโก้กรมราชทัณฑ์จริง — public/images/Department_of_Corrections_Logo.png
// ห้ามสร้างโลโก้ใหม่ / วาดด้วย CSS / ใช้ดาว / Emoji / Icon แทน
export default function Logo({ size = 52, inFooter = false }) {
  return (
    <img
      src="/images/Department_of_Corrections_Logo.png"
      alt="โลโก้กรมราชทัณฑ์"
      width={size}
      height={size}
      className={inFooter ? 'brand-logo brand-logo-footer' : 'brand-logo'}
    />
  )
}
