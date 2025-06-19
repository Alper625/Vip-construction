import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">About Us</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          At VIP Construction, we are committed to providing high-quality tools and equipment for professionals and DIY enthusiasts alike. 
          With years of experience in the industry, we pride ourselves on offering exceptional products and outstanding customer service.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            Our mission is to empower builders, contractors, and hobbyists with the tools they need to bring their projects to life. 
            We carefully select our products to ensure they meet the highest standards of quality and reliability.
          </p>
        </div>
        <div className="relative">
          <Image
            src="/about-us-placeholder.jpg"
            alt="About Us"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}