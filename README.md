# EcoMetal | Smart E-Waste Segregation Platform

EcoMetal is a premium, AI-powered platform designed to revolutionize the e-waste lifecycle. From automated collection and segregation to a transparent marketplace for recovered precious metals, EcoMetal ensures sustainability meets profitability.

## 🚀 Key Features

- **Smart AI Segregation**: Real-time identification and routing of metals (Copper, Gold, Lithium, etc.) using computer vision and composition analysis.
- **Warehouse Storage Dashboard**: Live tracking of inventory levels, storage capacity, and automated bin allocation.
- **Precious Metal Marketplace**: A secure hub for professional buyers to purchase high-purity recycled metals with bulk-sample verification.
- **Environmental Impact Tracking**: Real-time metrics on CO2 savings, energy conservation, and toxin neutralization.
- **Next.js 16 + Tailwind CSS v4**: Built with the latest cutting-edge technologies for maximum performance and a premium "glass-morphism" aesthetic.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [Prisma](https://www.prisma.io/) with SQLite
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📦 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Database Setup
```bash
npx prisma generate
node seed.js
```

### 3. Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the platform in action.

## 🌎 SEO & Sitemaps
The project includes automated sitemap and robots generation located in `src/app/sitemap.ts` and `src/app/robots.ts`. Ensure `NEXT_PUBLIC_BASE_URL` is set in your environment for production deployment.

---
Built with ❤️ for a Sustainable Future.
