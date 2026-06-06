"use client";

import { useState, useCallback, useEffect } from "react";

const phoneNumber = "8616650735555";
const whatsappBase = `https://wa.me/${phoneNumber}`;

const quickMessages = [
  {
    label: "Request a Quotation",
    message:
      "Hi OldTie, I'd like to request a quotation for my steel structure project. Can you help?",
    color: "#075E54",
  },
  {
    label: "Product Inquiry",
    message:
      "Hi OldTie, I'm interested in learning more about your steel structure products. Could you share details and pricing?",
    color: "#128C7E",
  },
  {
    label: "Talk to Sales",
    message:
      "Hi OldTie, I have some questions about your steel structures. Can we chat?",
    color: "#25D366",
  },
];

export default function WhatsAppFloatingButton() {
  const [open, setOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Show bubble tooltip after 3s if user hasn't interacted
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(t);
  }, [open]);

  // Hide bubble on scroll
  useEffect(() => {
    const onScroll = () => {
      setShowBubble(false);
      setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleQuickMessage = useCallback((message: string) => {
    const url = `${whatsappBase}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setShowBubble(false);
  }, []);

  const handleCustomSend = useCallback(() => {
    const msg = customMessage.trim();
    if (!msg) return;
    const url = `${whatsappBase}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setCustomMessage("");
    setOpen(false);
    setShowBubble(false);
  }, [customMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCustomSend();
      }
    },
    [handleCustomSend]
  );

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
    setShowBubble(false);
  }, []);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
          onClick={toggleOpen}
          aria-hidden="true"
        />
      )}

      {/* ===== Chat Panel ===== */}
      <div
        className={`fixed bottom-[5.5rem] right-4 sm:right-6 z-50 w-[280px] sm:w-[320px] transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {/* WhatsApp-style chat bubble tail */}
        <div className="relative bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100/80">
          {/* Green accent bar at top */}
          <div className="h-1 bg-gradient-to-r from-[#075E54] via-[#128C7E] to-[#25D366]" />

          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3.5 flex items-center gap-3">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center ring-2 ring-white/20">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#4ADF83] rounded-full border-[2.5px] border-[#075E54]" />
            </div>

            {/* Title & status */}
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold text-[15px] leading-tight">
                OldTie Steel
              </p>
              <p className="text-[11px] text-white/60 leading-tight mt-0.5">
                Online &middot; Typically replies in 2 hours
              </p>
            </div>

            {/* Close */}
            <button
              onClick={toggleOpen}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat body — WhatsApp-style message bubbles */}
          <div className="px-3 py-3 space-y-2.5" style={{ backgroundColor: "#E5DDD5" }}>
            {/* Incoming message bubble (simulated) */}
            <div className="flex gap-2">
              <div className="bg-white rounded-[18px] rounded-tl-md px-3.5 py-2.5 shadow-sm max-w-[85%]">
                <p className="text-[13px] text-gray-800 leading-snug">
                  👋 Hi there! How can we help with your steel structure project?
                </p>
                <p className="text-[10px] text-gray-400 text-right mt-1">Just now</p>
              </div>
            </div>

            {/* Quick reply buttons */}
            <div className="space-y-1.5">
              {quickMessages.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleQuickMessage(item.message)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#f0faf4] border border-gray-100 hover:border-[#25D366]/30 text-left text-[13px] text-gray-700 hover:text-[#075E54] transition-all shadow-sm hover:shadow group"
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.label.charAt(0)}
                  </span>
                  <span className="truncate font-medium">{item.label}</span>
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-gray-300 group-hover:text-[#25D366] shrink-0 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Divider with text */}
            <div className="flex items-center gap-2 px-1">
              <div className="h-px flex-1 bg-gray-300/60" />
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                or type a message
              </span>
              <div className="h-px flex-1 bg-gray-300/60" />
            </div>

            {/* Input area — WhatsApp style */}
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 text-[13px] text-gray-700 placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              <button
                onClick={handleCustomSend}
                disabled={!customMessage.trim()}
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  customMessage.trim()
                    ? "bg-[#075E54] hover:bg-[#054c3e] text-white scale-100"
                    : "bg-gray-100 text-gray-300 scale-95"
                }`}
                aria-label="Send"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Floating Button ===== */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end">
        {/* Preview bubble — appears on hover / auto after 3s */}
        {showBubble && !open && (
          <div className="mb-2 mr-1 animate-fade-in-up">
            <div className="relative bg-white rounded-2xl rounded-br-md px-4 py-2.5 shadow-lg border border-gray-100 text-sm text-gray-700 whitespace-nowrap">
              <span className="font-semibold text-[#075E54]">OldTie</span> is online
              <br />
              <span className="text-xs text-gray-400">Click to chat on WhatsApp</span>
              {/* Tail */}
              <span className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
            </div>
          </div>
        )}

        {/* Main button */}
        <button
          onClick={toggleOpen}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-gray-700 shadow-lg rotate-90"
              : "bg-[#25D366] shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95"
          }`}
          aria-label={open ? "Close chat" : "Chat on WhatsApp"}
        >
          {/* Pulse rings — only when closed */}
          {!open && (
            <>
              <span
                className="absolute inset-0 rounded-full opacity-40 animate-ping"
                style={{ backgroundColor: "#25D366" }}
              />
              <span
                className="absolute inset-[-4px] rounded-full border-2 border-[#25D366]/30 animate-pulse"
                style={{ animationDuration: "2s" }}
              />
            </>
          )}

          {/* Icon */}
          {open ? (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
