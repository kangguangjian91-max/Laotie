"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const PRICE_UPDATE = "July 2026";

// Region-specific prices (local currency per unit)
const REGION_PRICES: Record<
  string,
  {
    steel: number;
    roof: number;
    wall: number;
    shippingPerContainer: number;
    install: number;
    foundation: number;
    doors: number;
    design: number;
    contingency: number;
    currency: string;
    symbol: string;
    shipDays: number;
    installDaysBase: number;
    tonsPerContainer: number;
  }
> = {
  australia: {
    steel: 1350,
    roof: 42,
    wall: 38,
    shippingPerContainer: 3500,
    install: 120,
    foundation: 150,
    doors: 8,
    design: 5,
    contingency: 8,
    currency: "AUD",
    symbol: "AUD",
    shipDays: 30,
    installDaysBase: 14,
    tonsPerContainer: 27,
  },
  china: {
    steel: 5800,
    roof: 35,
    wall: 28,
    shippingPerContainer: 500,
    install: 320,
    foundation: 220,
    doors: 6,
    design: 3,
    contingency: 5,
    currency: "CNY",
    symbol: "CNY",
    shipDays: 8,
    installDaysBase: 10,
    tonsPerContainer: 27,
  },
  nigeria: {
    steel: 800,
    roof: 25,
    wall: 22,
    shippingPerContainer: 4800,
    install: 55,
    foundation: 45,
    doors: 8,
    design: 5,
    contingency: 10,
    currency: "USD",
    symbol: "USD",
    shipDays: 42,
    installDaysBase: 21,
    tonsPerContainer: 27,
  },
  philippines: {
    steel: 800,
    roof: 22,
    wall: 20,
    shippingPerContainer: 2800,
    install: 50,
    foundation: 40,
    doors: 7,
    design: 4,
    contingency: 8,
    currency: "USD",
    symbol: "USD",
    shipDays: 18,
    installDaysBase: 14,
    tonsPerContainer: 27,
  },
  uae: {
    steel: 820,
    roof: 28,
    wall: 25,
    shippingPerContainer: 2200,
    install: 60,
    foundation: 55,
    doors: 9,
    design: 5,
    contingency: 8,
    currency: "USD",
    symbol: "USD",
    shipDays: 24,
    installDaysBase: 14,
    tonsPerContainer: 27,
  },
  indonesia: {
    steel: 780,
    roof: 20,
    wall: 18,
    shippingPerContainer: 2400,
    install: 48,
    foundation: 38,
    doors: 7,
    design: 4,
    contingency: 8,
    currency: "USD",
    symbol: "USD",
    shipDays: 21,
    installDaysBase: 14,
    tonsPerContainer: 27,
  },
  vietnam: {
    steel: 720,
    roof: 21,
    wall: 19,
    shippingPerContainer: 2200,
    install: 45,
    foundation: 42,
    doors: 7,
    design: 4,
    contingency: 8,
    currency: "USD",
    symbol: "USD",
    shipDays: 16,
    installDaysBase: 14,
    tonsPerContainer: 27,
  },
  thailand: {
    steel: 790,
    roof: 24,
    wall: 21,
    shippingPerContainer: 2600,
    install: 52,
    foundation: 48,
    doors: 8,
    design: 5,
    contingency: 8,
    currency: "USD",
    symbol: "USD",
    shipDays: 20,
    installDaysBase: 14,
    tonsPerContainer: 27,
  },
  usa: {
    steel: 950,
    roof: 32,
    wall: 28,
    shippingPerContainer: 3500,
    install: 85,
    foundation: 90,
    doors: 10,
    design: 6,
    contingency: 10,
    currency: "USD",
    symbol: "USD",
    shipDays: 28,
    installDaysBase: 14,
    tonsPerContainer: 27,
  },
  uk: {
    steel: 820,
    roof: 35,
    wall: 30,
    shippingPerContainer: 2800,
    install: 90,
    foundation: 95,
    doors: 10,
    design: 6,
    contingency: 10,
    currency: "USD",
    symbol: "USD",
    shipDays: 30,
    installDaysBase: 14,
    tonsPerContainer: 27,
  },
  kenya: {
    steel: 850,
    roof: 26,
    wall: 23,
    shippingPerContainer: 4200,
    install: 45,
    foundation: 38,
    doors: 8,
    design: 5,
    contingency: 10,
    currency: "USD",
    symbol: "USD",
    shipDays: 35,
    installDaysBase: 21,
    tonsPerContainer: 27,
  },
  "south-africa": {
    steel: 820,
    roof: 28,
    wall: 24,
    shippingPerContainer: 3800,
    install: 55,
    foundation: 50,
    doors: 9,
    design: 5,
    contingency: 10,
    currency: "USD",
    symbol: "USD",
    shipDays: 32,
    installDaysBase: 18,
    tonsPerContainer: 27,
  },
};

const STEEL_RATE: Record<string, number> = {
  warehouse: 28,
  factory: 38,
  hangar: 52,
  logistics: 32,
};

const STEEL_GRADE_MULTIPLIER: Record<string, number> = {
  Q235B: 1.0,
  Q355B: 1.15,
};

const CLADDING_MULTIPLIER: Record<string, { roof: number; wall: number }> = {
  single: { roof: 1.0, wall: 1.0 },
  PIR: { roof: 1.6, wall: 1.6 },
  rockwool: { roof: 1.5, wall: 1.4 },
};

const CRANE_ADDITION: Record<string, number> = {
  none: 0,
  "5T": 3,
  "10T": 5,
  "20T": 8,
  "50T": 12,
};

const CHART_COLORS = [
  { bg: "bg-blue-500", hex: "#3B82F6", label: "Steel Fabrication" },
  { bg: "bg-green-500", hex: "#22C55E", label: "Roof Panels" },
  { bg: "bg-teal-500", hex: "#14B8A6", label: "Wall Panels" },
  { bg: "bg-purple-500", hex: "#A855F7", label: "Ocean Freight" },
  { bg: "bg-orange-500", hex: "#F97316", label: "Installation" },
  { bg: "bg-red-500", hex: "#EF4444", label: "Foundation" },
  { bg: "bg-pink-500", hex: "#EC4899", label: "Doors & Windows" },
];

// Exchange rates to USD (approximate mid-market)
const toUSDRate: Record<string, number> = {
  CNY: 0.137,
  AUD: 0.65,
};

const locationOptions = [
  { value: "usa", label: "USA (USD)" },
  { value: "uk", label: "United Kingdom (USD)" },
  { value: "australia", label: "Australia (AUD)" },
  { value: "nigeria", label: "Nigeria (USD)" },
  { value: "kenya", label: "Kenya (USD)" },
  { value: "south-africa", label: "South Africa (USD)" },
  { value: "philippines", label: "Philippines (USD)" },
  { value: "vietnam", label: "Vietnam (USD)" },
  { value: "thailand", label: "Thailand (USD)" },
  { value: "uae", label: "UAE / Dubai (USD)" },
  { value: "indonesia", label: "Indonesia (USD)" },
  { value: "china", label: "China (¥ CNY)" },
];

// SVG share icons
const ShareIcon = ({ type }: { type: string }) => {
  const cls = "w-5 h-5";
  switch (type) {
    case "whatsapp":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "email":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "copy":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Calculator() {
  const searchParams = useSearchParams();
  const hasTracked = useRef(false);

  const [buildingType, setBuildingType] = useState("warehouse");
  const [length, setLength] = useState(120);
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(12);
  const [crane, setCrane] = useState("none");
  const [location, setLocation] = useState("australia");
  const [steelGrade, setSteelGrade] = useState("Q355B");
  const [claddingType, setCladdingType] = useState("PIR");
  const [mezzanineArea, setMezzanineArea] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [spanType, setSpanType] = useState("clear");
  const [supplyOnly, setSupplyOnly] = useState(false);
  const shareUrlRef = useRef("");

  const [result, setResult] = useState<{
    area: number;
    steelTons: number;
    totalSteelTons: number;
    quantity: number;
    containers: number;
    costSteel: number;
    costRoof: number;
    costWall: number;
    costShipping: number;
    costInstall: number;
    costFoundation: number;
    costDoors: number;
    costMezzanine: number;
    subtotal: number;
    costDesign: number;
    costContingency: number;
    total: number;
    currency: string;
    symbol: string;
    shipDays: number;
    installDays: number;
  } | null>(null);

  const calc = useCallback(() => {
    const L = Number(length) || 0;
    const W = Number(width) || 0;
    const H = Number(height) || 0;
    const Q = Number(quantity) || 1;
    if (L <= 0 || W <= 0 || H <= 0) return;

    const area = L * W;
    const wallArea = 2 * (L + W) * H * 0.85;
    const roofArea = area;

    const spanMultiplier = spanType === "multi" ? 0.88 : 1.0;
    const rate = (STEEL_RATE[buildingType] || 28) + (CRANE_ADDITION[crane] || 0);
    const gradeMultiplier = STEEL_GRADE_MULTIPLIER[steelGrade] || 1.0;
    const claddingMul = CLADDING_MULTIPLIER[claddingType] || CLADDING_MULTIPLIER.PIR;
    const steelTons = (area * rate * gradeMultiplier * spanMultiplier) / 1000;

    const cfg = REGION_PRICES[location] || REGION_PRICES.australia;
    const tonsPerContainer = cfg.tonsPerContainer || 27;
    const totalSteelTons = steelTons * Q;
    const containers = Math.ceil(totalSteelTons / tonsPerContainer);

    const costSteel = totalSteelTons * cfg.steel;
    const costRoof = roofArea * cfg.roof * claddingMul.roof * Q;
    const costWall = wallArea * cfg.wall * claddingMul.wall * Q;
    const costShipping = containers * cfg.shippingPerContainer;
    const costInstall = supplyOnly ? 0 : area * cfg.install * Q;
    const costFoundation = supplyOnly ? 0 : area * cfg.foundation * Q;
    const costDoors = area * cfg.doors * Q;
    const costMezzanine = mezzanineArea > 0 ? mezzanineArea * cfg.steel * 0.35 : 0;

    const subtotal =
      costSteel + costRoof + costWall + costShipping +
      costInstall + costFoundation + costDoors + costMezzanine;

    const costDesign = subtotal * (cfg.design / 100);
    const costContingency = (subtotal + costDesign) * (cfg.contingency / 100);
    const total = subtotal + costDesign + costContingency;

    const installDays = supplyOnly ? 0 : Math.ceil(area / 500) + cfg.installDaysBase;

    setResult({
      area, steelTons, totalSteelTons, quantity: Q, containers,
      costSteel, costRoof, costWall, costShipping,
      costInstall, costFoundation, costDoors, costMezzanine,
      subtotal, costDesign, costContingency, total,
      currency: cfg.currency, symbol: cfg.symbol,
      shipDays: cfg.shipDays, installDays,
    });

    // GA4 event tracking
    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        gtag("event", "calculator_estimate", {
          building_type: buildingType,
          location,
          total_estimate: total,
          currency: cfg.currency,
          area_sqm: area * Q,
        });
      }
    }
  }, [buildingType, length, width, height, crane, location, steelGrade, claddingType, mezzanineArea, quantity, spanType, supplyOnly]);

  // Auto-calculate on mount and when any input changes
  useEffect(() => {
    shareUrlRef.current = "";
    calc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingType, length, width, height, crane, location, steelGrade, claddingType, mezzanineArea, quantity, spanType, supplyOnly]);

  // Read URL parameters on mount
  useEffect(() => {
    const bt = searchParams.get("buildingType");
    const loc = searchParams.get("location");
    const len = searchParams.get("length");
    const wdt = searchParams.get("width");
    const hgt = searchParams.get("height");
    const crn = searchParams.get("crane");

    if (bt && ["warehouse", "factory", "hangar", "logistics"].includes(bt)) setBuildingType(bt);
    if (loc && REGION_PRICES[loc]) setLocation(loc);
    if (len) setLength(Number(len));
    if (wdt) setWidth(Number(wdt));
    if (hgt) setHeight(Number(hgt));
    if (crn) setCrane(crn.toLowerCase());
    const grit = searchParams.get("steelGrade");
    if (grit && ["Q235B", "Q355B"].includes(grit)) setSteelGrade(grit);
    const cladding = searchParams.get("claddingType");
    if (cladding && ["single", "PIR", "rockwool"].includes(cladding)) setCladdingType(cladding);
    const mezz = searchParams.get("mezzanine");
    if (mezz) setMezzanineArea(Number(mezz));
    const qty = searchParams.get("quantity");
    if (qty) setQuantity(Math.max(1, Number(qty)));
    const span = searchParams.get("spanType");
    if (span && ["clear", "multi"].includes(span)) setSpanType(span);
    const onlySupply = searchParams.get("supplyOnly");
    if (onlySupply === "1") setSupplyOnly(true);
  }, [searchParams]);

  const fmt = (n: number, sym: string) => {
    const symbolMap: Record<string, string> = {
      CNY: "¥", AUD: "A$", USD: "$",
    };
    const displaySymbol = symbolMap[sym] || "$";
    if (n >= 1_000_000) return `${displaySymbol}${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${displaySymbol}${Math.round(n / 1_000)}K`;
    return `${displaySymbol}${Math.round(n)}`;
  };

  // Share helpers
  const buildingTypeLabel: Record<string, string> = {
    warehouse: "Warehouse/Logistics",
    factory: "Factory (with crane)",
    hangar: "Aircraft Hangar",
    logistics: "Logistics Center",
  };

  const locationLabel: Record<string, string> = {
    australia: "Australia", china: "China", nigeria: "Nigeria",
    philippines: "Philippines", vietnam: "Vietnam", thailand: "Thailand",
    uae: "UAE/Dubai", indonesia: "Indonesia",
    usa: "USA", uk: "United Kingdom", kenya: "Kenya", "south-africa": "South Africa",
  };

  const getShareUrl = () => {
    if (shareUrlRef.current) return shareUrlRef.current;
    const params = new URLSearchParams({
      buildingType, location,
      length: String(length), width: String(width), height: String(height),
      crane, steelGrade, claddingType,
      mezzanine: String(mezzanineArea), quantity: String(quantity),
      spanType, supplyOnly: supplyOnly ? "1" : "0",
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    shareUrlRef.current = url;
    return url;
  };

  const [copied, setCopied] = useState(false);

  const copyShareLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTo = (channel: string) => {
    const url = getShareUrl();
    const bl = buildingTypeLabel[buildingType] || buildingType;
    const ll = locationLabel[location] || location;
    const text = `Steel Structure Estimate - ${bl} in ${ll}: ${length}×${width}×${height}m`;

    const links: Record<string, string> = {
      whatsapp: `https://wa.me/8616650735555?text=${encodeURIComponent(text + " " + url)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`Project Details:%0A- Building: ${bl}%0A- Location: ${ll}%0A- Dimensions: ${length}m × ${width}m × ${height}m%0A- Steel Grade: ${steelGrade}%0A- Cladding: ${claddingType}%0A%0AView full estimate: ${url}`)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Get an instant steel structure cost estimate")}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
    };
    window.open(links[channel] || links.whatsapp, "_blank");
  };

  // Build donut chart data
  const chartItems = result
    ? [
        { label: "Steel Fabrication", value: result.costSteel, color: CHART_COLORS[0].hex },
        { label: "Roof Panels", value: result.costRoof, color: CHART_COLORS[1].hex },
        { label: "Wall Panels", value: result.costWall, color: CHART_COLORS[2].hex },
        { label: "Ocean Freight", value: result.costShipping, color: CHART_COLORS[3].hex },
        { label: "Installation Labor", value: result.costInstall, color: CHART_COLORS[4].hex },
        { label: "Foundation Work", value: result.costFoundation, color: CHART_COLORS[5].hex },
        { label: "Doors & Windows", value: result.costDoors, color: CHART_COLORS[6].hex },
      ].filter((i) => i.value > 0)
    : [];

  const chartTotal = chartItems.reduce((s, i) => s + i.value, 0);

  // Build conic-gradient string
  const conicGradient = chartItems.length > 0
    ? (() => {
        let cumulative = 0;
        const stops = chartItems.map((item) => {
          const pct = (item.value / chartTotal) * 100;
          const start = cumulative;
          cumulative += pct;
          return `${item.color} ${start}% ${cumulative}%`;
        });
        return `conic-gradient(${stops.join(", ")})`;
      })()
    : "conic-gradient(#e5e7eb 0% 100%)";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Input Panel */}
      <div className="p-6 lg:p-8 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-steel">Project Parameters</h3>
          <span className="text-xs text-gray-400 bg-white px-2.5 py-1 rounded-full border border-gray-200">
            Prices updated {PRICE_UPDATE}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Building Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Building Type</label>
            <select
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="warehouse">Warehouse / Logistics</option>
              <option value="factory">Factory (with crane)</option>
              <option value="hangar">Aircraft Hangar (large-span)</option>
              <option value="logistics">Logistics Center (mezzanine)</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {locationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length (m) <span className="text-gray-400 font-normal">10–200</span>
            </label>
            <input
              type="number"
              min={10}
              max={200}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width (m) <span className="text-gray-400 font-normal">10–150</span>
            </label>
            <input
              type="number"
              min={10}
              max={150}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eave Height (m) <span className="text-gray-400 font-normal">6–20</span>
            </label>
            <input
              type="number"
              min={6}
              max={20}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Crane */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Overhead Crane</label>
            <select
              value={crane}
              onChange={(e) => setCrane(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="none">None</option>
              <option value="5T">5 Ton</option>
              <option value="10T">10 Ton</option>
              <option value="20T">20 Ton</option>
              <option value="50T">50 Ton</option>
            </select>
          </div>

          {/* Steel Grade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Steel Grade</label>
            <select
              value={steelGrade}
              onChange={(e) => setSteelGrade(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Q235B">Q235B (Standard)</option>
              <option value="Q355B">Q355B (High-strength, +15%)</option>
            </select>
          </div>

          {/* Cladding Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Roof & Wall Cladding</label>
            <select
              value={claddingType}
              onChange={(e) => setCladdingType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="single">Single Skin (economy)</option>
              <option value="PIR">PIR Sandwich Panel (insulated)</option>
              <option value="rockwool">Rock Wool Sandwich (fire-rated)</option>
            </select>
          </div>

          {/* Mezzanine Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mezzanine / Office (m²) <span className="text-gray-400 font-normal">optional</span>
            </label>
            <input
              type="number"
              min={0}
              max={5000}
              value={mezzanineArea}
              onChange={(e) => setMezzanineArea(Number(e.target.value))}
              placeholder="e.g. 600"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity <span className="text-gray-400 font-normal">1–50</span>
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Span Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Span Configuration</label>
            <select
              value={spanType}
              onChange={(e) => setSpanType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="clear">Clear Span (no interior columns)</option>
              <option value="multi">Multi-Span (saves ~12% steel)</option>
            </select>
          </div>

          {/* Supply Only Toggle */}
          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setSupplyOnly(!supplyOnly)}
                className={`relative w-12 h-6 rounded-full transition-colors ${supplyOnly ? 'bg-steel' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${supplyOnly ? 'translate-x-6' : ''}`} />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Supply Only (FOB)</span>
                <p className="text-xs text-gray-400">Exclude installation & foundation</p>
              </div>
            </label>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-400 text-center">
          Estimate updates automatically as you type &mdash; no button needed
        </p>
      </div>

      {/* Result Panel */}
      {result && (
        <div className="p-6 lg:p-8">
          <h3 className="text-xl font-bold text-steel mb-6">Your Estimate</h3>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-500 mb-1">Total Estimated Price</div>
              <div className="text-2xl font-bold text-steel">
                {fmt(result.total, result.symbol)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {fmt(Math.round(result.total / (result.area * result.quantity)), result.symbol)}/m²
                {result.currency !== "USD" && (
                  <span className="text-gray-400 ml-1">
                    (~${Math.round(result.total * (toUSDRate[result.currency] || 0.14) / (result.area * result.quantity))}/m² USD)
                  </span>
                )}
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-500 mb-1">Steel Quantity</div>
              <div className="text-2xl font-bold text-green-700">
                {Math.round(result.totalSteelTons)} t
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {result.quantity > 1 ? `${Math.round(result.steelTons)}t/building × ${result.quantity}` : ""}
                {" "}≈ {result.containers} × 40HQ containers
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-500 mb-1">Estimated Lead Time</div>
              <div className="text-2xl font-bold text-amber-700">
                {supplyOnly ? `${result.shipDays} days` : `${result.shipDays + result.installDays} days`}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {supplyOnly
                  ? `${result.shipDays}d shipping (FOB)`
                  : `${result.shipDays}d shipping + ${result.installDays}d install`}
              </div>
            </div>
          </div>

          {/* Cost Breakdown — Donut Chart + List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Donut Chart */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-48 h-48">
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: conicGradient }}
                />
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Total</div>
                    <div className="text-lg font-bold text-steel">
                      {fmt(result.total, result.symbol)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend + Bar List */}
            <div className="space-y-2">
              {chartItems.map((item) => {
                const pct = ((item.value / chartTotal) * 100).toFixed(1);
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600 flex-1 truncate">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                      {fmt(item.value, result.symbol)}
                    </span>
                    <span className="text-xs text-gray-400 w-10 text-right">{pct}%</span>
                    <div className="w-16 bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(item.value / Math.max(...chartItems.map((i) => i.value))) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Design & Contingency */}
              <div className="pt-3 mt-3 border-t border-gray-200 space-y-1">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Design & Engineering (5%)</span>
                  <span>{fmt(result.costDesign, result.symbol)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Contingency Buffer (8%)</span>
                  <span>{fmt(result.costContingency, result.symbol)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-300 flex justify-between font-bold text-base">
                <span>Total Estimate</span>
                <span>{fmt(result.total, result.symbol)}</span>
              </div>
            </div>
          </div>

          {/* Clear Span vs Multi-Span note */}
          {spanType === "clear" && (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
              💡 <strong>Tip:</strong> Switching to <strong>Multi-Span</strong> configuration could save approximately{" "}
              <strong>{fmt(Math.round(result.costSteel * 0.12), result.symbol)}</strong> on steel cost.
            </div>
          )}

          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <strong>Disclaimer:</strong> This is a preliminary estimate (±15–20% accuracy).
            Prices current as of {PRICE_UPDATE}. Actual price depends on final design,
            steel market fluctuation, and site conditions. Contact our engineering team for
            a detailed quotation.
          </div>

          {/* Share Buttons */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">Share This Estimate</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: "whatsapp", label: "WhatsApp", color: "border-green-600 text-green-600 hover:bg-green-600" },
                { key: "email", label: "Email", color: "border-gray-600 text-gray-600 hover:bg-gray-600" },
                { key: "twitter", label: "Twitter", color: "border-blue-400 text-blue-400 hover:bg-blue-400" },
                { key: "linkedin", label: "LinkedIn", color: "border-blue-700 text-blue-700 hover:bg-blue-700" },
                { key: "facebook", label: "Facebook", color: "border-blue-900 text-blue-900 hover:bg-blue-900" },
                { key: "copy", label: copied ? "Copied!" : "Copy Link", color: "border-steel text-steel hover:bg-steel" },
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => btn.key === "copy" ? copyShareLink() : shareTo(btn.key)}
                  className={`flex items-center justify-center gap-2 py-3 px-4 border-2 rounded-lg font-semibold transition ${btn.color} hover:text-white`}
                >
                  <ShareIcon type={btn.key} />
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <a
            href="/contact"
            className="mt-6 block w-full text-center bg-steel text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-900 transition"
          >
            Get Detailed Quote with Engineering →
          </a>
        </div>
      )}
    </div>
  );
}
