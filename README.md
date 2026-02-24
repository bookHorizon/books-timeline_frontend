# BookHorizon 書海藍圖

> 一個支援中英雙語的書籍探索平台，透過 Google 圖書 API 搜尋書籍，並提供使用者帳號管理及個人化體驗。

## 專案介紹

**BookHorizon（書海藍圖）** 是以 Vue 3 + Vite 開發的書籍探索型前端專案，支援中英雙語切換（i18n），整合 Google Books API，讓使用者可以搜尋書籍、瀏覽書籍詳情，並透過帳號系統儲存個人書單紀錄。

- 🌐 **線上網站**：[BookHorizon](https://bookhorizon.example.com)（更新為實際網址）
- 🖥️ **前端 Repository**：[BookHorizon](https://github.com/your-username/BookHorizon)

---

## 功能說明

### 使用者相關功能

#### 🔐 帳號模組

- **會員註冊**：輸入帳號、Email 及密碼，即可完成註冊。
- **會員登入**：支援一般帳號登入與 Google OAuth 第三方登入。
- **電子郵件驗證**：註冊後寄送驗證信，驗證後方可正常使用帳號功能。
- **JWT Token 管理**：透過 Access Token / Refresh Token 機制維持登入狀態。

#### 📚 書籍模組

- **書籍搜尋**：整合 Google Books API，可依書名、作者等關鍵字搜尋書籍。
- **書籍詳情**：瀏覽書籍封面、摘要、作者、出版資訊等詳細內容。
- **書單管理**：登入後可將書籍加入個人書單，方便日後追蹤。

#### 🌍 語言切換

- **中英雙語支援**：透過 `vue-i18n` 實現中文（繁體）與英文的即時語言切換。
- **動態頁面標題**：語言切換時，瀏覽器分頁標題同步更新（書海藍圖 / Book Horizon）。

#### 🧩 其他功能

- **響應式設計**：適配桌面與行動裝置。
- **404 頁面**：未匹配路由時顯示友善錯誤提示頁。
- **IP 偵測服務**：整合 ipapi，於登入通知時使用者定位地點，確認使用者是否為本人。

---

## 專案執行

**1. 安裝專案所需套件**

```sh
npm install
```

**2. 啟動本地開發伺服器**（預設於 `http://localhost:5173`）

```sh
npm run dev
```

**3. 建構 Production 版本**

```sh
npm run build
```

**4. 預覽 Production 版本**

```sh
npm run preview
```

---

## 專案技術

### 框架與核心

| 技術                                      | 說明                           |
| ----------------------------------------- | ------------------------------ |
| [Vue 3](https://vuejs.org/)               | 前端框架，使用 Composition API |
| [Vite](https://vitejs.dev/)               | 前端建構工具                   |
| [Vue Router 4](https://router.vuejs.org/) | 前端路由管理                   |
| [Pinia](https://pinia.vuejs.org/)         | 全域狀態管理                   |

### 第三方套件

| 套件                                          | 說明               |
| --------------------------------------------- | ------------------ |
| [vue-i18n](https://vue-i18n.intlify.dev/)     | 中英雙語國際化支援 |
| [axios](https://axios-http.com/)              | HTTP 請求處理      |
| [Element Plus](https://element-plus.org/)     | UI 元件庫          |
| [Swiper](https://swiperjs.com/)               | 輪播功能           |
| [@splidejs/vue-splide](https://splidejs.com/) | 輪播元件           |
| [sass](https://sass-lang.com/)                | CSS 預處理器       |

### 開發工具

| 工具                                                                           | 說明                  |
| ------------------------------------------------------------------------------ | --------------------- |
| [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)          | 自動引入 Vue 相關 API |
| [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)    | 自動引入 Vue 元件     |
| [unplugin-element-plus](https://github.com/element-plus/unplugin-element-plus) | Element Plus 按需引入 |

### 第三方 API

| API                                                        | 說明                                |
| ---------------------------------------------------------- | ----------------------------------- |
| [Google Books API](https://developers.google.com/books)    | 書籍搜尋與資料來源                  |
| [Google OAuth 2.0](https://developers.google.com/identity) | 第三方 Google 帳號登入              |
| [ipapi](https://ipapi.co/)                                 | IP 地址偵測，自動判斷使用者所在地區 |

---

## 專案結構

```
BookHorizon/
├── public/               # 靜態資源
├── src/
│   ├── assets/           # 圖片、字體等資源
│   ├── components/       # 共用元件
│   │   ├── auth/         # 登入/註冊相關元件
│   │   ├── global/       # 全域共用元件（按鈕、表單、圖示、版型）
│   │   └── home/         # 首頁專屬元件
│   ├── composables/      # Vue Composables（可複用邏輯）
│   ├── config/           # 全域設定檔
│   ├── i18n/             # 多語系翻譯資源
│   ├── plugins/          # Vue 插件設定
│   ├── router/           # Vue Router 路由設定
│   ├── services/         # API 請求與外部服務封裝
│   │   └── api/          # 各功能 API 模組（帳號、書籍、Token 等）
│   ├── stores/           # Pinia 狀態管理
│   ├── style/            # 全域樣式
│   └── views/            # 頁面元件
│       ├── HomeView.vue
│       ├── LoginView.vue
│       ├── RegisterView.vue
│       ├── AboutView.vue
│       ├── AuthView.vue
│       └── 404.vue
├── cypress/              # E2E 測試資料夾
├── Dockerfile            # Docker 配置
├── nginx.conf            # Nginx 配置
├── vite.config.js        # Vite 設定
└── package.json
```

---

## 推薦開發環境

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（請停用 Vetur）

---

## 聲明

本專案圖片及內容純粹作為個人學習與練習前端技術使用，不作任何商業用途。

---

## 專案授權

[MIT License](https://choosealicense.com/licenses/mit/)
