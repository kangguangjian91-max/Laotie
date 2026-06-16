import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Steel Structure Cost Calculator 2026 | Free Online Quote Tool",
  description:
    "Free steel structure cost calculator 2026. Estimate steel building price per m² by building type, size, crane, and location (Australia, China, Nigeria, Philippines, UAE, Indonesia). Q355B steel structure pricing.",
  keywords: [
    "steel structure cost calculator",
    "steel building price per m² 2026",
    "warehouse construction cost Australia",
    "Q355B steel price per ton",
    "steel structure quote online",
    "prefab steel building cost calculator",
  ],
  openGraph: {
    title: "Steel Structure Cost Calculator 2026 | Laotie Steel",
    description:
      "Get instant steel structure cost estimate. Free online calculator for warehouse, factory, hangar, logistics center.",
    url: "https://www.laotie-steel.com/calculator",
    siteName: "Laotie Steel Structure",
    images: [
      {
        url: "https://www.laotie-steel.com/images/og-calculator.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Structure Cost Calculator 2026",
    description: "Free online tool to estimate steel building construction cost.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Steel Structure Cost Calculator",
  description:
    "Free online calculator for estimating steel building construction costs. Covers warehouse, factory, aircraft hangar, logistics center.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Laotie Steel Structure Co., Ltd.",
    url: "https://www.laotie-steel.com",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "126",
  },
};

export default function CalculatorPage() {
  return (
    <main className="bg-white">
      {/* ===== Hero Section ===== */}
      <section className="bg-steel text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Steel Structure Cost Calculator 2026
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Get a preliminary quote in 1 minute. Estimate steel building price
            by building type, dimensions, crane system, and project location.
            Covers Australia, China, Nigeria, Philippines, UAE, Indonesia.
          </p>
        </div>
      </section>

      {/* ===== Calculator Component (Client-side) ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Calculator />
        </div>
      </section>

      {/* ===== SEO Content: How to Estimate Steel Structure Cost ===== */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2>How to Estimate Steel Structure Cost in 2026</h2>
          <p>
            Estimating the cost of a steel structure building involves multiple
            factors: steel tonnage, cladding system (roof & wall panels),
            ocean freight, on-site installation, foundation work, design &
            engineering, and a contingency buffer. This calculator uses
            industry-standard formulas and regional price benchmarks to provide a
            reliable preliminary estimate (±15–20% accuracy).
          </p>

          <h3>1. Steel Tonnage Estimation</h3>
          <p>
            The primary driver of cost is the weight of the steel structure.
            Tonnage is estimated based on building type and dimensions:
          </p>
          <ul>
            <li>
              <strong>Warehouse / Logistics Center:</strong> 26–32 kg/m²
              (typical clear-span, 6–12m eave height)
            </li>
            <li>
              <strong>Factory / Multi-span:</strong> 35–42 kg/m² (with
              overhead crane, 10–18m span)
            </li>
            <li>
              <strong>Aircraft Hangar / Large-span Space Frame:</strong>{" "}
              48–55 kg/m² (60–120m clear span, space frame roof)
            </li>
          </ul>
          <p>
            <em>Formula:</em> <code>Steel Tons = Area (L × W) × Rate (kg/m²) ÷ 1000</code>
          </p>

          <h3>2. Cladding System (Roof & Wall Panels)</h3>
          <p>
            Roof and wall panels are typically sandwich panels (PU/PIR
            insulation) or single-skin Colorbond sheets. Cost depends on panel
            thickness (50mm, 75mm, 100mm) and coating type.
          </p>
          <ul>
            <li>
              <strong>Roof area:</strong> Length × Width (same as building
              footprint)
            </li>
            <li>
              <strong>Wall area:</strong> 2 × (Length + Width) × Eave
              Height (simplified, excludes doors/windows)
            </li>
          </ul>

          <h3>3. Ocean Freight (Containerized Shipping)</h3>
          <p>
            Steel structures are shipped in 40HQ containers. Each container
            holds approximately 27 tons of fabricated steel members. Freight
            cost is calculated per container, not per ton.
          </p>
          <p>
            <em>Formula:</em>{" "}
            <code>
              Containers = CEIL(Steel Tons ÷ 27) × Freight per Container
            </code>
          </p>

          <h3>4. Installation & Foundation</h3>
          <p>
            On-site costs vary significantly by region. Australia and UAE have
            higher labor rates; Nigeria and Philippines have lower rates but
            longer lead times. Foundation cost depends on soil condition and
            building load.
          </p>

          <h2>Steel Structure Price per m² by Country (2026 Benchmark)</h2>
          <table className="w-full border-collapse border border-gray-300 my-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Country / Region</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Price Range (USD/m²)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Key Factors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Australia</td>
                <td className="border border-gray-300 px-4 py-2">850 – 1,200</td>
                <td className="border border-gray-300 px-4 py-2">High labor cost, strict codes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">China (Domestic)</td>
                <td className="border border-gray-300 px-4 py-2">320 – 480</td>
                <td className="border border-gray-300 px-4 py-2">Lowest manufacturing cost</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Nigeria</td>
                <td className="border border-gray-300 px-4 py-2">750 – 1,050</td>
                <td className="border border-gray-300 px-4 py-2">High freight, customs delay</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Philippines</td>
                <td className="border border-gray-300 px-4 py-2">680 – 950</td>
                <td className="border border-gray-300 px-4 py-2">Typhoon-resistant design</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">UAE (Dubai)</td>
                <td className="border border-gray-300 px-4 py-2">800 – 1,100</td>
                <td className="border border-gray-300 px-4 py-2">High temperature rating</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Indonesia</td>
                <td className="border border-gray-300 px-4 py-2">650 – 900</td>
                <td className="border border-gray-300 px-4 py-2">Seismic & tropical design</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-gray-500">
            * Prices are indicative for turnkey steel buildings (supply + freight +
            installation). Actual price depends on steel spec, cladding, crane,
            and site condition.
          </p>

          <h2>Factors Affecting Steel Building Price</h2>
          <h3>1. Steel Grade (Q235B vs Q355B vs Q420B)</h3>
          <p>
            Q355B is the most common grade for prefab steel warehouses. Q420B
            is used for large-span structures (hangars, exhibition halls).
            Higher grade = higher price per ton, but less tonnage required.
          </p>

          <h3>2. Crane System (Overhead Crane Tonnage)</h3>
          <p>
            Adding a 5–50T overhead crane increases steel tonnage by 3–12
            kg/m², depending on crane capacity and runway beam design.
          </p>

          <h3>3. Building Span & Column Spacing</h3>
          <p>
            Clear-span (no interior columns) requires larger steel sections.
            Multi-span with interior columns reduces steel tonnage by 10–15%.
          </p>

          <h3>4. Cladding Type & Insulation</h3>
          <p>
            Sandwich panels (50mm PU) cost ≈ USD 25–42/m². Single-skin steel
            sheet + insulation batts cost ≈ USD 15–25/m².
          </p>

          <h3>5. Foundation Complexity</h3>
          <p>
            Simple pin foundation (good soil): ≈ USD 25–45/m². Pile
            foundation (soft soil): ≈ USD 60–120/m².
          </p>

          <h2>FAQ: Steel Structure Cost Calculator</h2>

          <details className="mb-4 border border-gray-200 rounded p-4">
            <summary className="font-semibold cursor-pointer">
              How accurate is this calculator?
            </summary>
            <p className="mt-2 text-gray-700">
              The estimate is ±15–20% accurate for standard steel buildings.
              Accuracy improves when you have final architectural/structural
              drawings. For a detailed quote, contact our engineering team for a
              full design & quotation package.
            </p>
          </details>

          <details className="mb-4 border border-gray-200 rounded p-4">
            <summary className="font-semibold cursor-pointer">
              What's included in the price?
            </summary>
            <p className="mt-2 text-gray-700">
              The calculator estimates: (1) Steel structure fabrication (Q355B),
              (2) Roof & wall sandwich panels, (3) Ocean freight (containers),
              (4) On-site installation labor, (5) Foundation work, (6) Design &
              engineering (3–7%), (7) Contingency buffer (5–12%).
            </p>
          </details>

          <details className="mb-4 border border-gray-200 rounded p-4">
            <summary className="font-semibold cursor-pointer">
              Can I use this for Australian building approval?
            </summary>
            <p className="mt-2 text-gray-700">
              No. This is a preliminary cost estimator. For Australian projects,
              you need a Class 2 engineer's design certificate (AS 4100
              compliance). Laotie Steel provides full engineering packages with
              Australian-standard calculations.
            </p>
          </details>

          <details className="mb-4 border border-gray-200 rounded p-4">
            <summary className="font-semibold cursor-pointer">
              How long does production & delivery take?
            </summary>
            <p className="mt-2 text-gray-700">
              Production: 4–8 weeks (depending on shop drawing approval &
              material availability). Ocean freight: 8–45 days (depending on
              destination). Installation: 2–8 weeks (depending on building
              size).
            </p>
          </details>

          <details className="mb-4 border border-gray-200 rounded p-4">
            <summary className="font-semibold cursor-pointer">
              Do you provide steel structure for residential houses?
            </summary>
            <p className="mt-2 text-gray-700">
              This calculator is designed for industrial & commercial steel
              buildings (warehouse, factory, hangar, logistics center). For
              residential steel frame houses, please contact us for a separate
              quotation.
            </p>
          </details>

          <h2>About Laotie Steel Structure Co., Ltd.</h2>
          <p>
            Laotie Steel Structure Co., Ltd. is a leading Chinese
            manufacturer of prefabricated steel buildings. We specialize in
            design, fabrication, and installation of Q355B steel structures for
            global clients. Our production base in China has 5,000 tons/month
            capacity, with projects completed in Australia, Nigeria, Philippines,
            UAE, Indonesia, and China.
          </p>
          <p>
            All our steel structures are designed to international standards
            (AS 4100, AS/NZS 1170, SNI 1727, BS 5950) and fabricated
            under ISO 9001 quality management.
          </p>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Get a Detailed Quote</h3>
            <p className="mb-4">
              This calculator provides a preliminary estimate. For a detailed
              quotation with engineering drawings, please contact our team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-steel text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              Contact Us for Detailed Quote →
            </a>
          </div>
        </div>
      </section>

      {/* ===== Schema JSON-LD ===== */}
      <Script
        id="json-ld-calculator"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
    </main>
  );
}
