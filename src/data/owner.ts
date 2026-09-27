// Owner profile data for /meet-the-owner
// ---------------------------------------------------------------
// 老铁：这个文件是「Meet the Owner」页面的唯一内容源。
// 想改介绍文字 / 加新视频 / 换照片，只改这里，不用碰页面代码。
// 照片替换方法：把新照片覆盖 public/images/owner/kang-guangjian.webp 即可。
// ---------------------------------------------------------------

export const owner = {
  name: "Kang Guangjian",
  nameCn: "康广建",
  brandName: "Laotie",
  role: "Owner & General Manager",
  company: "Laotie Steel Structure Engineering Co., Ltd.",
  location: "Shangqiu, Henan, China",
  since: "2009",
  photo: "/images/owner/kang-guangjian.webp",
  photoSquare: "/images/owner/kang-guangjian-square.webp",

  // Contact / cross-channel links (used for the IP cross-traffic block)
  whatsapp:
    "https://wa.me/8616650735555?text=Hi%20Laotie%2C%20I%20watched%20your%20videos%20and%20have%20a%20steel%20structure%20project.",
  email: "kangguangjian91@gmail.com",
  youtube: "https://www.youtube.com/@LaotieSteelStructure",
  linkedin: "https://www.linkedin.com/company/laotie-steel",
  alibaba: "https://hnltgjg.en.alibaba.com/",
};

// Short headline used in the hero
export const heroHeadline = {
  eyebrow: "Meet the Owner",
  title: "You are buying from the man who runs the factory",
  subtitle:
    "I am Kang Guangjian. Our customers call us Laotie — \"old iron\", the Chinese word for a friend you can trust. I own and run our 20,000 m² fabrication plant in Shangqiu, Henan, and I answer the questions myself.",
};

// Bio paragraphs — edit freely
export const bioParagraphs = [
  "Laotie Steel Structure started in 2009 as a small fabrication workshop in Shangqiu, Henan Province — in the middle of China's steel manufacturing belt. We have grown into a 20,000 m² plant with 5 production lines, 200+ workers and engineers, and a monthly output of 5,000 metric tons. Everything from raw steel plate to cutting, assembly, welding, shot blasting, painting and trial assembly happens under one roof, so the steel in your building never leaves our control.",
  "I still work from the factory floor. Every export quotation is reviewed by me before it goes out — the tonnage, the steel section sizes, the coating specification, the packing plan and the shipping schedule. When a buyer sends drawings, our engineering team models the structure in Tekla Structures and SkyCiv and returns code-compliant calculations and fabrication drawings. Nothing is guessed.",
  "I started filming the factory for a simple reason: most overseas buyers cannot fly to China to check who they are paying. So instead of telling you we are a real manufacturer, I show you — the plasma table cutting plate, the welders, the shot blasting line, the trial assembly, the containers being loaded. If you want to know how your steel is made, I would rather show you than describe it.",
  "Today we ship to 30+ countries across five continents, under CE (EN 1090-1), ISO 9001:2015 and IAF certified quality management. If you are comparing suppliers and want straight answers about price, quality or lead time, message me directly — you will be talking to the owner, not a call centre.",
];

// Quick facts table
export const ownerFacts = [
  { label: "Name", value: "Kang Guangjian (康广建)" },
  { label: "Role", value: "Owner & General Manager" },
  { label: "Based at", value: "Shangqiu factory, Henan, China" },
  { label: "Company founded", value: "2009" },
  { label: "Factory area", value: "20,000 m²" },
  { label: "Production lines", value: "5" },
  { label: "Monthly capacity", value: "5,000 metric tons" },
  { label: "Team", value: "200+ workers & engineers" },
  { label: "Certifications", value: "CE (EN 1090-1), ISO 9001:2015, IAF" },
  { label: "Export markets", value: "30+ countries, 5 continents" },
  { label: "Design software", value: "Tekla Structures, SkyCiv, PKPM" },
  { label: "Languages", value: "Chinese (native), English (business)" },
];

// How the owner works with overseas buyers
export const workingPrinciples = [
  {
    title: "Factory-direct, no middleman",
    text: "Your quotation is prepared by the plant that actually welds your steel. No trading layer, no hidden margin.",
  },
  {
    title: "One person accountable",
    text: "You message me directly on WhatsApp. Design questions, price changes, delivery delays — I answer them.",
  },
  {
    title: "Quality you can watch",
    text: "Cutting, welding, blasting, painting, trial assembly and container loading are filmed and sent to you before shipment.",
  },
  {
    title: "Answers within 24 hours",
    text: "Technical questions are answered with drawings and specifications, not with sales talk.",
  },
];

// What he personally handles on every order
export const ownerResponsibilities = [
  "Reviews every export quotation — tonnage, section sizes, coating spec, packing and shipping plan",
  "Signs off on the fabrication drawing package before production starts",
  "Arranges third-party inspection (SGS / BV) when the buyer requests it",
  "Supervises container loading and checks the packing list against the contract",
  "Stays available through erection — installation questions go straight to the factory",
];

// Video series topics (evergreen content pillars on YouTube)
export const videoTopics = [
  "Steel structure price per ton — what actually drives the number",
  "How to read a steel structure quotation from a Chinese supplier",
  "Factory tour: 5 production lines, raw steel plate to finished frame",
  "What CE (EN 1090-1) and ISO 9001 really mean for your project",
  "Installation timeline: how long a 1,000 m² warehouse takes to erect",
  "Container loading and shipping — CIF, FOB and what to check",
  "The 5 mistakes buyers make when importing steel from China",
  "Cost per m² by building type: warehouse, workshop, factory",
];

// YouTube uploads. Add new videos at the TOP of this list.
// Fields: id = YouTube video ID, title, description, poster = local poster image
export const ownerVideos = [
  {
    id: "XQZuDgAT8JA",
    title: "Laotie Steel Structure Factory — 5 Production Lines in Action",
    description:
      "Aerial and factory-floor footage of our Shangqiu plant: 20,000 m² of fabrication space, 5 production lines and 5,000 tons monthly capacity. Eave height customisable from 4 m to 16 m.",
    poster: "/images/owner/factory-tour-poster.webp",
  },
];

// Factory floor photos shown on the page
export const factoryShots = [
  {
    src: "/images/owner/factory-aerial.webp",
    alt: "Aerial view of Laotie Steel Structure factory building in Shangqiu, Henan, China",
    caption: "Our plant, Shangqiu — Henan, China",
  },
  {
    src: "/images/factory/03-steel-fabrication.webp",
    alt: "H-beam steel fabrication line inside Laotie Steel factory",
    caption: "H-beam fabrication line",
  },
  {
    src: "/images/owner/factory-welding-floor.webp",
    alt: "Welders fabricating long-span steel beams on the workshop floor",
    caption: "Welding long-span girders",
  },
  {
    src: "/images/owner/factory-plasma-cutting.webp",
    alt: "CNC plasma cutting machine cutting steel plate",
    caption: "CNC plasma cutting, ±0.5 mm",
  },
  {
    src: "/images/factory/04-welding-work.webp",
    alt: "Certified welder performing submerged arc welding on a steel beam",
    caption: "Submerged arc welding",
  },
  {
    src: "/images/factory/05-shot-blasting.webp",
    alt: "Shot blasting machine preparing steel surface to SA 2.5",
    caption: "Shot blasting, SA 2.5",
  },
  {
    src: "/images/owner/factory-panel-storage.webp",
    alt: "Insulated sandwich panels stacked in the factory storage area",
    caption: "Insulated panel production",
  },
  {
    src: "/images/factory/10-quality-inspection.webp",
    alt: "Quality inspector measuring a fabricated steel member",
    caption: "Dimensional QC before shipment",
  },
];
