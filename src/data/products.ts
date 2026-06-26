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
  {
    slug: "steel-warehouse",
    title: "Steel Warehouse Building",
    subtitle: "Portal Frame / Clear Span",
    description:
      "Custom-designed steel warehouse buildings. Clear spans up to 60m, eave heights 6-15m, crane-ready. CE & ISO certified, factory-direct pricing, 30-day delivery.",
    overview: `A well-designed steel warehouse is the backbone of efficient logistics and storage operations. Our steel warehouse buildings are engineered for maximum storage density, operational flexibility, and long-term durability — with clear spans up to 60 meters and zero interior columns.

Every steel warehouse is custom-designed to your specific requirements: dimensions, bay spacing, eave height, mezzanine floors, dock doors, and crane systems. We use advanced 3D modeling and FEA analysis to optimize the structural design for your local wind, snow, and seismic conditions.

All steel warehouse structures are fabricated in our 20,000 sqm factory with 5 production lines running 24/7. Typical lead time is 30 working days from design approval to shipment. Full engineering drawings, erection manual, and remote installation support included.`,
    specifications: [
      { label: "Clear Span", value: "Up to 60m (no interior columns)" },
      { label: "Eave Height", value: "6m, 9m, 12m, 15m standard" },
      { label: "Bay Spacing", value: "6m — 9m (optimized for cost)" },
      { label: "Crane Capacity", value: "Up to 50 tons overhead crane" },
      { label: "Roof Load", value: "0.3 — 2.0 kN/m² (snow/wind design)" },
      { label: "Steel Grade", value: "Q355B (S355 equivalent), EN 10025" },
      { label: "Coating System", value: "Epoxy primer + PU topcoat, custom RAL" },
      { label: "Fire Protection", value: "Intumescent coating / sprinkler-ready" },
      { label: "Design Life", value: "50 years with standard maintenance" },
    ],
    features: [
      "Column-Free Storage — clear spans up to 60m maximize rack layout flexibility",
      "Crane-Ready Frame — integrated crane beams and brackets for up to 50T",
      "Fast Erection — bolted connections, 4-6 weeks on-site for 10,000 sqm",
      "Future Expansion — bolt-on extensions without disrupting operations",
      "Mezzanine Compatible — structural provisions for future mezzanine floors",
      "Dock Leveler Ready — pre-designed loading bay with dock shelters",
      "Fire-Rated Options — intumescent coating or sprinkler integration",
    ],
    applications: [
      "Distribution centers & logistics hubs",
      "E-commerce fulfillment warehouses",
      "Cold storage & temperature-controlled facilities",
      "Industrial storage & bulk material warehouses",
      "Cross-dock terminals & transshipment centers",
    ],
    image: "/images/product-steel-building.webp",
    badge: "Most Popular",
    schemaPriceLow: "25",
    schemaPriceHigh: "90",
  },
  {
    slug: "steel-factory-building",
    title: "Steel Factory Building",
    subtitle: "Multi-Span / Industrial Production Facility",
    description:
      "Custom steel factory buildings for manufacturing plants, production lines, and industrial facilities. Multi-span design, crane systems, office mezzanine. CE certified, 50-year design life.",
    overview: `Modern manufacturing requires factory buildings that are flexible, durable, and cost-effective. Our steel factory buildings are designed for production efficiency — with large uninterrupted floor areas, integrated crane systems, and the ability to accommodate heavy machinery and production lines.

We design multi-span steel structures with column grids optimized for your production layout. Eave heights from 8m to 20m accommodate tall equipment and overhead cranes. Secondary steelwork supports mezzanine offices, HVAC systems, electrical trays, and process piping — all integrated into one coordinated design.

Each steel factory building is engineered to your local building code (IBC, Eurocode, AS/NZS, or GB standard), with full structural calculations and stamped engineering drawings. Factory fabrication ensures consistent quality, and our experienced team provides remote installation guidance for overseas projects.`,
    specifications: [
      { label: "Structure Type", value: "Multi-span portal frame / rigid frame" },
      { label: "Max Width", value: "Unlimited (multi-bay configuration)" },
      { label: "Eave Height", value: "8m, 10m, 12m, 15m, 18m, 20m" },
      { label: "Crane System", value: "Single/double girder, up to 100 tons" },
      { label: "Floor Load", value: "5 — 25 kN/m² (mezzanine / ground slab)" },
      { label: "Bay Spacing", value: "6m — 12m (customized per production line)" },
      { label: "Roof System", value: "Insulated sandwich panel / single-skin + insulation" },
      { label: "Ventilation", value: "Ridge ventilators, turbo vents, louver system" },
      { label: "Fire Rating", value: "Up to 2-hour fire resistance (intumescent coating)" },
    ],
    features: [
      "Production-Optimized Layout — column grid aligned with production line flow",
      "Heavy Crane Support — up to 100 tons, with dedicated crane columns",
      "Multi-Story Mezzanine — office, locker room, and break area integration",
      "Process Utility Integration — pipe supports, cable trays, HVAC ducts",
      "Natural Lighting — FRP skylight panels reduce energy costs by 20-30%",
      "Expandable Design — future production line expansion without major modification",
      "VOC-Compliant Coating — environmentally friendly paint systems available",
    ],
    applications: [
      "Manufacturing & assembly plants",
      "Food processing & beverage production facilities",
      "Automotive & heavy equipment factories",
      "Electronics & clean room manufacturing",
      "Pharmaceutical & chemical processing plants",
    ],
    image: "/images/product-steel-building.webp",
    schemaPriceLow: "30",
    schemaPriceHigh: "100",
  },
  {
    slug: "steel-workshop",
    title: "Steel Workshop Building",
    subtitle: "Light Industrial / Maintenance Facility",
    description:
      "Cost-effective steel workshop buildings for maintenance shops, repair facilities, small-scale manufacturing, and agricultural workshops. Quick delivery, simple erection, budget-friendly pricing.",
    overview: `Steel workshop buildings are the most cost-effective solution for light industrial, maintenance, and agricultural applications. Designed for rapid deployment at minimal cost, our steel workshops use standardized components while still offering full customization for your specific needs.

Workshops feature clear spans up to 30m, eave heights from 4m to 10m, and can include overhead cranes up to 10 tons, mezzanine storage, and partitioned office areas. All steelwork is pre-cut, pre-drilled, and pre-coated in our factory — arriving as a complete bolt-together kit ready for erection.

Typical workshop projects ship within 20 working days and can be erected by a small crew in 2-4 weeks. Foundation requirements are minimal — a simple reinforced concrete strip footing is sufficient for most applications. Complete erection drawings and remote support included with every order.`,
    specifications: [
      { label: "Clear Span", value: "9m, 12m, 15m, 18m, 24m, 30m" },
      { label: "Eave Height", value: "4m, 5m, 6m, 7.5m, 10m" },
      { label: "Frame Type", value: "Tapered portal frame / hot-rolled section" },
      { label: "Crane Option", value: "Underhung crane up to 5T, gantry up to 10T" },
      { label: "Roof Cladding", value: "0.47mm profiled steel sheet + insulation" },
      { label: "Wall Cladding", value: "0.42mm profiled steel sheet / sandwich panel" },
      { label: "Door Options", value: "Roller shutter, sliding, sectional overhead" },
      { label: "Foundation", value: "Simple strip footing (minimal earthworks)" },
      { label: "Delivery Time", value: "20 working days from design approval" },
    ],
    features: [
      "Budget-Friendly — standardized design reduces engineering and fabrication cost",
      "Quick Delivery — 20 working days from design to shipment",
      "Simple Erection — small crew can complete in 2-4 weeks",
      "Flexible Layout — partition options for office, storage, and work areas",
      "Crane Ready — underhung or gantry crane provisions at low cost",
      "Minimal Foundation — lower site preparation cost than heavy industrial builds",
      "Future Expandable — bolt-on extensions at any time",
    ],
    applications: [
      "Maintenance & repair workshops",
      "Agricultural machinery sheds & equipment storage",
      "Small-scale manufacturing & fabrication shops",
      "Vehicle garages & fleet maintenance facilities",
      "Community workshops & training centers",
    ],
    image: "/images/product-steel-building.webp",
    schemaPriceLow: "20",
    schemaPriceHigh: "65",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
