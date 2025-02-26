# ใช้ Node.js เวอร์ชันล่าสุด
FROM node:18

# ตั้งค่าโฟลเดอร์ทำงานใน Container
WORKDIR /app

# คัดลอก package.json และติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm install

# คัดลอกไฟล์ทั้งหมดเข้า Container
COPY . .

# สร้าง Nuxt Build
RUN npm run build

# ใช้ Nuxt.js โหมด production
CMD ["npm", "run", "start"]
