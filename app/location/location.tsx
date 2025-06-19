import { MapPin } from "lucide-react"

export default function LocationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Our Location</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Visit us at our store or contact us for more information. We are here to help you find the perfect tools for your next project.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Store Address</h2>
          <p className="text-slate-600 leading-relaxed">
            VIP Construction<br />
            123 Main Street<br />
            Springfield, USA<br />
            Phone: (123) 456-7890<br />
            Email: info@vipconstruction.com
          </p>
        </div>
        <div className="relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.41941548468132!3d37.77492977975961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f0e0b1b1%3A0x4e9b8b8b8b8b8b8b!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>
  )
}