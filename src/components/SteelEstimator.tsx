"use client";

import { useState, useEffect, useCallback } from "react";
import { Ruler, ChevronDown, ChevronUp, Zap, Calculator, Info } from "lucide-react";
import Link from "next/link";
import * as engine from "@/lib/steel-engine";

const PRICES = {
  mainSteel: 5100,    // RMB/t - welded H-section
  purlin: 4500,       // RMB/t - C/Z purlins
  secondary: 5200,    // RMB/t - tie rods, bracing etc
  galvanized: 1200,   // +RMB/t surcharge
  cladding: 23,       // RMB/m² - base color steel sheet
};

const PRESETS = [
  { label: "10×20×6m", length: 20000, width: 10000, height: 6000 },
  { label: "15×30×8m", length: 30000, width: 15000, height: 8000 },
  { label: "20×40×8m", length: 40000, width: 20000, height: 8000 },
];

interface Params {
  length: number;
  width: number;
  height: number;
  hasMiddleColumn: boolean;
  hasMezzanine: boolean;
  mezzRatio: number;
  mezzUse: "storage" | "office";
  hasMezzanine2: boolean;
  mezz2Ratio: number;
  mezz2Use: "storage" | "office";
  isTapered: boolean;
  columnSpacing: number;
  roofPurlinSpacing: number;
  wallPurlinSpacing: number;
  hasParapet: boolean;
  parapetHeight: number;
  windowScheme: "horizontal" | "vertical";
  winWidth: number;
  winHeight: number;
  count: number;
  mezzColSpacing: number;
  isGalvanized: boolean;
}

const defaultParams: Params = {
  length: 30000, width: 15000, height: 8000,
  hasMiddleColumn: false, hasMezzanine: false,
  mezzRatio: 30, mezzUse: "storage",
  hasMezzanine2: false, mezz2Ratio: 0, mezz2Use: "storage",
  isTapered: true, columnSpacing: 6000,
  roofPurlinSpacing: 1500, wallPurlinSpacing: 1500,
  hasParapet: true, parapetHeight: 1200,
  windowScheme: "horizontal",
  winWidth: 3000, winHeight: 2000, count: 8,
  mezzColSpacing: 6000, isGalvanized: false,
};

function fmtWt(kg: number): string {
  if (kg >= 1000) return (kg / 1000).toFixed(2) + " t";
  return kg.toFixed(0) + " kg";
}

function fmtRMB(n: number): string {
  if (n >= 10000) return "¥" + (n / 10000).toFixed(1) + "万";
  return "¥" + n.toLocaleString("zh-CN");
}

export default function SteelEstimator() {
  const [p, setP] = useState<Params>(defaultParams);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const update = useCallback((key: keyof Params, value: any) => {
    setP((prev) => ({ ...prev, [key]: value }));
  }, []);

  const selectPreset = useCallback((preset: typeof PRESETS[0]) => {
    setP((prev) => ({ ...prev, length: preset.length, width: preset.width, height: preset.height }));
  }, []);

  // Recalculate on any param change
  useEffect(() => {
    try {
      setError("");
      const params = {
        ...p,
        length: p.length, width: p.width, height: p.height,
      };
      const r = engine.calculateAll(params);
      setResult(r);
    } catch (e: any) {
      setError(e.message || "Calculation error");
    }
  }, [p]);

  // Price calculation
  const priceData = result ? (() => {
    const mainWt = result.totalSteel / 1000 || 0;
    const steelPrice = PRICES.mainSteel + (p.isGalvanized ? PRICES.galvanized : 0);
    const mainPrice = mainWt * steelPrice;
    const enclosureArea = (result.maintenance?.[0]?.area || 0) + (result.maintenance?.[1]?.area || 0);
    const enclosurePrice = enclosureArea * PRICES.cladding;
    const totalPrice = mainPrice + enclosurePrice;
    return { mainWt, steelPrice, mainPrice, enclosureArea, enclosurePrice, totalPrice };
  })() : null;

  const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-steel-accent focus:border-steel-accent outline-none transition";
  const labelCls = "block text-xs font-medium text-gray-600 mb-1";
  const selectCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-steel-accent focus:border-steel-accent outline-none transition";

  return (
    <div className="max-w-5xl mx-auto">
      {/* Dimensions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-steel">Building Dimensions</h3>
          <div className="flex gap-2">
            {PRESETS.map((preset) => (
              <button key={preset.label} onClick={() => selectPreset(preset)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 hover:border-steel-accent hover:bg-steel-muted transition">
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelCls}>Length (m) <span className="text-gray-400">8–200</span></label>
            <input type="number" className={inputCls} value={p.length / 1000} onChange={e => update("length", Number(e.target.value) * 1000)} min={8} max={200} step={0.1} />
          </div>
          <div>
            <label className={labelCls}>Width / Span (m) <span className="text-gray-400">6–30</span></label>
            <input type="number" className={inputCls} value={p.width / 1000} onChange={e => update("width", Number(e.target.value) * 1000)} min={6} max={30} step={0.1} />
          </div>
          <div>
            <label className={labelCls}>Eave Height (m) <span className="text-gray-400">3–12</span></label>
            <input type="number" className={inputCls} value={p.height / 1000} onChange={e => update("height", Number(e.target.value) * 1000)} min={3} max={12} step={0.1} />
          </div>
        </div>

        {/* Structure type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Structure Type</label>
            <select className={selectCls} value={p.hasMiddleColumn ? "double" : "single"} onChange={e => {
              update("hasMiddleColumn", e.target.value === "double");
            }}>
              <option value="single">Single Span (no center columns)</option>
              <option value="double">Double Span (with center columns)</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Mezzanine</label>
            <select className={selectCls} value={p.hasMezzanine ? "yes" : "no"} onChange={e => {
              update("hasMezzanine", e.target.value === "yes");
              if (e.target.value === "no") { update("hasMezzanine2", false); }
            }}>
              <option value="no">None</option>
              <option value="yes">Single Mezzanine</option>
            </select>
          </div>
        </div>

        {/* Mezzanine settings */}
        {p.hasMezzanine && (
          <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-steel-muted rounded-xl">
            <div>
              <label className={labelCls}>Mezzanine Ratio (%)</label>
              <input type="number" className={inputCls} value={p.mezzRatio} onChange={e => update("mezzRatio", Number(e.target.value))} min={10} max={100} />
            </div>
            <div>
              <label className={labelCls}>Usage</label>
              <select className={selectCls} value={p.mezzUse} onChange={e => update("mezzUse", e.target.value)}>
                <option value="storage">Storage (5 kN/m²)</option>
                <option value="office">Office (3 kN/m²)</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>2nd Mezzanine</label>
              <select className={selectCls} value={p.hasMezzanine2 ? "yes" : "no"} onChange={e => update("hasMezzanine2", e.target.value === "yes")}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
        )}

        {/* Advanced params toggle */}
        <button onClick={() => setShowAdvanced(!showAdvanced)}
          className="mt-4 flex items-center gap-1 text-sm text-steel-accent hover:text-steel transition">
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Advanced Parameters
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div>
              <label className={labelCls}>Column Spacing (m) <span className="text-gray-400">4.5–9</span></label>
              <select className={selectCls} value={p.columnSpacing} onChange={e => update("columnSpacing", Number(e.target.value))}>
                <option value={4500}>4.5m (dense)</option>
                <option value={6000}>6.0m (standard, recommended)</option>
                <option value={7500}>7.5m (economical)</option>
                <option value={9000}>9.0m (wide)</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Section Type</label>
              <select className={selectCls} value={p.isTapered ? "tapered" : "uniform"} onChange={e => update("isTapered", e.target.value === "tapered")}>
                <option value="tapered">Tapered (recommended)</option>
                <option value="uniform">Uniform</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Galvanized?</label>
              <select className={selectCls} value={p.isGalvanized ? "yes" : "no"} onChange={e => update("isGalvanized", e.target.value === "yes")}>
                <option value="no">Standard (primed)</option>
                <option value="yes">Hot-Dip Galvanized (+¥1,200/t)</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Roof Purlin Spacing (mm)</label>
              <select className={selectCls} value={p.roofPurlinSpacing} onChange={e => update("roofPurlinSpacing", Number(e.target.value))}>
                <option value={1200}>1,200mm</option>
                <option value={1500}>1,500mm (recommended)</option>
                <option value={1800}>1,800mm</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Wall Purlin Spacing (mm)</label>
              <select className={selectCls} value={p.wallPurlinSpacing} onChange={e => update("wallPurlinSpacing", Number(e.target.value))}>
                <option value={1200}>1,200mm</option>
                <option value={1500}>1,500mm (recommended)</option>
                <option value={1800}>1,800mm</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">{error}</div>
      )}

      {result && (
        <>
          {/* Weight & Size Summary */}
          <div className="bg-gradient-to-r from-steel to-steel-light rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-steel-accent" />
              <h3 className="text-lg font-bold">Calculation Result</h3>
            </div>
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-xs text-gray-300 mb-1">Building Size</div>
                <div className="text-lg font-bold">{p.length / 1000}×{p.width / 1000}×{p.height / 1000} m</div>
              </div>
              <div>
                <div className="text-xs text-gray-300 mb-1">Primary Steel</div>
                <div className="text-lg font-bold text-steel-accent">{fmtWt(result.totalSteel)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-300 mb-1">Roof Purlins</div>
                <div className="text-lg font-bold text-steel-accent">{fmtWt(result.roofPurlin.weight)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-300 mb-1">Wall Purlins</div>
                <div className="text-lg font-bold text-steel-accent">{fmtWt(result.wallPurlin.weight)}</div>
              </div>
            </div>
          </div>

          {/* Price Estimate */}
          {priceData && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold text-green-800">Estimated Price (FOB Qingdao, RMB)</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Steel Structure ({fmtWt(priceData.mainWt * 1000)} × ¥{priceData.steelPrice}/t)</div>
                  <div className="text-2xl font-bold text-steel">{fmtRMB(priceData.mainPrice)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Enclosure ({priceData.enclosureArea.toFixed(0)} m² × ¥{PRICES.cladding}/m²)</div>
                  <div className="text-2xl font-bold text-steel">{fmtRMB(priceData.enclosurePrice)}</div>
                </div>
              </div>
              <div className="border-t border-green-200 pt-3 flex items-center justify-between">
                <span className="font-bold text-green-900">Estimated Total</span>
                <span className="text-3xl font-bold text-green-700">{fmtRMB(priceData.totalPrice)}</span>
              </div>
              <div className="flex items-start gap-2 mt-3 text-xs text-green-600">
                <Info className="w-3 h-3 mt-0.5 shrink-0" />
                <span>This is an automated estimate based on structural tonnage + standard enclosure. Final quotation may vary after engineering review. Excludes shipping and import duties.</span>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-steel mb-4">Material Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-medium text-gray-500">Component</th>
                    <th className="text-right py-2 px-3 font-medium text-gray-500">Specification</th>
                    <th className="text-right py-2 px-3 font-medium text-gray-500">Weight</th>
                    <th className="text-right py-2 px-3 font-medium text-gray-500 w-24">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {(result.breakdown || []).map((item: any, i: number) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-steel-muted/50 transition">
                      <td className="py-2.5 px-3 font-medium text-steel">{item.item}</td>
                      <td className="py-2.5 px-3 text-right text-gray-500 text-xs">{item.spec}</td>
                      <td className="py-2.5 px-3 text-right text-steel font-medium">{fmtWt(item.weight || 0)}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5">
                            <div className="bg-steel-accent h-1.5 rounded-full" style={{ width: `${(item.ratio || 0) * 100}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-10">{((item.ratio || 0) * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enclosure */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-steel mb-4">Enclosure Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              {(result.maintenance || []).map((item: any, i: number) => (
                <div key={i} className="p-4 bg-steel-muted rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">{item.item}</div>
                  <div className="text-sm font-medium text-steel">{item.spec}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.area ? `${item.area.toFixed(0)} m²` : ""}
                    {item.length ? `${item.length.toFixed(0)} m` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* CTA */}
      {result && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-cta to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Ready for an Accurate Quote?</h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm">
              Our engineers will review your dimensions and provide a firm quotation within 24 hours.
              Includes structural calculations, shop drawings, and shipping estimate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-steel font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
                <Ruler className="w-4 h-4 mr-2" />
                Get Free Quotation
              </Link>
              <a href="https://wa.me/8616650735555" target="_blank" rel="noopener"
                className="inline-flex items-center px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition shadow-lg">
                WhatsApp: +86 166 5073 5555
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
