"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

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
    install: 95,
    foundation: 68,
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
    shippingPerContainer: 3500,
    install: 320,
    foundation: 220,
    doors: 6,
    design: 3,
    contingency: 5,
    currency: "CNY",
    symbol: "¥",
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
};

const STEEL_RATE: Record<string, number> = {
  warehouse: 28,
  factory: 38,
  hangar: 52,
  logistics: 32,
};

const CRANE_ADDITION: Record<string, number> = {
  none: 0,
  "5T": 3,
  "10T": 5,
  "20T": 8,
  "50T": 12,
};

export default function Calculator() {
  const searchParams = useSearchParams();

  const [buildingType, setBuildingType] = useState("warehouse");
  const [length, setLength] = useState(120);
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(12);
  const [crane, setCrane] = useState("none");
  const [location, setLocation] = useState("australia");
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const [result, setResult] = useState<{
    area: number;
    steelTons: number;
    containers: number;
    costSteel: number;
    costRoof: number;
    costWall: number;
    costShipping: number;
    costInstall: number;
    costFoundation: number;
    costDoors: number;
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
    if (L <= 0 || W <= 0 || H <= 0) return;

    const area = L * W;
    const wallArea = 2 * (L + W) * H * 0.85; // 15% doors/windows deduction
    const roofArea = area;

    const rate = (STEEL_RATE[buildingType] || 28) + (CRANE_ADDITION[crane] || 0);
    const steelTons = (area * rate) / 1000;

    const cfg = REGION_PRICES[location] || REGION_PRICES.australia;
    const tonsPerContainer = cfg.tonsPerContainer || 27;
    const containers = Math.ceil(steelTons / tonsPerContainer);

    const costSteel = steelTons * cfg.steel;
    const costRoof = roofArea * cfg.roof;
    const costWall = wallArea * cfg.wall;
    const costShipping = containers * cfg.shippingPerContainer;
    const costInstall = area * cfg.install;
    const costFoundation = area * cfg.foundation;
    const costDoors = area * (cfg.doors / 100);

    const subtotal =
      costSteel +
      costRoof +
      costWall +
      costShipping +
      costInstall +
      costFoundation +
      costDoors;

    const costDesign = subtotal * (cfg.design / 100);
    const costContingency = (subtotal + costDesign) * (cfg.contingency / 100);
    const total = subtotal + costDesign + costContingency;

    const installDays = Math.ceil(area / 500) * 7 + cfg.installDaysBase;

    setResult({
      area,
      steelTons,
      containers,
      costSteel,
      costRoof,
      costWall,
      costShipping,
      costInstall,
      costFoundation,
      costDoors,
      subtotal,
      costDesign,
      costContingency,
      total,
      currency: cfg.currency,
      symbol: cfg.symbol,
      shipDays: cfg.shipDays,
      installDays,
    });
  }, [buildingType, length, width, height, crane, location]);

  // Auto-calculate on mount
  useEffect(() => { calc(); }, [calc]);

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
    if (crn) setCrane(crn.toUpperCase());
  }, [searchParams]);

  const fmt = (n: number, sym: string) => {
    const symbolMap: Record<string, string> = {
      CNY: "¥",
      AUD: "A$",
      USD: "$",
    };
    const displaySymbol = symbolMap[sym] || "$";
    if (n >= 1_000_000) return `${displaySymbol}${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${displaySymbol}${Math.round(n / 1_000)}K`;
    return `${displaySymbol}${Math.round(n)}`;
  };

  // Generate share URL
  const generateShareUrl = () => {
    const params = new URLSearchParams({
      buildingType,
      location,
      length: String(length),
      width: String(width),
      height: String(height),
      crane: crane.toUpperCase(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Social media share functions
  const shareToWhatsApp = () => {
    const params = new URLSearchParams({
      buildingType,
      location,
      length: String(length),
      width: String(width),
      height: String(height),
      crane: crane.toUpperCase(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    const buildingTypeLabel = {
      warehouse: "Warehouse/Logistics",
      factory: "Factory (with crane)",
      hangar: "Aircraft Hangar",
      logistics: "Logistics Center",
    }[buildingType] || buildingType;
    const locationLabel = {
      australia: "Australia",
      china: "China",
      nigeria: "Nigeria",
      philippines: "Philippines",
      vietnam: "Vietnam",
      thailand: "Thailand",
      uae: "UAE/Dubai",
      indonesia: "Indonesia",
    }[location] || location;
    const text = `Steel Structure Cost Estimate:%0A%0A• Building: ${buildingTypeLabel}%0A• Location: ${locationLabel}%0A• Size: ${length}×${width}×${height}m%0A• Crane: ${crane.toUpperCase()}%0A%0AGet your estimate: ${url}`;
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareToEmail = () => {
    const params = new URLSearchParams({
      buildingType,
      location,
      length: String(length),
      width: String(width),
      height: String(height),
      crane: crane.toUpperCase(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    const buildingTypeLabel = {
      warehouse: "Warehouse/Logistics",
      factory: "Factory (with crane)",
      hangar: "Aircraft Hangar",
      logistics: "Logistics Center",
    }[buildingType] || buildingType;
    const locationLabel = {
      australia: "Australia",
      china: "China",
      nigeria: "Nigeria",
      philippines: "Philippines",
      vietnam: "Vietnam",
      thailand: "Thailand",
      uae: "UAE/Dubai",
      indonesia: "Indonesia",
    }[location] || location;
    const subject = `Steel Structure Cost Estimate - ${buildingTypeLabel} in ${locationLabel}`;
    const body = `Hello,%0A%0AI calculated a steel structure cost estimate and wanted to share it with you.%0A%0AProject Details:%0A- Building Type: ${buildingTypeLabel}%0A- Location: ${locationLabel}%0A- Dimensions: ${length}m × ${width}m × ${height}m%0A- Overhead Crane: ${crane.toUpperCase()}%0A%0AView the full estimate: ${url}%0A%0ABest regards`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const shareToTwitter = () => {
    const params = new URLSearchParams({
      buildingType,
      location,
      length: String(length),
      width: String(width),
      height: String(height),
      crane: crane.toUpperCase(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    const text = `Get an instant steel structure cost estimate for your project. Free online calculator with regional pricing.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
  };

  const shareToLinkedIn = () => {
    const params = new URLSearchParams({
      buildingType,
      location,
      length: String(length),
      width: String(width),
      height: String(height),
      crane: crane.toUpperCase(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
  };

  const shareToFacebook = () => {
    const params = new URLSearchParams({
      buildingType,
      location,
      length: String(length),
      width: String(width),
      height: String(height),
      crane: crane.toUpperCase(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  };

  const pct = result
    ? [
        result.costSteel,
        result.costRoof,
        result.costWall,
        result.costShipping,
        result.costInstall,
        result.costFoundation,
        result.costDoors,
      ]
    : [];

  const maxPct = pct.length > 0 ? Math.max(...pct) : 1;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Input Panel */}
      <div className="p-6 lg:p-8 bg-gray-50 border-b border-gray-200">
        <h3 className="text-xl font-bold text-steel mb-6">Project Parameters</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Building Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Building Type
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="australia">Australia (AUD)</option>
              <option value="china">China (¥ CNY)</option>
              <option value="nigeria">Nigeria (USD)</option>
              <option value="philippines">Philippines (USD)</option>
              <option value="vietnam">Vietnam (USD)</option>
              <option value="thailand">Thailand (USD)</option>
              <option value="uae">UAE / Dubai (USD)</option>
              <option value="indonesia">Indonesia (USD)</option>
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length (m)
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
              Width (m)
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
              Eave Height (m)
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overhead Crane (optional)
            </label>
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
        </div>

        <button
          onClick={calc}
          className="mt-6 w-full bg-steel text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-900 transition"
        >
          Calculate Estimate →
        </button>
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
                {fmt(Math.round(result.total / result.area), result.symbol)}/m²
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-500 mb-1">Steel Quantity</div>
              <div className="text-2xl font-bold text-green-700">
                {Math.round(result.steelTons)} t
              </div>
              <div className="text-xs text-gray-500 mt-1">
                ≈ {result.containers} × 40HQ containers
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-500 mb-1">Estimated Lead Time</div>
              <div className="text-2xl font-bold text-amber-700">
                {result.shipDays + result.installDays} days
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {result.shipDays}d shipping + {result.installDays}d install
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <h4 className="font-semibold text-steel mb-4">Cost Breakdown</h4>
          <div className="space-y-3">
            {[
              { label: "Steel Fabrication", value: result.costSteel, color: "bg-blue-500" },
              { label: "Roof Panels (sandwich)", value: result.costRoof, color: "bg-green-500" },
              { label: "Wall Panels (sandwich)", value: result.costWall, color: "bg-teal-500" },
              { label: `Ocean Freight (${result.containers} containers)`, value: result.costShipping, color: "bg-purple-500" },
              { label: "Installation Labor", value: result.costInstall, color: "bg-orange-500" },
              { label: "Foundation Work", value: result.costFoundation, color: "bg-red-500" },
              { label: "Doors & Windows (est.)", value: result.costDoors, color: "bg-pink-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-semibold">
                    {fmt(item.value, result.symbol)}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${Math.max(5, (item.value / maxPct) * 100)}%` }}
                  />
                </div>
              </div>
            ))}

            {/* Design & Contingency */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-1 text-gray-600">
                <span>
                  Design & Engineering ({REGION_PRICES[location].design}%)
                </span>
                <span>{fmt(result.costDesign, result.symbol)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1 text-gray-600">
                <span>
                  Contingency Buffer ({REGION_PRICES[location].contingency}%)
                </span>
                <span>{fmt(result.costContingency, result.symbol)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-300 flex justify-between font-bold">
              <span>Total</span>
              <span>{fmt(result.total, result.symbol)}</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <strong>Disclaimer:</strong> This is a preliminary estimate (±15–20% accuracy).
            Actual price depends on final design, steel market fluctuation, and site
            conditions. Contact our engineering team for a detailed quotation.
          </div>

          {/* Share Buttons */}
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-700 mb-3">Share This Estimate</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                onClick={shareToWhatsApp}
                className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
              >
                <span>💬</span> WhatsApp
              </button>
              <button
                onClick={shareToEmail}
                className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-600 text-gray-600 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition"
              >
                <span>📧</span> Email
              </button>
              <button
                onClick={shareToTwitter}
                className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition"
              >
                <span>🐦</span> Twitter
              </button>
              <button
                onClick={shareToLinkedIn}
                className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-700 text-blue-700 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition"
              >
                <span>💼</span> LinkedIn
              </button>
              <button
                onClick={shareToFacebook}
                className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition"
              >
                <span>👥</span> Facebook
              </button>
              <button
                onClick={generateShareUrl}
                className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-steel text-steel rounded-lg font-semibold hover:bg-steel hover:text-white transition"
              >
                {copied ? "✓ Copied!" : "📋 Copy Link"}
              </button>
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
