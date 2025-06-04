import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "./components/header"
import { CartProvider } from "./components/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProBuild Supply - Professional Construction Tools & Equipment",
  description:
    "Your trusted source for quality construction tools, equipment, and supplies. Serving contractors and DIY enthusiasts.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-slate-800 text-white py-8 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">ProBuild Supply</h3>
                  <p className="text-slate-300">
                    Your trusted partner for professional construction tools and equipment.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Shipping Info</li>
                    <li>Returns</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Categories</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>Power Tools</li>
                    <li>Hand Tools</li>
                    <li>Safety Equipmentt</li>
                    <li>Hardware</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Contact Info</h4>
                  <div className="text-slate-300 space-y-2">
                    <p>1-800-PROBUILD</p>
                    <p>info@probuildsupply.com</p>
                    <p>Mon-Fri: 7AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
