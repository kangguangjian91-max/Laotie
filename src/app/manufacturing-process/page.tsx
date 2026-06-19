import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";

import DOMPurify from "isomorphic-dompurify";

export const metadata: Metadata = {
  title: "Steel Structure Manufacturing Process | 7-Step Quality Control | Laotie Steel",
  description:
    "Discover Laotie Steel's 7-step steel structure manufacturing process: material inspection, CNC cutting, assembly, welding, surface treatment, packaging, and delivery. ISO 9001 certified quality management.",
  openGraph: {
    title: "Steel Structure Manufacturing Process | Laotie Steel",
    description:
      "From raw material to finished steel structure — see our 7-step quality-controlled manufacturing process with real factory photos.",
    url: "https://www.laotie-steel.com/manufacturing-process",
    type: "website",
    images: [{ url: "/images/manufacturing-process/02-cnc-cutting.webp" }],
  },
  alternates: {
    canonical: "https://www.laotie-steel.com/manufacturing-process",
  },
};

const steps = [
  {
    step: 1,
    title: "Raw Material Inspection & MTC Verification",
    subtitle: "Material Traceability Starts Here",
    description: `
      <p>Every batch of raw steel (H-beam, angle steel, steel plate) arrives with a Mill Test Certificate (MTC) compliant with EN 10204 3.1. Our QC team verifies:</p>
      <ul>
        <li><strong>Chemical composition</strong> — spectometer test for C, Si, Mn, P, S, and alloy elements</li>
        <li><strong>Mechanical properties</strong> — yield strength, tensile strength, elongation (verified by third-party lab if required)</li>
        <li><strong>Dimensions</strong> — beam height, flange width, web thickness measured per order specification</li>
        <li><strong>Surface condition</strong> — no cracks, laminations, or heavy rust (Sa 2.5 required for coated members)</li>
      </ul>
      <p>Only material passing all checks enters our production line. Non-conforming material is quarantined and returned to the mill within 48 hours.</p>
    `,
    image: "/images/manufacturing-process/01-material-inspection.webp",
    specs: [
      "EN 10204 3.1 MTC provided",
      "Spectrometer chemical analysis",
      "Dimensional tolerance ±1mm",
      "100% incoming inspection",
    ],
  },
  {
    step: 2,
    title: "CNC Cutting & Machining",
    subtitle: "Precision Cutting with ±1mm Tolerance",
    description: `
      <p>Steel plates and sections are cut using our 12-head CNC plasma/flame cutting system. The cutting program is directly generated from Tekla/SkyCiv models, ensuring 100% dimensional accuracy.</p>
      <ul>
        <li><strong>Plate cutting</strong> — up to 80mm thick plates, ±1mm tolerance</li>
        <li><strong>Beam coping</strong> — end copes, flange cuts, and web cuts for moment connections</li>
        <li><strong>Hole drilling</strong> — CNC drilling for bolted connections (±0.5mm hole position tolerance)</li>
        <li><strong>Edge machining</strong> — milling for crane runway beams (flatness ±2mm over full length)</li>
      </ul>
      <p>Cut parts are immediately labeled with a unique serial number that traces back to the original mill test report and the project's fabrication drawing.</p>
    `,
    image: "/images/manufacturing-process/02-cnc-cutting.webp",
    specs: [
      "±1mm cutting tolerance",
      "12-head CNC plasma system",
      "Tekla/SkyCiv direct NC file",
      "Serial number traceability",
    ],
  },
  {
    step: 3,
    title: "Component Assembly & Fit-Up",
    subtitle: "Accurate Fit-Up Before Welding",
    description: `
      <p>Cut components are assembled on our precision welding tables. Assembly jigs ensure correct member alignment before welding begins.</p>
      <ul>
        <li><strong>Sub-assembly</strong> — flange-to-web fit-up for H-sections, stiffener plate welding preparation</li>
        <li><strong>Main frame assembly</strong> — portal frame columns and rafters assembled on 20m-long precision tables</li>
        <li><strong>Dimensional check</strong> — overall length, height, connection plate positions verified with laser measuring tools</li>
        <li><strong>Tack welding</strong> — certified welders perform tack welding to maintain alignment during full welding</li>
      </ul>
      <p>Assembly tolerances follow ISO 13920: length ±2mm, straightness 1/1000, twist ≤3mm over full member length.</p>
    `,
    image: "/images/manufacturing-process/03-assembly.webp",
    specs: [
      "ISO 13920 tolerances",
      "Precision welding tables",
      "Laser dimensional check",
      "Certified tack welders",
    ],
  },
  {
    step: 4,
    title: "Automated Welding & NDT",
    subtitle: "Submerged Arc Welding (SAW) for Main Seams",
    description: `
      <p>Main structural seams are welded using automated submerged arc welding (SAW) for consistent penetration and minimal distortion. Fillet welds use MAG welding with certified welding procedures (WPS/PQR qualified per ISO 3834).</p>
      <ul>
        <li><strong>SAW welding</strong> — for H-section flange-to-web seams, 6-8mm weld size, 100% UT tested</li>
        <li><strong>MAG welding</strong> — for fillet welds, connection plates, and secondary members</li>
        <li><strong>UT inspection</strong> — ultrasonic testing per ISO 17640 for full-penetration welds</li>
        <li><strong>MPI inspection</strong> — magnetic particle inspection for fillet welds (spot check 20%)</li>
      </ul>
      <p>All welding is performed by AWS D1.1 / ISO 3834 certified welders. Welding consumables are stored in heated cabinets to prevent moisture absorption.</p>
    `,
    image: "/images/manufacturing-process/04-welding.webp",
    specs: [
      "AWS D1.1 / ISO 3834 certified",
      "SAW + MAG welding processes",
      "100% UT for full-penetration welds",
      "WPS/PQR qualified procedures",
    ],
  },
  {
    step: 5,
    title: "Shot Blasting & Surface Preparation",
    subtitle: "SA 2.5 Surface Profile for Optimal Coating Adhesion",
    description: `
      <p>All welded assemblies pass through our 8-wheel shot-blasting machine. Abrasive steel shot removes mill scale, rust, and welding spatter, achieving a clean surface profile.</p>
      <ul>
        <li><strong>Surface profile</strong> — SA 2.5 per ISO 8501-1 (near-white metal blast cleaning)</li>
        <li><strong>Roughness</strong> — 40-80μm anchor pattern for optimal coating adhesion</li>
        <li><strong>Dust removal</strong> — compressed air blow-off and vacuum cleaning before coating</li>
        <li><strong>Immediate coating</strong> — primer applied within 4 hours of blasting (max 8 hours in controlled humidity)</li>
      </ul>
      <p>Proper surface preparation is critical for coating longevity. Our SA 2.5 profile ensures coating system lifespan of 15-20 years in industrial environments.</p>
    `,
    image: "/images/manufacturing-process/05-surface-treatment.webp",
    specs: [
      "SA 2.5 per ISO 8501-1",
      "40-80μm anchor pattern",
      "8-wheel blasting machine",
      "4-hour prime window",
    ],
  },
  {
    step: 6,
    title: "Coating System Application",
    subtitle: "280-320μm DFT Epoxy + Polyurethane System",
    description: `
      <p>Coating is applied in our climate-controlled spraying booth. The coating system is selected based on the project's environmental conditions (C2-C5 per ISO 12944).</p>
      <ul>
        <li><strong>Epoxy zinc-rich primer</strong> — 75μm, cathodic protection for steel substrate</li>
        <li><strong>Epoxy intermediate coat</strong> — 125μm, barrier protection, high build</li>
        <li><strong>Polyurethane topcoat</strong> — 80μm, UV resistance, color retention</li>
        <li><strong>DFT verification</strong> — dry-film thickness measured at 5 points per member (SSPC-PA 2 compliant)</li>
      </ul>
      <p>For coastal or high-humidity projects, we upgrade to a 400μm DFT system with zinc-rich primer + epoxy intermediate + polyurethane topcoat + antifouling topcoat. All coating materials are batch-tracked for traceability.</p>
    `,
    image: "/images/manufacturing-process/06-packaging.webp",
    specs: [
      "280-320μm DFT (standard)",
      "400μm DFT (coastal upgrade)",
      "ISO 12944 C2-C5 systems",
      "SSPC-PA 2 thickness verification",
    ],
  },
  {
    step: 7,
    title: "Final QC, Packing & Shipping",
    subtitle: "Dimensional Check + Container Optimization",
    description: `
      <p>Before leaving our factory, every order undergoes a final quality control check and optimized container loading.</p>
      <ul>
        <li><strong>Dimensional QC</strong> — overall length/width/height checked against erection drawing (±2mm tolerance)</li>
        <li><strong>Connection check</strong> — bolt holes verified with gauge pins, connection plates checked for twist</li>
        <li><strong>Coating inspection</strong> — DFT re-checked, adhesion test (cross-cut) on 5% of members</li>
        <li><strong>Container loading</strong> — 3D container optimization software minimizes container count; heavy members at bottom, cladding protected with kraft paper interleaving</li>
      </ul>
      <p>Each shipment includes: (1) Packing list with zone cross-reference, (2) QC report with DFT readings and photos, (3) MTC for each steel batch, (4) Coating material certificates, (5) Container loading photos for insurance purposes.</p>
    `,
    image: "/images/manufacturing-process/07-delivery.webp",
    specs: [
      "±2mm final dimensional tolerance",
      "3D container optimization",
      "Full QC dossier per shipment",
      "Loading photos provided",
    ],
  },
];

const manufacturingSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Steel Structure Manufacturing Process",
  description:
    "Laotie Steel's 7-step manufacturing process for steel structure components, from raw material inspection to final QC and packing.",
  totalTime: "PT48H",
  tool: [
    "CNC Plasma Cutting Machine",
    "Automated Submerged Arc Welding (SAW) System",
    "8-Wheel Shot Blasting Machine",
    "Climate-Controlled Coating Booth",
    "3D Container Optimization Software",
  ],
  step: steps.map((s) => ({
    "@type": "HowToStep",
    url: `https://www.laotie-steel.com/manufacturing-process#step-${s.step}`,
    name: s.title,
    text: s.description.replace(/<[^>]+>/g, " ").trim(),
    position: s.step,
  })),
};

export default function ManufacturingProcessPage() {
  return (
    <>
      <JsonLd data={manufacturingSchema} />
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-steel to-steel-light text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a href="/" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:underline mb-4">
              <span>←</span> Back to Home
            </a>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Manufacturing Process</h1>
            <p className="text-gray-300 max-w-2xl">
              From raw material to finished steel structure — our 7-step, ISO 9001-certified manufacturing process
              ensures every component meets international quality standards.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-16">
            {steps.map((step) => (
              <div
                key={step.step}
                id={`step-${step.step}`}
                className={`flex flex-col ${step.step % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
              >
                {/* Image */}
                <div className="flex-1 relative">
                  <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                    <Image
                      src={step.image}
                      alt={`Step ${step.step}: ${step.title} - Laotie Steel manufacturing process`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-steel-accent text-white font-bold text-xl flex items-center justify-center shadow-lg">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="text-steel-accent font-semibold text-sm mb-2">
                    Step {step.step} — {step.subtitle}
                  </div>
                  <h2 className="text-2xl font-bold text-steel mb-4">{step.title}</h2>
                  <div
                    className="text-gray-600 leading-relaxed space-y-3 mb-6"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(step.description) }}
                  />
                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2">
                    {step.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-steel-accent">✓</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-steel text-center mb-12">Our Quality Commitment</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.518a1.5 1.5 0 00-2.196-2.196L5.196 17.804a1.5 1.5 0 002.196 2.196L19.804 6.196a1.5 1.5 0 00-2.196-2.196z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">ISO 9001 Certified</h3>
                <p className="text-sm text-gray-600">Every step follows documented quality procedures, verified by annual third-party audits.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.922a1.012 1.012 0 010-.636l1.06-3.183a1.012 1.012 0 01.688-.638l3.183 1.06a1.012 1.012 0 00.638-.688l1.06-3.183a1.012 1.012 0 01.636 0l1.06 3.183a1.012 1.012 0 00.638.688l3.183-1.06a1.012 1.012 0 01.688.638l1.06 3.183a1.012 1.012 0 010 .636l-1.06 3.183a1.012 1.012 0 01-.688.638l-3.183-1.06a1.012 1.012 0 00-.638.688l-1.06 3.183a1.012 1.012 0 01-.636 0l-1.06-3.183a1.012 1.012 0 00-.638-.688l-3.183 1.06a1.012 1.012 0 01-.688-.638l-1.06-3.183z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">100% Dimensional Check</h3>
                <p className="text-sm text-gray-600">Every member is verified before shipping. ±2mm tolerance per ISO 13920 standard.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Full Documentation</h3>
                <p className="text-sm text-gray-600">MTC, QC report, coating certs, container photos — complete dossier with every shipment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-steel text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Our engineering team is ready to design and manufacture your steel structure with the same 7-step quality process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/calculator"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-steel bg-white hover:bg-gray-100 rounded-xl transition-all shadow-lg"
              >
                Get Cost Estimate →
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white hover:bg-white/10 rounded-xl transition-all"
              >
                Discuss Your Project
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
