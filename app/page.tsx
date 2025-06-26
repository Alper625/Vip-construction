import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "./components/product-card"
import { ArrowRight, Shield, Truck, Clock } from "lucide-react"
import { getCategories } from "@/services/categoryservice";
import { getFeaturedProducts } from "@/services/productservice";

export default async function HomePage() {
  const [featuredProducts = [], categories = []] = await Promise.all([getFeaturedProducts(), getCategories()])
 
  return (
    <div>
      {/* Hero Section */}
      <section className="construction-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Всичко за строителя – професионални инструменти за всяка задача</h1>
              <p className="text-xl mb-8 text-blue-100">
              Доверен избор на професионалисти и майстори. Качествени инструменти, конкурентни цени и експертно обслужване
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalog">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                   Към магазина
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full h-0 pb-[66.67%] ml-10">
              <Image
                src="/HomePagePic.png"
                alt="Construction tools"
                fill
                className="rounded-lg shadow-2xl object-cover"
              />
          </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Гаранция за качество</h3>
                <p className="text-slate-600">Гаранция и качество за всеки инструмент</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Професионална помощ от нашите експерти</h3>
                <p className="text-slate-600">Получете помощ от нашите специалисти по инструменти</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Препоръчани продукти</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Открий най-популярните ни инструменти и оборудване
            </p>
          </div>

          {featuredProducts ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {featuredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center">
                <Link href="/catalog">
                  <Button size="lg" className="btn-primary">
                    Виж всички продукти
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Unable to load featured products at this time.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
