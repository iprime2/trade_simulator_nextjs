# 🧪 Trade Simulator Frontend (Next.js)

This is the frontend application for the GoQuant Trade Simulator. It is built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI**. The application interacts with a FastAPI backend to simulate trade cost components in real-time using live order book data from OKX.

![image](https://github.com/user-attachments/assets/647b55a1-d0de-4771-8ed6-ac159e2a2061)

---

## 🌐 Project Overview

The simulator allows users to input trade parameters and receive simulated execution metrics such as:

- 📉 **Slippage** (regression modeled)
- 🧮 **Fees** (rule-based)
- 📊 **Market Impact** (Almgren-Chriss model)
- 💰 **Net Cost**
- 🔄 **Maker/Taker Ratio**
- ⚡ **Latency (ms)**

It also features:
- Live-updating output as L2 tick data changes
- Volatility slider and asset selector
- Light/Dark mode toggle
- Real-time latency chart and live order book view

---

## ⚙️ Tech Stack

- [Next.js 15](https://nextjs.org)
- [React 19](https://react.dev)
- [ShadCN UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Chart.js](https://www.chartjs.org/) for latency visualization

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/trade-simulator-frontend.git
cd trade-simulator-frontend
```

### 2. Install Dependencies (Using pnpm)

```bash
pnpm install
```

> You can also use `npm install` if you're not using pnpm.

### 3. Set Environment Variables

Create a `.env.local` file:

```bash
touch .env.local
```

Add the following:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

> Make sure your backend is running on the specified URL.

### 4. Run the Development Server

```bash
pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
components/
├─ InputForm.tsx
├─ OutputMetrics.tsx
├─ LiveOrderbook.tsx
├─ LatencyChart.tsx
lib/
├─ tickStore.ts          # Zustand store for shared tick state
app/
├─ page.tsx              # Main page layout
.env.local               # Frontend env variables
```

---

## 🧪 Example Usage

1. Select a spot asset (e.g., BTC-USDT)
2. Adjust order size, order type, fee rate, and volatility
3. Click **Simulate**
4. View updated slippage, market impact, net cost, and latency metrics

---

## 📦 API Reference

👉 [See Full Backend API Docs](./api-docs.md)

---

## 📬 Contact

For technical inquiries or to report issues:

📧 careers@goquant.io

---

Built for the GoQuant Assessment 🚀
