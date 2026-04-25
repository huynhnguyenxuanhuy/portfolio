# Portfolio — Huỳnh Nguyễn Xuân Huy

Personal portfolio website xây dựng bằng **HTML + CSS + JavaScript thuần**.
Không cần build tool, không cần npm install — mở là chạy.

## 📁 Cấu trúc thư mục

```
portfolio/
├── index.html              # File HTML chính
├── css/
│   ├── reset.css           # Reset + biến CSS (màu, font)
│   ├── style.css           # Style chính cho mọi component
│   └── responsive.css      # Style cho mobile / tablet
├── js/
│   ├── cursor.js           # Custom cursor (dot + ring)
│   ├── particles.js        # Particle background canvas
│   ├── typing.js           # Typing animation cho hero
│   ├── animations.js       # Scroll reveal + counter animation
│   └── main.js             # Navigation + magnetic buttons
└── README.md
```

## 🚀 Cách chạy local

### Cách 1 — Mở trực tiếp
Double-click file `index.html` → mở trong trình duyệt.

### Cách 2 — Live Server (recommended)
1. Mở folder `portfolio/` trong VS Code
2. Cài extension **Live Server** (Ritwick Dey)
3. Click chuột phải vào `index.html` → **Open with Live Server**
4. Trang sẽ mở ở `http://127.0.0.1:5500/` và auto reload khi save

### Cách 3 — Python server
```bash
cd portfolio
python3 -m http.server 8000
# Truy cập http://localhost:8000
```

### Cách 4 — Node.js (npx)
```bash
cd portfolio
npx serve
```

## 🌍 Cách deploy (chọn 1 trong các cách dưới)

### 1️⃣ GitHub Pages (miễn phí, dễ nhất)
1. Tạo repo mới trên GitHub, vd: `portfolio`
2. Push code lên:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<username>/portfolio.git
   git push -u origin main
   ```
3. Vào repo → **Settings** → **Pages** → Source: `main` branch / root → Save
4. Sau ~1 phút truy cập: `https://<username>.github.io/portfolio/`

### 2️⃣ Vercel (miễn phí, deploy tự động)
1. Tạo tài khoản tại [vercel.com](https://vercel.com)
2. **Add New** → **Project** → Import repo từ GitHub
3. Framework Preset: **Other** → Click **Deploy**
4. Xong! URL sẽ có dạng `https://portfolio-<random>.vercel.app`

### 3️⃣ Netlify (miễn phí, kéo thả)
1. Vào [app.netlify.com/drop](https://app.netlify.com/drop)
2. Kéo thẳng folder `portfolio/` vào → xong!
3. Hoặc connect với GitHub để auto deploy mỗi lần push

### 4️⃣ Cloudflare Pages (miễn phí, nhanh)
1. Tạo tài khoản tại [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Create a project** → Connect GitHub
3. Build command: để trống · Output directory: `/`
4. Deploy → Done!

## 🎨 Cách tùy chỉnh

| Muốn sửa gì | Sửa ở file |
|---|---|
| Đổi màu chủ đạo | `css/reset.css` (mục `:root`) |
| Đổi nội dung text, project | `index.html` |
| Đổi chữ trong typing animation | `js/typing.js` (mảng `phrases`) |
| Tùy chỉnh particle background | `js/particles.js` |
| Thêm/bớt bài blog | `index.html` (section `#blog`) |
| Thêm project mới | `index.html` (section `#projects`) |

## 🔧 Tech Stack

- HTML5 (semantic)
- CSS3 (Grid, Flexbox, Custom Properties, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome 6 (icons)
- Google Fonts (Space Grotesk + JetBrains Mono)

**Không có dependency nào cần npm install** — toàn bộ asset bên thứ 3 đều load qua CDN.

## 📱 Browser Support

Hoạt động tốt trên:
- Chrome / Edge / Brave (Chromium 90+)
- Firefox 88+
- Safari 14+

---

Made with ♥ by Huỳnh Nguyễn Xuân Huy · 2026
