export interface Product {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  specifications: { label: string; value: string }[];
  features: string[];
  applications: string[];
  image: string;
  badge?: string;
  schemaPriceLow: string;
  schemaPriceHigh: string;
}

export const products: Product[] = [
  {
    slug: "steel-structure-building",
    title: "Steel Structure Building",
    subtitle: "Portal Frame / Industrial Warehouse",
    description:
      "Custom-designed steel portal frame buildings for factories, warehouses, workshops, and logistics centers. Section steel main frame, Z/C purlins, bracing system. Design in accordance with AS/NZS, BS, and Chinese GB standards.",
    overview: `Our steel structure buildings are the backbone of modern industrial construction. Using portal frame or truss systems, we deliver clear-span spaces up to 60m without internal columns — maximizing usable floor area for manufacturing, storage, and logistics operations.

Each building is engineered to your local design codes (AS/NZS 1170, BS 5950, EN 1993, or GB 50017) and comes with full calculation reports, fabrication drawings, and erection manuals. Our 5 production lines output 5,000 tons per month, ensuring on-time delivery for projects of any scale.

A typical 3,000 sqm warehouse structure ships from our factory in 25–35 working days. We provide optional on-site supervision and can recommend local erection contractors through our network. Every bolt, plate, and member is labeled and match-marked for rapid assembly — crews typically erect 500–800 sqm per day with a 5-person team.`,
    specifications: [
      { label: "Main Frame", value: "Q355B/Q235B H-section steel, hot-dip galvanized option" },
      { label: "Purlin", value: "C/Z cold-formed galvanized steel, 1.5-3.0mm thickness" },
      { label: "Bracing", value: "Round steel bar / angle steel cross bracing" },
      { label: "Clear Span", value: "Up to 60m (single span), unlimited multi-span" },
      { label: "Eave Height", value: "4m – 25m" },
      { label: "Crane Capacity", value: "Up to 50T overhead crane compatible" },
      { label: "Design Standards", value: "AS/NZS 1170, BS 5950, EN 1993, GB 50017" },
      { label: "Surface Treatment", value: "Shot blasting SA 2.5 + alkyd / epoxy / HDG" },
      { label: "Roof Slope", value: "5% – 15% (standard), up to 30% for architectural" },
    ],
    features: [
      "Portal Frame Design — economical for spans up to 60m",
      "Crane Beam Compatible — supports 5T to 50T overhead cranes",
      "Multi-Span Option — unlimited width with intermediate columns",
      "Design Code Flexibility — AS/NZS, BS, EN, or GB standards",
      "Full Engineering Package — calculation reports + fabrication drawings + erection manual",
      "Corrosion Protection — shot blasting SA 2.5 + multi-layer coating system",
      "Hot-Dip Galvanizing — full structure available with 85μm zinc coating",
    ],
    applications: [
      "Steel factory buildings & manufacturing plants",
      "Warehouses & logistics distribution centers",
      "Agricultural barns & storage sheds",
      "Aircraft hangars & large-span showrooms",
      "Shopping malls & commercial complexes",
    ],
    image: "/images/product-steel-building.webp",
    badge: "Best Seller",
    schemaPriceLow: "25",
    schemaPriceHigh: "110",
  },
  {
    slug: "floor-deck",
    title: "Floor Deck / Steel Decking",
    subtitle: "Composite Floor System",
    description:
      "High-strength profiled steel deck for concrete composite floors. YX75-200-600, YX51-240-720, and custom profiles. Fire resistance up to 2H. Compatible with Australia/New Zealand construction standards.",
    overview: `Our steel floor deck systems serve as permanent formwork and tensile reinforcement for concrete composite slabs — eliminating the need for timber formwork and reducing on-site labor dramatically. The profiled steel sheet bonds with poured concrete via embossments, creating a strong composite floor diaphragm.

We stock standard profiles including YX75-200-600 (3W), YX51-240-720, and YX51-305-915, with custom profiles available on request. All decking is manufactured from high-strength galvanized steel coil (G550/G350) and tested to AS/NZS 2327 and BS 5950-4 standards.

For large projects, we provide full composite slab design — including reinforcement mesh layout, shear stud specification, and propping schedules — as part of our engineering package. Typical lead time is 15–20 working days from order confirmation to container loading.`,
    specifications: [
      { label: "Profile Types", value: "YX75-200-600 (3W), YX51-240-720, YX51-305-915" },
      { label: "Material", value: "G550 / G350 high-strength galvanized steel" },
      { label: "Thickness", value: "0.75mm, 0.91mm, 1.0mm, 1.2mm (BMT)" },
      { label: "Zinc Coating", value: "Z275 (275 g/m²) standard, up to Z450 available" },
      { label: "Fire Rating", value: "Up to 2 hours (with appropriate concrete cover)" },
      { label: "Span Capability", value: "Single span 1.5m – 5.0m (unpropped)" },
      { label: "Slab Thickness", value: "100mm – 200mm composite slab" },
      { label: "Design Standards", value: "AS/NZS 2327, BS 5950-4, EN 1994-1-1" },
      { label: "Sheet Length", value: "Cut-to-length, up to 13.5m per sheet" },
    ],
    features: [
      "Eliminates Timber Formwork — faster construction, lower cost",
      "Composite Action — embossed profile bonds with concrete for high strength",
      "Lightweight Handling — no crane needed for most profiles",
      "Fire-Rated Options — up to 2-hour fire resistance",
      "Custom Lengths — cut to exact project dimensions, zero site waste",
      "Proven Profiles — YX75-200-600 is the industry standard worldwide",
      "Australian/NZ Compliance — tested to AS/NZS 2327 requirements",
    ],
    applications: [
      "Multi-story office buildings & commercial towers",
      "Steel-framed residential apartment buildings",
      "Car parks & podium slabs",
      "Mezzanine floors in industrial buildings",
      "Bridge deck formwork",
    ],
    image: "/images/product-floor-deck.webp",
    schemaPriceLow: "8",
    schemaPriceHigh: "15",
  },
  {
    slug: "space-frame-truss",
    title: "Space Frame / Roof Truss",
    subtitle: "Large-Span Structure",
    description:
      "Lightweight bolt-ball / welded space frame systems for stadiums, airports, exhibition halls, and industrial sheds. Span up to 120m without intermediate columns. PE/PVDF coating, 15-year warranty.",
    overview: `Our space frame systems use a three-dimensional truss network of tubular steel members connected by high-strength bolt-ball joints — creating an incredibly light yet stiff structure capable of spanning 120m+ without internal support columns.

Each node is precision-machined and hot-dip galvanized, while members are cut to millimeter accuracy using CNC tube-cutting lines. The system assembles entirely on-site using simple bolted connections — no site welding required. Ideal for stadiums, airport terminals, exhibition halls, and industrial buildings requiring column-free interiors.

For complex geometries, our engineering team provides 3D BIM models (Tekla / Revit) showing every node, member, and connection. The entire roof structure is pre-assembled in factory for trial fitting before packing. Our 15-year structural warranty covers material defects and fabrication quality — backed by CE and ISO 9001 certification.`,
    specifications: [
      { label: "System Type", value: "Bolt-ball (BSJ) / Welded ball (WSJ)" },
      { label: "Member Material", value: "Q235B/Q355B seamless steel tube" },
      { label: "Node Material", value: "45# forged steel, hot-dip galvanized" },
      { label: "Maximum Span", value: "Up to 120m (bolt-ball) / 150m (welded)" },
      { label: "Grid Depth", value: "1.5m – 6.0m (depending on span)" },
      { label: "Surface Finish", value: "Shot blast SA 2.5 + PE / PVDF / HDG" },
      { label: "Fire Rating", value: "Up to 2 hours with intumescent coating" },
      { label: "Design Standards", value: "JGJ 7-2010, AISC 360, EN 1993-1-1" },
      { label: "Warranty", value: "15 years on structure" },
    ],
    features: [
      "Bolt-Ball Joint System — no site welding, fast assembly",
      "Column-Free Spans up to 120m — ideal for large public spaces",
      "Lightweight Structure — 30-50% lighter than conventional steel truss",
      "Multiple Grid Types — square pyramid, diagonal square, honeycomb",
      "Architectural Freedom — flat, curved, dome, and free-form geometries",
      "All-Weather Installation — bolted connections work in rain/snow/wind",
      "PE/PVDF Coating — 15+ year weather resistance without repainting",
    ],
    applications: [
      "Sports stadiums & indoor arenas",
      "Airport terminal roofs & concourses",
      "Exhibition halls & convention centers",
      "Atrium roofs & skylight structures",
      "Coal storage sheds & industrial bulk storage",
    ],
    image: "/images/product-space-frame.webp",
    schemaPriceLow: "30",
    schemaPriceHigh: "80",
  },
  {
    slug: "cladding-system",
    title: "Enclosure / Cladding System",
    subtitle: "Wall & Roof Panel Solution",
    description:
      "Insulated sandwich panels (PU/PIR/EPS) and single-skin metal cladding. 50mm-200mm thickness, fire-rated options. Compatible with steel structure buildings for complete envelope solution.",
    overview: `A steel building is only as good as its envelope. Our cladding systems — including PIR/PU insulated sandwich panels and single-skin profiled sheets — provide thermal insulation, weatherproofing, and architectural finish in one integrated system.

Sandwich panels are manufactured on continuous lamination lines with zero-ODP blowing agents. The double metal skin with injected foam core delivers U-values as low as 0.18 W/m²K, meeting energy codes worldwide. Custom colors, profiles, and fire ratings available.

For cold storage and food processing projects, we supply PIR-cored panels with food-grade stainless steel interior skins and antibacterial coatings — compliant with HACCP and FDA requirements. Our cladding systems ship with all necessary trims, flashings, fasteners, and sealants — a complete envelope kit ready for installation. Typical lead time is 20–25 working days.`,
    specifications: [
      { label: "Panel Type", value: "PU (Polyurethane) / PIR (Polyisocyanurate) / EPS / Rockwool" },
      { label: "Thickness", value: "50mm, 75mm, 100mm, 150mm, 200mm" },
      { label: "Steel Skin", value: "0.4mm – 0.7mm, galvanized + color-coated (PPGI)" },
      { label: "U-Value", value: "0.18 – 0.45 W/m²K (PIR/PU)" },
      { label: "Fire Rating", value: "B1 (PIR), A (Rockwool core)" },
      { label: "Panel Width", value: "1000mm (standard), up to 1200mm" },
      { label: "Coating", value: "PE, SMP, HDP, PVDF (Kynar 500)" },
      { label: "Color Options", value: "RAL color chart, wood grain, metallic finishes" },
      { label: "Wind Load", value: "Design per local standard (AS/NZS 1170, EN 1991)" },
    ],
    features: [
      "PIR Core — best fire rating among foam panels (B1)",
      "Rockwool Option — non-combustible A-grade for high-risk buildings",
      "Zero-ODP Foam — environmentally safe blowing agents",
      "Thermal Break — built-in joint design eliminates cold bridging",
      "Hidden Fastener — clean architectural appearance, no exposed screws",
      "Acoustic Rating — up to 30 dB (Rw) with mineral wool core",
      "Custom Lengths — up to 16m per panel, fewer joints",
    ],
    applications: [
      "Cold storage & food processing plants",
      "Factory & warehouse wall/roof envelopes",
      "Office building curtain wall backup panels",
      "Clean rooms & pharmaceutical facilities",
      "Data center thermal enclosures",
    ],
    image: "/images/product-cladding.webp",
    schemaPriceLow: "10",
    schemaPriceHigh: "20",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
