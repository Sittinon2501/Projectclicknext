# ใช้ Node.js เวอร์ชันล่าสุดเป็น base image
FROM node:18

# กำหนด working directory ภายใน container
WORKDIR /app

# คัดลอก package.json และ package-lock.json ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# ใช้พอร์ต 4200 สำหรับ Angular
EXPOSE 4200

# คำสั่งเริ่มต้นเมื่อ container ทำงาน
CMD ["npm", "start"]
