# 💰 ระบบธนาคารออนไลน์ (Online Banking Application)

ระบบธนาคารออนไลน์ที่ให้ลูกค้าสามารถทำธุรกรรมทางการเงินได้ง่ายและรวดเร็ว พร้อมทั้งมีประสิทธิภาพสูงและความปลอดภัยตามมาตรฐาน

---

## 📜 คุณสมบัติของระบบ (Features)
✅ **ระบบบัญชีและธุรกรรม**
- ผู้ใช้สามารถ **สมัครเปิดบัญชีใหม่** ได้
- ผู้ใช้สามารถ **ฝากเงิน ถอนเงิน โอนเงิน และตรวจสอบยอดคงเหลือ** ได้
- ผู้ใช้สามารถ **ดูประวัติธุรกรรมทางการเงิน** ได้

✅ **การคำนวณดอกเบี้ย**
- ผู้ใช้สามารถตรวจสอบ **ดอกเบี้ยที่ได้รับในสิ้นปี** ตามยอดเงินในบัญชีของตน

✅ **ระบบยืนยันตัวตน**
- ผู้ใช้สามารถ **เข้าสู่ระบบ (Login) และออกจากระบบ (Logout)** ได้โดยใช้ **JWT (JSON Web Token)** เพื่อความปลอดภัย

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)
### **📌 Backend**
- **Node.js + Express.js** (พัฒนา API)
- **MySQL** (ฐานข้อมูล)
- **Sequelize ORM** (จัดการฐานข้อมูล)
- **JWT Authentication** (ระบบยืนยันตัวตน)

### **📌 Frontend**
- **Angular Framework** (แสดงผล UI)

### **📌 Deployment & ระบบเซิร์ฟเวอร์**
- **Docker** (ใช้สำหรับเซ็ต Backend และ Database เท่านั้น)
- **Docker Compose** (จัดการ container)
-  (Docker ผมพึ่งหัดใช้ครับ เข้าใจแค่แนวคิด เรื่อง set docker ใช้ AI ช่วย )

---

## 🚀 วิธีการติดตั้งและใช้งาน (Getting Started)

### **1️⃣ ติดตั้งเครื่องมือที่จำเป็น**
ก่อนเริ่มต้นใช้งานโปรเจกต์นี้ กรุณาติดตั้ง:
- [Node.js]([https://nodejs.org/](https://nodejs.org/en))
- [Docker]([https://www.docker.com/](https://www.docker.com/))

## 📥 ดาวน์โหลด API Collection สำหรับ Postman
สามารถดาวน์โหลดไฟล์ API Collection ได้ที่นี่ แล้วนำไป **Import ใน Postman**  
📄 [Download API Collection (JSON)](https://raw.githubusercontent.com/Sittinon2501/Projectclicknext/main/Clicknext.postman_collection.json)

### **2️⃣ ดาวน์โหลดโปรเจกต์**
```sh
git clone [https://github.com/your-repo/online-banking.git](https://github.com/Sittinon2501/Projectclicknext.git)
cd frontend_bank แล้ว npm install แล้ว  ng serve เพื่อรันฝั่ง frontend
แล้ว ใช้ docker-compose up เพื่อรัน backend+database 
- ผมไม่แน่ใจว่า clone ไปแล้วใช้docker-compose up แล้วมันน่าจะ error nodemon หรือเปล่าใน backend

