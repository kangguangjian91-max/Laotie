"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface InlineQuoteFormProps {
  productName: string;
  productSlug: string;
}

export default function InlineQuoteForm({ productName, productSlug }: InlineQuoteFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate API call — in production, this would POST to your backend
    // For now, we'll open WhatsApp with pre-filled message
    const waMessage = `Hi, I'm interested in ${productName}.%0A%0AName: ${form.name}%0AEmail: ${form.email}%0AWhatsApp: ${form.whatsapp}%0A%0AMessage: ${form.message || "Please send me a quote."}%0A%0AProduct: ${productSlug}`;
    const waUrl = `https://wa.me/8616650735555?text=${waMessage}`;
    
    // Track the form submission
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "form_submit", {
        event_category: "contact",
        event_label: `product_page_${productSlug}`,
        form_type: "inline_quote",
        product_name: productName,
      });
    }

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank");
    
    setStatus("success");
    setTimeout(() => {
      setForm({ name: "", email: "", whatsapp: "", message: "" });
      setStatus("idle");
    }, 3000);
  };

  const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-steel-accent focus:border-steel-accent outline-none transition bg-white";
  const labelCls = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <div className="bg-gradient-to-br from-steel to-steel-light rounded-2xl p-6 text-white">
      <h3 className="text-lg font-bold mb-2">Get a Free Quote for {productName}</h3>
      <p className="text-gray-300 text-sm mb-5">
        Fill in your details. Our team will respond within 24 hours.
      </p>

      {status === "success" ? (
        <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-green-300 text-sm font-medium">Request sent! We'll contact you shortly.</p>
          <p className="text-gray-400 text-xs mt-1">Or chat with us directly on WhatsApp.</p>
        </div>
      ) : status === "error" ? (
        <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-300 text-sm">Something went wrong. Please try again.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className={labelCls}>Name *</label>
            <input
              type="text"
              required
              className={inputCls}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={labelCls}>Email *</label>
            <input
              type="email"
              required
              className={inputCls}
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className={labelCls}>WhatsApp Number</label>
            <input
              type="tel"
              className={inputCls}
              value={form.whatsapp}
              onChange={e => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="+86 123 4567 8901"
            />
          </div>
          <div>
            <label className={labelCls}>Project Details</label>
            <textarea
              className={inputCls}
              rows={3}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder={`Building size, quantity, location...`}
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 text-white font-bold rounded-lg transition shadow-lg disabled:opacity-50"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Request
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-4 pt-3 border-t border-white/10 text-center">
        <a
          href={`https://wa.me/8616650735555?text=Hi, I'm interested in ${productName}. Please send me a quote.`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-white transition"
        >
          Or chat with us on WhatsApp →
        </a>
      </div>
    </div>
  );
}
