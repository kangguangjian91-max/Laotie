export interface Project {
  name: string;
  slug?: string;
  location: string;
  type: string;
  size: string;
  year: string;
  description: string;
  highlights: string[];
  image: string;
  challenge?: string;
  solution?: string;
  result?: string;
}

export const projects: Project[] = [
  {
    name: "Industrial Warehouse Complex (120×60m)",
    slug: "industrial-warehouse-sydney",
    location: "Sydney, Australia",
    type: "Portal Frame Steel Building",
    size: "7,200 sqm",
    year: "2025",
    description:
      "A large-span portal frame warehouse for an Australian logistics company, designed to AS/NZS 1170 wind load requirements. Single-span 60m clear interior with 12m eave height, accommodating high-bay racking systems and 20T overhead crane operations.",
    highlights: [
      "Cyclonic wind region design (Region C)",
      "Full hot-dip galvanized structure for coastal environment",
      "120 km/h wind rating with full engineering certification",
      "Integrated mezzanine office space — 600 sqm",
    ],
    image: "/images/projects/project-sydney-01.webp",
  },
  {
    name: "Factory Complex — Phase II Expansion",
    slug: "factory-complex-lagos",
    location: "Lagos, Nigeria",
    type: "Multi-Span Steel Structure",
    size: "15,000 sqm",
    year: "2024",
    description:
      "Phase II expansion of a manufacturing plant in Lagos Free Trade Zone. Three continuous spans of 30m each, creating a column-free production floor totaling 15,000 sqm. Designed for high humidity tropical environment with enhanced corrosion protection.",
    highlights: [
      "Tropical climate corrosion package — SA 2.5 + 320μm DFT epoxy system",
      "30m × 3 continuous spans, column-free interior",
      "Integrated natural ventilation ridge vents — 120 units",
      "Completed 6 weeks ahead of schedule",
    ],
    image: "/images/projects/project-lagos-01.webp",
  },
  {
    name: "Shopping Mall Dome Roof",
    slug: "shopping-mall-dome-roof-manila",
    location: "Manila, Philippines",
    type: "Space Frame Structure",
    size: "3,200 sqm",
    year: "2024",
    description:
      "A curved bolt-ball space frame roof for a 4-story shopping mall atrium in Metro Manila. The 80m × 40m oval dome features a central skylight and integrated MEP service walkways. All bolted connections — zero site welding required.",
    highlights: [
      "80m oval span, bolt-ball system — no site welding",
      "Central skylight with integrated drainage channels",
      "Seismic design per NSCP 2015 (Philippine Building Code)",
      "PVDF coated for tropical UV resistance — 15-year warranty",
    ],
    image: "/images/projects/project-manila-01.webp",
  },
  {
    name: "Logistics Distribution Center",
    slug: "logistics-center-dubai",
    location: "Dubai, UAE",
    type: "Steel Building + Mezzanine",
    size: "22,000 sqm",
    year: "2023",
    description:
      "A massive logistics hub in Dubai South (DWC) Free Zone, combining warehouse and office functions under one roof. The structure features 50m clear-span bays, 18m eave height, loading docks on both longitudinal sides.",
    highlights: [
      "Fire-rated 2-hour protection on mezzanine structural members",
      "50T overhead crane runway beams — 4 bays",
      "Designed for 50°C ambient temperature per UAE Building Code",
      "HVAC-ready roof structure with equipment support platforms",
    ],
    image: "/images/projects/project-dubai-01.webp",
  },
  {
    name: "Agricultural Processing Plant",
    slug: "perth-agricultural-processing-plant",
    location: "Perth, Australia",
    type: "Portal Frame + Crane System",
    size: "5,600 sqm",
    year: "2025",
    description:
      "A food-grade processing facility for grain handling and packaging in Western Australia. The structure integrates 15T overhead cranes with food-safe epoxy-coated steel members.",
    highlights: [
      "Food-grade epoxy internal coating on all structural steel",
      "AS/NZS 5131 compliant fabrication and erection",
      "Integrated 15T crane system with full engineering certification",
      "Dust extraction and positive-pressure ventilation ready",
    ],
    image: "/images/projects/project-perth-01.webp",
  },
  {
    name: "Aircraft Maintenance Hangar",
    slug: "aircraft-hangar-jakarta",
    location: "Jakarta, Indonesia",
    type: "Large-Span Space Frame",
    size: "4,800 sqm",
    year: "2023",
    description:
      "A maintenance hangar for narrow-body aircraft at an Indonesian regional airport. 80m × 60m clear-span space frame roof provides unobstructed interior space.",
    highlights: [
      "80m clear span — no interior columns for full aircraft access",
      "Designed to SNI 1727:2020 (Indonesian Building Code)",
      "Integrated fire suppression system supports in roof structure",
      "4 × 25T overhead crane runways for engine maintenance",
    ],
    image: "/images/projects/project-jakarta-01.webp",
  },
  {
    name: "Hongxin Sports Trampoline Factory",
    slug: "hongxin-sports-trampoline-factory-shangqiu",
    location: "Shangqiu, China",
    type: "Portal Frame Steel Building",
    size: "12,800 sqm",
    year: "2025",
    description:
      "A 12,800 m² industrial factory designed and fabricated for Hongxin Sports, a leading trampoline manufacturer in China.",
    highlights: [
      "160m × 80m column-free production area",
      "10T overhead crane system — full 160m length",
      "100mm PIR sandwich panels for walls, 75mm rock wool roof",
      "Completed in 45 days from contract signing",
    ],
    image: "/images/projects/hongxin-sports/hongxin-1.webp",
  },
  {
    name: "Rattan Weaving Industrial Park",
    slug: "rattan-weaving-industrial-park-guo-village-shangqiu",
    location: "Guo Village, Shangqiu, China",
    type: "Portal Frame Steel Building",
    size: "30,000 sqm (Phase 1: 15,000 sqm)",
    year: "2026 (Ongoing)",
    description:
      "A 30,000 m² industrial park designed and constructed for Mr. Liu's rattan weaving production base in Guo Village, Shangqiu.",
    highlights: [
      "33m span with 2 intermediate columns (3 bays, 11m each)",
      "Heavy floor load design — 500 kg/m² (5 kN/m²)",
      "Partially 2-story design, 300 tons of Q355B steel (Phase 1)",
      "Under construction — on schedule for 2026 completion",
    ],
    image: "/images/projects/rattan-weaving-industrial-park/frame_01.webp",
  },
  {
    name: "Yunda Bozhou Modern Industrial Park",
    slug: "yunda-bozhou-modern-industrial-park",
    location: "Bozhou, Anhui, China",
    type: "Multi-Building Portal Frame Industrial Park",
    size: "50,000 sqm (5 buildings)",
    year: "2025",
    description:
      "A 50,000 m² logistics distribution center for Yunda Express in Bozhou, Anhui. 5 interconnected buildings with 80m clear-span portal frames, 14m eave height, and high-bay racking systems for automated parcel handling.",
    highlights: [
      "50,000 m² — 5 interconnected buildings with coordinated design",
      "1,200 tons fabricated in 35 working days on 2 production lines",
      "14m eave height for automated sorting equipment installation",
      "Seismic Category 7 design per GB 50011",
    ],
    image: "/images/projects/yunda-bozhou/yunda-02.webp",
  },
];

export const projectProductLinks: Record<string, string> = {
  "Industrial Warehouse Complex (120×60m)": "/products/steel-structure-building",
  "Factory Complex — Phase II Expansion": "/products/steel-structure-building",
  "Shopping Mall Dome Roof": "/products/space-frame-truss",
  "Logistics Distribution Center": "/products/steel-structure-building",
  "Agricultural Processing Plant": "/products/steel-structure-building",
  "Aircraft Maintenance Hangar": "/products/space-frame-truss",
};
