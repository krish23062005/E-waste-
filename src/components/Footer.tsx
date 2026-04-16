import Link from "next/link";
import { Recycle, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Recycle size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Eco<span className="text-primary">Metal</span>
              </span>
            </Link>
            <p className="text-white/60 max-w-sm mb-6">
              Transforming e-waste into valuable resources through smart segregation and automated storage management.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white/40 hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white/40 hover:text-primary transition-colors">
                <Github size={20} />
              </Link>
              <Link href="#" className="text-white/40 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white/90">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">
                  Warehouse Dashboard
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-white/60 hover:text-white transition-colors">
                  Metal Marketplace
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/60 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white/90">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#about" className="text-white/60 hover:text-white transition-colors">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/#impact" className="text-white/60 hover:text-white transition-colors">
                  Environmental Impact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} EcoMetal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
