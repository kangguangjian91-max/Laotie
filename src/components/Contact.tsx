"use client";

import { useState, FormEvent } from "react";
import { trackFormSubmit, trackWhatsAppClick, trackEmailClick, trackOutboundLink } from "@/lib/gtag";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "kangguangjian91@gmail.com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = "Email or WhatsApp is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
      if (!emailRegex.test(formData.contact) && !phoneRegex.test(formData.contact.replace(/[\s\-\(\)]/g, ""))) {
        newErrors.contact = "Please enter a valid email or WhatsApp number";
      }
    }
    
    if (formData.message && formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Track form submission
    trackFormSubmit("contact", true);
    
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section id="contact" className="py-20 bg-steel relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-steel-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cta/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-badge animate-pulse-dot" />
            <p className="text-steel-accent font-semibold text-xs tracking-wider uppercase">
              Start Your Project
            </p>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Get a Free Quote</h2>
          <p className="text-gray-300 text-lg">
            Tell us about your project requirements and we&apos;ll respond within 2 hours
          </p>
        </div>

        <form
          action={`https://formsubmit.co/${CONTACT_EMAIL}`}
          method="POST"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact inquiry form"
          className="max-w-2xl mx-auto grid sm:grid-cols-3 gap-4"
        >
          <input type="hidden" name="_subject" value="Quick Inquiry — Laotie Steel Website" />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_next" value="https://www.laotie-steel.com/thank-you" />
          <div>
            <label htmlFor="contact-name" className="sr-only">Your Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your Name *"
              required
              aria-required="true"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`px-5 py-3.5 rounded-xl bg-white/[0.07] backdrop-blur border ${
                errors.name ? "border-red-500" : "border-white/[0.12] focus:border-steel-accent"
              } text-white placeholder:text-gray-400 focus:outline-none focus:bg-white/[0.1] text-sm transition-all w-full`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">Email or WhatsApp</label>
            <input
              id="contact-email"
              type="text"
              name="contact"
              placeholder="Email / WhatsApp *"
              required
              aria-required="true"
              value={formData.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              className={`px-5 py-3.5 rounded-xl bg-white/[0.07] backdrop-blur border ${
                errors.contact ? "border-red-500" : "border-white/[0.12] focus:border-steel-accent"
              } text-white placeholder:text-gray-400 focus:outline-none focus:bg-white/[0.1] text-sm transition-all w-full`}
            />
            {errors.contact && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.contact}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={hasErrors || isSubmitting}
            className={`px-6 py-3.5 rounded-xl bg-gradient-to-r from-cta to-orange-600 hover:from-cta-hover hover:to-orange-700 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
              (hasErrors || isSubmitting) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
          <div className="sm:col-span-3">
            <label htmlFor="contact-message" className="sr-only">Project Description</label>
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              placeholder="Briefly describe your project: building type, dimensions, location, quantity..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`w-full px-5 py-3.5 rounded-xl bg-white/[0.07] backdrop-blur border ${
                errors.message ? "border-red-500" : "border-white/[0.12] focus:border-steel-accent"
              } text-white placeholder:text-gray-400 focus:outline-none focus:bg-white/[0.1] text-sm resize-none transition-all`}
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>
            )}
          </div>
        </form>

        {/* Contact cards */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ),
              title: "WhatsApp",
              text: "+86 166-5073-5555",
              href: "https://wa.me/8616650735555",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: "Email",
              text: CONTACT_EMAIL,
              href: `mailto:${CONTACT_EMAIL}`,
            },
            {
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.2 5.2c-1.6.8-2.9 2-3.7 3.5-.8-1.5-2.1-2.7-3.7-3.5C4.9 6.5 3 9.1 3 12c0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.9-1.9-5.5-4.8-6.8z"/>
                </svg>
              ),
              title: "Alibaba Store",
              text: "View & Order Online",
              href: "https://hnltgjg.en.alibaba.com/",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "Location",
              text: "Shangqiu, Henan, China",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all"
            >
              <div className="text-steel-accent shrink-0">{item.icon}</div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500">{item.title}</div>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    onClick={(e) => {
                      // Track different types of contact clicks
                      if (item.href.includes("wa.me")) {
                        trackWhatsAppClick("contact_page");
                      } else if (item.href.startsWith("mailto:")) {
                        trackEmailClick("contact_page");
                      } else if (item.href.includes("alibaba.com")) {
                        trackOutboundLink(item.href, "alibaba");
                      }
                    }}
                    className="text-sm text-white hover:text-steel-accent transition-colors truncate block"
                  >
                    {item.text}
                  </a>
                ) : (
                  <div className="text-sm text-white truncate">{item.text}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
