import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Building, Factory, Warehouse, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Client Reviews | Laotie Steel Structure",
  description: "Explore our successful steel structure projects worldwide. Read client reviews and see how Laotie Steel delivers quality prefab buildings for warehouses, workshops, and industrial facilities.",
  openGraph: {
    title: "Case Studies & Client Reviews | Laotie Steel Structure",
    description: "Explore our successful steel structure projects worldwide. Read client reviews and see how Laotie Steel delivers quality prefab buildings.",
    url: "https://www.laotie-steel.com/case-studies",
    images: [
      {
        url: "https://www.laotie-steel.com/images/og-case-studies.jpg",
        width: 1200,
        height: 630,
        alt: "Laotie Steel Structure Case Studies",
      },
    ],
  },
};

const caseStudies = [
  {
    id: "vietnam-warehouse-5000sqm",
    title: "5,000 sqm Warehouse Complex in Hanoi, Vietnam",
    client: "Logistics Company",
    location: "Hanoi, Vietnam",
    year: "2025",
    buildingType: "Warehouse",
    size: "5,000 sqm",
    image: "/images/vietnam/3c827b0a462391a3e3486e39a5ae25d4.webp",
    description: "Complete steel structure warehouse for logistics company in Hanoi. Including design, fabrication, and installation guidance.",
    challenge: "Client needed a large warehouse within 4 months to meet growing demand.",
    solution: "We provided pre-engineered steel structure with fast fabrication and detailed installation drawings.",
    result: "Project completed on time. Client praised our quality and service.",
    tags: ["Warehouse", "Vietnam", "Logistics"],
  },
  {
    id: "indonesia-factory-8000sqm",
    title: "8,000 sqm Electronics Factory in Jakarta, Indonesia",
    client: "Electronics Manufacturer",
    location: "Jakarta, Indonesia",
    year: "2024",
    buildingType: "Factory",
    size: "8,000 sqm",
    image: "/images/indonesia/project-jakarta-01.webp",
    description: "Steel structure factory for electronics manufacturer in Jakarta. Custom design with ESD flooring.",
    challenge: "Client required high-quality factory with strict tolerances for electronics production.",
    solution: "We provided precision-engineered steel structure with custom crane system.",
    result: "Factory operational within 6 months. Client satisfied with quality.",
    tags: ["Factory", "Indonesia", "Electronics"],
  },
  {
    id: "nigeria-warehouse-3500sqm",
    title: "3,500 sqm Logistics Center in Lagos, Nigeria",
    client: "Logistics Company",
    location: "Lagos, Nigeria",
    year: "2025",
    buildingType: "Warehouse",
    size: "3,500 sqm",
    image: "/images/nigeria/project-lagos-01.webp",
    description: "Steel structure warehouse in Lagos. Designed for heavy rain and storm protection.",
    challenge: "Client needed warehouse that can withstand heavy rain and storms in Nigeria.",
    solution: "We provided steel structure with enhanced corrosion protection and storm-resistant design.",
    result: "Warehouse completed. Client appreciated our local climate adaptation.",
    tags: ["Warehouse", "Nigeria", "Logistics"],
  },
];

const clientReviews = [
  {
    id: 1,
    client: "Nguyen Van A",
    company: "Logistics Company",
    location: "Hanoi, Vietnam",
    rating: 5,
    review: "Laotie Steel provided excellent service. Their warehouse quality is outstanding. Highly recommended!",
    project: "5,000 sqm Warehouse in Hanoi",
    date: "March 2025",
  },
  {
    id: 2,
    client: "Budi Santoso",
    company: "Electronics Manufacturer",
    location: "Jakarta, Indonesia",
    rating: 5,
    review: "We are very satisfied with Laotie's factory building. The quality is excellent and installation guidance was very helpful.",
    project: "8,000 sqm Factory in Jakarta",
    date: "December 2024",
  },
  {
    id: 3,
    client: "Mohammed Bello",
    company: "Logistics Company",
    location: "Lagos, Nigeria",
    rating: 5,
    review: "Laotie Steel understands Nigerian climate. Their warehouse design is perfect for heavy rain protection.",
    project: "3,500 sqm Warehouse in Lagos",
    date: "January 2025",
  },
  {
    id: 4,
    client: "Maria Santos",
    company: "Manufacturing Company",
    location: "Manila, Philippines",
    rating: 5,
    review: "Excellent communication and fast response. Laotie delivered quality steel structure for our factory.",
    project: "6,000 sqm Factory in Manila",
    date: "February 2025",
  },
  {
    id: 5,
    client: "Somchai Tanaka",
    company: "Agricultural Company",
    location: "Bangkok, Thailand",
    rating: 5,
    review: "Laotie Steel provided complete solution for our processing plant. Very professional team.",
    project: "4,200 sqm Processing Plant in Bangkok",
    date: "April 2025",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies & Client Reviews</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore our successful projects worldwide and read what our clients say about Laotie Steel Structure.
          </p>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Case Studies</h2>
          
          <div className="space-y-12">
            {caseStudies.map((caseStudy) => (
              <div key={caseStudy.id} className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
                <div className="md:w-2/5 relative">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                    style={{ minHeight: "300px" }}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {caseStudy.year}
                  </div>
                </div>
                
                <div className="md:w-3/5 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">{caseStudy.buildingType} • {caseStudy.size}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                  <p className="text-gray-600 mb-4">{caseStudy.client} • {caseStudy.location}</p>
                  
                  <p className="text-gray-700 mb-6">{caseStudy.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Challenge</h4>
                      <p className="text-sm">{caseStudy.challenge}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Solution</h4>
                      <p className="text-sm">{caseStudy.solution}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Result</h4>
                      <p className="text-sm">{caseStudy.result}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 italic">"{review.review}"</p>
                
                <div className="border-t pt-4">
                  <p className="font-bold">{review.client}</p>
                  <p className="text-sm text-gray-600">{review.company}</p>
                  <p className="text-sm text-gray-500">{review.location} • {review.date}</p>
                  <p className="text-sm text-blue-600 mt-1">{review.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-blue-200">Countries Exported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact Laotie Steel Structure today for a free quotation within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Get Free Quote
            </Link>
            <a
              href="https://wa.me/8616650735555"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.123c-1.016-1.687-1.687-3.646-1.687-5.732 0-3.371 2.762-6.133 6.133-6.133 1.672 0 3.246.659 4.422 1.856l.657.755 4.197-1.10-1.46-4.213c.88-1.946.88-4.133-.043-6.087C17.63.953 15.074-.31 12.217-.31c-3.646 0-6.936 2.153-8.538 5.48C1.826 8.026.18 11.137.18 14.146c0 2.714 1.244 5.303 3.346 7.043l-1.427 5.316z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
