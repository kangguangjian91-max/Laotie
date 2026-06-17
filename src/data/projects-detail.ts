export interface ProjectDetail {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
  image: string;
  h1: string;
  overview: string;
  challenges: string;
  solution: string;
  design: string;
  fabrication: string;
  qualityControl: string;
  packingShipping: string;
  installationGuide: string;
  whyChoose: string;
  specs: { label: string; value: string }[];
  faq: { question: string; answer: string }[];
  cta: string;
  conclusion: string;
  keywords: string[];
  longTailKeywords: string[];
  galleryImages?: { src: string; alt: string }[];
  location?: string;
  category?: string;
  completedYear?: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
  "industrial-warehouse-sydney": {
    slug: "industrial-warehouse-sydney",
    metaTitle:
      "120×60m Industrial Warehouse Sydney | AS/NZS Steel Structure | Laotie Steel",
    metaDescription:
      "Custom 120m×60m industrial warehouse in Sydney, Australia. 7,200 sqm portal frame design, AS/NZS 1170 compliant, 12m eave height, 20T crane ready. Get a quote.",
    urlSlug: "/projects/industrial-warehouse-sydney",
    image: "/images/projects/project-sydney-01.webp",
    h1: "120m × 60m Industrial Warehouse in Sydney — Logistics Distribution Facility",
    overview: `
      <p>This 7,200 m² industrial warehouse was designed and fabricated for a Sydney-based logistics company in 2025. The facility serves as a regional distribution hub, requiring a large-span portal frame structure capable of accommodating high-bay racking systems, 20T overhead crane operations, and Australia's stringent cyclone-region wind loading requirements.</p>
      <p>The building spans 120 meters in length, 60 meters in width, with 12 meters eave height — creating a massive column-free interior space ideal for logistics operations. Total steel consumption: 385 tons of Q355B high-strength steel. The main portal frame uses tapered H-sections with moment-resisting connections, designed to AS 4100-1998 and AS/NZS 1170.2:2021 (Wind Loads).</p>
      <p>All structural calculations were prepared by our Australian-chartered engineering partners and stamped for council submission. The design accounts for Sydney's Wind Region B (design wind speed 55 m/s), a 1.5 kN/m² roof live load (for future solar panel installation), and a 2.0 kN/m² floor live load for heavy racking systems.</p>
    `,
    challenges: `
      <p><strong>1. Cyclone Region Wind Loading (Region B).</strong> Sydney falls within Wind Region B of AS/NZS 1170.2, requiring a design wind speed of 55 m/s. The 120m length creates significant wind pressure differentials across the roof and walls. Our SkyCiv model applied both static and dynamic wind load cases, with special attention to roof cladding suction loads during cyclonic events.</p>
      <p><strong>2. 20T Overhead Crane Integration.</strong> The client required a 20-ton overhead crane system running the full 120m length. Crane runway beams must support both vertical wheel loads (including impact factor 1.25 per AS 1418.1) and longitudinal crane surge forces. We designed the portal frame columns with additional bracing to resist crane-induced lateral forces.</p>
      <p><strong>3. Large-Span Cladding System.</strong> A 60m roof span requires careful consideration of thermal expansion (up to 40mm across the roof width in Australian summer conditions). We specified concealed-fix Colorbond® roofing with sliding cleats to accommodate thermal movement without inducing secondary stresses in the purlins.</p>
      <p><strong>4. Australian Quarantine Compliance.</strong> All steel members exported to Australia must comply with Australian Quarantine and Inspection Service (AQIS) requirements. All timber packing materials (if any) must be ISPM 15 compliant. We eliminated timber packing entirely, using steel racking systems inside containers and heat-treated steel dunnage.</p>
    `,
    solution: `
      <p><strong>Design Phase:</strong> Our engineering team developed a 3D SkyCiv model of the 120m × 60m × 12m portal frame. The model included 8 portal frame bays at 15m spacing, with longitudinal bracing at every 30m interval. Wind load calculations followed AS/NZS 1170.2:2021 Clause 5, with a terrain category of 2 (suburban Sydney). The design also included a 600 m² mezzanine office area at the west end, with a 2-hour fire-rated floor system.</p>
      <p><strong>Fabrication:</strong> All main frame members were fabricated from Q355B steel plate using CNC plasma cutting. H-section columns (H700×300×14×24 at base, tapering to H500×250×10×16 at eave) were welded using submerged arc welding (SAW) with full penetration welds verified by ultrasonic testing (UT). All bolted connections use 10.9/S grade friction-grip bolts with calibrated torque specifications.</p>
      <p><strong>Cladding System:</strong> The roof uses 0.55mm Colorbond® steel sheeting in "Monument" (RAL 7016) with an anticon blanket (75mm glasswool, R1.5 thermal rating). Walls use 100mm PIR sandwich panels (U-value 0.22 W/m²K) suitable for Sydney's climate zone. All flashings and gutters are Colorbond® matching the roof color.</p>
      <p><strong>Crane System:</strong> Crane runway beams are H800×300×16×28, designed for 20T capacity with 1.25 impact factor. The crane rail is a 120kg/m heavy-duty rail, fixed to the runway beam top flange with clip bolts at 600mm spacing. Our engineering team provided full crane runway beam deflection calculations (L/500 maximum vertical deflection per AS 1418.1).</p>
    `,
    design: `
      <h3>Portal Frame Design to AS 4100</h3>
      <p>The portal frame was designed as a moment-resisting frame with fixed-base conditions. Column base plates use 600×600×40mm thick plates with 12× M36 anchor bolts (8.8/S grade). The frame provides a 60m clear span with 12m eave height, creating 7,200 m² of unobstructed floor space.</p>
      <h3>Wind Load Analysis (AS/NZS 1170.2)</h3>
      <p>Sydney's Wind Region B requires a design wind speed of 55 m/s (considering topographic multiplier). Our SkyCiv model calculated the following design pressures: Roof positive pressure: +0.56 kPa, Roof suction (uplift): -1.85 kPa, Wall pressure: ±0.75 kPa. These loads were applied to the frame in both transverse and longitudinal directions.</p>
      <h3>Crane Runway Beam Design (AS 1418.1)</h3>
      <p>The 20T overhead crane creates the following design loads on the runway beams: Vertical wheel load: 85 kN/wheel (4 wheels per crane), Longitudinal surge force: 10% of crane weight + lifted load, Lateral surge force: 10% of lifted load. Runway beam maximum vertical deflection: L/500 (AS 1418.1 requirement).</p>
      <h3>Mezzanine Office Design</h3>
      <p>The 600 m² mezzanine office uses a composite floor system: 120mm deep steel deck + 130mm concrete slab. The floor system provides a 2.5 kN/m² live load capacity for office use. Fire rating: 2-hour (AS 1530.4) using intumescent paint on steel members and 19mm fire-rated plasterboard ceiling.</p>
    `,
    fabrication: `
      <h3>CNC Cutting & Machining</h3>
      <p>All steel plates are CNC-cut using a 12-head plasma cutting system with ±1mm tolerance. H-section columns and rafters are welded using automated submerged arc welding (SAW) with continuous welding wires. All welds are 100% UT (Ultrasonic Testing) inspected per AS 1554.1 for critical connections.</p>
      <h3>Surface Treatment</h3>
      <p>Every member passes through our 8-wheel shot-blasting machine, achieving SA 2.5 surface profile. The coating system consists of: 1×75μm epoxy zinc-rich primer, 1×125μm epoxy intermediate coat, 1×80μm polyurethane topcoat. Total DFT: 280μm for interior members, 320μm for exterior members. All coating thickness is verified using SSPC-PA 2 gauge.</p>
      <h3>Crane Runway Beam Machining</h3>
      <p>Crane runway beams require exceptional dimensional accuracy. The top flange flatness tolerance is ±2mm over the full 120m length. We machine the top flange using a portable milling machine after welding to ensure crane rail alignment. All crane runway beam connections use precision-reamed holes (±0.2mm tolerance) for 10.9/S friction-grip bolts.</p>
      <h3>Mezzanine Floor Fabrication</h3>
      <p>The mezzanine floor uses composite steel deck (120mm deep, 0.9mm thick) with embossed patterns for concrete bond. Steel deck sheets are roll-formed in our facility with keyed edges for concrete interlocking. All mezzanine beams are fire-rated with intumescent paint (2-hour rating per AS 1530.4).</p>
    `,
    qualityControl: `
      <p>Laotie Steel operates an ISO 9001:2015 certified quality management system. For this Sydney project, we implemented additional QC protocols for Australian export compliance.</p>
      <p><strong>Dimensional Quality Control:</strong> Pre-shipment trial assembly verified that all portal frame connections, mezzanine floor beams, and bracing connection plates aligned within AS 4100's ±2mm tolerance. We used a 3D coordinate measuring arm to verify critical connection dimensions.</p>
      <p><strong>Welding Quality:</strong> All full-penetration welds were 100% UT inspected per AS 1554.1. Fillet welds were spot-checked using magnetic particle inspection (MPI). All welding procedures were qualified per AS/NZS 1554.1, with welding consumables stored in heated cabinets to prevent moisture absorption.</p>
      <p><strong>Coating Inspection:</strong> Dry-film thickness (DFT) measurements were taken at 5 points per member. Minimum DFT: 280μm (interior), 320μm (exterior). All readings were documented with photographs in the QC report. Adhesion testing (cross-cut method per ASTM D3359) was performed on 5% of members.</p>
      <p><strong>Material Traceability:</strong> Each steel plate's mill test report (EN 10204 3.1) was cross-referenced to the finished member's serial number. The client received a full material traceability dossier, including all welding consumables' batch numbers and coating material certificates.</p>
    `,
    packingShipping: `
      <p>For this 385-ton structure, we developed a comprehensive container loading plan using 3D container optimization software. The shipment consisted of 52 × 40ft high-cube containers, carefully sequenced to match the client's erection schedule.</p>
      <p><strong>Container Allocation:</strong> 12 containers for main H-sections (columns and rafters), 22 containers for secondary members (purlins, girts, bracing, eave struts, mezzanine beams), 12 containers for cladding system (Colorbond sheets, sandwich panels, flashings, gutters), 4 containers for crane runway beams and rails, 2 containers for fasteners, sealants, and erection consumables.</p>
      <p><strong>Protection:</strong> All threaded fasteners were capped with plastic end-caps. Colorbond sheets were interleaved with kraft paper to prevent abrasion. Sandwich panels were packed in moisture-barrier bags with desiccant. Crane rails were greased and wrapped in anti-rust paper.</p>
      <p><strong>Documentation:</strong> Each container received a detailed packing list cross-referenced to the erection drawing's zone numbers. Australian customs clearance documents, including Certificate of Origin (Form A), commercial invoice, bill of lading, and AQIS treatment certificate, were pre-arranged. The client's appointed freight forwarder received all documents 7 days before vessel departure.</p>
    `,
    installationGuide: `
      <h3>Foundation Preparation</h3>
      <p>The client's local Sydney contractor poured reinforced concrete foundations per our foundation reaction report (prepared per AS 2870). Anchor bolt cages were supplied by Laotie, with laser-aligned positioning before concrete pour. Anchor bolt tolerances: ±2mm in position, ±3mm in elevation. Foundation concrete strength: Minimum 32 MPa (AS 3600).</p>
      <h3>Main Frame Erection</h3>
      <p><strong>Day 1-5:</strong> Main portal frame columns and rafters. Each column base plate uses 12× M36 anchor bolts. Column verticality is adjusted using laser plumb-bob and shim packs. Rafter-to-column connections use 10.9/S friction-grip bolts — no site welding required. A 50T mobile crane was used for member lifting.</p>
      <h3>Crane Runway Beam Installation</h3>
      <p><strong>Day 6-8:</strong> Crane runway beam installation. Runway beams are aligned using a laser level to ensure ±3mm alignment tolerance over the full 120m length. Crane rail is then fixed to the runway beam top flange using clip bolts. Rail alignment is verified using a feeler gauge — maximum gap under a 1m straightedge: 2mm (AS 1418.1).</p>
      <h3>Secondary Members & Cladding</h3>
      <p><strong>Day 9-15:</strong> Purlin, girt, and bracing installation. Z180 galvanized Z-purlins are bolted to rafter cleats. <strong>Day 16-25:</strong> Roof and wall cladding. Colorbond sheets are fixed with 12g×50mm self-drilling screws with neoprene washers. Sandwich panels are installed using concealed fixing systems. All panel joints are sealed with PU sealant.</p>
      <h3>Erection Speed</h3>
      <p>A 10-person erection crew achieved 500 m² per day for the main frame, and 400 m² per day for cladding. Total on-site erection time: 25 working days. The client's project manager reported that the bolted connection system saved approximately 15 days compared to a welded structure.</p>
    `,
    whyChoose: `
      <p><strong>1. Proven Australia Export Experience.</strong> Laotie Steel has delivered 30+ steel structure projects to Australia since 2019. We understand Australian design codes (AS 4100, AS/NZS 1170, AS 1418), local engineering certification requirements, and Australian quarantine (AQIS) regulations.</p>
      <p><strong>2. SkyCiv-Powered Engineering.</strong> Every structure we design is modeled in SkyCiv cloud structural analysis software. This allows real-time design collaboration with Australian engineers and provides transparent, auditable calculations that Australian councils and certifiers trust.</p>
      <p><strong>3. Factory-Direct Pricing.</strong> A 7,200 m² warehouse that costs AUD 900-1,100/m² locally (fabricated and erected in Sydney) can be supplied by Laotie at AUD 650-750/m² (FOB Shanghai). Including Australian customs (5%), GST (10%), freight, and local erection, the total delivered-and-erected cost is approximately AUD 850-1,000 per m² — a 15-25% saving compared to local sourcing.</p>
      <p><strong>4. 5 Production Lines, 5,000T/Month.</strong> Our Henan facility operates 5 independent production lines. This Sydney project's 385 tons was completed in 22 working days from mill sheet approval to factory dispatch. Our production capacity ensures your project will not be delayed by capacity constraints.</p>
      <p><strong>5. Full Engineering Dossier.</strong> Every Australian project includes: (1) Structural calculation report (AS 4100), (2) Wind load calculations (AS/NZS 1170.2), (3) Fabrication drawings with NC codes, (4) Erection manual with bolt lists and torque specifications, (5) Material test reports (EN 10204 3.1), (6) Crane runway beam calculations (AS 1418.1), and (7) Container packing lists with zone cross-references.</p>
    `,
    specs: [
      { label: "Project Name", value: "Sydney Industrial Warehouse Complex" },
      { label: "Location", value: "Sydney, New South Wales, Australia" },
      { label: "Building Type", value: "Portal Frame Steel Warehouse with Mezzanine" },
      { label: "Dimensions", value: "120m (L) × 60m (W) × 12m (H)" },
      { label: "Building Area", value: "7,200 m² (+ 600 m² mezzanine)" },
      { label: "Steel Consumption", value: "385 tons (Q355B)" },
      { label: "Design Standard", value: "AS 4100-1998, AS/NZS 1170.2:2021" },
      { label: "Wind Load", value: "Region B, 55 m/s design wind speed" },
      { label: "Crane System", value: "20T overhead crane, 120m runway" },
      { label: "Roof System", value: "0.55mm Colorbond® + 75mm anticon blanket" },
      { label: "Wall System", value: "100mm PIR sandwich panel, U-value 0.22 W/m²K" },
      { label: "Mezzanine", value: "600 m², 2-hour fire-rated, composite floor" },
      { label: "Surface Treatment", value: "Shot blasting SA 2.5 + 280-320μm epoxy system" },
      { label: "Project Year", value: "2025" },
      { label: "Lead Time", value: "22 days fabrication + 30 days shipping" },
      { label: "Connection Type", value: "Bolted moment-resisting frame (10.9/S friction-grip bolts)" },
      { label: "Seismic Rating", value: "AS 1170.4 Category 3 (moderate seismic)" },
      { label: "Snow Load", value: "Not applicable (Sydney region)" },
      { label: "Temperature Load", value: "±40mm thermal expansion allowance" },
      { label: "Fire Rating", value: "2-hour (mezzanine area), intumescent paint" },
      { label: "Design Life", value: "50 years (AS 4100)" },
      { label: "Foundation Type", value: "Reinforced concrete pad footings (1.5m×1.5m×1.0m)" },
      { label: "Erection Method", value: "Bolted connection, no on-site welding" },
    ],
    faq: [
      {
        question: "How much does a 120m × 60m industrial warehouse cost in Sydney?",
        answer:
          "For a 7,200 m² industrial warehouse like our Sydney project, the supply-only cost from Laotie Steel is typically AUD 650-750 per m² (FOB Shanghai). Including Australian customs duties (5%), GST (10%), sea freight (Shanghai to Sydney: approximately AUD 15,000-20,000 per container), and local erection (AUD 80-120/m²), the total delivered-and-erected cost is approximately AUD 850-1,000 per m². Local Sydney fabrication would typically quote AUD 1,100-1,300 per m² for equivalent specification.",
      },
      {
        question: "Do your steel warehouses comply with Australian AS/NZS and BCA requirements?",
        answer:
          "Yes. Every Laotie steel structure for the Australian market is designed to AS 4100-1998 (Steel Structures) and AS/NZS 1170.2 (Wind Loads). We provide full calculation reports prepared by Australian-chartered engineers. Our designs also comply with relevant BCA (Building Code of Australia) requirements for structural adequacy, fire safety, and energy efficiency.",
      },
      {
        question: "Can you design for 20T overhead crane according to AS 1418?",
        answer:
          "Yes. We design crane runway beams per AS 1418.1 (Cranes - General Requirements). Our designs account for vertical wheel loads (including 1.25 impact factor), longitudinal and lateral crane surge forces, and crane runway beam deflection limits (L/500 maximum vertical deflection). This Sydney project's 20T crane system was fully engineered and certified by our Australian chartered engineering partners.",
      },
      {
        question: "What is the lead time for a 7,200 m² warehouse from China to Sydney?",
        answer:
          "Total lead time is typically 50-60 days: 22-28 days for fabrication (depending on current production line load), 30-35 days for sea freight to Sydney (Port Botany). We recommend allowing 70 days total from deposit to site delivery for project planning purposes. Express production (15 days) is available at 15% premium.",
      },
      {
        question: "Do you supply Colorbond roofing for Australian projects?",
        answer:
          "Yes. We supply genuine Colorbond® steel sheeting (manufactured by BlueScope) for all Australian projects. Colorbond is the industry standard in Australia for its corrosion resistance and 25-year warranty. Available colors include Monument, Surfmist, Classic Cream, Pale Eucalypt, and all standard Colorbond palettes. We also supply Colorbond Ultra for coastal applications (within 1km of saltwater).",
      },
      {
        question: "Can you provide fire-rated steel structures for Australian warehouses?",
        answer:
          "Yes. For this Sydney project, the mezzanine office area required a 2-hour fire rating per AS 1530.4. We applied intumescent paint to all steel members in the fire-rated zone, achieving the required 2-hour rating. Alternatively, we can use fire-rated plasterboard encapsulation or concrete filling of hollow sections, depending on the client's preference and budget.",
      },
      {
        question: "What foundation design do you provide for Sydney soil conditions?",
        answer:
          "We provide foundation reaction reports that your local geotechnical engineer can use to design suitable foundations. For Sydney's typical soil conditions (sandy clay with 150-200 kPa bearing capacity), our standard foundation design uses 1.5m × 1.5m × 1.0m deep reinforced concrete pads with M36 anchor bolts. We also provide hold-down bolt cage assemblies for accurate anchor bolt positioning.",
      },
      {
        question: "Do you provide on-site erection supervision in Australia?",
        answer:
          "Yes. We can provide one of our senior engineers for on-site erection supervision at AUD 3,500 per day (including travel and accommodation). Our engineer will verify foundation preparation, oversee critical connection installations, and provide erection sequence guidance. Alternatively, we can provide a detailed erection manual and video tutorials, allowing a competent local contractor to erect the building without our on-site presence.",
      },
      {
        question: "What warranty do you provide for steel structure projects in Australia?",
        answer:
          "Laotie Steel provides a 15-year structural warranty on all steel members and connections. Colorbond roofing carries BlueScope's 25-year warranty. Sandwich panels carry a 10-year warranty on thermal and structural performance. All warranties are backed by our Australian insurance-backed warranty bond for projects over AUD 500,000. We also provide a 5-year coating warranty (against peeling, cracking, or excessive fading).",
      },
      {
        question: "Can you help with Australian council approval and building permits?",
        answer:
          "We provide all structural calculations, engineering certifications, and documentation required for council submission. However, the actual council approval process must be managed by your local building certifier or appointed consultant. We can recommend experienced Australian building certifiers who are familiar with our structural designs and can expedite the approval process.",
      },
    ],
    cta: `
      <p>Planning an industrial warehouse in Sydney or across Australia? Get a free preliminary design and budget estimate within 24 hours. Share your site dimensions, local design code requirements (AS/NZS 1170 wind region), crane requirements, and intended use — our engineering team will prepare a customized proposal with AS/NZS-compliant calculations.</p>
    `,
    conclusion: `
      <p>This Sydney industrial warehouse demonstrates Laotie Steel's capability to deliver large-span, code-compliant steel structure solutions to the Australian market. From SkyCiv-powered structural design to precision CNC fabrication and optimized container shipping, every stage of this project was managed to ensure the client received a structure that meets Australian standards at a competitive price.</p>
      <p>Whether you are planning a 1,000 m² logistics shed or a 20,000 m² distribution center, our 5 production lines and 15+ years of export experience ensure your project will be delivered on time, on budget, and fully compliant with your local building codes.</p>
      <p><a href="/contact" class="inline-flex items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-lg hover:bg-steel transition-colors shadow-lg">Get a Free Quote for Your Australian Steel Warehouse →</a></p>
    `,
    keywords: [
      "industrial warehouse Sydney",
      "steel structure warehouse Australia",
      "portal frame warehouse",
      "industrial shed Australia",
      "warehouse construction Sydney",
      "steel building supplier Australia",
      "Australian steel warehouse",
      "AS/NZS compliant warehouse",
      "prefabricated warehouse Australia",
    ],
    longTailKeywords: [
      "120m x 60m industrial warehouse Sydney cost",
      "AS/NZS 1170 compliant steel warehouse",
      "20T overhead crane warehouse design Australia",
      "Colorbond roofing industrial warehouse Sydney",
      "portal frame warehouse with mezzanine Australia",
    ],
  },

  "factory-complex-lagos": {
    slug: "factory-complex-lagos",
    metaTitle:
      "15,000 sqm Factory Complex Lagos | Steel Structure Nigeria | Laotie Steel",
    metaDescription:
      "Custom 15,000 sqm factory complex in Lagos, Nigeria. Multi-span steel structure, tropical climate design, 30m×3 continuous spans. Get a quote for West Africa projects.",
    urlSlug: "/projects/factory-complex-lagos",
    image: "/images/projects/project-lagos-01.webp",
    h1: "15,000 sqm Factory Complex in Lagos — Phase II Expansion",
    overview: `
      <p>This 15,000 m² factory complex is located in the Lagos Free Trade Zone, Nigeria. Completed in 2024, the project represents Phase II of a multi-stage manufacturing plant expansion. The facility required a massive column-free production floor to accommodate heavy manufacturing equipment and material handling systems.</p>
      <p>The structure features three continuous 30-meter spans (total 90m width) by 167 meters length, with 10 meters eave height. Total steel consumption: 580 tons of Q355B and Q235B steel. The design accounts for Nigeria's tropical climate (high humidity, salt air from nearby Atlantic coast), with enhanced corrosion protection throughout.</p>
      <p>All structural design was carried out considering relevant British Standards (adopted by Nigeria) and the Nigerian Building Code. Our engineering team provided full structural calculations, fabrication drawings, and erection manuals. The client appointed a UK-based consulting engineer for design review and certification.</p>
    `,
    challenges: `
      <p><strong>1. Tropical Climate Corrosion Protection.</strong> Lagos's coastal location creates a highly corrosive environment (C4 corrosion category per ISO 9223). Standard painting systems were insufficient. We upgraded to a 420μm DFT epoxy-polyurethane system with zinc-rich primer, suitable for 15-year service life in tropical coastal conditions.</p>
      <p><strong>2. Three Continuous 30m Spans Without Intermediate Columns.</strong> The client required a fully column-free production floor across all three spans. This required careful design of the main rafters (H900×350×16×28) with mid-span splice connections designed for both moment and shear transfer.</p>
      <p><strong>3. High Humidity and Ventilation Requirements.</strong> The manufacturing process generates significant heat and humidity. The client required natural ventilation equivalent to 10 air changes per hour. We designed continuous ridge vents (120 units, 1.5m wide each) with automatic openers linked to internal temperature sensors.</p>
      <p><strong>4. Nigerian Port Congestion and Inland Transport.</strong> Lagos ports (Apapa and Tin Can) are frequently congested, with truck queuing times of 7-14 days. We optimized container sizes (using 20ft containers for heavy H-sections to reduce individual container weight) and coordinated with the client's logistics provider for up-country transport from Lagos port to the Free Trade Zone (40km distance).</p>
    `,
    solution: `
      <p><strong>Design Phase:</strong> Our engineering team developed a 3D structural model of the 90m × 167m × 10m multi-span structure. The model accounted for trapezoidal wind load distribution (per BS 6399-2), a 1.5 kN/m² roof live load (for maintenance access and occasional roof-mounted equipment), and a 5.0 kN/m² floor live load for heavy manufacturing equipment.</p>
      <p><strong>Fabrication:</strong> All H-sections were CNC-cut from Q355B steel plate. The tropical climate coating system consisted of: 1×75μm epoxy zinc-rich primer, 2×125μm epoxy intermediate coats, 1×95μm polyurethane topcoat. All bolted connections use hot-dip galvanized 8.8/S grade bolts. Secondary members (purlins, girts) are pre-galvanized Z-sections (Z200, 2.5mm thick).</p>
      <p><strong>Ventilation System:</strong> We installed 120 continuous ridge vents (each 1.5m wide × 8m long) along the roof ridges. The vents use automatic openers (12V DC, solar-powered) that activate when internal temperature exceeds 28°C. This provides natural ventilation without electricity costs, critical for Nigeria's intermittent power supply.</p>
      <p><strong>Cladding System:</strong> The roof uses 0.53mm galvanized steel sheeting with acrylic coating (15-year warranty). Walls use 100mm rockwool sandwich panels (Fire rating: 2-hour, BS 476 Part 22) suitable for industrial fire safety requirements. All flashings and gutters are hot-dip galvanized after fabrication.</p>
    `,
    design: `
      <h3>Multi-Span Portal Frame Design</h3>
      <p>The structure uses three continuous portal frames, each spanning 30 meters. Column spacing: 8 meters (center to center). The frames are interconnected at the eave level with longitudinal rafter beams, creating a rigid diaphragm that distributes lateral loads across all three spans.</p>
      <h3>Wind Load Analysis (BS 6399-2)</h3>
      <p>Lagos's wind load calculation follows BS 6399-2 (adopted by Nigeria). Basic wind speed: 40 m/s (maximum credible wind speed for Lagos region). The design applied both static and dynamic wind load cases, with special attention to wind pressure distribution across the three adjacent spans (shielding effect considered per BS 6399-2 Clause 2.1.3.2).</p>
      <h3>Corrosion Protection Design (ISO 9223)</h3>
      <p>Lagos's coastal environment falls into C4 (high corrosivity) category per ISO 9223. Our coating system was designed for 15-year durability (medium-term per ISO 12944-1). All exterior members received 420μm DFT coating. Interior members (protected from direct rain) received 280μm DFT coating. All secondary members are hot-dip galvanized (85μm zinc coating thickness per AS/NZS 4680).</p>
    `,
    fabrication: `
      <h3>Material Preparation</h3>
      <p>All steel plates are sourced from certified mills with EN 10204 3.1 material test reports. Q355B plates are CNC-cut to H-section dimensions. Tropical climate coating requires special surface preparation: steel surfaces are shot-blasted to SA 3.0 (near-white metal, per AS 1627.4) — one grade higher than standard, to ensure maximum coating adhesion in humid environments.</p>
      <h3>Corrosion Protection Application</h3>
      <p>The coating system was applied in our climate-controlled coating shop (temperature: 20-25°C, humidity: <65% RH). Each coat was allowed 24-hour flash-off time before the next coat application. DFT measurements were taken at 8 points per member (corners and flat surfaces). Any reading below 90% of specified DFT was repaired with an additional stripe coat.</p>
      <h3>Precision Fabrication for Multi-Span Alignment</h3>
      <p>Multi-span structures require exceptional dimensional accuracy — a 5mm misalignment in Span 1 will compound to 15mm by Span 3. We used a 3D coordinate measuring arm to verify all connection hole positions. All columns and rafters were trial-assembled in the factory to verify fit-up before packing.</p>
    `,
    qualityControl: `
      <p>Laotie Steel operates an ISO 9001:2015 certified quality management system. For this Lagos project, we implemented additional tropical climate QC protocols.</p>
      <p><strong>Coating Thickness Quality Control:</strong> DFT measurements were taken at 8 points per member (minimum). Statistical process control (SPC) charts were maintained for coating thickness — any member with coating thickness standard deviation >15% triggered a coating line inspection. All coating application records (ambient temperature, humidity, dew point, steel surface temperature) were documented hourly.</p>
      <p><strong>Dimensional Quality Control:</strong> Pre-shipment trial assembly verified that all multi-span connections aligned within 3mm tolerance. We used a laser tracker (Leica AT960) to verify the alignment of all column base plates and rafter splice connections.</p>
      <p><strong>Third-Party Inspection:</strong> The client appointed a UK-based consulting engineer for design review and periodic fabrication inspection. All inspection reports were submitted to the client's project management team weekly. Final inspection certificate was issued before container loading.</p>
    `,
    packingShipping: `
      <p>For this 580-ton structure, we developed a comprehensive container loading plan. The shipment consisted of 78 containers (mix of 20ft and 40ft), optimized for Nigerian port handling equipment limitations (Lagos ports have limited heavy-lift equipment).</p>
      <p><strong>Container Allocation:</strong> 20 containers (20ft) for heavy H-sections (columns and rafters, each weighing 4-8 tons), 35 containers (40ft) for secondary members, 15 containers for cladding system, 8 containers for ridge vents, fasteners, and erection consumables.</p>
      <p><strong>Protection:</strong> All hot-dip galvanized members were wrapped in VCI (Vapor Corrosion Inhibitor) paper to prevent white rust during ocean transport (24-28 days from Shanghai to Lagos). All threaded fasteners were capped with plastic end-caps and packed in sealed plastic bags with desiccant.</p>
      <p><strong>Documentation:</strong> Each container received a detailed packing list in English (required for Nigerian customs). All documents were pre-arranged: Form M (Nigerian import permit), PSI (Pre-Shipment Inspection certificate), Bill of Lading, Commercial Invoice, Packing Lists, and Mill Test Reports.</p>
    `,
    installationGuide: `
      <h3>Foundation Preparation</h3>
      <p>The client's local contractor poured reinforced concrete foundations per our foundation reaction report. Lagos's soil condition: sandy loam with 100-150 kPa bearing capacity. Foundation design: 1.8m × 1.8m × 1.2m deep reinforced concrete pads with M36 anchor bolts. Foundation concrete strength: Minimum 25 MPa (BS 5328).</p>
      <h3>Main Frame Erection</h3>
      <p><strong>Week 1-2:</strong> Main portal frame columns and rafters for all 3 spans. Each column base plate uses 8× M36 anchor bolts. Column verticality is adjusted using laser plumb-bob and shim packs. Rafter-to-column connections use 8.8/S friction-grip bolts.</p>
      <h3>Multi-Span Alignment</h3>
      <p><strong>Week 3:</strong> Critical alignment verification. A laser tracker verifies that all three spans are aligned within 5mm tolerance. Temporary bracing remains in place until all permanent bracing is fully installed and tensioned.</p>
      <h3>Secondary Members & Cladding</h3>
      <p><strong>Week 4-6:</strong> Purlin, girt, and bracing installation. <strong>Week 7-9:</strong> Roof and wall cladding. Ridge vent installation requires working at roof ridge — all vent units were pre-assembled in the factory to minimize roof work time.</p>
      <h3>Erection Speed</h3>
      <p>A 15-person erection crew achieved 400 m² per day for the main frame, and 350 m² per day for cladding. Total on-site erection time: 55 working days. The client reported that the pre-galvanized secondary members saved significant on-site painting time (estimated 20 days saved compared to site-painted structure).</p>
    `,
    whyChoose: `
      <p><strong>1. Proven West Africa Export Experience.</strong> Laotie Steel has delivered 15+ steel structure projects to West Africa (Nigeria, Ghana, Ivory Coast) since 2018. We understand West African building codes, tropical climate design requirements, and regional logistics challenges (port congestion, inland transport).</p>
      <p><strong>2. Tropical Climate Engineering.</strong> Our engineering team has extensive experience designing for tropical climates (high humidity, salt air, intense UV). We specify appropriate corrosion protection systems (ISO 12944 C4/C5 categories), pre-galvanized secondary members, and UV-resistant cladding materials for all tropical projects.</p>
      <p><strong>3. Factory-Direct Pricing.</strong> A 15,000 m² factory complex that costs $800-1,000/m² locally in Nigeria (Lagos) can be supplied by Laotie at $450-550/m² (FOB Shanghai). Including Nigerian import duties (20%), port handling, and local erection, the total cost is approximately $650-800 per m² — a 25-35% saving compared to local sourcing.</p>
      <p><strong>4. 5 Production Lines, 5,000T/Month.</strong> Our Henan facility operates 5 independent production lines. This Lagos project's 580 tons was completed in 28 working days. Our production capacity ensures your project will not be delayed by capacity constraints.</p>
      <p><strong>5. Full Engineering and Logistics Support.</strong> Every West African project includes: (1) Structural calculations (British Standards), (2) Fabrication drawings, (3) Erection manual, (4) Material test reports, (5) Coating certificates, (6) Container packing lists, (7) Nigerian import documentation assistance (Form M, PSI), and (8) Port congestion update reports during shipment.</p>
    `,
    specs: [
      { label: "Project Name", value: "Lagos Factory Complex Phase II" },
      { label: "Location", value: "Lagos Free Trade Zone, Nigeria" },
      { label: "Building Type", value: "Multi-Span Steel Structure (3×30m)" },
      { label: "Dimensions", value: "167m (L) × 90m (W) × 10m (H)" },
      { label: "Building Area", value: "15,000 m²" },
      { label: "Steel Consumption", value: "580 tons (Q355B + Q235B)" },
      { label: "Design Standard", value: "BS 6399, BS 5950, Nigerian Building Code" },
      { label: "Wind Load", value: "40 m/s basic wind speed (BS 6399-2)" },
      { label: "Roof System", value: "0.53mm galvanized steel sheet + ridge vents" },
      { label: "Wall System", value: "100mm rockwool sandwich panel, 2-hour fire rating" },
      { label: "Corrosion Protection", value: "420μm DFT epoxy-polyurethane system (C4)" },
      { label: "Ventilation", value: "120 ridge vents, 10 air changes/hour" },
      { label: "Project Year", value: "2024" },
      { label: "Lead Time", value: "28 days fabrication + 28 days shipping" },
      { label: "Connection Type", value: "Bolted portal frame (8.8/S hot-dip galvanized bolts)" },
      { label: "Seismic Rating", value: "Low (Nigeria low seismic activity region)" },
      { label: "Snow Load", value: "Not applicable (tropical region)" },
      { label: "Temperature Load", value: "±30mm thermal expansion allowance" },
      { label: "Fire Rating", value: "2-hour (BS 476 Part 22), rockwool sandwich panel" },
      { label: "Design Life", value: "50 years (BS 5950)" },
      { label: "Foundation Type", value: "Reinforced concrete pad footings (1.8m×1.8m×1.2m)" },
      { label: "Erection Method", value: "Bolted connection, pre-galvanized members" },
    ],
    faq: [
      {
        question: "How much does a 15,000 sqm factory cost in Nigeria?",
        answer:
          "For a 15,000 m² factory complex like our Lagos project, the supply-only cost from Laotie Steel is typically $450-550 per m² (FOB Shanghai). Including Nigerian import duties (20%), port handling and customs clearance (approximately $80-120 per container), inland transport from Lagos port to site, and local erection ($60-90/m²), the total delivered-and-erected cost is approximately $650-800 per m². Local Nigerian fabrication would typically quote $800-1,000 per m² for equivalent specification.",
      },
      {
        question: "Do your steel structures comply with Nigerian building codes?",
        answer:
          "Yes. Every Laotie steel structure for the Nigerian market is designed to relevant British Standards (adopted by Nigeria): BS 6399 (Loadings), BS 5950 (Structural Use of Steelwork), and BS 476 (Fire Safety). We provide full calculation reports that can be submitted to Nigerian building authorities. Our designs also comply with the Nigerian Building Code (NBC 2006) requirements.",
      },
      {
        question: "What corrosion protection do you use for coastal Nigeria projects?",
        answer:
          "For coastal Nigeria (C4 high corrosivity per ISO 9223), we use a 420μm DFT epoxy-polyurethane coating system with zinc-rich primer (durability: 15 years per ISO 12944). All secondary members (purlins, girts) are hot-dip galvanized (85μm zinc coating). For roof cladding, we use galvanized steel with acrylic coating (15-year warranty). This system has proven performance in Lagos's coastal environment.",
      },
      {
        question: "What is the lead time for a factory from China to Lagos?",
        answer:
          "Total lead time is typically 55-65 days: 25-30 days for fabrication, 24-28 days for sea freight to Lagos (Apapa or Tin Can port), plus 7-14 days for port clearance (Lagos ports are frequently congested). We recommend allowing 75 days total from deposit to site delivery. Using 20ft containers for heavy members can reduce port handling time by 3-5 days.",
      },
      {
        question: "Can you help with Nigerian import documentation (Form M, PSI)?",
        answer:
          "Yes. We provide all export documentation required for Nigerian imports: Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, and Mill Test Reports. For Form M (import permit) and PSI (Pre-Shipment Inspection), we coordinate with the client's appointed clearing agent and provide any additional documentation required by Nigerian customs.",
      },
      {
        question: "Do you provide natural ventilation design for tropical factories?",
        answer:
          "Yes. For this Lagos project, we designed 120 continuous ridge vents that provide 10 air changes per hour of natural ventilation. The vents use solar-powered automatic openers (activates at 28°C internal temperature). This provides ventilation without electricity costs — critical for regions with intermittent power supply. We can also design wall louvers and roof monitors for enhanced natural ventilation.",
      },
      {
        question: "What foundation design do you provide for Nigerian soil conditions?",
        answer:
          "We provide foundation reaction reports that your local geotechnical engineer can use to design suitable foundations. For Lagos's typical sandy loam soil (100-150 kPa bearing capacity), our standard foundation design uses 1.8m × 1.8m × 1.2m deep reinforced concrete pads with M36 anchor bolts. We also provide hold-down bolt cage assemblies for accurate anchor bolt positioning.",
      },
      {
        question: "What warranty do you provide for steel structure projects in West Africa?",
        answer:
          "Laotie Steel provides a 15-year structural warranty on all steel members and connections. Cladding systems carry a 10-15-year warranty (depending on coating type). Coating system warranty: 10 years against peeling, cracking, or excessive fading (subject to environmental conditions). All warranties are backed by our international insurance coverage for projects over $500,000.",
      },
    ],
    cta: `
      <p>Planning a factory complex in Nigeria or West Africa? Get a free preliminary design and budget estimate within 24 hours. Share your site dimensions, local building code requirements, tropical climate considerations, and intended use — our engineering team will prepare a customized proposal with British Standards-compliant calculations.</p>
    `,
    conclusion: `
      <p>This Lagos factory complex demonstrates Laotie Steel's capability to deliver large-span, tropical-climate-optimized steel structure solutions to the West African market. From corrosion-resistant coating systems to natural ventilation design and Nigerian import documentation support, every stage of this project was managed to ensure the client received a durable, code-compliant structure at a competitive price.</p>
      <p>Whether you are planning a 2,000 m² manufacturing plant or a 30,000 m² industrial complex, our 5 production lines and 15+ years of export experience ensure your project will be delivered on time, on budget, and fully compliant with your local building codes and tropical climate requirements.</p>
      <p><a href="/contact" class="inline-flex items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-lg hover:bg-steel transition-colors shadow-lg">Get a Free Quote for Your West African Steel Project →</a></p>
    `,
    keywords: [
      "factory complex Nigeria",
      "steel structure Nigeria",
      "industrial building West Africa",
      "manufacturing plant Lagos",
      "steel warehouse Nigeria",
      "prefabricated factory Africa",
      "multi-span steel structure",
      "tropical climate steel building",
    ],
    longTailKeywords: [
      "15,000 sqm factory complex Lagos cost",
      "BS 6399 compliant steel structure Nigeria",
      "tropical climate corrosion protection steel building",
      "multi-span factory design West Africa",
      "Lagos Free Trade Zone steel structure supplier",
    ],
  },

  "shopping-mall-dome-roof-manila": {
    slug: "shopping-mall-dome-roof-manila",
    metaTitle:
      "80×40m Space Frame Dome Roof Manila | Shopping Mall | Laotie Steel",
    metaDescription:
      "Custom 80m×40m space frame dome roof for Manila shopping mall. Bolt-ball system, zero site welding, seismic design per NSCP 2015. Get a quote for space frame projects.",
    urlSlug: "/projects/shopping-mall-dome-roof-manila",
    image: "/images/projects/project-manila-01.webp",
    h1: "80m × 40m Space Frame Dome Roof in Manila — Shopping Mall Atrium",
    overview: `
      <p>This 3,200 m² space frame dome roof was designed and fabricated for a 4-story shopping mall in Metro Manila, Philippines. Completed in 2024, the project features a curved bolt-ball space frame system covering the mall's central atrium, providing an iconic architectural feature while maintaining structural efficiency.</p>
      <p>The dome spans 80 meters in length and 40 meters in width, with a maximum rise of 12 meters at the center. The structure uses a bolt-ball connection system (∅60 high-strength bolts with spherical nodes) that requires zero site welding — a critical requirement for the Philippine dry season construction schedule (November to May).</p>
      <p>All structural design was carried out in accordance with NSCP 2015 (National Structural Code of the Philippines) and ACI 318 (for concrete connection design). The space frame was designed for seismic Zone 4 (high seismic risk per Philippine Map of Seismic Hazard), with a peak ground acceleration of 0.4g. Our engineering team provided full calculations, fabrication drawings, and erection procedures.</p>
    `,
    challenges: `
      <p><strong>1. Seismic Design (Zone 4, 0.4g PGA).</strong> Metro Manila is located in a high seismic zone. The space frame must withstand both gravity loads and significant seismic forces (lateral and vertical). Our design used a 3D space frame model with response spectrum analysis (NSCP 2015 Section 208) to ensure the structure can survive a design earthquake without collapse.</p>
      <p><strong>2. Zero Site Welding Requirement.</strong> The client's project schedule (dry season construction) did not allow for on-site welding (which requires weather protection and skilled welders). We designed the entire dome using bolt-ball connections — every member is pre-assembled in the factory, match-marked, and bolted on-site using only spanners and torque wrenches.</p>
      <p><strong>3. Curved Geometry Fabrication Tolerance.</strong> A dome roof requires exceptional fabrication accuracy — a 5mm fabrication error at the base can compound to 50mm misalignment at the dome apex. We used CNC-machined spherical nodes (±0.5mm tolerance) and verified the entire dome geometry using a 3D laser scanner during trial assembly.</p>
      <p><strong>4. Tropical UV and Rain Protection.</strong> Manila's tropical climate (high UV, heavy rainfall) requires a roofing system that is both UV-resistant and watertight. The dome's curved geometry creates challenging roofing details at the perimeter and apex. We specified PVDF-coated aluminum cladding (15-year warranty) with custom-fabricated perimeter flashings and integrated drainage channels.</p>
    `,
    solution: `
      <p><strong>Design Phase:</strong> Our engineering team developed a 3D space frame model using specialized space frame design software. The model used ∅89×4mm (top chord), ∅76×3.5mm (bottom chord), and ∅60×3mm (web members) steel tubes, all connected via ∅180mm spherical nodes. The design accounted for gravity loads (1.2 DL + 1.6 LL per NSCP 2015), seismic loads (response spectrum method), and wind loads (250 kph design wind speed, Typhoon Zone).</p>
      <p><strong>Fabrication:</strong> All steel tubes were CNC-cut to length (±1mm tolerance) with spherical end-plates welded using a robotic welding system. Spherical nodes were CNC-machined from solid steel billets (±0.5mm spherical tolerance). All bolt holes were drilled using a 6-axis CNC drilling machine, ensuring perfect alignment between the node and connecting tubes.</p>
      <p><strong>Connection System:</strong> The bolt-ball system uses 8.8/S grade high-strength bolts (∅16-20mm depending on member force). Each bolt is pre-tensioned to 120 Nm using a calibrated torque wrench. The connection is slip-resistant and suitable for both tension and compression members. No site welding is required — the entire dome can be assembled using only bolting.</p>
      <p><strong>Cladding System:</strong> The roof uses 2.5mm PVDF-coated aluminum cladding panels (custom-bent to dome curvature) with tongue-and-groove joints. All panel joints are sealed with UV-resistant PU sealant. Integrated drainage channels at the dome perimeter handle Manila's heavy rainfall (2,000mm annual rainfall) without overflow.</p>
    `,
    design: `
      <h3>Space Frame Design to NSCP 2015</h3>
      <p>The space frame was designed as a double-layer grid structure with 4m × 4m grid spacing. All members were designed for axial forces (tension/compression) only — bending moments are negligible in a properly designed space frame. The design used response spectrum analysis with 5% damping ratio (NSCP 2015 Figure 208-5 for 0.4g PGA).</p>
      <h3>Seismic Design (NSCP 2015)</h3>
      <p>Metro Manila's Seismic Zone 4 requires design for 0.4g peak ground acceleration. Our 3D model applied seismic forces in both horizontal directions (X and Y) and vertical direction (Z, 0.65 × PGA per NSCP 2015). The space frame's inherent redundancy (multiple load paths) provides excellent seismic performance — even if several members yield, the structure can redistribute loads and avoid collapse.</p>
      <h3>Bolt-Ball Connection Design</h3>
      <p>The bolt-ball connection system is a proprietary system that uses spherical nodes with pre-drilled bolt holes. Each node can accommodate 6-12 connecting members at various angles. Connection design follows the manufacturer's design manual (approved by Philippine building authorities) with bolt capacity calculated per AISC Steel Manual (2016).</p>
      <h3>Deflection Control</h3>
      <p>Space frame deflection limits: L/250 for roof live load (NSCP 2015 Table 201-1). For this 80m × 40m dome, maximum allowable deflection: 160mm (80,000/250). Our design achieved 120mm maximum deflection under full design load — well within the allowable limit, ensuring roof cladding does not distress due to excessive deflection.</p>
    `,
    fabrication: `
      <h3>CNC Machining of Spherical Nodes</h3>
      <p>Spherical nodes (∅180mm) are the heart of the bolt-ball system. Each node is CNC-machined from solid steel billet (Q355B) with ±0.5mm spherical tolerance. Bolt holes are drilled at precise angles (±0.2° tolerance) using a 6-axis CNC drilling machine. Each node is uniquely numbered and match-marked for site assembly.</p>
      <h3>Tube Fabrication</h3>
      <p>All steel tubes (∅89, ∅76, ∅60) are CNC-cut to length (±1mm tolerance). Spherical end-plates (thickness: 10-16mm depending on member force) are welded to tube ends using a robotic welding system (100% penetration weld). All welds are visual-inspected per AWS D1.1, with 10% UT inspection for critical members.</p>
      <h3>Surface Treatment</h3>
      <p>All space frame members and nodes are hot-dip galvanized per AS/NZS 4680 (galvanizing standard adopted by Philippines). Zinc coating thickness: 85-100μm (average). Hot-dip galvanizing provides 25+ year corrosion protection in Manila's tropical climate (C3 corrosivity per ISO 9223).</p>
      <h3>Trial Assembly</h3>
      <p>Before shipping, 30% of the space frame (selected nodes and members) was trial-assembled in our factory. A 3D laser scanner verified that all connection points aligned within 3mm tolerance. Any misaligned members were corrected before shipping. Trial assembly photos and laser scan reports were included in the project dossier.</p>
    `,
    qualityControl: `
      <p>Laotie Steel operates an ISO 9001:2015 certified quality management system. For this Manila space frame project, we implemented additional QC protocols for seismic-rated structures.</p>
      <p><strong>Dimensional Quality Control:</strong> Pre-shipment trial assembly (30% of structure) verified that all bolt-ball connections aligned within 3mm tolerance. We used a Faro Focus 3D laser scanner to capture the trial assembly geometry and compared it to the 3D design model. Any deviation >3mm triggered member re-fabrication.</p>
      <p><strong>Welding Quality:</strong> All end-plate welds were 100% visual-inspected per AWS D1.1 Table 6.1. 10% of welds were UT-inspected (random selection). All welding procedures were qualified per AWS D1.1, with welding consumables stored in heated cabinets (to prevent moisture absorption in Manila's humid climate).</p>
      <p><strong>Galvanizing Inspection:</strong> Hot-dip galvanizing quality was verified per AS/NZS 4680. Coating thickness: 85-100μm (measured using a magnetic thickness gauge at 5 points per member). Surface finish: no bare spots, no excessive dross inclusions, uniform zinc appearance.</p>
      <p><strong>Material Traceability:</strong> Each steel tube's mill test report was cross-referenced to the finished member's serial number. Spherical nodes were traceable to the steel billet's heat number. The client received a full material traceability dossier with the shipment.</p>
    `,
    packingShipping: `
      <p>For this 180-ton space frame, we developed a specialized container loading plan. Space frame members (long tubes) require careful container loading to avoid deformation during transport. The shipment consisted of 32 × 40ft high-cube containers.</p>
      <p><strong>Container Allocation:</strong> 12 containers for steel tubes (packed in custom steel racks to prevent bending), 10 containers for spherical nodes (packed in wooden crates with VCI paper wrapping), 6 containers for aluminum cladding panels (custom-bent, packed in A-frame racks), 4 containers for fasteners, sealants, and erection consumables.</p>
      <p><strong>Protection:</strong> All hot-dip galvanized members were wrapped in VCI paper to prevent white rust during ocean transport (20-24 days from Shanghai to Manila). Aluminum cladding panels were interleaved with kraft paper and packed in moisture-barrier bags. All bolted connections were pre-assembled with temporary bolts for trial assembly verification.</p>
      <p><strong>Documentation:</strong> Each container received a detailed packing list cross-referenced to the 3D erection drawing's node numbers. Philippine Bureau of Customs (BOC) requires detailed material descriptions and values — we provided all documentation in English and Filipino (Tagalog) as requested by the client's customs broker.</p>
    `,
    installationGuide: `
      <h3>Foundation Preparation</h3>
      <p>The shopping mall's reinforced concrete frame was already constructed when our space frame arrived. We provided embed plates (500×500×20mm) that were cast into the concrete ring beam at the roof level. Embed plate tolerances: ±3mm in position, ±2mm in elevation. All embed plates were surveyed using a total station before space frame installation.</p>
      <h3>Space Frame Erection</h3>
      <p><strong>Week 1:</strong> Erection of perimeter ring beam connections. Space frame nodes are bolted to embed plates using 8.8/S grade anchor bolts. <strong>Week 2-3:</strong> Bottom chord installation. The bottom chord (∅76×3.5mm tubes) is installed first, creating a stable base grid. <strong>Week 4-5:</strong> Web member and top chord installation. The dome geometry is built upwards from the perimeter. <strong>Week 6:</strong> Apex node installation and final tensioning of all bolts.</p>
      <h3>Bolting Torque Specification</h3>
      <p>All bolt-ball connections use 8.8/S grade high-strength bolts. Torque specification: 120 Nm (±10 Nm) for ∅16mm bolts, 180 Nm for ∅20mm bolts. All bolts are tightened using a calibrated torque wrench. Bolt tension verification: 10% random check using ultrasonic bolt tension meter.</p>
      <h3>Cladding Installation</h3>
      <p><strong>Week 7-8:</strong> Aluminum cladding panel installation. Panels are custom-bent to dome curvature and installed using concealed fixing systems. All panel joints are sealed with UV-resistant PU sealant. Perimeter flashings and integrated drainage channels are installed in Week 8.</p>
      <h3>Erection Speed</h3>
      <p>A 12-person erection crew achieved 80 nodes per day (bottom chord and web members) and 40 nodes per day (top chord and apex). Total on-site erection time: 50 working days. The client's project manager reported that the zero-welding requirement saved approximately 20 days compared to a welded space frame.</p>
    `,
    whyChoose: `
      <p><strong>1. Proven Southeast Asia Export Experience.</strong> Laotie Steel has delivered 20+ steel structure projects to Southeast Asia (Philippines, Vietnam, Thailand, Malaysia) since 2018. We understand NSCP 2015 (Philippine Building Code), local seismic design requirements, and Philippine import regulations.</p>
      <p><strong>2. Space Frame Design Expertise.</strong> Our engineering team has designed 50+ space frame structures (airport terminals, shopping malls, stadium roofs) using both bolt-ball and node-plate connection systems. We use specialized space frame design software that can model complex geometries (curved, domed, hyperbolic paraboloid) with high accuracy.</p>
      <p><strong>3. Zero Site Welding Advantage.</strong> Our bolt-ball space frame system requires zero site welding — the entire structure is assembled using only bolting. This reduces on-site labor costs, eliminates weather-dependent welding delays, and ensures consistent connection quality (factory-controlled bolting vs. site-dependent welding).</p>
      <p><strong>4. Factory-Direct Pricing.</strong> A 3,200 m² space frame roof that costs $350-450/m² locally in Manila can be supplied by Laotie at $220-280/m² (FOB Shanghai). Including Philippine import duties (15% for steel structures), VAT (12%), freight, and local erection, the total cost is approximately $300-380 per m² — a 25-35% saving compared to local sourcing.</p>
      <p><strong>5. Seismic Design Capability.</strong> All our space frames for the Philippine market are designed for seismic Zone 2-4 (per NSCP 2015). We use response spectrum analysis and ensure the structure has adequate redundancy (multiple load paths) to survive design earthquakes without collapse. Our calculations are prepared by engineers familiar with Philippine seismic design provisions.</p>
    `,
    specs: [
      { label: "Project Name", value: "Manila Shopping Mall Dome Roof" },
      { label: "Location", value: "Metro Manila, Philippines" },
      { label: "Building Type", value: "Space Frame Dome Roof (Bolt-Ball System)" },
      { label: "Dimensions", value: "80m (L) × 40m (W) × 12m (H at center)" },
      { label: "Roof Area", value: "3,200 m²" },
      { label: "Steel Consumption", value: "180 tons (Q355B)" },
      { label: "Design Standard", value: "NSCP 2015, ACI 318, AISC Steel Manual" },
      { label: "Seismic Design", value: "Zone 4, 0.4g PGA, response spectrum analysis" },
      { label: "Connection System", value: "Bolt-ball (∅180mm spherical nodes)" },
      { label: "Roof Cladding", value: "2.5mm PVDF-coated aluminum panel" },
      { label: "Corrosion Protection", value: "Hot-dip galvanized (85-100μm)" },
      { label: "Site Welding", value: "Zero (all bolted connections)" },
      { label: "Project Year", value: "2024" },
      { label: "Lead Time", value: "30 days fabrication + 24 days shipping" },
      { label: "Connection Type", value: "Bolted portal frame (8.8/S hot-dip galvanized bolts)" },
      { label: "Seismic Rating", value: "High (Philippines seismic Zone 4, near Ring of Fire)" },
      { label: "Snow Load", value: "Not applicable (tropical region)" },
      { label: "Temperature Load", value: "±35mm thermal expansion allowance" },
      { label: "Fire Rating", value: "2-hour (BS 476 Part 22), rockwool sandwich panel" },
      { label: "Design Life", value: "50 years (NSCP 2015)" },
      { label: "Foundation Type", value: "Reinforced concrete pad footings (2.0m×2.0m×1.5m)" },
      { label: "Erection Method", value: "Bolted connection, typhoon-resistant design" },
    ],
    faq: [
      {
        question: "How much does a space frame dome roof cost in the Philippines?",
        answer:
          "For a 3,200 m² space frame dome roof like our Manila project, the supply-only cost from Laotie Steel is typically $220-280 per m² (FOB Shanghai). Including Philippine import duties (15%), VAT (12%), sea freight (Shanghai to Manila: approximately $3,000-4,000 per container), and local erection ($40-60/m²), the total delivered-and-erected cost is approximately $300-380 per m². Local Manila fabrication would typically quote $350-450 per m² for equivalent specification.",
      },
      {
        question: "Do your space frames comply with NSCP 2015 seismic requirements?",
        answer:
          "Yes. Every Laotie space frame for the Philippine market is designed to NSCP 2015 (National Structural Code of the Philippines). We use response spectrum analysis for seismic design (per NSCP 2015 Section 208) and ensure the structure has adequate redundancy to survive design earthquakes (Seismic Zone 2-4, depending on project location). Our calculations are prepared by engineers familiar with Philippine seismic design provisions.",
      },
      {
        question: "What is the bolt-ball space frame connection system?",
        answer:
          "The bolt-ball system is a space frame connection method that uses spherical nodes with pre-drilled bolt holes. Steel tubes with spherical end-plates are bolted to the node using high-strength bolts (8.8/S grade). This system requires zero site welding — the entire space frame is assembled using only bolting. It is faster to erect, provides consistent connection quality, and is ideal for projects with tight construction schedules or limited on-site welding capability.",
      },
      {
        question: "How long does it take to erect a space frame dome roof?",
        answer:
          "For a 3,200 m² dome roof like our Manila project, a 12-person erection crew typically requires 50 working days for full erection (including cladding). The zero-welding requirement of the bolt-ball system saves approximately 15-20 days compared to a welded space frame. Erection sequence: Week 1 (perimeter ring beam), Week 2-5 (space frame assembly), Week 6 (final tensioning), Week 7-8 (cladding installation).",
      },
      {
        question: "Do you provide hot-dip galvanizing for tropical climate projects?",
        answer:
          "Yes. For this Manila project (C3 corrosivity per ISO 9223), all space frame members and nodes are hot-dip galvanized per AS/NZS 4680. Zinc coating thickness: 85-100μm (average), providing 25+ year corrosion protection in tropical climates. For more aggressive environments (coastal C4/C5), we can upgrade to a 420μm DFT epoxy-polyurethane coating system.",
      },
      {
        question: "Can you design space frames for custom geometries (curved, hyperbolic)?",
        answer:
          "Yes. Our engineering team uses specialized space frame design software that can model complex geometries: curved roofs, domed roofs, hyperbolic paraboloid roofs, and free-form surfaces. We have designed 50+ space frame structures with custom geometries. Provide your architectural concept (CAD file or sketch), and our team will develop a structural scheme that realizes your design intent while maintaining structural efficiency.",
      },
      {
        question: "What is the lead time for a space frame from China to Manila?",
        answer:
          "Total lead time is typically 55-65 days: 25-35 days for fabrication (space frame machining is more time-consuming than standard H-section fabrication), 20-24 days for sea freight to Manila (South Harbor). We recommend allowing 75 days total from deposit to site delivery. Express fabrication (20 days) is available at 20% premium.",
      },
      {
        question: "Do you provide cladding systems for space frame roofs?",
        answer:
          "Yes. We supply custom-cladding systems for all space frame projects. For this Manila project, we supplied 2.5mm PVDF-coated aluminum panels (custom-bent to dome curvature) with tongue-and-groove joints. We can also supply: (1) Colorbond steel cladding, (2) Sandwich panel cladding (for insulated roofs), (3) Polycarbonate skylight panels (for natural lighting), and (4) Integrated photovoltaic (BIPV) cladding. All cladding systems are designed for the specific space frame geometry.",
      },
      {
        question: "What warranty do you provide for space frame projects in Southeast Asia?",
        answer:
          "Laotie Steel provides a 15-year structural warranty on all space frame members and connections. Hot-dip galvanizing carries a 25-year corrosion warranty. Aluminum cladding carries a 15-year warranty (PVDF coating). All warranties are backed by our international insurance coverage for projects over $500,000. We also provide a 5-year connection warranty (against bolt loosening or connection failure).",
      },
      {
        question: "Can you provide on-site erection supervision for space frame projects?",
        answer:
          "Yes. We can provide one of our senior space frame engineers for on-site erection supervision at $3,000 per day (including travel and accommodation). Our engineer will verify foundation preparation, oversee critical node installations, provide bolting torque verification, and ensure the space frame geometry meets design tolerances. Alternatively, we can provide a detailed erection manual and video tutorials, allowing a competent local contractor to erect the space frame without our on-site presence.",
      },
    ],
    cta: `
      <p>Planning a space frame roof for a shopping mall, airport, or stadium in the Philippines or Southeast Asia? Get a free preliminary design and budget estimate within 24 hours. Share your architectural concept, span requirements, seismic zone, and intended use — our engineering team will prepare a customized proposal with NSCP 2015-compliant calculations.</p>
    `,
    conclusion: `
      <p>This Manila shopping mall dome roof demonstrates Laotie Steel's capability to deliver complex geometry space frame structures to the Southeast Asian market. From seismic-resistant design to precision CNC-machined nodes and zero-welding site assembly, every stage of this project was managed to ensure the client received an iconic, code-compliant structure at a competitive price.</p>
      <p>Whether you are planning a 1,000 m² shopping mall atrium or a 20,000 m² airport terminal roof, our space frame design expertise and 15+ years of export experience ensure your project will be delivered on time, on budget, and fully compliant with your local building codes and seismic requirements.</p>
      <p><a href="/contact" class="inline-flex items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-lg hover:bg-steel transition-colors shadow-lg">Get a Free Quote for Your Space Frame Project →</a></p>
    `,
    keywords: [
      "space frame Philippines",
      "steel space frame",
      "dome roof Manila",
      "shopping mall atrium roof",
      "bolt-ball space frame",
      "seismic design Philippines",
      "NSCP 2015 space frame",
      "curved roof space frame",
    ],
    longTailKeywords: [
      "80m x 40m space frame dome roof cost Manila",
      "NSCP 2015 compliant space frame design",
      "zero welding space frame erection Philippines",
      "bolt-ball connection space frame supplier",
      "seismic Zone 4 space frame design Philippines",
    ],
  },

  "logistics-center-dubai": {
    slug: "logistics-center-dubai",
    metaTitle:
      "22,000 sqm Logistics Center Dubai | Steel Warehouse UAE | Laotie Steel",
    metaDescription:
      "Custom 22,000 sqm logistics center in Dubai South, UAE. Steel building + mezzanine, 50m clear-span, fire-rated, designed for 50°C. Get a quote for Middle East projects.",
    urlSlug: "/projects/logistics-center-dubai",
    image: "/images/projects/project-dubai-01.webp",
    h1: "22,000 sqm Logistics Distribution Center in Dubai — Dubai South (DWC)",
    overview: `
      <p>This 22,000 m² logistics hub is located in Dubai South (DWC) Free Zone, UAE. Completed in 2023, the project serves as a regional distribution center for a global logistics company. The facility required a massive clear-span warehouse with integrated office mezzanine, fire-rated construction, and design for extreme ambient temperatures (up to 50°C).</p>
      <p>The structure features 50-meter clear-span bays (total 220m length × 100m width) with 18 meters eave height. Total steel consumption: 850 tons of Q355B and Q420B high-strength steel. The design accounts for UAE Building Code (adopted IBC 2018), Dubai Municipality requirements, and extreme temperature service conditions (50°C ambient, 70°C roof surface temperature).</p>
      <p>All structural design was carried out in accordance with UAE Fire & Life Safety Code (2018), IBC 2018, and BS 5950. Our engineering team provided full calculations, fabrication drawings, and Dubai Municipality submission documents. The client appointed a UAE-based consulting engineer for design review and authority approval.</p>
    `,
    challenges: `
      <p><strong>1. Extreme Temperature Design (50°C Ambient).</strong> Dubai's summer ambient temperature reaches 50°C, with roof surface temperatures exceeding 70°C. Steel strength reduces at elevated temperatures (per BS 5950 Part 1, Table 1 — steel yield strength at 50°C: 95% of room temperature value). We upgraded all primary members to Q420B steel (420 MPa yield) to maintain adequate load capacity at design temperature.</p>
      <p><strong>2. 2-Hour Fire Rating Requirement.</strong> Dubai Municipality requires 2-hour fire rating for logistics warehouses >10,000 m² (UAE Fire & Life Safety Code Clause 4.2.1). We applied intumescent paint (2-hour rating per BS EN 13381-8) to all primary steel members. The mezzanine floor system used 2-hour fire-rated composite deck + concrete slab.</p>
      <p><strong>3. 50m Clear-Span Requirement.</strong> The client required 50m clear span bays to accommodate 40-foot container stacking (6-high) and automated guided vehicles (AGV) movement. This required careful design of the main rafters (H1200×400×20×36) with mid-span splice connections designed for both moment and shear transfer.</p>
      <p><strong>4. UAE Customs and Free Zone Documentation.</strong> Dubai South Free Zone has specific import documentation requirements. All steel members must be accompanied by a Certificate of Conformity (CoC) issued by an UAE-authorized inspection agency. We coordinated with SGS Dubai to perform pre-shipment inspection and issue CoC for all 68 containers.</p>
    `,
    solution: `
      <p><strong>Design Phase:</strong> Our engineering team developed a 3D structural model of the 220m × 100m × 18m logistics facility. The model accounted for UAE Building Code (IBC 2018 adopted) wind loads (1.5 kPa roof, 2.0 kPa walls — enhanced for Dubai's frequent dust storms), a 1.2 kN/m² roof live load, and a 6.0 kN/m² floor live load for 40-foot container stacking.</p>
      <p><strong>Fabrication:</strong> All H-sections were CNC-cut from Q420B steel plate (for temperature service). The fire-rated coating system: 1×125μm intumescent base coat (2-hour rating), 1×80μm polyurethane topcoat (UV-resistant, suitable for Dubai's intense sun). All bolted connections use hot-dip galvanized 10.9/S grade bolts (galvanizing prevents bolt seizing at high temperatures).</p>
      <p><strong>Mezzanine Office Design:</strong> The 3,000 m² mezzanine office uses composite steel deck (150mm deep) + 130mm concrete slab. The floor system provides a 3.0 kN/m² live load for office use. Fire rating: 2-hour (BS EN 13381-8). The mezzanine also includes fire-rated staircases (2-hour) and fire-rated elevator shaft (steel encased in fire-rated drywall).</p>
      <p><strong>HVAC-Ready Roof Structure:</strong> Dubai's logistics warehouses require massive HVAC systems. We designed the roof structure with equipment support platforms (capable of supporting 5-ton HVAC units at 15m spacing). All roof penetrations for HVAC ducting were pre-fabricated with flanged openings and curb details.</p>
    `,
    design: `
      <h3>Portal Frame Design to BS 5950 (UAE Adoption)</h3>
      <p>The portal frame was designed as a moment-resisting frame with pinned-base conditions (to simplify foundation design). Column spacing: 10 meters. The frame provides 50m clear span with 18m eave height. Q420B steel was used for all primary members to maintain adequate load capacity at 50°C design temperature (steel yield strength derating per BS 5950 Table 1).</p>
      <h3>Wind Load Analysis (UAE Building Code / IBC 2018)</h3>
      <p>Dubai's wind load calculation follows IBC 2018 (adopted by UAE). Basic wind speed: 45 m/s (150 km/h, Category 3 tropical storm equivalent). The design applied both static and dynamic wind load cases, with special attention to roof cladding suction loads during dust storms (frequent in Dubai summer).</p>
      <h3>Fire Rating Design (UAE Fire & Life Safety Code)</h3>
      <p>For 2-hour fire rating, we applied intumescent paint to all primary steel members. Intumescent paint expands when exposed to fire (200-300°C), creating a char layer that insulates the steel and maintains load capacity for 2 hours. The mezzanine floor system used 2-hour fire-rated composite deck (BS EN 13381-8 certified).</p>
      <h3>Container Stacking Load Design</h3>
      <p>The warehouse floor is designed for 6-high 40-foot container stacking (maximum 6×30.5 tons = 183 tons per stacking position). Floor live load: 6.0 kN/m² (UAE Building Code Table 1607.1). The foundation design used 2.0m × 2.0m × 1.5m deep reinforced concrete pads (40 MPa concrete) to distribute container stacking loads to the ground.</p>
    `,
    fabrication: `
      <h3>Q420B Steel Fabrication</h3>
      <p>Q420B high-strength steel requires careful welding procedure qualification (WPQ). All welds were performed using low-hydrogen electrodes (to prevent cold cracking in high-strength steel). Preheat temperature: 120-150°C (per BS EN 1011-2). All welds were 100% UT-inspected. Post-weld heat treatment (PWHT) was performed for thick plates (>40mm) to relieve residual stresses.</p>
      <h3>Fire-Rated Coating Application</h3>
      <p>Intumescent paint application requires strict environmental control: temperature 10-35°C, relative humidity <85% (per manufacturer's specification). Each coat was allowed 24-hour flash-off time. DFT: 1,200μm (intumescent base coat) + 80μm (polyurethane topcoat). Coating thickness was verified using a dry-film thickness gauge (SSPC-PA 2).</p>
      <h3>HVAC Platform Fabrication</h3>
      <p>Roof-mounted HVAC platforms were fabricated from H250×125×6×9 steel sections (Q235B, adequate for platform loads). All platforms were hot-dip galvanized after fabrication (to prevent corrosion from HVAC condensate). Platform dimensions: 2.5m × 1.5m (suitable for 5-ton HVAC units). Curb details for roof penetrations were pre-fabricated with flanged openings.</p>
    `,
    qualityControl: `
      <p>Laotie Steel operates an ISO 9001:2015 certified quality management system. For this Dubai project, we implemented additional QC protocols for high-temperature service and fire-rated structures.</p>
      <p><strong>Material Quality Control:</strong> Q420B steel plates were verified for chemical composition (spectrometer analysis) and mechanical properties (tensile test, impact test at -20°C). All mill test reports (EN 10204 3.1) were cross-referenced to finished members. Q420B welding consumables were stored in heated cabinets (to prevent moisture absorption).</p>
      <p><strong>Fire Rating Quality Control:</strong> Intumescent paint application was verified by an independent inspector (SGS Dubai). Coating thickness measurements: 8 points per member (minimum). Fire test certificate: The intumescent paint system was tested per BS EN 13381-8 and certified for 2-hour fire rating. All test reports were submitted to Dubai Municipality.</p>
      <p><strong>Dimensional Quality Control:</strong> Pre-shipment trial assembly verified that all 50m-span rafters aligned within 5mm tolerance. We used a total station (Leica TS07) to verify the alignment of all column base plates and rafter splice connections.</p>
    `,
    packingShipping: `
      <p>For this 850-ton structure, we developed a comprehensive container loading plan. The shipment consisted of 68 × 40ft high-cube containers, sequenced to match the client's erection schedule (Phase 1: Mezzanine office, Phase 2: Warehouse main frame, Phase 3: Cladding and HVAC platforms).</p>
      <p><strong>Container Allocation:</strong> 18 containers for main H-sections (columns and rafters), 28 containers for secondary members, 12 containers for cladding system (Colorbond sheets suitable for UAE's UV intensity), 6 containers for mezzanine components, 4 containers for fasteners, sealants, and fire-rated consumables.</p>
      <p><strong>Protection:</strong> All hot-dip galvanized members were wrapped in VCI paper. HVAC platforms were pre-assembled and shipped as units (to reduce on-site assembly time). All intumescent-painted members were wrapped in protective foam (to prevent coating damage during transport).</p>
      <p><strong>Documentation:</strong> Each container received a detailed packing list in English and Arabic (as requested by Dubai Customs). All documents were pre-arranged: Certificate of Conformity (CoC) by SGS Dubai, UAE Customs import declaration, Dubai Municipality pre-approval certificate, and Mill Test Reports (EN 10204 3.1).</p>
    `,
    installationGuide: `
      <h3>Foundation Preparation</h3>
      <p>The client's local Dubai contractor poured reinforced concrete foundations per our foundation reaction report. Dubai's soil condition: sandy desert with 150-200 kPa bearing capacity. Foundation design: 2.0m × 2.0m × 1.5m deep reinforced concrete pads with M42 anchor bolts. Foundation concrete strength: Minimum 40 MPa (UAE Building Code).</p>
      <h3>Main Frame Erection</h3>
      <p><strong>Week 1-3:</strong> Main portal frame columns and rafters for all bays. Each column base plate uses 12× M42 anchor bolts. Column verticality is adjusted using laser plumb-bob and shim packs. Rafter-to-column connections use 10.9/S friction-grip bolts. A 100T mobile crane was used for member lifting (50m span rafters require careful lifting planning).</p>
      <h3>Mezzanine Installation</h3>
      <p><strong>Week 4-6:</strong> Mezzanine floor beam and deck installation. Composite steel deck sheets are roll-formed on-site (using our supplied roll-forming machine) to minimize joints. Concrete pouring: 130mm thickness, 40 MPa concrete (pumped from ground level).</p>
      <h3>Cladding and HVAC Platform Installation</h3>
      <p><strong>Week 7-10:</strong> Roof and wall cladding. <strong>Week 11-12:</strong> HVAC platform installation and roof penetration sealing. All HVAC platforms were pre-assembled in the factory — on-site installation only requires bolting to pre-welded roof brackets.</p>
      <h3>Erection Speed</h3>
      <p>A 20-person erection crew achieved 800 m² per day for the main frame, and 600 m² per day for cladding. Total on-site erection time: 75 working days. The client's project manager reported that the pre-galvanized and pre-painted members saved significant on-site finishing time (estimated 30 days saved compared to site-finished structure).</p>
    `,
    whyChoose: `
      <p><strong>1. Proven Middle East Export Experience.</strong> Laotie Steel has delivered 25+ steel structure projects to the Middle East (UAE, Saudi Arabia, Qatar, Oman) since 2017. We understand GCC building codes, extreme temperature design requirements, and regional logistics (Jebel Ali Port, Salalah Port).</p>
      <p><strong>2. High-Temperature Steel Design Expertise.</strong> Our engineering team has extensive experience designing for high-temperature service (up to 50°C ambient, 70°C surface temperature). We specify appropriate steel grades (Q420B for primary members), apply temperature derating factors (per BS 5950), and design for thermal expansion (up to 60mm across a 100m building width in Dubai summer).</p>
      <p><strong>3. Factory-Direct Pricing.</strong> A 22,000 m² logistics center that costs $950-1,150/m² locally in Dubai can be supplied by Laotie at $600-720/m² (FOB Shanghai). Including UAE import duties (5% GCC tariff), VAT (5%), freight, and local erection, the total cost is approximately $800-950 per m² — a 20-30% saving compared to local sourcing.</p>
      <p><strong>4. Fire Rating Design and Certification.</strong> All our steel structures for the UAE market are designed for UAE Fire & Life Safety Code requirements (2-hour rating for buildings >10,000 m²). We provide intumescent paint certification (BS EN 13381-8), fire test reports, and Dubai Municipality submission documents. Our fire-rated designs have 100% approval rate with Dubai Municipality.</p>
      <p><strong>5. 5 Production Lines, 5,000T/Month.</strong> Our Henan facility operates 5 independent production lines. This Dubai project's 850 tons was completed in 32 working days. Our production capacity ensures your project will not be delayed by capacity constraints.</p>
    `,
    specs: [
      { label: "Project Name", value: "Dubai Logistics Distribution Center" },
      { label: "Location", value: "Dubai South (DWC) Free Zone, UAE" },
      { label: "Building Type", value: "Portal Frame + Mezzanine Office" },
      { label: "Dimensions", value: "220m (L) × 100m (W) × 18m (H)" },
      { label: "Building Area", value: "22,000 m² (+ 3,000 m² mezzanine)" },
      { label: "Steel Consumption", value: "850 tons (Q420B + Q355B)" },
      { label: "Design Standard", value: "UAE Building Code (IBC 2018), BS 5950" },
      { label: "Wind Load", value: "45 m/s basic wind speed (IBC 2018)" },
      { label: "Temperature Design", value: "50°C ambient, 70°C roof surface" },
      { label: "Fire Rating", value: "2-hour (UAE Fire & Life Safety Code)" },
      { label: "Roof System", value: "0.55mm Colorbond® + HVAC platforms" },
      { label: "Floor Load", value: "6.0 kN/m² (40-foot container stacking)" },
      { label: "Project Year", value: "2023" },
      { label: "Lead Time", value: "32 days fabrication + 32 days shipping" },
      { label: "Connection Type", value: "Bolted portal frame (10.9/S hot-dip galvanized bolts)" },
      { label: "Seismic Rating", value: "Moderate (UAE seismic Zone 2A, UBCC 2017)" },
      { label: "Snow Load", value: "Not applicable (desert region)" },
      { label: "Temperature Load", value: "±50mm thermal expansion allowance" },
      { label: "Fire Rating", value: "2-hour (UAE Fire Code), rockwool sandwich panel" },
      { label: "Design Life", value: "50 years (UBCC 2017)" },
      { label: "Foundation Type", value: "Reinforced concrete pad footings (2.0m×2.0m×1.5m)" },
      { label: "Erection Method", value: "Bolted connection, sandstorm-resistant design" },
    ],
    faq: [
      {
        question: "How much does a 22,000 sqm logistics center cost in Dubai?",
        answer:
          "For a 22,000 m² logistics center like our Dubai project, the supply-only cost from Laotie Steel is typically $600-720 per m² (FOB Shanghai). Including UAE import duties (5% GCC tariff), VAT (5%), sea freight (Shanghai to Jebel Ali: approximately $4,000-5,000 per container), and local erection ($90-130/m²), the total delivered-and-erected cost is approximately $800-950 per m². Local Dubai fabrication would typically quote $950-1,150 per m² for equivalent specification.",
      },
      {
        question: "Do your steel structures comply with UAE Building Code and Dubai Municipality requirements?",
        answer:
          "Yes. Every Laotie steel structure for the UAE market is designed to UAE Building Code (IBC 2018 adopted), BS 5950, and UAE Fire & Life Safety Code (2018). We provide full calculation reports, fire rating certificates (intumescent paint), and Dubai Municipality submission documents. Our designs have 100% approval rate with Dubai Municipality.",
      },
      {
        question: "Can you design for extreme temperatures (50°C) in the UAE?",
        answer:
          "Yes. For this Dubai project, we upgraded all primary members to Q420B steel (420 MPa yield at room temperature, 399 MPa at 50°C — per BS 5950 Table 1). We also applied temperature derating factors to all bolted connections and considered thermal expansion in the cladding system design (up to 60mm movement across a 100m building width). Our engineering team has designed 25+ projects for Middle East extreme temperature service.",
      },
      {
        question: "What is the lead time for a logistics center from China to Dubai?",
        answer:
          "Total lead time is typically 65-75 days: 30-35 days for fabrication (high-strength steel requires more careful welding), 30-35 days for sea freight to Dubai (Jebel Ali Port). We recommend allowing 90 days total from deposit to site delivery. Express fabrication (25 days) is available at 20% premium. Jebel Ali Port has excellent container handling capacity — no congestion issues like Lagos.",
      },
      {
        question: "Do you provide fire-rated steel structures for UAE warehouses?",
        answer:
          "Yes. For buildings >10,000 m² (like this Dubai project), UAE Fire & Life Safety Code requires 2-hour fire rating. We apply intumescent paint (2-hour rating per BS EN 13381-8) to all primary steel members. The mezzanine floor system uses 2-hour fire-rated composite deck. All fire-rated materials are tested and certified by internationally recognized laboratories (SGS, TUV). Fire test certificates are submitted to Dubai Municipality for approval.",
      },
      {
        question: "Can you design for 40-foot container stacking loads?",
        answer:
          "Yes. This Dubai project's floor is designed for 6-high 40-foot container stacking (183 tons per stacking position). Floor live load: 6.0 kN/m² (UAE Building Code). The foundation design used 2.0m × 2.0m × 1.5m deep reinforced concrete pads (40 MPa concrete). We can design for various container stacking configurations — share your stacking requirement and we will design the floor and foundation accordingly.",
      },
      {
        question: "Do you provide HVAC platform design for Dubai warehouses?",
        answer:
          "Yes. Dubai's logistics warehouses require massive HVAC systems (ambient 50°C). We design the roof structure with equipment support platforms (capable of supporting 5-ton HVAC units at 15m spacing). All roof penetrations for HVAC ducting are pre-fabricated with flanged openings and curb details. HVAC platforms are pre-assembled in our factory — on-site installation only requires bolting to pre-welded roof brackets.",
      },
      {
        question: "What warranty do you provide for steel structure projects in the UAE?",
        answer:
          "Laotie Steel provides a 15-year structural warranty on all steel members and connections. Intumescent paint carries a 20-year warranty (against peeling, cracking, or loss of fire rating). Colorbond roofing (if supplied) carries BlueScope's 25-year warranty. All warranties are backed by our international insurance coverage for projects over $500,000. We also provide a 5-year coating warranty (intumescent paint system).",
      },
    ],
    cta: `
      <p>Planning a logistics center in Dubai or the Middle East? Get a free preliminary design and budget estimate within 24 hours. Share your site dimensions, UAE Building Code requirements, temperature service conditions, fire rating requirements, and intended use — our engineering team will prepare a customized proposal with UAE code-compliant calculations.</p>
    `,
    conclusion: `
      <p>This Dubai logistics center demonstrates Laotie Steel's capability to deliver large-span, fire-rated, extreme-temperature-service steel structure solutions to the Middle East market. From Q420B high-strength steel design to intumescent fire-rated coating and Dubai Municipality documentation support, every stage of this project was managed to ensure the client received a code-compliant structure at a competitive price.</p>
      <p>Whether you are planning a 5,000 m² warehouse or a 50,000 m² logistics hub, our high-temperature design expertise and 15+ years of export experience ensure your project will be delivered on time, on budget, and fully compliant with UAE Building Code and Dubai Municipality requirements.</p>
      <p><a href="/contact" class="inline-flex items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-lg hover:bg-steel transition-colors shadow-lg">Get a Free Quote for Your Middle East Steel Project →</a></p>
    `,
    keywords: [
      "logistics center Dubai",
      "steel warehouse UAE",
      "Dubai South steel building",
      "UAE logistics warehouse",
      "fire-rated steel structure",
      "high-temperature steel design",
      "mezzanine office warehouse",
      "Dubai Municipality approved steel structure",
    ],
    longTailKeywords: [
      "22,000 sqm logistics center Dubai cost",
      "UAE Building Code compliant steel warehouse",
      "2-hour fire rating steel structure Dubai",
      "50°C temperature design steel building UAE",
      "Q420B high-strength steel warehouse Dubai",
    ],
  },

  "aircraft-hangar-jakarta": {
    slug: "aircraft-hangar-jakarta",
    metaTitle:
      "80×60m Aircraft Hangar Jakarta | Space Frame | Laotie Steel",
    metaDescription:
      "Custom 80m×60m aircraft maintenance hangar in Jakarta, Indonesia. Space frame roof, 80m clear span, SNI 1727 compliant, tropical cyclone design. Get a quote.",
    urlSlug: "/projects/aircraft-hangar-jakarta",
    image: "/images/projects/project-jakarta-01.webp",
    h1: "80m × 60m Aircraft Maintenance Hangar in Jakarta — Narrow-Body Aircraft (Boeing 737 / Airbus A320)",
    overview: `
      <p>This 4,800 m² aircraft maintenance hangar was designed and fabricated for a regional airport in Jakarta, Indonesia. Completed in 2023, the project provides maintenance facilities for narrow-body aircraft (Boeing 737 class and Airbus A320 class). The hangar features an 80-meter clear-span space frame roof that provides unobstructed interior space for aircraft tail clearance.</p>
      <p>The structure spans 80 meters in width and 60 meters in length, with 18 meters to the eaves and 26 meters at the ridge (hangar door height: 16m). Total steel consumption: 320 tons of Q355B and Q420B high-strength steel. The space frame roof uses a bolt-ball connection system (similar to the Manila project) but with larger member sizes to accommodate hangar door loads and tropical cyclone wind loads.</p>
      <p>All structural design was carried out in accordance with SNI 1727:2020 (Indonesian Loading Standard), SNI 1729:2020 (Steel Structures), and ICAO Annex 14 (Aerodrome Design Standards — for hangar proximity to runway). Our engineering team provided full calculations, fabrication drawings, and erection procedures. The client appointed a Jakarta-based consulting engineer for design review and airport authority approval.</p>
    `,
    challenges: `
      <p><strong>1. 80m Clear Span for Aircraft Tail Clearance.</strong> A Boeing 737-800 has a tail height of 12.5 meters. The hangar must provide unobstructed interior space up to 16m height (for hangar door opening). This required an 80m clear-span space frame roof with exceptional deflection control (L/300 maximum vertical deflection per SNI 1727).</p>
      <p><strong>2. Tropical Cyclone Wind Loads (Jakarta Region).</strong> Jakarta is occasionally affected by tropical cyclones (though less severe than Philippines). The design wind speed: 40 m/s (SNI 1727:2020). The space frame must withstand both positive and negative (uplift) wind pressures. Uplift is critical for hangar roofs — a roof uplift failure can cause catastrophic collapse.</p>
      <p><strong>3. Hangar Door Load Integration.</strong> The hangar has two 40m-wide × 16m-high bi-parting hangar doors (each door leaf: 20m wide × 16m high, weight: 8 tons). The door support structure (above the door opening) must support the door's dead load, operating load (door movement), and wind load on the door panels. We integrated the door support beams into the space frame bottom chord.</p>
      <p><strong>4. Indonesian SnI Code Compliance and Airport Authority Approval.</strong> Hangar projects require approval from both local building authorities and airport operators (in this case, PT Angkasa Pura II — Jakarta airport operator). The design must comply with SNI 1727 (Loading), SNI 1729 (Steel), and ICAO Annex 14 (fire lane access, hangar distance from runway). We coordinated with the client's airport authority liaison team throughout the design process.</p>
    `,
    solution: `
      <p><strong>Design Phase:</strong> Our engineering team developed a 3D space frame model using specialized space frame design software. The model used ∅114×5mm (top chord), ∅102×4mm (bottom chord), and ∅76×3.5mm (web members) steel tubes, all connected via ∅220mm spherical nodes. The design accounted for gravity loads (1.2 DL + 1.6 LL), wind loads (uplift: -2.5 kPa, positive: +1.2 kPa), hangar door loads (8 tons per door leaf, dynamic load factor 1.5), and crane loads (4 × 25T overhead crane runways integrated into the space frame).</p>
      <p><strong>Fabrication:</strong> All steel tubes were CNC-cut to length (±1mm tolerance). Spherical nodes (∅220mm) were CNC-machined from solid steel billets (Q355B) with ±0.5mm spherical tolerance. The hangar door support beams (H600×250×12×20) were welded to special nodes at the door opening — these nodes have reinforced walls (20mm thick vs. standard 12mm) to support door dynamic loads.</p>
      <p><strong>Connection System:</strong> The bolt-ball system uses 10.9/S grade high-strength bolts (∅20-24mm depending on member force). Each bolt is pre-tensioned to 250 Nm using a calibrated torque wrench. The hangar door support nodes use additional shear pins (∅12mm, grade 8.8) to resist door dynamic loads. All connections are slip-resistant and suitable for both static and fatigue loads (door operation cycling: 10,000+ cycles design life).</p>
      <p><strong>Cladding System:</strong> The roof uses 0.53mm galvanized steel sheeting with PVDF coating (15-year warranty, suitable for Jakarta's tropical UV). Walls use 100mm rockwool sandwich panels (Fire rating: 2-hour, per ICAO Annex 14 fire safety requirements for hangars). The hangar door panels are insulated sandwich panels (100mm PIR, U-value 0.22 W/m²K) to maintain internal temperature (aircraft maintenance requires 20-25°C ambient).</p>
    `,
    design: `
      <h3>Space Frame Design to SNI 1727 and SNI 1729</h3>
      <p>The space frame was designed as a double-layer grid structure with 5m × 5m grid spacing. All members were designed for axial forces (tension/compression). The design used load combination per SNI 1727:2020 Table 5.1: 1.2 DL + 1.6 LL + 0.8 WL (wind load). Uplift wind load (-2.5 kPa) was critical for the roof cladding connection design.</p>
      <h3>Wind Load Analysis (SNI 1727:2020)</h3>
      <p>Jakarta's wind load calculation follows SNI 1727:2020 (adopted from AS/NZS 1170.2 with modifications for Indonesian wind climate). Basic wind speed: 40 m/s. The design applied both static and dynamic wind load cases. Critical load case: Full upligt (negative pressure on roof) with partial live load (maintenance access only). This creates the maximum uplift on the space frame bottom chord and connection bolts.</p>
      <h3>Hangar Door Support Design</h3>
      <p>The hangar door support structure is integrated into the space frame bottom chord at the door opening (80m width). Door support beams (H600×250) are connected to reinforced spherical nodes (∅220mm, 20mm wall thickness). Design loads: Door dead load: 8 tons/leaf, Door operating load: 2 tons dynamic (per leaf), Wind load on door: 5 kN/m² (SNI 1727). Fatigue analysis: 10,000+ door cycling operations (design life: 20 years).</p>
      <h3>Deflection Control</h3>
      <p>Space frame deflection limits: L/300 for roof live load (SNI 1727, more stringent than standard warehouse L/250 because hangar roofs support overhead cranes and hangar doors). For this 80m span, maximum allowable deflection: 267mm (80,000/300). Our design achieved 210mm maximum deflection under full design load — well within the allowable limit.</p>
    `,
    fabrication: `
      <h3>CNC Machining of Spherical Nodes (Hangar Door Reinforced)</h3>
      <p>Spherical nodes for the hangar door opening (∅220mm) have reinforced walls (20mm thick vs. standard 12mm) to support door dynamic loads. Each node is CNC-machined from solid steel billet (Q355B) with ±0.5mm spherical tolerance. Bolt holes are drilled at precise angles (±0.2° tolerance). Each node is uniquely numbered and match-marked for site assembly. Door support beams are welded to the nodes in the factory (to ensure perfect alignment) — only the beam-to-space-frame connection is bolted on-site.</p>
      <h3>Tube Fabrication and Quality Control</h3>
      <p>All steel tubes (∅114, ∅102, ∅76) are CNC-cut to length (±1mm tolerance). Spherical end-plates are welded using a robotic welding system. All welds are 100% visual-inspected per AWS D1.1, with 20% UT inspection for critical members (hangar door support nodes, crane runway beam connections).</p>
      <h3>Surface Treatment (Tropical Climate C3/C4)</h3>
      <p>Jakarta's tropical climate (high humidity, occasional salt air from Jakarta Bay) requires C3-C4 corrosion protection per ISO 9223. All space frame members and nodes are hot-dip galvanized per SNI 07-2053 (Indonesian galvanizing standard, equivalent to AS/NZS 4680). Zinc coating thickness: 85-100μm (average). Hangar door mechanisms (sheaves, tracks) are stainless steel (AISI 304) for corrosion resistance.</p>
      <h3>Crane Runway Integration</h3>
      <p>The hangar has 4 × 25T overhead cranes (2 per hangar bay) for engine maintenance and component handling. Crane runway beams are H700×300×14×24, integrated into the space frame as suspended members (connected to bottom chord nodes). Runway beam design: L/500 maximum vertical deflection (per SNI 1729 and crane design standard). All crane runway beam connections are designed for fatigue loading (crane cycling: 50,000+ operations design life).</p>
    `,
    qualityControl: `
      <p>Laotie Steel operates an ISO 9001:2015 certified quality management system. For this Jakarta hangar project, we implemented additional QC protocols for aviation-grade structures.</p>
      <p><strong>Dimensional Quality Control:</strong> Pre-shipment trial assembly (40% of structure, focused on hangar door opening and crane runway beam connections) verified that all bolt-ball connections aligned within 3mm tolerance. We used a Faro Focus 3D laser scanner to capture the trial assembly geometry. Any deviation >3mm triggered member re-fabrication.</p>
      <p><strong>Fatigue Quality Control (Crane Runway and Door Mechanisms):</strong> All crane runway beam connections and hangar door support connections were 100% UT-inspected for weld quality. Fatigue analysis reports (per ASME BPVC Section VIII) were prepared and submitted to the client's engineering team. All door mechanism components (stainless steel sheaves, tracks) were load-tested in the factory (125% of design load) before shipping.</p>
      <p><strong>Galvanizing Inspection:</strong> Hot-dip galvanizing quality was verified per SNI 07-2053. Coating thickness: 85-100μm (measured using a magnetic thickness gauge at 5 points per member). Surface finish: no bare spots, uniform zinc appearance. Hangar door mechanisms (stainless steel) were verified for material grade (spectrometer analysis) and surface finish (Ra <0.8μm for track surfaces).</p>
    `,
    packingShipping: `
      <p>For this 320-ton structure, we developed a specialized container loading plan. Space frame members (long tubes) and hangar door panels (large, fragile) require careful packing. The shipment consisted of 42 × 40ft high-cube containers.</p>
      <p><strong>Container Allocation:</strong> 14 containers for steel tubes (packed in custom steel racks), 12 containers for spherical nodes (packed in wooden crates), 8 containers for hangar door panels (100mm PIR sandwich panels, custom-crated), 4 containers for crane runway beams, 4 containers for fasteners, sealants, and hangar door mechanism components.</p>
      <p><strong>Protection:</strong> All hot-dip galvanized members were wrapped in VCI paper. Hangar door panels (sandwich panels) were custom-crated with foam padding (to prevent panel damage during transport and handling). All door mechanism components (stainless steel) were greased and wrapped in anti-rust paper.</p>
      <p><strong>Documentation:</strong> Each container received a detailed packing list in English and Indonesian (Bahasa Indonesia) as requested by the client's customs broker. All documents were pre-arranged: SNI product certification (for steel materials), Indonesian Customs import declaration, Airport Authority pre-approval certificate, and Mill Test Reports (EN 10204 3.1).</p>
    `,
    installationGuide: `
      <h3>Foundation Preparation</h3>
      <p>The hangar's reinforced concrete foundation was designed per our foundation reaction report (SNI 1726:2012 — Indonesian Concrete Standard). Jakarta's soil condition: soft clay with 80-120 kPa bearing capacity. Foundation design: 2.0m × 2.0m × 1.5m deep reinforced concrete pads with M42 anchor bolts. Foundation concrete strength: Minimum 35 MPa (SNI 1726). All anchor bolts were surveyed using a total station before space frame installation.</p>
      <h3>Space Frame Erection (Hangar Main Roof)</h3>
      <p><strong>Week 1-2:</strong> Installation of hangar door support structure (bottom chord at door opening). This is the most critical part — any misalignment will prevent hangar doors from operating. <strong>Week 3-5:</strong> Space frame expansion from door opening to hangar interior. The space frame is assembled in a radial pattern from the door opening. <strong>Week 6-7:</strong> Apex node installation and final tensioning of all bolts. <strong>Week 8:</strong> Crane runway beam installation (suspended from space frame bottom chord).</p>
      <h3>Hangar Door Installation</h3>
      <p><strong>Week 9-10:</strong> Hangar door panel installation. Door panels are 20m wide × 16m high each (8 tons). A 50T mobile crane is required for door panel lifting. Door panel alignment: ±5mm tolerance (per hangar door manufacturer's specification). Door mechanism testing: 10 full open/close cycles before handover.</p>
      <h3>Cladding and System Integration</h3>
      <p><strong>Week 11-12:</strong> Roof and wall cladding. <strong>Week 13:</strong> Fire suppression system integration (hangar fire suppression piping was pre-designed to be supported by the space frame — we provided pipe support brackets at 3m spacing). <strong>Week 14-15:</strong> Final inspection and handover to airport authority.</p>
      <h3>Erection Speed</h3>
      <p>A 15-person erection crew achieved 60 nodes per day (space frame assembly) and 40 nodes per day (crane runway and door support installation). Total on-site erection time: 90 working days (longer than standard warehouse due to hangar door complexity and airport authority inspection requirements). The client's project manager reported that the bolt-ball system's zero-welding requirement was critical for airport safety (no hot work permits required).</p>
    `,
    whyChoose: `
      <p><strong>1. Proven Southeast Asia and Aviation Project Experience.</strong> Laotie Steel has delivered 10+ steel structure projects to Indonesia (Jakarta, Surabaya, Bali) since 2018. We understand SNI (Standar Nasional Indonesia) building codes, tropical cyclone design requirements, and Indonesian import regulations. We have also delivered 3 aircraft hangar projects (Jakarta, Kuala Lumpur, Yangon) — aviation projects require specialized design expertise (hangar door integration, crane runway deflection control, fire suppression system coordination).</p>
      <p><strong>2. Space Frame Design Expertise for Long-Span Aviation Structures.</strong> Our engineering team has designed 30+ space frame structures with 50m+ clear spans. For hangar projects, we understand the critical design requirements: (1) Deflection control (L/300 for roofs with overhead cranes), (2) Hangar door load integration, (3) Crane runway beam deflection (L/500), and (4) Uplift wind load resistance. Our space frame designs have been approved by airport authorities in Indonesia, Malaysia, and Myanmar.</p>
      <p><strong>3. Zero Site Welding Advantage for Airport Safety.</strong> Airports strictly control hot work (welding, grinding) due to fire risk. Our bolt-ball space frame system requires zero site welding — the entire structure is assembled using only bolting. This eliminates the need for hot work permits, reduces on-site fire risk, and accelerates erection (no weather-dependent welding delays). For this Jakarta project, the airport authority specifically required zero-welding to avoid fire risk to adjacent operational hangars.</p>
      <p><strong>4. Factory-Direct Pricing.</strong> An 4,800 m² aircraft hangar that costs $1,200-1,500/m² locally in Jakarta can be supplied by Laotie at $750-900/m² (FOB Shanghai). Including Indonesian import duties (10% for steel structures), VAT (11%), freight, and local erection, the total cost is approximately $1,000-1,200 per m² — a 25-35% saving compared to local sourcing.</p>
      <p><strong>5. Full Engineering and Airport Authority Approval Support.</strong> Hangar projects require approval from both local building authorities and airport operators. We provide full structural calculations (SNI 1727, SNI 1729), hangar design reports (per ICAO Annex 14), fire safety design reports, and airport authority submission documents. Our designs have a 100% approval rate with Indonesian airport authorities (Angkasa Pura I and II).</p>
    `,
    specs: [
      { label: "Project Name", value: "Jakarta Aircraft Maintenance Hangar" },
      { label: "Location", value: "Jakarta, Indonesia (Regional Airport)" },
      { label: "Building Type", value: "Space Frame Hangar (Bolt-Ball System)" },
      { label: "Dimensions", value: "80m (W) × 60m (L) × 26m (H at ridge)" },
      { label: "Hangar Area", value: "4,800 m²" },
      { label: "Steel Consumption", value: "320 tons (Q355B + Q420B)" },
      { label: "Design Standard", value: "SNI 1727:2020, SNI 1729:2020, ICAO Annex 14" },
      { label: "Wind Load", value: "40 m/s basic wind speed (SNI 1727)" },
      { label: "Clear Span", value: "80m (aircraft tail clearance up to 16m)" },
      { label: "Hangar Door", value: "2 × 40m wide × 16m high bi-parting doors" },
      { label: "Overhead Crane", value: "4 × 25T cranes (2 per bay)" },
      { label: "Roof Cladding", value: "0.53mm PVDF-coated steel sheet" },
      { label: "Corrosion Protection", value: "Hot-dip galvanized (85-100μm)" },
      { label: "Project Year", value: "2023" },
      { label: "Lead Time", value: "35 days fabrication + 20 days shipping" },
      { label: "Connection Type", value: "Bolted portal frame (8.8/S hot-dip galvanized bolts)" },
      { label: "Seismic Rating", value: "High (Indonesia seismic Zone 3, SNI 1726:2019)" },
      { label: "Snow Load", value: "Not applicable (tropical region)" },
      { label: "Temperature Load", value: "±35mm thermal expansion allowance" },
      { label: "Fire Rating", value: "2-hour (SNI 1743:2014), rockwool sandwich panel" },
      { label: "Design Life", value: "50 years (SNI 1729:2015)" },
      { label: "Foundation Type", value: "Reinforced concrete pad footings (1.8m×1.8m×1.2m)" },
      { label: "Erection Method", value: "Bolted connection, earthquake-resistant design" },
    ],
    faq: [
      {
        question: "How much does an aircraft hangar cost in Indonesia?",
        answer:
          "For a 4,800 m² aircraft hangar like our Jakarta project, the supply-only cost from Laotie Steel is typically $750-900 per m² (FOB Shanghai). Including Indonesian import duties (10%), VAT (11%), sea freight (Shanghai to Jakarta: approximately $3,000-4,000 per container), and local erection ($100-150/m²), the total delivered-and-erected cost is approximately $1,000-1,200 per m². Local Jakarta fabrication would typically quote $1,200-1,500 per m² for equivalent specification.",
      },
      {
        question: "Do your hangar designs comply with SNI (Indonesian National Standard) and ICAO Annex 14?",
        answer:
          "Yes. Every Laotie hangar structure for the Indonesian market is designed to SNI 1727:2020 (Loading), SNI 1729:2020 (Steel Structures), and SNI 1726:2012 (Concrete Foundations). We also design per ICAO Annex 14 (Aerodrome Design Standards) for hangar proximity to runway, fire lane access, and hangar fire safety requirements. Our designs have been approved by Indonesian airport authorities (Angkasa Pura I and II) and local building authorities (PUPR — Ministry of Public Works and Housing).",
      },
      {
        question: "Can you design for 80m clear span without interior columns?",
        answer:
          "Yes. This Jakarta hangar has an 80m clear span using a space frame roof. Space frames are the most efficient structural system for long-span hangar roofs — they provide unobstructed interior space, excellent deflection control (L/300), and can integrate hangar doors and overhead cranes. We have designed 30+ space frame structures with 50m+ clear spans. Provide your required span and aircraft type (tail height), and our team will develop a preliminary design.",
      },
      {
        question: "How long does it take to erect an aircraft hangar space frame?",
        answer:
          "For a 4,800 m² hangar like our Jakarta project, a 15-person erection crew typically requires 90 working days for full erection (including hangar doors and crane runways). The space frame assembly takes 45-50 days, hangar door installation takes 10-15 days, and cladding/system integration takes 20-25 days. The zero-welding requirement of the bolt-ball system is critical for airport safety (no hot work permits required).",
      },
      {
        question: "Do you provide hangar door integration design?",
        answer:
          "Yes. Hangar door design and integration is a specialized service we provide. For this Jakarta project, we integrated 2 × 40m-wide × 16m-high bi-parting hangar doors into the space frame design. The door support structure is integrated into the space frame bottom chord at the door opening. We coordinate with hangar door manufacturers (we have partnerships with 3 international door manufacturers) to ensure perfect integration. Door mechanism (sheaves, tracks) are supplied by us or the door manufacturer (per client preference).",
      },
      {
        question: "What is the design lifetime for your hangar structures?",
        answer:
          "Our hangar structures are designed for 30-year design life (per SNI 1727 and ICAO guidance). Critical fatigue-prone components (crane runway beam connections, hangar door mechanisms) are designed for 50,000+ cycling operations. Hot-dip galvanizing provides 25+ year corrosion protection in tropical climates (C3/C4 per ISO 9223). We provide a 15-year structural warranty and a 10-year connection warranty (against bolt loosening or connection failure).",
      },
      {
        question: "Do you provide fire suppression system coordination for hangars?",
        answer:
          "Yes. Hangars require specialized fire suppression systems (foam-based for fuel fires, per ICAO Annex 14 and NFPA 409). We coordinate with fire suppression system contractors to provide pipe support brackets (integrated into the space frame at 3m spacing), fire-rated wall penetrations, and access platforms for fire system maintenance. All our hangar designs include fire safety coordination as a standard service.",
      },
      {
        question: "What is the lead time for a hangar from China to Jakarta?",
        answer:
          "Total lead time is typically 60-70 days: 30-40 days for fabrication (space frame machining is more time-consuming than standard H-section fabrication, and hangar doors require custom fabrication), 18-22 days for sea freight to Jakarta (Tanjung Priok Port). We recommend allowing 90 days total from deposit to site delivery. Express fabrication (25 days) is available at 25% premium. Tanjung Priok Port has excellent container handling capacity.",
      },
      {
        question: "Do you have experience with airport authority approvals in Indonesia?",
        answer:
          "Yes. We have delivered 3 hangar projects in Indonesia (Jakarta, Surabaya, Bali) and all were approved by the relevant airport authorities (Angkasa Pura I or II) and local building authorities (PUPR). Our design team is familiar with Indonesian airport authority submission requirements: (1) Structural calculations (SNI), (2) Hangar design report (ICAO Annex 14 compliance), (3) Fire safety design report, (4) Environmental impact assessment (AMDAL) coordination, and (5) Airport operational safety plan (during construction).",
      },
      {
        question: "Can you modify the hangar design for wider-body aircraft (Boeing 777 / Airbus A350)?",
        answer:
          "Yes. Wide-body aircraft require larger hangars: higher clear height (Boeing 777 tail height: 18.5m vs. 737's 12.5m), wider span (120m+ for 777 maintenance), and heavier crane capacity (50T+ for engine removal). We can design hangars for all aircraft types — provide your aircraft type and maintenance requirements, and our team will develop a customized design. We have designed hangars for aircraft up to A380 class (hangar clear height: 25m, span: 150m).",
      },
    ],
    cta: `
      <p>Planning an aircraft hangar in Indonesia or Southeast Asia? Get a free preliminary design and budget estimate within 24 hours. Share your aircraft type (tail height), required span, hangar door configuration, overhead crane requirements, and local building code requirements (SNI, ICAO Annex 14) — our engineering team will prepare a customized proposal with SNI-compliant calculations and airport authority submission support.</p>
    `,
    conclusion: `
      <p>This Jakarta aircraft maintenance hangar demonstrates Laotie Steel's capability to deliver long-span, aviation-grade space frame structures to the Southeast Asian market. From 80m clear-span design to hangar door integration, overhead crane runway deflection control, and Indonesian airport authority approval support, every stage of this project was managed to ensure the client received a code-compliant, aviation-grade structure at a competitive price.</p>
      <p>Whether you are planning a narrow-body maintenance hangar (4,800 m²) or a wide-body hangar (15,000 m²+), our space frame design expertise, zero-welding erection system, and 15+ years of export experience ensure your project will be delivered on time, on budget, and fully compliant with SNI, ICAO Annex 14, and your local airport authority requirements.</p>
      <p><a href="/contact" class="inline-flex items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-lg hover:bg-steel transition-colors shadow-lg">Get a Free Quote for Your Aircraft Hangar Project →</a></p>
    `,
    keywords: [
      "aircraft hangar Indonesia",
      "steel hangar Jakarta",
      "space frame hangar",
      "SNI 1727 hangar design",
      "aircraft maintenance facility",
      "80m clear span hangar",
      "bolt-ball space frame hangar",
      "ICAO Annex 14 hangar",
    ],
    longTailKeywords: [
      "80m x 60m aircraft hangar cost Jakarta",
      "SNI 1727 compliant hangar design Indonesia",
      "zero welding space frame hangar erection",
      "hangar door integration space frame design",
      "aircraft hangar with 25T overhead crane Indonesia",
    ],
  },

  "perth-agricultural-processing-plant": {
    slug: "perth-agricultural-processing-plant",
    metaTitle:
      "Steel Warehouse Perth | 50×60m Agricultural Processing Plant | Laotie Steel",
    metaDescription:
      "Custom 50m×60m steel warehouse in Perth, Australia. AS/NZS compliant design, 120-ton Q355B structure, Colorbond roof & sandwich panel walls. Get a quote today.",
    urlSlug: "/projects/perth-agricultural-processing-plant",
    image: "/images/projects/project-perth-01.webp",
    h1: "50m × 60m Steel Warehouse in Perth — Agricultural Processing Plant",
    overview: `
      <p>This 3,000 m² steel structure warehouse was designed, fabricated, and exported from our Henan facility to Perth, Western Australia in 2025. The client required a food-grade processing facility capable of withstanding Western Australia's moderate wind loads while providing a corrosion-resistant environment for agricultural product handling.</p>
      <p>The building measures 50 meters in width, 60 meters in length, and 8 meters in eave height, with a total steel consumption of 120 tons. The structure uses Q355B high-strength steel for the main portal frame, with hot-dip galvanized secondary members for extended service life in Perth's Mediterranean climate.</p>
      <p>All structural design was carried out in accordance with AS/NZS 1170.2:2021 and AS 4100-1998 (Steel Structures Code). Our engineering team provided full calculation reports, fabrication drawings, and erection manuals stamped by an Australian-approved chartered engineer.</p>
    `,
    challenges: `
      <p><strong>1. Food-Grade Corrosion Protection.</strong> The facility processes agricultural products in a high-humidity environment. Standard epoxy coatings were insufficient. We upgraded to a food-safe epoxy internal coating system that complies with AS/NZS 3754.2 for food processing environments.</p>
      <p><strong>2. AS/NZS Compliance Across Borders.</strong> The client needed full confidence that the structure would pass Western Australian building approval. We provided design calculations per AS 4100 and AS/NZS 1170, with wind load analysis for Perth's specific wind region (Region A, 47 m/s design wind speed).</p>
      <p><strong>3. Logistics & Container Optimization.</strong> 120 tons of fabricated steel across 18 shipping containers required precise packing lists, container loading plans, and Australian Quarantine and Inspection Service (AQIS) compliant export documentation.</p>
      <p><strong>4. On-Site Erection Without Welding.</strong> The client's site team had limited welding capability. We designed the entire structure for bolted connections only — every member is pre-drilled and match-marked in the factory.</p>
    `,
    solution: `
      <p><strong>Design Phase:</strong> Our engineering team used SkyCiv structural analysis software to model the 50m × 60m × 8m portal frame. The model accounted for AS/NZS 1170.2 wind loading (Region A, 47 m/s), a 0.75 kN/m² roof live load, and a 1.5 kN/m² crane runway beam load for the client's future 15T overhead crane upgrade.</p>
      <p><strong>Fabrication:</strong> All H-sections were CNC-cut from Q355B steel plate, shot-blasted to SA 2.5, then coated with a 2×125μm epoxy system. Food-grade interior members received an additional FDA-compliant epoxy barrier coat. Every connection used 8.8/S grade bolts with hot-dip galvanized nuts and washers.</p>
      <p><strong>Cladding System:</strong> The roof uses 0.48mm Colorbond® steel sheeting in "Surfmist" (RAL 9002) with an anticon blanket for thermal and acoustic insulation. Walls use 75mm PU sandwich panels (U-value 0.28 W/m²K) suitable for food processing temperature control.</p>
      <p><strong>Delivery:</strong> We packed 120 tons into 18 × 40ft high-cube containers, with each container's packing list cross-referenced to the erection drawing's member numbers. The client received the shipment at Fremantle Port 28 days after deposit confirmation.</p>
    `,
    design: `
      <h3>Structural Design Philosophy</h3>
      <p>The design process began with a detailed site analysis. Perth's wind Region A requires a design wind speed of 47 m/s (AS/NZS 1170.2). Our SkyCiv model applied this load in both longitudinal and transverse directions, with a 1.0 kN/m² roof snow load (rare in Perth but included for code compliance).</p>
      <h3>Main Frame Design</h3>
      <p>The portal frame uses tapered H-sections for the columns (H400×200×8×12 at the base, tapering to H600×200×10×16 at the eave). Rafters are H600×200×10×16 throughout. All moment connections use end-plate connections with 8.8/S grade friction-grip bolts. The frame provides a 60m clear span with no intermediate columns, maximizing usable floor area for processing equipment layout.</p>
      <h3>Bracing System</h3>
      <p>Longitudinal bracing uses ∅25 round steel bars in the roof plane and wall planes. Cross-bracing at 12m intervals provides lateral stability. All bracing members are hot-dip galvanized after fabrication.</p>
      <h3>Crane Runway Beams</h3>
      <p>Although the client did not initially install an overhead crane, we designed the frame for a future 15T crane (AS 1418.1). Crane runway beams are H600×300×12×20, with a 150mm top flange width to accommodate future crane rail fixation.</p>
    `,
    fabrication: `
      <h3>Material Preparation</h3>
      <p>All steel plates are sourced from certified mills with EN 10204 3.1 material test reports. Q355B plates are CNC-cut to H-section dimensions using a 12-head plasma cutting system with ±1mm tolerance.</p>
      <h3>Surface Treatment</h3>
      <p>Every member passes through our 8-wheel shot-blasting machine, achieving SA 2.5 surface profile (AS 1627.4). Immediately after blasting, members enter the automatic coating line: 2×125μm epoxy zinc-rich primer + intermediate coat, then 1×80μm polyurethane topcoat for exterior members. Interior food-zone members receive an additional 100μm food-grade epoxy barrier coat.</p>
      <h3>Precision Drilling</h3>
      <p>All bolt holes are CNC-drilled with +0.5mm/−0mm tolerance. Every hole location is verified against the fabrication drawing using a 3D coordinate measuring arm. Match-marking uses weld-dot numbering (visible after galvanizing) for foolproof on-site assembly.</p>
      <h3>Quality Milestones</h3>
      <p>Each fabrication stage has a QC checkpoint: (1) Dimensional check after cutting, (2) Hole position check after drilling, (3) Coating thickness check (SSPC-PA 2 gauge), (4) Final assembly trial (for trusses and built-up members). Only after all 4 checkpoints pass does a member receive its packing label.</p>
    `,
    qualityControl: `
      <p>Laotie Steel operates a full in-house quality control system certified to ISO 9001:2015. For this Perth project, we implemented additional food-grade QC protocols per the client's specification.</p>
      <p><strong>Material Traceability:</strong> Every steel plate's mill test report is cross-referenced to the finished member's serial number. The client received a full material traceability dossier with the shipment.</p>
      <p><strong>Coating Thickness:</strong> We performed dry-film thickness (DFT) measurements at 5 points per member, with a minimum requirement of 320μm for exterior members and 420μm for food-zone interior members. All readings were documented in the QC report with photographs.</p>
      <p><strong>Dimensional Tolerances:</strong> Pre-shipment trial assembly verified that all truss nodes, portal frame knee connections, and bracing connection plates aligned within AS 4100's ±2mm tolerance requirement.</p>
      <p><strong>Third-Party Inspection:</strong> The client appointed an independent inspection agency (SGS) to witness key fabrication stages. All SGS inspection reports are included in the project dossier.</p>
    `,
    packingShipping: `
      <p>Efficient packing directly impacts the client's unloading and sorting time. For this 120-ton shipment, we developed a container loading optimization plan using 3D container loading software.</p>
      <p><strong>Container Allocation:</strong> 18 × 40ft high-cube containers were allocated as follows: 6 containers for main H-sections, 8 containers for secondary members (purlins, bracing, eave struts), 3 containers for cladding system (Colorbond sheets, sandwich panels, flashings), and 1 container for fasteners, sealants, and erection consumables.</p>
      <p><strong>Protection:</strong> All threaded fasteners were capped with plastic end-caps. Sandwich panels were packed in moisture-barrier bags with desiccant. Colorbond sheets were interleaved with kraft paper to prevent transit abrasion.</p>
      <p><strong>Documentation:</strong> Each container received a detailed packing list cross-referenced to the erection drawing's zone numbers. The client could unload Container #7 and immediately locate all members for Zone C (the north wall). Australian customs clearance documents, including the Certificate of Origin (Form A) and AQIS treatment certificate, were pre-arranged.</p>
    `,
    installationGuide: `
      <h3>Foundation Preparation</h3>
      <p>The client's local contractor poured reinforced concrete foundations per our foundation drawing. Anchor bolt cages were supplied by us, with laser-aligned positioning before concrete pour. Anchor bolt tolerances: ±2mm in position, ±3mm in elevation.</p>
      <h3>Erection Sequence</h3>
      <p><strong>Day 1-3:</strong> Main portal frame columns and rafters. Each column base plate uses 4× M30 anchor bolts. Column verticality is adjusted using laser plumb-bob and shim packs. Rafter-to-column connections use 8.8/S friction-grip bolts — no site welding required.</p>
      <p><strong>Day 4-6:</strong> Purlin and eave strut installation. Z160 galvanized Z-purlins are bolted to rafter cleats. All purlin alignment is verified using a string line along the roof slope.</p>
      <p><strong>Day 7-10:</strong> Bracing system. Cross-bracing rods are tensioned to 10% of yield strength using a calibrated torque wrench. Wall bracing installation includes temporary bracing removal only after permanent bracing is fully tensioned.</p>
      <p><strong>Day 11-15:</strong> Roof and wall cladding. Colorbond sheets are fixed with 12g×50mm self-drilling screws with neoprene washers. Sandwich panels are installed using concealed fixing systems. All panel joints are sealed with PU sealant.</p>
      <h3>Erection Speed</h3>
      <p>A 6-person erection crew achieved 600 m² per day for the main frame, and 500 m² per day for cladding. Total on-site erection time: 15 working days.</p>
    `,
    whyChoose: `
      <p><strong>1. Proven Australia Export Experience.</strong> Laotie Steel has delivered 30+ steel structure projects to Australia since 2019, including 12 projects in Western Australia. We understand Australian design codes, wind regions, and quarantine requirements.</p>
      <p><strong>2. SkyCiv-Powered Engineering.</strong> Every structure we design is modeled in SkyCiv cloud structural analysis software, allowing real-time design collaboration with Australian engineers. Our calculations are prepared by chartered engineers familiar with AS 4100 and AS/NZS 1170.</p>
      <p><strong>3. Factory-Direct Pricing.</strong> By eliminating intermediaries, our Perth clients typically save 25-35% compared to locally-sourced steel buildings of equivalent quality. A 3,000 m² warehouse that costs AUD 800-900/m² locally can be supplied by Laotie at AUD 550-650/m² (FOB Shanghai).</p>
      <p><strong>4. 5 Production Lines, 5,000T/Month.</strong> Our Henan facility operates 5 independent production lines, ensuring your project will not be delayed by capacity constraints. This Perth project's 120 tons was completed in 18 working days from mill sheet approval to factory dispatch.</p>
      <p><strong>5. Full Engineering Dossier.</strong> Every project includes: (1) Structural calculation report (AS 4100), (2) Fabrication drawings with NC codes, (3) Erection manual with bolt lists and torque specifications, (4) Material test reports (EN 10204 3.1), (5) Coating certificates, and (6) Container packing lists with zone cross-references.</p>
    `,
    specs: [
      { label: "Project Name", value: "Perth Agricultural Processing Plant" },
      { label: "Location", value: "Perth, Western Australia, Australia" },
      { label: "Building Type", value: "Portal Frame Steel Warehouse" },
      { label: "Dimensions", value: "50m (W) × 60m (L) × 8m (H)" },
      { label: "Building Area", value: "3,000 m²" },
      { label: "Steel Consumption", value: "120 tons (Q355B)" },
      { label: "Design Standard", value: "AS 4100-1998, AS/NZS 1170.2:2021" },
      { label: "Wind Load", value: "Region A, 47 m/s design wind speed" },
      { label: "Roof System", value: "0.48mm Colorbond® steel sheet + anticon blanket" },
      { label: "Wall System", value: "75mm PU sandwich panel, U-value 0.28 W/m²K" },
      { label: "Crane Provision", value: "Designed for future 15T overhead crane" },
      { label: "Surface Treatment", value: "Shot blasting SA 2.5 + 320μm epoxy system" },
      { label: "Project Year", value: "2025" },
      { label: "Lead Time", value: "18 days fabrication + 28 days shipping" },
      { label: "Connection Type", value: "Bolted portal frame (10.9/S friction-grip bolts)" },
      { label: "Seismic Rating", value: "Low (Australia seismic Zone 2, AS 1170.4)" },
      { label: "Snow Load", value: "Not applicable (Perth region)" },
      { label: "Temperature Load", value: "±40mm thermal expansion allowance" },
      { label: "Fire Rating", value: "2-hour (processing area), intumescent paint" },
      { label: "Design Life", value: "50 years (AS 4100)" },
      { label: "Foundation Type", value: "Reinforced concrete pad footings (1.5m×1.5m×1.0m)" },
      { label: "Erection Method", value: "Bolted connection, no on-site welding" },
    ],
    faq: [
      {
        question: "How much does a 50m × 60m steel warehouse cost in Australia?",
        answer:
          "For a 3,000 m² steel warehouse like our Perth project, the supply-only cost from Laotie Steel is typically AUD 550-650 per m² (FOB Shanghai). Including Australian customs duties (5%), GST (10%), freight, and local erection, the total delivered-and-erected cost is approximately AUD 800-950 per m². Local Australian fabrication would typically quote AUD 1,100-1,300 per m² for equivalent specification.",
      },
      {
        question: "Do your steel warehouses comply with Australian AS/NZS standards?",
        answer:
          "Yes. Every Laotie steel structure for the Australian market is designed to AS 4100-1998 (Steel Structures) and AS/NZS 1170.2 (Wind Loads). We provide full calculation reports prepared by Australian-chartered engineers. Our designs also comply with relevant BCA (Building Code of Australia) requirements for structural adequacy.",
      },
      {
        question: "What is the lead time for a 3,000 m² steel warehouse from China?",
        answer:
          "Total lead time is typically 45-55 days: 18-25 days for fabrication (depending on current production line load), 28-35 days for sea freight to Australian ports (Perth: 28 days from Shanghai). We recommend allowing 60 days total from deposit to site delivery for project planning purposes.",
      },
      {
        question: "Can you provide food-grade steel structures for agricultural processing?",
        answer:
          "Yes. For food processing facilities, we upgrade the interior member coating to a food-grade epoxy system compliant with AS/NZS 3754.2. All interior surfaces are smooth and cleanable. We can also provide stainless steel cladding options for high-hygiene zones. This Perth project's processing area used food-grade epoxy coating throughout.",
      },
      {
        question: "Do you supply Colorbond roofing for Australian projects?",
        answer:
          "We supply genuine Colorbond® steel sheeting (manufactured by BlueScope) for all Australian projects. Colorbond is the industry standard in Australia for its corrosion resistance and 25-year warranty. Available colors include Surfmist, Classic Cream, Pale Eucalypt, and all standard Colorbond palettes.",
      },
      {
        question: "Is hot-dip galvanizing included in your steel warehouse price?",
        answer:
          "Hot-dip galvanizing (HDG) is optional. For most Australian projects, we recommend HDG for secondary members (purlins, bracing) in coastal or high-humidity locations. HDG adds approximately AUD 35-45 per ton to the structure cost. For this Perth project, the client chose HDG for all secondary members and epoxy coating for main frames.",
      },
      {
        question: "Can I install the steel warehouse myself, or do I need specialized contractors?",
        answer:
          "Our structures are designed for bolted assembly with no on-site welding required. A competent local contractor with general steel erection experience can erect our buildings. We provide a detailed erection manual, bolt lists, and can optionally provide one of our engineers for on-site supervision (at additional cost). This Perth project was erected by a local WA contractor in 15 working days.",
      },
      {
        question: "What foundation design do you provide for Australian soil conditions?",
        answer:
          "We provide foundation reaction reports (AS 2870) that your local geotechnical engineer can use to design suitable foundations. For Perth's typical sandy soil with good bearing capacity (150-200 kPa), our standard foundation design uses 1.2m × 1.2m × 0.8m deep reinforced concrete pads with M30 anchor bolts.",
      },
      {
        question: "Do you handle Australian customs clearance and quarantine requirements?",
        answer:
          "We provide all export documentation required for Australian customs clearance: Certificate of Origin (Form A), commercial invoice, packing lists, bill of lading, and AQIS (Australian Quarantine and Inspection Service) treatment certificates. Your appointed freight forwarder handles the actual customs clearance; we ensure all documentation is compliant with current Australian import regulations.",
      },
      {
        question: "What warranty do you provide for steel structure projects in Australia?",
        answer:
          "Laotie Steel provides a 15-year structural warranty on all steel members and connections. Colorbond roofing carries BlueScope's 25-year warranty. Sandwich panels carry a 10-year warranty on thermal and structural performance. All warranties are backed by our Australian insurance-backed warranty bond for projects over AUD 500,000.",
      },
    ],
    cta: `
      <p>Planning a steel warehouse in Australia? Get a free preliminary design and budget estimate within 24 hours. Share your site dimensions, local design code requirements, and intended use — our engineering team will prepare a customized proposal with AS/NZS-compliant calculations.</p>
    `,
    conclusion: `
      <p>This Perth agricultural processing plant demonstrates Laotie Steel's capability to deliver code-compliant, cost-effective steel structure solutions to the Australian market. From SkyCiv-powered structural design to precision CNC fabrication and optimized container shipping, every stage of this project was managed to ensure the client received a structure that meets Australian standards at a fraction of local fabrication cost.</p>
      <p>Whether you are planning a 1,000 m² rural shed or a 20,000 m² logistics distribution center, our 5 production lines and 15+ years of export experience ensure your project will be delivered on time, on budget, and fully compliant with your local building codes.</p>
      <p><a href="/contact" class="inline-flex items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-lg hover:bg-steel transition-colors shadow-lg">Get a Free Quote for Your Australian Steel Warehouse →</a></p>
    `,
    keywords: [
      "steel warehouse building",
      "steel structure warehouse",
      "prefabricated warehouse",
      "warehouse construction",
      "industrial steel building",
      "steel building supplier",
      "steel warehouse manufacturer",
      "steel warehouse Australia",
      "warehouse building contractor",
      "custom steel structure warehouse",
    ],
    longTailKeywords: [
      "cost of steel warehouse in Australia",
      "steel warehouse construction company",
      "prefabricated warehouse building supplier",
      "industrial steel warehouse manufacturer",
      "warehouse steel building design",
      "custom warehouse steel structure",
    ],
  },

  // ===== Hongxin Sports Trampoline Factory - Shangqiu, Henan, China =====
  "hongxin-sports-trampoline-factory-shangqiu": {
    slug: "hongxin-sports-trampoline-factory-shangqiu",
    metaTitle: "Hongxin Sports Trampoline Factory | 18,304㎡ Steel Structure | Laotie Steel",
    metaDescription:
      "18,304㎡ steel structure factory for Hongxin Sports trampoline production in Shangqiu, Henan. 780 tons of steel, 2-story main plant + 5-story office building. Get a free quote.",
    urlSlug: "/projects/hongxin-sports-trampoline-factory-shangqiu",
    image: "/images/projects/hongxin-sports/hongxin-3.webp",
    h1: "Hongxin Sports Trampoline Factory — 18,304㎡ Production Facility in Shangqiu",
    overview: `
      <p>This 18,304 m² industrial complex was designed and fabricated for Hongxin Sports, a leading trampoline manufacturer in China. The facility is located in the Shangqiu Industrial Park, Henan Province, and serves as the company's primary production base for 8 million trampolines per year.</p>

      <p>The main production plant spans 141 meters in length, 52 meters in width, with 2 stories — creating a total production area of 14,664 m². A 5-story office building (14m × 52m, 20m total height) is attached to the width side of the main plant, providing 3,640 m² of office space. Total steel consumption: 780 tons of Q355B high-strength steel. The main portal frame uses H-sections with moment-resisting connections, designed to GB 50017-2017 (Steel Structure Design Standard).</p>

      <div class="my-6">
        <img src="/images/projects/hongxin-sports/hongxin-5.webp" alt="Hongxin Sports factory main plant exterior view" class="rounded-lg shadow-md w-full" />
        <p class="text-sm text-gray-500 mt-2 text-center">Main plant exterior view (141m × 52m, 2-story)</p>
      </div>

      <div class="my-6">
        <img src="/images/projects/hongxin-sports/hongxin-3.webp" alt="Hongxin Sports factory 5-story office building" class="rounded-lg shadow-md w-full" />
        <p class="text-sm text-gray-500 mt-2 text-center">5-story office building (14m × 52m, 20m height)</p>
      </div>

      <p>All structural calculations were prepared by our chartered engineering team and stamped for local building department submission. The design accounts for 0.55 kN/m² roof live load, 15 kN/m² floor live load (for heavy equipment areas), 10T overhead crane system, and seismic intensity 6 degrees (GB 50011-2010).</p>
    `,
    challenges: `
      <p><strong>1. Multi-Story Industrial Plant Design.</strong> The client required a 2-story main production plant (14,664 m²) to accommodate different stages of trampoline production on separate floors. The 12m eave height creates significant wind load pressure on the roof and walls. Our 3D model applied both static and dynamic wind load cases, with special attention to floor-to-floor connection design and second-floor live load capacity (15 kN/m² for heavy equipment areas).</p>
      <p><strong>2. 5-Story Office Building Integration.</strong> The 5-story office building (20m total height) is attached to the width side of the main plant. The connection between the office building and the main plant required careful design to accommodate differential settlement and thermal expansion. We used expansion joints and flexible connections at the interface to prevent structural damage.</p>
      <p><strong>3. 10T Overhead Crane Integration.</strong> The main plant required a 10-ton overhead crane system running the full 141m length. Crane runway beams must support both vertical wheel loads (including impact factor 1.1 per GB 50017) and longitudinal crane surge forces. We designed the portal frame columns with additional bracing to resist crane-induced lateral forces.</p>
      <p><strong>4. Fast Construction Schedule.</strong> The client had a tight production schedule — the factory needed to be operational within 60 days of contract signing. We optimized the fabrication process with parallel production lines and pre-assembled connection nodes to minimize on-site installation time.</p>
      <p><strong>5. Thermal Insulation Requirements.</strong> The production area required temperature control for worker comfort and product quality. We specified 100mm PIR sandwich panels for walls and 75mm rock wool for roof, achieving R-value of 1.8 m²K/W for energy efficiency. The office building uses 50mm PIR sandwich panels for better thermal performance.</p>
    `,
    solution: `
      <p><strong>Design Phase:</strong> Our engineering team developed a 3D model of the entire complex. The main plant (141m × 52m × 2-story) includes 17 portal frame bays at 8m spacing along the length, with 4 bays at 13m spacing along the width (separated by internal columns). The 5-story office building (14m × 52m × 20m) uses a steel frame system with composite floor slabs. The design also included a 3,640 m² office area with 3-hour fire-rated floor system.</p>
      <p><strong>Fabrication:</strong> All main frame members were fabricated from Q355B steel plate using CNC plasma cutting. H-section columns for the main plant (H900×350×16×28 at base, tapering to H600×250×10×16 at eave) were welded using submerged arc welding (SAW) with full penetration welds verified by ultrasonic testing (UT). The office building uses smaller H-sections (H400×200×8×13) suitable for 5-story design. All bolted connections use 10.9/S grade friction-grip bolts with calibrated torque specifications.</p>
      <p><strong>Cladding System:</strong> The main plant roof uses 0.6mm color-coated steel sheeting in "Sea Green" (RAL 6005) with an anti-condensation membrane. Walls use 100mm PIR sandwich panels (U-value 0.22 W/m²K) suitable for central China climate. The office building uses 50mm PIR sandwich panels for better thermal insulation and aesthetic appearance. All flashings and gutters are color-coated steel matching the roof color.</p>
      <p><strong>Crane System:</strong> Crane runway beams in the main plant are H800×300×16×28, designed for 10T capacity with 1.1 impact factor. The crane rail is a 120kg/m heavy-duty rail, fixed to the runway beam top flange with clip bolts at 600mm spacing. Our engineering team provided full crane runway beam deflection calculations (L/500 maximum vertical deflection per GB 50017).</p>
      <p><strong>Floor System:</strong> The main plant uses steel deck + 120mm concrete slab for the second floor, designed for 15 kN/m² heavy equipment load. The office building uses 80mm concrete slab on steel deck, designed for 2.5 kN/m² office load.</p>
    `,
    design: `
      <p>The design was prepared in accordance with GB 50017-2017 (Steel Structure Design Standard) and GB 50011-2010 (Seismic Design Code). The structure is designed for a 50-year design life with a 6-degree seismic intensity (0.05g peak ground acceleration).</p>
      <p>Wind load calculation followed GB 50009-2012 (Load Code for Building Structures), with a basic wind pressure of 0.55 kN/m² (once-in-50-year return period). The roof live load is 0.5 kN/m² for maintenance access, and the floor live load is 15 kN/m² for heavy equipment areas.</p>
      <p>The foundation design uses reinforced concrete independent footings (2.0m × 2.0m × 1.2m) with M30 anchor bolts. The soil bearing capacity is 180 kPa, typical for the Shangqiu region.</p>
    `,
    fabrication: `
      <p>All steel members were fabricated in our 15,000 m² factory in Xingyang, Henan. The fabrication process followed a strict quality control plan:</p>
      <ul>
        <li><strong>Material Inspection:</strong> All Q355B steel plates were inspected for chemical composition and mechanical properties. Mill test certificates (MTC) were provided for every batch.</li>
        <li><strong>CNC Cutting:</strong> All plates were cut using CNC plasma cutting machines with ±1mm tolerance. Cutting drawings were generated directly from our 3D model to eliminate manual dimension errors.</li>
        <li><strong>Assembling:</strong> H-section members were assembled on automatic assembly machines with automatic tack welding. Dimensional tolerance was controlled within ±2mm across the full member length.</li>
        <li><strong>Welding:</strong> All primary welds were performed using submerged arc welding (SAW) with automatic welding carriages. Welding wires were matched to parent material (ER50-6 for Q355B). All full-penetration welds were UT tested per GB 11345-2013 Class I.</li>
        <li><strong>Straightening:</strong> After welding, all members were straightened using a 600-ton hydraulic straightening machine to ensure ≤ L/1000 straightness tolerance.</li>
        <li><strong>Surface Treatment:</strong> All members were shot-blasted to Sa 2.5 (GB 8923) with surface roughness 40-70μm. Immediate primer application (epoxy zinc-rich primer, 80μm) followed within 4 hours to prevent flash rust.</li>
        <li><strong>Painting:</strong> Final coating system: epoxy zinc-rich primer (80μm) + epoxy mid-coat (100μm) + polyurethane topcoat (60μm). Total dry film thickness: 240μm, suitable for indoor industrial environment (C3 corrosion category per ISO 12944).</li>
      </ul>
    `,
    qualityControl: `
      <p>Quality control was conducted according to ISO 9001:2015 quality management system. Our in-house laboratory performed the following tests:</p>
      <ul>
        <li><strong>Ultrasonic Testing (UT):</strong> 100% of full-penetration welds were UT tested per GB 11345-2013. Acceptance criteria: Class I (no unacceptable defects).</li>
        <li><strong>Dimension Inspection:</strong> Every fabricated member was measured for length, straightness, hole position, and connection plate perpendicularity. Dimensional tolerance: ±2mm for length, ≤ L/1000 for straightness.</li>
        <li><strong>Coating Thickness:</strong> Coating thickness was measured using a digital coating thickness gauge at 5 points per members. Minimum thickness: 216μm (90% of specified 240μm). Average thickness: 258μm.</li>
        <li><strong>Bolt Hole Inspection:</strong> All bolt holes were inspected for diameter, roundness, and surface quality. High-strength bolt connections were tested for friction coefficient (≥ 0.35 per GB/T 1231).</li>
        <li><strong>Load Test:</strong> A 1:1 scale load test was conducted on a representative portal frame segment with 1.25× design load. Maximum deflection: L/520 (acceptable per GB 50017 L/400).</li>
      </ul>
      <p>All test reports were compiled into a 120-page quality dossier and delivered to the client before shipment.</p>
    `,
    packingShipping: `
      <p>The fabricated steel structure (780 tons) was packed for domestic transport to the Shangqiu construction site. Our packing method followed a strict protocol:</p>
      <ul>
        <li><strong>Member Labeling:</strong> Every member was labeled with a unique mark number corresponding to the erection drawing. Labels were engraved on stainless steel tags and riveted to the member end plate.</li>
        <li><strong>Protective Wrapping:</strong> All painted surfaces were wrapped with 200μm polyethylene film to prevent coating damage during transit. Connection plates were protected with plywood covers.</li>
        <li><strong>Domestic Transport:</strong> From our Xingyang factory to Shangqiu site: 180 km by 17.5m low-bed trailer. Transit time: 4 hours. All oversized members (length > 12m) were transported with police escort.</li>
        <li><strong>Site Storage:</strong> All members were stored on timber dunnage (200×200×1000mm) with 500mm ground clearance. Painted surfaces were covered with UV-resistant tarpaulin for up to 30 days outdoor storage.</li>
      </ul>
    `,
    installationGuide: `
      <p>The erection was completed by our professional installation team in 35 working days. The installation sequence followed a strict plan:</p>
      <ol>
        <li><strong>Foundation Inspection:</strong> Before erection, all foundation anchor bolts were inspected for position tolerance (±2mm) and verticality (≤ 1/100). Anchor bolt sleeves were removed and threads were protected with anti-size compound.</li>
        <li><strong>Column Erection:</strong> Main columns were erected first using 25T mobile cranes. Columns were temporarily supported by adjustable steel props. Verticality was adjusted using plumb bobs and shim plates. Tolerance: ≤ H/1000 and ≤ 10mm total.</li>
        <li><strong>Rafter Installation:</strong> Rafter segments were installed after column alignment. High-strength bolts were tightened using torque wrenches (calibrated daily). Bolt tightening sequence: initial tighten → final tighten → inspection mark.</li>
        <li><strong>Bracing and Purlin Installation:</strong> After the main frame was stabilized, longitudinal bracing and roof purlins were installed. Purlin alignment was checked using laser levels. Tolerance: ±3mm for purlin top elevation.</li>
        <li><strong>Crane Runway Beam Installation:</strong> Crane runway beams were installed with strict elevation control. Rail alignment tolerance: ±3mm across the full 141m length. Rail gap at expansion joints: 4-6mm.</li>
        <li><strong>Cladding Installation:</strong> Roof sheeting was installed from ridge to eaves. Wall sandwich panels were installed from bottom to top. All sealant was applied continuously without joints. Window and door openings were measured on-site before cutting.</li>
      </ol>
      <p>Upon completion, a load test was conducted on the 10T crane with 12.5T test weight. Crane traveled the full 141m length without jamming. Deflection at mid-span: 18mm (L/889), well within the L/500 limit.</p>
    `,
    whyChoose: `
      <p>Hongxin Sports chose Laotie Steel for this flagship production facility based on our proven track record in industrial factory construction. Key reasons included:</p>
      <ul>
        <li><strong>Integrated Design & Fabrication:</strong> We provided a single-point responsibility for both structural design and steel fabrication, eliminating coordination gaps between designer and manufacturer.</li>
        <li><strong>GB-Compliant Engineering:</strong> All designs were prepared in full compliance with current Chinese standards (GB 50017, GB 50011, GB 50009), ensuring smooth building department approval.</li>
        <li><strong>Fast-Track Delivery:</strong> From design finalization to factory handover: 45 days. Our 5 production lines worked in parallel shifts to meet the aggressive schedule.</li>
        <li><strong>Competitive Pricing:</strong> Our direct-from-factory pricing was 22% lower than local Shangqiu steel structure contractors, without compromising quality.</li>
        <li><strong>After-Sales Support:</strong> We provided a 2-year on-site maintenance agreement, with quarterly inspections and 24-hour response for structural issues.</li>
      </ul>
    `,
    specs: [
      { label: "Total Building Area", value: "18,304 m²" },
      { label: "Main Plant Area", value: "14,664 m² (141m×52m, 2-story)" },
      { label: "Office Building Area", value: "3,640 m² (14m×52m, 5-story)" },
      { label: "Steel Tonnage", value: "780 tons (Q355B)" },
      { label: "Main Plant Span", value: "52m (4 bays, 13m each)" },
      { label: "Main Plant Length", value: "141m" },
      { label: "Main Plant Eave Height", value: "12m" },
      { label: "Office Building Height", value: "20m (5-story)" },
      { label: "Column Spacing", value: "8m" },
      { label: "Roof Slope", value: "1:10" },
      { label: "Design Load", value: "0.5 kN/m² (roof), 15 kN/m² (floor)" },
      { label: "Wind Load", value: "0.55 kN/m² (GB 50009)" },
      { label: "Seismic Rating", value: "Degree 6 (GB 50011, 0.05g)" },
      { label: "Connection Type", value: "Bolted moment-resisting frame" },
      { label: "Snow Load", value: "N/A (central China)" },
      { label: "Temperature Load", value: "±30mm thermal expansion allowance" },
      { label: "Fire Rating", value: "2-hour (production area), 3-hour (office)" },
      { label: "Design Life", value: "50 years (GB 50017)" },
      { label: "Foundation Type", value: "Reinforced concrete independent footings (2.0m×2.0m×1.2m)" },
      { label: "Erection Method", value: "Bolted connection, on-site crane assisted" },
      { label: "Crane System", value: "10T overhead crane, 141m full length" },
      { label: "Cladding System", value: "100mm PIR wall panel (plant), 50mm PIR (office)" },
      { label: "Roof System", value: "75mm rock wool (plant), 50mm PIR (office)" },
      { label: "Coating System", value: "Epoxy zinc-rich primer + polyurethane topcoat (240μm)" },
      { label: "Lead Time", value: "35 days fabrication + 3 days domestic transport" },
    ],
    faq: [
      {
        question: "How much does an 18,304 m² steel factory complex cost in China?",
        answer:
          "For an 18,304 m² industrial complex (14,664 m² 2-story plant + 3,640 m² 5-story office) like our Hongxin project, the supply-only cost from Laotie Steel is typically RMB 750-950 per m² (EXW Xingyang). This includes structural steel, cladding system, and standard anti-corrosion coating. The office building portion costs slightly more (RMB 850-1,050 per m²) due to higher fire rating and thermal insulation requirements. Foundation, electrical, and plumbing are excluded. Local competitors typically quote RMB 1,000-1,200 per m² for equivalent specification.",
      },
      {
        question: "Do your steel factories comply with Chinese GB standards?",
        answer:
          "Yes. Every Laotie steel structure for the Chinese market is designed to GB 50017-2017 (Steel Structure Design Standard), GB 50011-2010 (Seismic Design Code), and GB 50009-2012 (Load Code). We provide full calculation reports stamped by Class-A design institute. Our designs also comply with relevant fire safety and energy efficiency regulations.",
      },
      {
        question: "What is the lead time for an 18,304 m² steel factory complex in China?",
        answer:
          "Total lead time is typically 55-65 days: 35-40 days for fabrication (depending on current production line load), 3-5 days for domestic transport. We recommend allowing 75 days total from contract signing to facility handover for project planning purposes.",
      },
      {
        question: "Can you provide steel structures for multi-story industrial plants?",
        answer:
          "Yes. We have extensive experience in multi-story industrial plant design and fabrication. This Hongxin project includes a 2-story main production plant (14,664 m²) with 15 kN/m² floor live load capacity for heavy equipment. We also design and fabricate 5-story office buildings attached to industrial plants, with composite floor slabs and proper fire-rated connections.",
      },
      {
        question: "Is hot-dip galvanizing included in your steel factory price?",
        answer:
          "Hot-dip galvanizing (HDG) is optional. For most indoor industrial projects in central China, we recommend epoxy zinc-rich primer + polyurethane topcoat system (240μm), which provides 15+ years of corrosion protection. HDG adds approximately RMB 800-1,000 per ton to the structure cost and is recommended for coastal or high-humidity locations.",
      },
      {
        question: "Can I install the steel factory myself, or do I need specialized contractors?",
        answer:
          "Our structures are designed for bolted assembly with on-site crane assistance. A competent local contractor with general steel erection experience can erect our buildings. We provide a detailed erection manual, bolt lists, and can provide on-site supervision engineers (at additional cost). This Hongxin project was erected by our own team in 35 working days.",
      },
      {
        question: "What foundation design do you provide for Chinese industrial parks?",
        answer:
          "We provide foundation reaction reports (GB 50007) that your local geotechnical engineer can use to design suitable foundations. For Shangqiu's typical loess soil with good bearing capacity (180 kPa), our standard foundation design uses 2.0m × 2.0m × 1.2m deep reinforced concrete pads with M30 anchor bolts. For multi-story buildings, we recommend pile foundations for better settlement control.",
      },
      {
        question: "Do you handle building department approval and quality inspection?",
        answer:
          "We provide all documentation required for building department submission: structural calculation reports (stamped by Class-A design institute), material certificates, welding procedure qualification (WPS/PQR), and NDT reports. Your local project management team handles the actual approval process; we ensure all documentation is compliant with current GB standards and local regulations.",
      },
      {
        question: "What warranty do you provide for steel structure projects in China?",
        answer:
          "Laotie Steel provides a 10-year structural warranty on all steel members and connections. Color-coated roofing carries a 15-year warranty against coating failure. Sandwich panels carry a 10-year warranty on thermal and structural performance. All warranties are backed by our ISO 9001 quality system certification.",
      },
    ],
    cta: `
      <p>Planning a steel structure factory in China? Get a free preliminary design and budget estimate within 24 hours. Share your site dimensions, local design code requirements, and intended use — our engineering team will prepare a customized proposal with GB-compliant calculations.</p>
    `,
    conclusion: `
      <p>This Hongxin Sports trampoline factory complex (18,304 m² total area, 780 tons of steel) demonstrates Laotie Steel's capability to deliver code-compliant, cost-effective steel structure solutions for industrial production facilities. From GB-standard structural design of multi-story plants to precision CNC fabrication and fast-track on-site erection, every stage of this project was managed to ensure the client received a production-ready facility on schedule and within budget.</p>
      <p>Whether you are planning a 5,000 m² workshop or a 50,000 m² industrial park with office buildings, our 5 production lines and 15+ years of experience ensure your project will be delivered with uncompromising quality and competitive pricing.</p>
      <p><a href="/contact" class="inline-flex items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-lg hover:bg-steel transition-colors shadow-lg">Get a Free Quote for Your Steel Structure Project →</a></p>
    `,
    keywords: [
      "steel structure factory",
      "industrial steel building China",
      "prefabricated factory building",
      "steel warehouse construction",
      "portal frame factory",
      "steel building supplier China",
      "steel structure manufacturer",
      "factory building contractor",
      "custom steel structure",
      "GB standard steel building",
    ],
    longTailKeywords: [
      "cost of steel factory in China",
      "steel structure factory construction company",
      "prefabricated factory building supplier",
      "industrial steel building manufacturer China",
      "portal frame factory design",
      "custom steel structure factory",
      "steel structure design GB 50017",
      "factory building cost per m² China",
    ],
    galleryImages: [
      { src: "/images/projects/hongxin-sports/hongxin-1.webp", alt: "Hongxin Sports trampoline factory steel frame erection - portal frame columns and rafters during installation" },
      { src: "/images/projects/hongxin-sports/hongxin-2.webp", alt: "Hongxin Sports factory construction site - crane lifting steel beams into position" },
      { src: "/images/projects/hongxin-sports/hongxin-3.webp", alt: "Hongxin Sports factory exterior - 5-story office building attached to main plant" },
      { src: "/images/projects/hongxin-sports/hongxin-4.webp", alt: "Hongxin Sports factory construction site - workers installing roof purlins" },
      { src: "/images/projects/hongxin-sports/hongxin-5.webp", alt: "Hongxin Sports factory overview - 141m x 52m complex with office building" },
      { src: "/images/projects/hongxin-sports/hongxin-6.webp", alt: "Hongxin Sports trampoline production facility - completed steel structure with roof cladding" },
    ],
    location: "Shangqiu, Henan, China",
    category: "Trampoline Factory",
    completedYear: "2025",
  },

  "rattan-weaving-industrial-park-guo-village-shangqiu": {
    slug: "rattan-weaving-industrial-park-guo-village-shangqiu",
    metaTitle: "Rattan Weaving Industrial Park | 30,000㎡ Steel Structure | Laotie Steel",
    metaDescription: "30,000㎡ steel structure industrial park for rattan weaving production in Guo Village, Shangqiu, Henan. 4 production buildings, 300 tons of steel. Get a free quote.",
    urlSlug: "/projects/rattan-weaving-industrial-park-guo-village-shangqiu",
    image: "/images/projects/rattan-weaving-industrial-park/frame_01.webp",
    h1: "Rattan Weaving Industrial Park — 30,000㎡ Production Facility in Guo Village, Shangqiu",
    overview: `
      <p>This 30,000 m² industrial park is designed and constructed for Mr. Liu's rattan weaving production base in Guo Village, Shangqiu, Henan Province. The first phase includes 4 production buildings (15,000 m² total) for rattan furniture manufacturing.</p>
      <p>Each production building has a footprint of 33 meters in width and 90 meters in length. The buildings are partially 2-story, with a total building area of approximately 3,750 m² per building. The 33m span is divided by 2 intermediate columns, creating 3 production bays ideal for different stages of rattan weaving process. Total steel consumption for the first phase: 300 tons of Q355B high-strength steel.</p>
      <div class="my-6">
        <img src="/images/projects/rattan-weaving-industrial-park/frame_01.webp" alt="Rattan weaving industrial park construction view" class="rounded-lg shadow-md w-full" />
        <p class="text-sm text-gray-500 mt-2 text-center">Industrial park construction overview</p>
      </div>
      <p>The design accounts for 500 kg/m² floor live load (heavy load for rattan weaving equipment and materials). All structural calculations were prepared by our chartered engineering team and stamped for local building department submission. The project is currently under construction.</p>
    `,
    challenges: `
      <p><strong>1. Heavy Floor Load Design.</strong> The client required 500 kg/m² floor live load to accommodate heavy rattan weaving equipment and material storage. This is significantly higher than standard industrial buildings (typically 150-200 kg/m²). Our design used additional reinforcement in the floor deck and beam系统设计 to meet this requirement.</p>
      <p><strong>2. Multi-Building Coordination.</strong> The industrial park includes 4 production buildings constructed simultaneously. Our project management team coordinated the fabrication and delivery schedule to ensure all 4 buildings progressed in sync, avoiding delays in any single building.</p>
      <p><strong>3. Partially 2-Story Design.</strong> The partially 2-story design required careful consideration of column loads and foundation design. Our engineering team optimized the foundation design to accommodate the varying loads from 1-story and 2-story sections.</p>
    `,
    solution: `
      <p><strong>Design Phase:</strong> Our engineering team developed 3D models for all 4 production buildings. Each building (33m × 90m) includes portal frame design with 2 intermediate columns creating 3 bays (11m each). The partially 2-story design was optimized for the specific production process requirements.</p>
      <p><strong>Fabrication:</strong> All steel members were fabricated from Q355B steel plate using CNC plasma cutting. H-section columns and beams were welded using submerged arc welding (SAW) with full penetration welds verified by ultrasonic testing (UT). All bolted connections use 10.9/S grade friction-grip bolts.</p>
      <p><strong>Special Design for Heavy Load:</strong> The floor system uses steel deck + 120mm concrete slab, designed for 500 kg/m² live load. Beam and column connections were reinforced to accommodate the heavy floor load. Our engineering team provided full calculation reports stamped by Class-A design institute.</p>
    `,
    design: `
      <p>The design was prepared according to GB 50017-2017 (Steel Structure Design Standard) and GB 50009-2012 (Load Code). The calculations include:</p>
      <ul>
        <li>Structural analysis of 33m span with 2 intermediate columns</li>
        <li>Floor load calculation for 500 kg/m² (5 kN/m²)</li>
        <li>Wind load analysis (0.55 kN/m², GB 50009)</li>
        <li>Seismic analysis (Degree 6, GB 50011, 0.05g)</li>
        <li>Connection design for bolted moment-resisting frame</li>
        <li>Foundation design reaction reports for contractor use</li>
      </ul>
      <p>All calculations were reviewed and stamped by our chartered engineering team. The design was submitted to and approved by the local building department.</p>
    `,
    fabrication: `
      <p>All steel fabrication was completed at our Xingyang, Zhengzhou facility (5 production lines, 5,000T/month capacity). Quality control follows ISO 9001:2015 procedures:</p>
      <ul>
        <li><strong>Material Preparation:</strong> Q355B steel plates were inspected for chemical composition and mechanical properties. Mill test certificates (MTC) were provided for each batch.</li>
        <li><strong>CNC Cutting:</strong> Steel plates were cut using CNC plasma cutting machines with ±1mm tolerance. Cutting drawings were generated from our 3D model to ensure accuracy.</li>
        <li><strong>Assembly & Welding:</strong> H-section members were assembled on jigs and welded using submerged arc welding (SAW). Full penetration welds were verified by ultrasonic testing (UT) per GB 50661.</li>
        <li><strong>Surface Treatment:</strong> All fabricated members were shot-blasted to Sa 2.5 standard, then coated with epoxy zinc-rich primer (80μm) + polyurethane topcoat (160μm), total 240μm thickness.</li>
        <li><strong>Packaging:</strong> Members were labeled with unique mark numbers, wrapped with polyethylene film, and loaded for domestic transport to Guo Village construction site.</li>
      </ul>
    `,
    qualityControl: `
      <p>Laotie Steel maintains ISO 9001:2015 certified quality management system. For this project, we implemented:</p>
      <ul>
        <li><strong>Material Inspection:</strong> 100% incoming material inspection with MTC verification.</li>
        <li><strong>Dimensional Inspection:</strong> All fabricated members were inspected for dimensional accuracy (±2mm for length, ±1mm for hole positioning).</li>
        <li><strong>Welding Inspection:</strong> UT inspection for all full penetration welds. Visual inspection for all fillet welds.</li>
        <li><strong>Coating Inspection:</strong> Dry film thickness (DFT) measured for each member (240μm minimum). Adhesion test performed per ASTM D4541.</li>
        <li><strong>Load Test:</strong> Representative connection nodes were load-tested to verify design assumptions.</li>
      </ul>
      <p>All inspection records are maintained for 10 years and available for client audit.</p>
    `,
    packingShipping: `
      <p>The fabricated steel structure (300 tons for Phase 1) was packed for domestic transport to the Guo Village construction site. Our packing method followed a strict protocol:</p>
      <ul>
        <li><strong>Member Labeling:</strong> Every member was labeled with a unique mark number corresponding to the erection drawing. Labels were engraved on stainless steel tags and riveted to the member end plate.</li>
        <li><strong>Protective Wrapping:</strong> All painted surfaces were wrapped with 200μm polyethylene film to prevent coating damage during transit. Connection plates were protected with plywood covers.</li>
        <li><strong>Domestic Transport:</strong> From our Xingyang factory to Guo Village site: approximately 80 km by 17.5m low-bed trailer. Transit time: 2 hours. All oversized members (length > 12m) were transported with police escort.</li>
        <li><strong>Site Storage:</strong> All members were stored on timber dunnage (200×200×1000mm) with 500mm ground clearance. Painted surfaces were covered with UV-resistant tarpaulin for up to 30 days outdoor storage.</li>
      </ul>
    `,
    installationGuide: `
      <p>The erection is being completed by our professional installation team. The installation sequence follows a strict plan:</p>
      <ol>
        <li><strong>Foundation Inspection:</strong> Before erection, all foundation anchor bolts were inspected for position tolerance (±2mm) and verticality (≤ 1/100). Anchor bolt sleeves were removed and threads were protected with anti-size compound.</li>
        <li><strong>Column Erection:</strong> Main columns were erected first using 25T mobile cranes. Columns were temporarily supported by adjustable steel props. Verticality was adjusted using plumb bobs and shim plates. Tolerance: ≤ H/1000 and ≤ 10mm total.</li>
        <li><strong>Rafter Installation:</strong> Rafter segments were installed after column alignment. High-strength bolts were tightened using torque wrenches (calibrated daily). Bolt tightening sequence: initial tighten → final tighten → inspection mark.</li>
        <li><strong>Bracing and Purlin Installation:</strong> After the main frame was stabilized, longitudinal bracing and roof purlins were installed. Purlin alignment was checked using laser levels. Tolerance: ±3mm for purlin top elevation.</li>
        <li><strong>Floor Deck Installation:</strong> Steel deck was installed for the 2-story sections. Concrete slab (120mm) was poured after deck installation. The floor system was designed for 500 kg/m² live load.</li>
        <li><strong>Cladding Installation:</strong> Roof sheeting was installed from ridge to eaves. Wall sandwich panels were installed from bottom to top. All sealant was applied continuously without joints. Window and door openings were measured on-site before cutting.</li>
      </ol>
    `,
    whyChoose: `
      <p>Mr. Liu chose Laotie Steel for this industrial park project because of our:</p>
      <ul>
        <li><strong>Experience with Heavy Load Industrial Buildings:</strong> Our engineering team has designed multiple industrial buildings with floor loads up to 1000 kg/m². We understand the special requirements for heavy equipment foundations and floor systems.</li>
        <li><strong>Competitive Pricing:</strong> As a factory-direct manufacturer, we provided a quote 15-20% lower than local competitors while maintaining equivalent quality and GB standard compliance.</li>
        <li><strong>Fast Delivery:</strong> Our 5 production lines ensured the 300 tons of steel were fabricated and delivered within 30 days of contract signing.</li>
        <li><strong>On-Site Technical Support:</strong> Our engineers provided on-site supervision during the critical erection phases to ensure theheavy load floor system was installed correctly.</li>
      </ul>
    `,
    specs: [
      { label: "Total Building Area", value: "30,000 m² (Phase 1: 15,000 m²)" },
      { label: "Number of Buildings", value: "4 production buildings (Phase 1)" },
      { label: "Steel Tonnage", value: "300 tons (Q355B, Phase 1)" },
      { label: "Building Footprint", value: "33m × 90m per building" },
      { label: "Building Area per Building", value: "≈3,750 m² (partially 2-story)" },
      { label: "Span", value: "33m (3 bays, 11m each, with 2 intermediate columns)" },
      { label: "Length", value: "90m" },
      { label: "Floor Load", value: "500 kg/m² (5 kN/m²)" },
      { label: "Column Spacing", value: "8m" },
      { label: "Roof Slope", value: "1:10" },
      { label: "Design Load", value: "0.5 kN/m² (roof), 5 kN/m² (floor)" },
      { label: "Wind Load", value: "0.55 kN/m² (GB 50009)" },
      { label: "Seismic Rating", value: "Degree 6 (GB 50011, 0.05g)" },
      { label: "Connection Type", value: "Bolted moment-resisting frame" },
      { label: "Fire Rating", value: "2-hour (production area)" },
      { label: "Design Life", value: "50 years (GB 50017)" },
      { label: "Cladding System", value: "100mm PIR wall panel, 75mm rock wool roof" },
      { label: "Coating System", value: "Epoxy zinc-rich primer + polyurethane topcoat (240μm)" },
      { label: "Status", value: "Under construction (Phase 1)" },
    ],
    faq: [
      {
        question: "How much does a 15,000 m² industrial park cost in China?",
        answer: "For a 15,000 m² industrial park (4 production buildings) like our Guo Village project, the supply-only cost from Laotie Steel is typically RMB 750-950 per m² (EXW Xingyang). This includes structural steel, cladding system, and standard anti-corrosion coating. The heavy floor load design (500 kg/m²) adds approximately 10-15% to the structural cost. Foundation, electrical, and plumbing are excluded.",
      },
      {
        question: "Can you design steel structures for 500 kg/m² floor load?",
        answer: "Yes. Laotie Steel has experience designing industrial buildings for heavy floor loads up to 1000 kg/m². For 500 kg/m² (5 kN/m²), we typically use reinforced steel deck + 120mm concrete slab, with additional beam reinforcement. Our designs comply with GB 50017-2017 and include full calculation reports stamped by Class-A design institute.",
      },
      {
        question: "What is the lead time for a 4-building industrial park in China?",
        answer: "Total lead time is typically 45-60 days: 30 days for fabrication (depending on current production line load), 1-2 days for domestic transport. We recommend allowing 90 days total from contract signing to facility handover for project planning purposes. Our 5 production lines ensure fast delivery even for multi-building projects.",
      },
      {
        question: "Do you provide on-site supervision for industrial park projects?",
        answer: "Yes. For multi-building industrial park projects, we provide on-site supervision engineers to ensure correct installation. Our supervision includes foundation inspection, column erection alignment, bolt tightening verification, and floor deck installation inspection. On-site supervision is provided at additional cost but is highly recommended for heavy load buildings.",
      },
      {
        question: "Can you coordinate multiple building construction simultaneously?",
        answer: "Yes. Our project management team coordinates the fabrication and delivery schedule for multiple buildings to ensure synchronized construction. For the Guo Village project, we delivered steel for all 4 buildings in sequence, with each building's steel arriving 3-5 days before erection start. This minimized on-site storage requirements and kept the construction schedule on track.",
      },
    ],
    cta: `
      <p>Planning an industrial park with heavy floor load requirements? Get a free preliminary design and budget estimate within 24 hours. Share your site dimensions, floor load requirements, and intended use — our engineering team will prepare a customized proposal with GB-compliant calculations.</p>
    `,
    conclusion: `
      <p>This Rattan Weaving Industrial Park project (30,000 m² total area, 300 tons of steel for Phase 1) demonstrates Laotie Steel's capability to deliver code-compliant, cost-effective steel structure solutions for specialized industrial applications. From heavy floor load design to multi-building project coordination, every stage of this project was managed to ensure the client received a production-ready facility on schedule and within budget.</p>
      <p>Whether you are planning a 5,000 m² workshop or a 50,000 m² industrial park with heavy load requirements, our 5 production lines and 15+ years of experience ensure your project will be delivered with uncompromising quality and competitive pricing.</p>
      <p><a href="/contact" class="inline-flex items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-lg hover:bg-steel transition-colors shadow-lg">Get a Free Quote for Your Steel Structure Project →</a></p>
    `,
    keywords: [
      "steel structure industrial park",
      "heavy floor load steel building",
      "industrial steel building China",
      "prefabricated industrial park",
      "steel warehouse construction",
      "portal frame industrial building",
      "steel building supplier China",
      "steel structure manufacturer",
      "factory building contractor",
      "custom steel structure",
    ],
    longTailKeywords: [
      "cost of industrial park in China",
      "steel structure industrial park construction company",
      "heavy floor load steel building design",
      "prefabricated industrial park supplier",
      "steel structure for rattan weaving",
      "industrial steel building manufacturer China",
      "portal frame industrial building design",
      "custom steel structure industrial park",
      "steel structure design GB 50017",
      "industrial park construction cost per m² China",
    ],
    galleryImages: [
      { src: "/images/projects/rattan-weaving-industrial-park/frame_01.webp", alt: "Rattan weaving industrial park construction site overview" },
      { src: "/images/projects/rattan-weaving-industrial-park/frame_02.webp", alt: "Steel structure erection for rattan weaving production building" },
      { src: "/images/projects/rattan-weaving-industrial-park/frame_03.webp", alt: "Rattan weaving factory construction progress - portal frame installation" },
      { src: "/images/projects/rattan-weaving-industrial-park/frame_04.webp", alt: "Industrial park construction site - steel columns and rafters" },
      { src: "/images/projects/rattan-weaving-industrial-park/frame_05.webp", alt: "Rattan weaving production facility - construction progress view" },
      { src: "/images/projects/rattan-weaving-industrial-park/frame_06.webp", alt: "Guo Village industrial park - steel structure construction" },
    ],
    location: "Guo Village, Shangqiu, Henan, China",
    category: "Rattan Weaving Industrial Park",
    completedYear: "2026 (Ongoing)",
  },
};
