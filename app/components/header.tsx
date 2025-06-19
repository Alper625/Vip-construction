"use client"

import type React from "react"

import Link from "next/link"
import { Search, ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItems } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 construction-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PB</span>
            </div>
            <span className="text-2xl font-bold text-slate-800">ProBuild Supply</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-700 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link href="/catalog" className="text-slate-700 hover:text-orange-500 font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-slate-700 hover:text-orange-500 font-medium">
              Categories
            </Link>
            <Link href="/aboutus" className="text-slate-700 hover:text-orange-500 font-medium">
              About us
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search tools and equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1 h-8 w-8 p-0" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-slate-700 hover:text-orange-500" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-slate-700 hover:text-orange-500 font-medium">
                Home
              </Link>
              <Link href="/catalog" className="text-slate-700 hover:text-orange-500 font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-slate-700 hover:text-orange-500 font-medium">
                Categories
              </Link>
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-2"
                />
                <Button type="submit" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
