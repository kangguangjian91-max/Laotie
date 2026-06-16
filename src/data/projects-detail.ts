export interface ProjectDetail {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
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
}

export const projectDetails: Record<string, ProjectDetail> = {
  "perth-agricultural-processing-plant": {
    slug: "perth-agricultural-processing-plant",
    metaTitle:
      "Steel Warehouse Perth | 50×60m Agricultural Processing Plant | Laotie Steel",
    metaDescription:
      "Custom 50m×60m steel warehouse in Perth, Australia. AS/NZS compliant design, 120-ton Q355B structure, Colorbond roof & sandwich panel walls. Get a quote today.",
    urlSlug: "/projects/perth-agricultural-processing-plant",
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
};
