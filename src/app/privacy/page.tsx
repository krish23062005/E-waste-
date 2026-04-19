import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-primary mb-12 transition-colors">
        <ArrowLeft size={18} /> Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert prose-emerald">
        <p className="text-white/60 mb-6 italic">Last Updated: April 19, 2026</p>
        <h2 className="text-2xl font-bold mb-4">1. Data Collection</h2>
        <p className="text-white/60 mb-6">
          EcoMetal collects information relative to e-waste disposal inquiries, purchase requests, and industrial metal trading. This includes contact details and company information used solely for processing orders and verifying buyer status.
        </p>
        <h2 className="text-2xl font-bold mb-4">2. Use of Information</h2>
        <p className="text-white/60 mb-6">
          We use collected data to facilitate the smart segregation of metals, coordinate logistics with our warehouse partners, and manage the EcoMetal Marketplace.
        </p>
        <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
        <p className="text-white/60 mb-6">
          Your data is stored securely. We do not sell or share individual contact information with third parties without explicit consent, except as required for logistics and legal compliance.
        </p>
      </div>
    </div>
  );
}
