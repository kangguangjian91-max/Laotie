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
  faq: { question: string; answer: string }[];
}

export const products: Product[] = [
  {
    slug: "steel-structure-building",
    title: "Steel Structure Building",
    subtitle: "Portal Frame / Industrial Warehouse",
    description:
      "Custom steel portal frame buildings for factories, warehouses & logistics centers. Section steel main frame, Z/C purlins. AS/NZS, BS & GB standards. CE certified.",
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
    image: "/images/product-steel-structure-new.webp",
    badge: "Best Seller",
    schemaPriceLow: "25",
    schemaPriceHigh: "110",
    faq: [
      { question: "How much does a steel structure building cost?", answer: "Steel structure building costs range from $25 to $110 per square meter depending on size, design complexity, and local code requirements." },
      { question: "How long does it take to build a steel structure?", answer: "From design approval to site delivery, typical lead time is 30 working days. On-site erection takes 4-8 weeks depending on building size." },
      { question: "What certifications do you have?", answer: "Our factory is CE certified (EN 1090), ISO 9001, IAF accredited, and Supplier-Assessed. All welders are AWS D1.1 certified." },
      { question: "Can you design to my local building code?", answer: "Yes. We design to IBC, Eurocode, AS/NZS, and most national building codes. Full structural calculations included." },
      { question: "Do you provide installation overseas?", answer: "We provide erection manuals, remote video guidance, and can dispatch supervisors for on-site installation support." },
    ],
  },
  {
    slug: "floor-deck",
    title: "Floor Deck / Steel Decking",
    subtitle: "Composite & Galvanized Floor System",
    description:
      "Profiled steel deck for concrete composite floors. Hot-dip galvanized (Z275), YX profiles, fire resistance up to 2H. Composite & fast-track options available.",
    overview: `Our steel floor deck systems serve as permanent formwork and tensile reinforcement for concrete composite slabs — eliminating the need for timber formwork and reducing on-site labor dramatically. The profiled steel sheet bonds with poured concrete via embossments, creating a strong composite floor diaphragm. Available in hot-dip galvanized (Z275) or galvalume (AZ150) finish.

We stock standard profiles including YX75-200-600 (3W), YX51-240-720, and YX51-305-915, with custom profiles available on request. All decking is manufactured from high-strength galvanized steel coil (G550/G350) and tested to AS/NZS 2327 and BS 5950-4 standards.

For fast-track projects where traditional concrete pouring is impractical, we also supply **galvanized composite deck panels (热镀锌免浇筑承重板)** — prefabricated panels with integrated stiffeners that span up to 6m without concrete topping. Ideal for platform floors, mezzanines, and temporary access decks requiring dry construction.`,
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
    image: "/images/product-floor-deck-new.png",
    schemaPriceLow: "8",
    schemaPriceHigh: "15",
    faq: [
      { question: "What is steel floor deck used for?", answer: "Steel floor deck serves as permanent formwork and bottom reinforcement for composite concrete slabs in multi-story steel buildings." },
      { question: "What profiles do you offer?", answer: "We offer YX75-200-600, YX51-240-720, YX65-170-510, and YX60-180-540 profiles, plus custom roll-formed profiles." },
      { question: "What is the fire rating?", answer: "Up to 2 hours with appropriate concrete cover and reinforcement. Full fire engineering data available on request." },
      { question: "What is galvanized composite deck?", answer: "Galvanized composite deck (免浇筑承重板) is a pre-fabricated steel panel with integrated stiffeners spanning up to 6m without concrete topping." },
      { question: "Do you provide design support?", answer: "Yes. Full composite slab design including reinforcement mesh layout and shear stud specification included." },
    ],
  },
  {
    slug: "space-frame-truss",
    title: "Space Frame / Roof Truss",
    subtitle: "Large-Span Structure",
    description:
      "Bolt-ball/welded space frames for stadiums, airports & exhibition halls. Spans up to 120m, no interior columns. PE/PVDF coating, 15-year warranty.",
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
    faq: [
      { question: "What is a space frame structure?", answer: "A space frame is a lightweight, three-dimensional truss structure that achieves clear spans up to 120m without intermediate columns." },
      { question: "How much does a space frame cost?", answer: "Space frame structures cost $30-$80 per square meter depending on span and loading. Typical weight is 15-35 kg/m2." },
      { question: "Difference between space frame and portal frame?", answer: "Space frames achieve longer spans (up to 120m) and are lighter. Portal frames are more economical for spans under 40m." },
      { question: "Can space frames be installed without welding?", answer: "Yes. Most space frames use bolted ball-joint connections, allowing all-weather installation without site welding." },
      { question: "Where are space frames commonly used?", answer: "Stadiums, airport terminals, exhibition halls, convention centers, and industrial bulk storage sheds." },
    ],
  },
  {
    slug: "cladding-system",
    title: "Enclosure / Cladding System",
    subtitle: "Wall & Roof Panel Solution",
    description:
      "Insulated sandwich panels (PU/PIR/EPS) & single-skin metal cladding. 50-200mm thickness, fire-rated. Complete building envelope solution for steel structures.",
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
    faq: [
      { question: "What types of cladding panels do you offer?", answer: "PU/PIR insulated sandwich panels, rock wool panels, EPS panels, and single-skin metal cladding. Thickness 50mm-200mm." },
      { question: "What fire ratings are available?", answer: "Rock wool: Grade A (non-combustible). PIR: B1 (self-extinguishing). Fire resistance up to 2 hours." },
      { question: "What colors and finishes?", answer: "Full RAL color chart. PE, SMP, HDP, and PVDF (Kynar 500) coatings available. Custom color matching." },
      { question: "What is the U-value of PIR panels?", answer: "PIR panels achieve U-values as low as 0.18 W/m2K at 100mm thickness." },
      { question: "How are panels installed?", answer: "Hidden fastener joints with continuous gasket seals. Bolt-on installation to steel structure. Full manual provided." },
    ],
  },
  {
    slug: "steel-warehouse",
    title: "Steel Warehouse Building",
    subtitle: "Portal Frame / Clear Span",
    description:
      "Custom steel warehouse buildings with clear spans up to 60m. Eave heights 6-15m, crane-ready. CE & ISO certified, factory-direct pricing, 30-day delivery.",
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
    image: "/images/product-warehouse-new.webp",
    badge: "Most Popular",
    schemaPriceLow: "25",
    schemaPriceHigh: "90",
    faq: [
      { question: "What is the maximum clear span?", answer: "Up to 60 meters with no interior columns, allowing maximum flexibility for racking and forklift movement." },
      { question: "What eave heights are available?", answer: "Standard eave heights: 6m, 9m, 12m, 15m. Custom heights available for special requirements." },
      { question: "Can you add a crane to the warehouse?", answer: "Yes. Our warehouse frames are crane-ready with integrated crane beams and brackets for up to 50 tons." },
      { question: "How quickly can you deliver?", answer: "Standard lead time is 30 working days from design approval. Erection takes 4-6 weeks on site." },
      { question: "Can the warehouse be expanded later?", answer: "Yes. Steel warehouses are designed for future expansion with bolt-on extensions." },
    ],
  },
  {
    slug: "steel-factory-building",
    title: "Steel Factory Building",
    subtitle: "Multi-Span / Industrial Production Facility",
    description:
      "Custom steel factory buildings for manufacturing plants & production lines. Multi-span design, crane systems, office mezzanine. CE certified, 50-year design life.",
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
    image: "/images/product-factory-building.webp",
    schemaPriceLow: "30",
    schemaPriceHigh: "100",
    faq: [
      { question: "What is the maximum crane capacity?", answer: "Up to 100 tons with dedicated crane columns and heavy-duty crane beams." },
      { question: "What eave heights do you recommend for factories?", answer: "Production facilities typically use 10-15m eave height. Heights up to 20m available for tall equipment." },
      { question: "Can you integrate mezzanine offices?", answer: "Yes. Multi-story mezzanine offices with steel structure support are integrated into the main frame design." },
      { question: "What ventilation options are available?", answer: "Ridge ventilators, turbo vents, louver systems, and mechanical ventilation can all be integrated." },
      { question: "Do you design for clean rooms?", answer: "Yes. We design factory buildings suitable for clean room, pharmaceutical, and food processing environments." },
    ],
  },
  {
    slug: "steel-workshop",
    title: "Steel Workshop Building",
    subtitle: "Light Industrial / Maintenance Facility",
    description:
      "Cost-effective steel workshop buildings for maintenance shops, repair facilities & light manufacturing. Quick delivery, simple erection, budget-friendly pricing.",
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
    image: "/images/product-workshop.webp",
    schemaPriceLow: "20",
    schemaPriceHigh: "65",
    faq: [
      { question: "What is the typical span for a workshop?", answer: "Clear spans from 9m to 30m. Common sizes: 12m, 15m, 18m, 24m." },
      { question: "How long does a workshop take to build?", answer: "From design to shipment: 20 working days. On-site erection: 2-4 weeks with a small crew." },
      { question: "Can I add a crane later?", answer: "Yes. Underhung cranes (up to 5T) and gantry cranes (up to 10T) can be added during initial construction or later." },
      { question: "What type of foundation is needed?", answer: "Simple reinforced concrete strip footing. Minimal earthworks compared to heavy industrial buildings." },
      { question: "Is a workshop expandable?", answer: "Yes. Steel workshops are designed for bolt-on expansion at any time." },
    ],
  },
  {
    slug: "hot-rolled-steel-coil",
    title: "Hot Rolled Steel Coil & Sheet",
    subtitle: "Steel Coil / Plate / Cut-to-Length / Slit Coil",
    description:
      "Hot rolled steel coil, plate & sheet for steel structure fabrication. Cut-to-length & slit coil. Q235B, Q355B, S235, S355 grades. Mill direct pricing with MTC.",
    overview: `Hot rolled steel coil is the foundation material for steel structure fabrication. We supply HR coil and plate in a wide range of grades, thicknesses, and widths — in standard coil form, cut-to-length sheets (开平), or slit coils (纵剪) to your exact width requirements.

All material is sourced directly from major Chinese steel mills with full mill test certificates (MTC EN 10204 3.1). Available grades include Q235B (S235JR equivalent), Q355B (S355JR equivalent), and higher-strength options for specialized applications. Surface options: black (as-rolled), pickled (HRP), or shot-blasted and primed.

We stock common sizes for immediate delivery and can arrange custom rolling for large-volume orders. Typical lead time: 15-25 working days for mill-direct orders. Third-party inspection (SGS, BV) available at buyer's request.`,
    specifications: [
      { label: "Steel Grade", value: "Q235B (S235JR), Q355B (S355JR), Q420B, Q460C" },
      { label: "Thickness", value: "1.5mm — 25mm (coil), up to 100mm (plate)" },
      { label: "Width", value: "600mm — 2000mm (coil / slit coil)" },
      { label: "Length", value: "As required (cut-to-length up to 12m)" },
      { label: "Processing", value: "Cut-to-length (开平) / Slitting (纵剪) / Leveling" },
      { label: "Surface", value: "Black (as-rolled), Pickled (HRP), Shot-blasted + primed" },
      { label: "Tolerance", value: "ASTM A36 / EN 10025 / GB/T 1591" },
      { label: "Certificate", value: "MTC EN 10204 3.1, SGS/BV inspection" },
      { label: "Packing", value: "Bare / wrapped / seaworthy export packing" },
    ],
    features: [
      "Mill Direct Pricing — no middleman, best price for volume orders",
      "Full MTC Provided — EN 10204 3.1 mill test certificate with every batch",
      "Cut-to-Length & Slitting — precision processing to your required dimensions",
      "Multiple Grades in Stock — Q235B, Q355B, S235, S355 ready for quick dispatch",
      "Third-Party Inspection — SGS, BV, or Intertek inspection available",
      "Seaworthy Packing — suitable for FCL and LCL container shipping",
      "Bulk Discounts — tiered pricing for 100T+ orders",
    ],
    applications: [
      "Steel structure fabrication (columns, beams, bracing)",
      "Purlin & secondary steel manufacturing",
      "Floor deck and cladding substrate",
      "General fabrication & heavy machinery",
      "Storage tanks, pipes, and pressure vessels",
    ],
    image: "/images/product-hr-coil-new.webp",
    schemaPriceLow: "600",
    schemaPriceHigh: "900",
    faq: [
      { question: "What steel grades do you supply?", answer: "Q235B (S235JR), Q355B (S355JR), Q420B, Q460C. Full MTC EN 10204 3.1 provided." },
      { question: "Can you cut to length or slit?", answer: "Yes. Cut-to-length (开平) and slitting (纵剪) services available to your exact dimensions." },
      { question: "What thickness range is available?", answer: "Coil: 1.5mm to 25mm. Plate: up to 100mm thickness." },
      { question: "Do you provide third-party inspection?", answer: "Yes. SGS, BV, or Intertek inspection can be arranged at buyer's request." },
      { question: "What is your minimum order quantity?", answer: "Standard MOQ is 25 tons per size. Lower quantities available for stock sizes." },
    ],
  },
  {
    slug: "galvanized-cz-purlin",
    title: "Galvanized C & Z Purlin",
    subtitle: "Cold-Formed Steel Purlins & Girts",
    description:
      "Hot-dip galvanized C & Z purlins for steel roof & wall systems. C80-C300, Z100-Z350. Pre-punched, pre-cut to length. CE certified, mill direct.",
    overview: `C and Z purlins are the backbone of steel building roof and wall systems. Our cold-formed galvanized purlins are roll-formed from high-strength structural steel with hot-dip galvanized coating (Z275 minimum) for long-term corrosion resistance — ideal for industrial, commercial, and agricultural steel buildings.

C purlins are typically used for simple-span applications where lapping is not required, while Z purlins feature sleeved or overlapped connections for continuous-span design — reducing material weight and cost. Both profiles are available with pre-punched holes for swift bolted installation.

All purlins are manufactured to precise tolerances on automated roll-forming lines. Custom lengths, punching patterns, and notch details can be programmed for your specific project. Standard lead time: 15-20 working days from order.`,
    specifications: [
      { label: "Profile Types", value: "C Purlin (C80-C300), Z Purlin (Z100-Z350)" },
      { label: "Steel Grade", value: "Q235B, Q355B, G450, G550 (per AS/NZS 4600)" },
      { label: "Coating", value: "Hot-dip galvanized Z275 (275g/m²), Z350 available" },
      { label: "Thickness", value: "1.5mm — 3.0mm (16ga — 10ga)" },
      { label: "Length", value: "Custom cut to project requirements (max 12m single piece)" },
      { label: "Holes", value: "Pre-punched bolt holes per project drawings" },
      { label: "Splice Option", value: "Z purlin: sleeved connection for continuous span" },
      { label: "Standard", value: "GB/T 6725, EN 10162, AS/NZS 4600" },
      { label: "Packing", value: "Bundled with steel strapping, FCL/LCL ready" },
    ],
    features: [
      "Hot-Dip Galvanized — Z275 coating, 20+ year corrosion life",
      "Pre-Punched & Cut — ready to bolt, no site drilling needed",
      "Continuous Span Design — Z purlin lapping reduces steel weight by 15-25%",
      "Roll-Formed Precision — consistent dimensions, ±1mm tolerance",
      "Custom Patterns — hole spacing and notch details per your drawings",
      "Fast Production — 15-20 working days for standard orders",
      "CE & ISO 9001 — full traceability from coil to finished purlin",
    ],
    applications: [
      "Steel building roof purlins & wall girts",
      "Portal frame secondary steelwork",
      "Industrial warehouse & factory buildings",
      "Agricultural sheds & livestock buildings",
      "Solar panel mounting structures",
    ],
    image: "/images/product-cz-purlin.webp",
    badge: "High Demand",
    schemaPriceLow: "800",
    schemaPriceHigh: "1200",
    faq: [
      { question: "What is the difference between C and Z purlin?", answer: "C purlins are used for simple spans where lapping isn't needed. Z purlins have sleeved connections for continuous span design, reducing material weight." },
      { question: "What zinc coating is standard?", answer: "Z275 (275g/m2) hot-dip galvanized is standard. Z350 available for coastal environments." },
      { question: "Can you pre-punch holes?", answer: "Yes. Holes are punched per your project drawings — no site drilling needed." },
      { question: "What steel grades are used?", answer: "Q235B, Q355B, G450, G550 depending on span and loading requirements." },
      { question: "How long does production take?", answer: "Standard lead time: 15-20 working days for custom orders." },
    ],
  },
  {
    slug: "prefab-container-house",
    title: "Prefab House & Container House",
    subtitle: "Temporary / Permanent Modular Building Solution",
    description:
      "Prefabricated houses, container houses & flat-pack units for worker camps, site offices & emergency housing. Quick assembly, cost-effective, CE certified.",
    overview: `Our prefabricated housing solutions cover the full range from basic site accommodation to permanent living quarters. Three product lines: prefab panel houses (活动板房), welded container houses (集装箱房), and flat-pack folding container houses (打包箱房) — each designed for different use cases and budget levels.

Activity panel houses (活动板房) are the most economical option — lightweight steel frame with sandwich panel walls and roof, suitable for construction camps and temporary facilities. Container houses (集装箱房) are welded steel box units, stackable, and ideal for longer-term site offices, dormitories, and guard houses. Flat-pack folding houses (打包箱房) collapse for shipping — one 20ft container can carry 2-3 complete units, reducing shipping costs significantly.

All units come complete with doors, windows, electrical pre-wiring, and floor finishes. Customizable layouts, sizes, and interior fit-out levels available. A 4-person crew can assemble a flat-pack unit in 30 minutes without special tools.`,
    specifications: [
      { label: "Prefab Panel House", value: "5.6m × 3.6m module, customizable" },
      { label: "Container House", value: "20ft (6m) / 40ft (12m) welded steel box" },
      { label: "Flat-Pack House", value: "5.8m × 3m × 2.8m, folds to 1/3 volume" },
      { label: "Wall / Roof Panel", value: "50-75mm PU/PIR/rock wool sandwich panel" },
      { label: "Frame Material", value: "Galvanized steel / Corten steel" },
      { label: "Floor Load", value: "2.0 kN/m², optional heavy-duty upgrade" },
      { label: "Electrical", value: "Pre-wired with LED lighting, switches, outlets" },
      { label: "Fire Rating", value: "A-grade (rock wool) / B1 (PU with fire retardant)" },
      { label: "Packing", value: "Flat-pack: 2-3 units per 20ft container" },
    ],
    features: [
      "3 Product Lines — panel house, container, flat-pack — one source for all needs",
      "Flat-Pack Saves Shipping — 1 container carries 2-3 complete houses",
      "30-Min Assembly — folding design, no heavy equipment needed",
      "Stackable Container — up to 3 stories for container camp layouts",
      "Custom Fit-Out — offices, kitchens, bathrooms, air conditioning",
      "Wind Resistant — engineered for 120 km/h wind load",
      "Multi-Climate — insulation options from tropical to cold regions",
    ],
    applications: [
      "Construction worker camps & site offices",
      "Remote mining & oil field accommodation",
      "Emergency housing & disaster relief shelters",
      "School classrooms & medical clinics",
      "Export warehouse office annexes",
    ],
    image: "/images/product-container-house.webp",
    schemaPriceLow: "500",
    schemaPriceHigh: "3500",
    faq: [
      { question: "What types of prefab houses do you offer?", answer: "Three types: prefab panel houses (活动板房), welded container houses, and flat-pack folding houses (打包箱房)." },
      { question: "How long does assembly take?", answer: "Flat-pack houses: 30 minutes with a 4-person crew. Container houses: ready to use on delivery." },
      { question: "Can you ship flat-pack houses in containers?", answer: "Yes. One 20ft container can carry 2-3 complete flat-pack houses, saving significantly on shipping costs." },
      { question: "Are your houses fire rated?", answer: "Yes. Rock wool insulated units achieve Grade A fire rating. PU units are B1 self-extinguishing." },
      { question: "Can you customize the interior layout?", answer: "Yes. Custom layouts, finishes, air conditioning, kitchen and bathroom fit-out available." },
    ],
  },
  {
    slug: "ppgi-color-coated-steel",
    title: "PPGI / Color Coated Steel Sheet",
    subtitle: "Pre-Painted Galvanized / Galvalume Steel Coil",
    description:
      "High-quality PPGI color coated steel sheets for roofing & wall cladding. PE, SMP, HDP, PVDF coatings. RAL colors, wood grain, stone finishes. Mill direct.",
    overview: `PPGI (Pre-Painted Galvanized Iron) is the most widely used material for steel building cladding and roofing. We supply color coated steel coils and sheets with a wide selection of coating systems, colors, and surface finishes — from standard polyester to premium PVDF (Kynar 500) for coastal and architectural applications.

Our PPGI is produced on continuous coating lines with reverse roll-coating technology for uniform film thickness. The substrate is hot-dip galvanized (GI) or galvalume (GL/AZ) steel, with chemical pretreatment and primer layers before the topcoat application. This multi-layer system delivers excellent adhesion, corrosion resistance, and color retention.

Available in coil form (for roll-forming cladding profiles) or cut-to-length sheets. Custom color matching per RAL or Pantone number. Minimum order quantity: 50 tons per color for factory production, or 5 tons for stock colors.`,
    specifications: [
      { label: "Substrate", value: "Hot-dip GI (Z275) / Galvalume AZ150 / AZ180" },
      { label: "Coating Types", value: "PE (Polyester), SMP, HDP, PVDF (Kynar 500)" },
      { label: "Coating Thickness", value: "PE: 20μm, HDP: 25μm, PVDF: 27μm (top side)" },
      { label: "Color Options", value: "Full RAL chart, wood grain, stone-textured" },
      { label: "Sheet Thickness", value: "0.3mm — 1.2mm (total)" },
      { label: "Width", value: "Coil: 600-1250mm / Sheet: custom length" },
      { label: "Warranty", value: "PE: 5-8 years, HDP: 10-15 years, PVDF: 20-25 years" },
      { label: "Standard", value: "EN 10169, ASTM A755, GB/T 12754" },
    ],
    features: [
      "6 Coating Systems — PE to PVDF for every budget and climate",
      "200+ RAL Colors — exact color matching available",
      "Wood Grain & Stone — decorative finishes for architectural projects",
      "Salt Spray Tested — PVDF rated for 1,000+ hours (coastal grade)",
      "Reverse Roll Coating — uniform film thickness ±2μm",
      "Pre-Punched Option — ready for screw-fixed or hidden fastener profiles",
      "Full Traceability — coil number tracking from steel mill to finished sheet",
    ],
    applications: [
      "Steel building roof & wall cladding",
      "Insulated sandwich panel outer skins",
      "Fence panels, garage doors, rolling shutters",
      "Home appliances & interior linings",
      "Signage, billboards, and architectural facades",
    ],
    image: "/images/product-ppgi.webp",
    schemaPriceLow: "700",
    schemaPriceHigh: "1500",
    faq: [
      { question: "What coating types are available?", answer: "PE (polyester), SMP, HDP, and PVDF (Kynar 500). Each offers different durability and warranty periods." },
      { question: "What colors can I choose?", answer: "Full RAL color chart plus wood grain and stone-textured finishes. Custom color matching available." },
      { question: "What is the warranty period?", answer: "PE: 5-8 years, HDP: 10-15 years, PVDF: 20-25 years depending on coating system." },
      { question: "What substrate do you use?", answer: "Hot-dip galvanized (Z275) or galvalume (AZ150/AZ180) steel." },
      { question: "What is the minimum order quantity?", answer: "50 tons per color for custom production, 5 tons for stock colors." },
    ],
  },
  {
    slug: "frp-skylight-sheet",
    title: "FRP Skylight / Translucent Roofing Sheet",
    subtitle: "Fiberglass Reinforced Plastic Daylight Panel",
    description:
      "FRP skylight sheets for natural daylighting in steel buildings. Compatible with all major cladding profiles. UV-stable, impact-resistant, 20-year warranty.",
    overview: `FRP (Fiberglass Reinforced Plastic) skylight sheets are designed to match standard metal roofing and wall cladding profiles, providing natural daylight while maintaining the building envelope. Installing FRP skylights can reduce daytime lighting energy consumption by 30-50% in warehouse and factory buildings.

Our FRP sheets are manufactured from UV-stabilized polyester resin reinforced with E-glass fiber. The surface is protected with a UV-resistant gel coat (40μm minimum) that prevents yellowing and maintains light transmission for 20+ years. Light transmission rates: 65-80% (standard), 50-60% (diffused), 85%+ (water-clear).

Available to match all common cladding profiles: corrugated, trapezoidal, and box-rib. Custom lengths up to 12m. Pre-drilled fixing holes available. Fire rating: B1 (self-extinguishing) per GB/T 8624, Class 2 per AS/NZS 4256.`,
    specifications: [
      { label: "Material", value: "E-glass fiber + UV-stabilized polyester resin" },
      { label: "Light Transmission", value: "65-80% (standard), 50-85% (options)" },
      { label: "UV Protection", value: "UV-resistant gel coat, 40μm minimum" },
      { label: "Thickness", value: "1.0mm — 3.0mm" },
      { label: "Profile Matching", value: "Corrugated, trapezoidal, box-rib, custom" },
      { label: "Length", value: "Custom up to 12m, continuous roll available" },
      { label: "Temperature Range", value: "-40°C to +120°C" },
      { label: "Fire Rating", value: "B1 (self-extinguishing) / Class 2 (AS/NZS)" },
      { label: "Warranty", value: "20-year weather resistance / 10-year light transmission" },
    ],
    features: [
      "30-50% Energy Saving — natural daylight reduces lighting costs",
      "UV-Stable Gel Coat — no yellowing, 20-year weather warranty",
      "Profile Compatible — matches all major steel cladding profiles",
      "Impact Resistant — 15x stronger than polycarbonate alternatives",
      "Custom Lengths — continuous lengths up to 12m, fewer overlaps",
      "Pre-Drilled Option — ready to install, matching screw pattern",
      "Self-Extinguishing — B1 fire rating for code compliance",
    ],
    applications: [
      "Warehouse & factory roof daylighting",
      "Sports halls & indoor arena natural lighting",
      "Agricultural buildings & greenhouses",
      "Logistics center & distribution hub skylights",
      "Canopy & walkway roofing",
    ],
    image: "/images/product-frp-skylight.webp",
    schemaPriceLow: "10",
    schemaPriceHigh: "25",
    faq: [
      { question: "What is FRP skylight sheet used for?", answer: "Natural daylighting in steel buildings. Installed on roofs to replace sections of metal cladding, reducing lighting energy by 30-50%." },
      { question: "How long does FRP last?", answer: "20-year weather resistance warranty. UV-stable gel coat prevents yellowing for the life of the product." },
      { question: "Does it match my roof profile?", answer: "Yes. We match all common cladding profiles: corrugated, trapezoidal, and box-rib." },
      { question: "Is it fire rated?", answer: "Yes. B1 self-extinguishing per GB/T 8624, Class 2 per AS/NZS 4256." },
      { question: "What light transmission do you offer?", answer: "Standard 65-80%, diffused 50-60%, water-clear 85%+. Custom options available." },
    ],
  },
  {
    slug: "insulated-sandwich-panel",
    title: "Insulated Sandwich Panel System",
    subtitle: "Rock Wool / PUR / PIR / EPS Fire-Rated Panel",
    description:
      "Complete insulated sandwich panel range: rock wool (A-grade fire), PIR/PU, EPS & PUR edge-sealed rock wool. 50-200mm for cold storage & factories. CE certified.",
    overview: `Our insulated sandwich panel range covers every fire rating, thermal performance, and budget requirement. Four core types available: rock wool (mineral fiber, A-grade non-combustible), PIR/PU (polyisocyanurate/polyurethane, best thermal efficiency), PUR edge-sealed rock wool (fire-rated edges with foam core), and EPS (economical option for dry applications).

Rock wool sandwich panels are the preferred choice for fire-rated applications — achieving A-grade non-combustibility with fire resistance up to 2 hours. PUR edge-sealed rock wool panels combine the fire safety of rock wool at the panel joints with the thermal efficiency of polyurethane foam in the core area. PIR panels deliver the highest R-value per thickness, making them ideal for cold storage and temperature-controlled environments.

All panels feature hidden fastener joints, continuous gasket seals, and are compatible with our complete range of trims, flashings, and accessories. Panel widths: 1000mm-1200mm standard. Custom lengths up to 16m. Lead time: 20-25 working days.`,
    specifications: [
      { label: "Core Types", value: "Rock wool / PIR / PUR / PUR Edge-Sealed Rock Wool / EPS" },
      { label: "Panel Thickness", value: "50mm, 75mm, 100mm, 120mm, 150mm, 200mm" },
      { label: "Steel Skin", value: "0.4mm — 0.7mm GI / PPGI / Stainless Steel" },
      { label: "Fire Rating", value: "Rock wool: Grade A (non-combustible), PIR: B1, EPS: B2" },
      { label: "U-Value (100mm)", value: "Rock wool: 0.45, PIR: 0.22, EPS: 0.35 W/m²K" },
      { label: "Panel Width", value: "1000mm — 1200mm standard" },
      { label: "Joint Type", value: "Hidden fastener, tongue-and-groove with gasket" },
      { label: "Acoustic (RW)", value: "Rock wool: 30-35 dB, PIR: 25-28 dB" },
      { label: "Max Length", value: "Up to 16m continuous panel" },
    ],
    features: [
      "4 Core Types — one supplier for all fire and thermal requirements",
      "A-Grade Fire (Rock Wool) — non-combustible, 2-hour fire resistance",
      "PUR Edge-Sealed — fire-safe joints + foam core thermal efficiency",
      "PIR Best U-Value — 0.22 W/m²K @100mm for cold storage",
      "Hidden Fastener System — clean architectural appearance",
      "Continuous Gasket — airtight joint eliminates thermal bridging",
      "Custom Lengths — up to 16m, minimizes horizontal joints",
    ],
    applications: [
      "Cold storage & refrigerated warehouses",
      "Factory & production building envelopes",
      "Clean rooms & pharmaceutical facilities",
      "Commercial buildings & office partitions",
      "Food processing plants & distribution centers",
    ],
    image: "/images/product-sandwich-panel.webp",
    schemaPriceLow: "12",
    schemaPriceHigh: "35",
    faq: [
      { question: "What core types are available?", answer: "Rock wool (Grade A fire), PIR, PU, PUR edge-sealed rock wool, and EPS. Each suited to different applications." },
      { question: "What thickness do I need for cold storage?", answer: "Freezer (-25C): 150-200mm. Chiller (0-5C): 100-150mm. Cool room: 80-100mm. PIR recommended for best U-value." },
      { question: "What is PUR edge-sealed rock wool?", answer: "A hybrid panel combining fire-safe rock wool at the joints with polyurethane foam core for better thermal efficiency." },
      { question: "What is the maximum panel length?", answer: "Up to 16 meters continuous, reducing horizontal joints and installation time." },
      { question: "Are hidden fastener panels available?", answer: "Yes. All panel types feature hidden fastener joints with continuous gasket seals for a clean architectural finish." },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
