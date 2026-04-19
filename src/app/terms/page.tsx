import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-primary mb-12 transition-colors">
        <ArrowLeft size={18} /> Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert prose-emerald">
        <p className="text-white/60 mb-6 italic">Last Updated: April 19, 2026</p>
        <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
        <p className="text-white/60 mb-6">
          By accessing or using the EcoMetal platform, you agree to be bound by these terms. Our platform provides AI-driven E-Waste management and a marketplace for recovered metals.
        </p>
        <h2 className="text-2xl font-bold mb-4">2. Marketplace Conduct</h2>
        <p className="text-white/60 mb-6">
          All purchase requests made on the marketplace are subject to verification. Users are prohibited from misrepresenting their buyer status or manipulating inventory data.
        </p>
        <h2 className="text-2xl font-bold mb-4">3. Limitation of Liability</h2>
        <p className="text-white/60 mb-6">
          EcoMetal provides purity estimates based on visual and spectrometer analysis. While we strive for 100% accuracy, users should perform their own verification for high-precision manufacturing.
        </p>
      </div>
    </div>
  );
}
