import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import OwnerVideoEmbed from "@/components/OwnerVideoEmbed";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MessageCircle,
  CheckCircle2,
  MapPin,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";
import {
  owner,
  heroHeadline,
  bioParagraphs,
  ownerFacts,
  workingPrinciples,
  ownerResponsibilities,
  videoTopics,
  ownerVideos,
  factoryShots,
} from "@/data/owner";

const pageUrl = "https://www.laotie-steel.com/meet-the-owner";

// lucide-react does not ship a YouTube glyph in this version — inline SVG instead
function YouTubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z" />
    </svg>
  );
}

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `Meet the Owner — ${owner.name}`,
  url: pageUrl,
  description:
    "Owner profile of Kang Guangjian, General Manager of Laotie Steel Structure Engineering Co., Ltd. — a CE and ISO 9001 certified steel structure manufacturer in Shangqiu, Henan, China.",
  mainEntity: {
    "@type": "Person",
    name: owner.name,
    alternateName: [owner.nameCn, "Laotie Steel Structure"],
    jobTitle: owner.role,
    image: `https://www.laotie-steel.com${owner.photo}`,
    url: pageUrl,
    description:
      "Owner and General Manager of Laotie Steel Structure, a 20,000 m² steel structure fabrication plant in Shangqiu, Henan, China, founded in 2009 with 5 production lines and 5,000 tons monthly capacity, exporting to 30+ countries.",
    worksFor: {
      "@type": "Organization",
      name: "Laotie Steel Structure Engineering Co., Ltd.",
      url: "https://www.laotie-steel.com",
      foundingDate: "2009",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shangqiu",
        addressRegion: "Henan",
        addressCountry: "CN",
      },
    },
    knowsAbout: [
      "Steel structure design and fabrication",
      "CE EN 1090-1 certified welding and fabrication",
      "Steel structure cost estimation and tonnage pricing",
      "Warehouse and factory building engineering",
      "Export logistics and container loading of fabricated steel",
    ],
    sameAs: [owner.youtube, owner.linkedin, owner.alibaba],
    nationality: { "@type": "Country", name: "China" },
  },
};

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: ownerVideos[0].title,
  description: ownerVideos[0].description,
  thumbnailUrl: `https://www.laotie-steel.com${ownerVideos[0].poster}`,
  uploadDate: "2026-06-01",
  embedUrl: `https://www.youtube.com/embed/${ownerVideos[0].id}`,
  contentUrl: `https://www.youtube.com/watch?v=${ownerVideos[0].id}`,
  publisher: {
    "@type": "Organization",
    name: "Laotie Steel Structure",
    url: "https://www.laotie-steel.com",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.laotie-steel.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.laotie-steel.com/about" },
    { "@type": "ListItem", position: 3, name: "Meet the Owner", item: pageUrl },
  ],
};

export const metadata: Metadata = {
  title: "Meet the Owner | Kang Guangjian, Laotie Steel Structure",
  description:
    "Meet Kang Guangjian, owner of Laotie Steel Structure — a CE & ISO 9001 certified factory in Henan, China. Watch the factory videos and talk to the owner directly.",
  keywords: [
    "Laotie Steel Structure owner",
    "Kang Guangjian",
    "Chinese steel structure manufacturer owner",
    "steel structure factory China video",
    "CE certified steel fabricator China",
    "steel structure supplier Shangqiu Henan",
  ],
  openGraph: {
    title: "Meet the Owner | Kang Guangjian, Laotie Steel Structure",
    description:
      "You are buying from the man who runs the factory. Watch the plant, the welding lines and the loading process — then message the owner directly.",
    url: pageUrl,
    siteName: "Laotie Steel Structure",
    images: [{ url: "/images/owner/meet-the-owner-og.webp", width: 1200, height: 630 }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the Owner | Kang Guangjian, Laotie Steel Structure",
    description:
      "Owner of a CE & ISO 9001 certified steel structure factory in Henan, China. 5,000 T/month, exports to 30+ countries.",
    images: ["/images/owner/meet-the-owner-og.webp"],
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default function MeetTheOwnerPage() {
  return (
    <>
      <JsonLd data={profilePageSchema} />
      <JsonLd data={videoSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="bg-white">
        {/* ===== Hero ===== */}
        <section className="relative bg-steel overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/95 to-steel/75" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: text */}
              <div className="lg:col-span-7">
                <a
                  href="/about"
                  className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-white transition-colors mb-5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to About
                </a>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.14] mb-5">
                  <BadgeCheck className="w-4 h-4 text-steel-accent" />
                  <span className="text-[#7dd3fc] font-semibold text-xs tracking-[0.15em] uppercase">
                    {heroHeadline.eyebrow}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {heroHeadline.title}
                </h1>
                <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                  {heroHeadline.subtitle}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={owner.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3.5 text-sm lg:text-base font-bold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-xl transition-all duration-300 shadow-[0_8px_28px_rgba(37,211,102,0.35)] hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message me on WhatsApp
                  </a>
                  <a
                    href={owner.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3.5 text-sm lg:text-base font-semibold text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 rounded-xl transition-all duration-300"
                  >
                    <YouTubeIcon className="w-5 h-5 mr-2" />
                    Watch the factory
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5">
                    <MapPin className="w-3.5 h-3.5 text-steel-accent" /> {owner.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-steel-accent" /> CE EN 1090-1
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-steel-accent" /> ISO 9001:2015
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-lg px-3 py-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-steel-accent" /> Since {owner.since}
                  </span>
                </div>
              </div>

              {/* Right: portrait */}
              <div className="lg:col-span-5">
                <div className="relative max-w-[380px] mx-auto lg:ml-auto lg:mr-0">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#FF6B00]/25 to-[#378ADD]/20 rounded-3xl blur-xl" />
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src={owner.photo}
                        alt="Kang Guangjian, owner and general manager of Laotie Steel Structure"
                        fill
                        sizes="(max-width: 1024px) 380px, 32vw"
                        priority
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-5">
                      <p className="text-white font-bold text-lg leading-tight">{owner.name}</p>
                      <p className="text-steel-accent text-sm font-semibold">{owner.role}</p>
                      <p className="text-gray-300 text-xs mt-1">
                        {owner.nameCn} · {owner.company.split(" ").slice(0, 3).join(" ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#FF6B00]/50 to-transparent" />
        </section>

        {/* ===== Quote strip ===== */}
        <section className="bg-steel-muted border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <p className="text-xl sm:text-2xl lg:text-[1.7rem] font-semibold text-steel leading-snug">
              &ldquo;I would rather show you the welding line than tell you we are a real factory.&rdquo;
            </p>
            <p className="mt-3 text-sm text-gray-500">
              {owner.name} — {owner.role}, {owner.company}
            </p>
          </div>
        </section>

        {/* ===== Bio + facts ===== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
                Who you are talking to
              </p>
              <h2 className="text-3xl font-bold text-steel mb-6">
                From a workshop in Henan to projects on five continents
              </h2>
              {bioParagraphs.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">
                  {p}
                </p>
              ))}

              <h3 className="text-xl font-bold text-steel mt-10 mb-4">
                What I personally handle on every order
              </h3>
              <ul className="space-y-3">
                {ownerResponsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-600 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-accent hover:text-steel transition-colors"
                >
                  Company profile, equipment & certifications <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/manufacturing-process"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-accent hover:text-steel transition-colors"
                >
                  See the 7-step production process <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Facts card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold text-steel mb-4 pb-3 border-b border-gray-100">
                  At a glance
                </h3>
                <dl className="space-y-3">
                  {ownerFacts.map((f) => (
                    <div key={f.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-gray-500 shrink-0">{f.label}</dt>
                      <dd className="text-steel font-medium text-right">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={owner.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask me directly
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Working principles ===== */}
        <section className="bg-steel-muted py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
                How we work together
              </p>
              <h2 className="text-3xl font-bold text-steel">
                Four rules I do not break with overseas buyers
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {workingPrinciples.map((p) => (
                <div
                  key={p.title}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-steel mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Videos ===== */}
        <section className="bg-steel py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
                Video collection
              </p>
              <h2 className="text-3xl font-bold text-white">
                From the factory floor, in English
              </h2>
              <p className="mt-3 text-gray-300 leading-relaxed">
                Price breakdowns, fabrication steps and shipping walkthroughs — filmed inside the
                plant so you can check who you are buying from before you send a deposit.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Featured video */}
              <div className="lg:col-span-7">
                <OwnerVideoEmbed
                  videoId={ownerVideos[0].id}
                  title={ownerVideos[0].title}
                  poster={ownerVideos[0].poster}
                />
                <p className="mt-3 text-sm text-gray-400">{ownerVideos[0].description}</p>
              </div>

              {/* Topics + subscribe */}
              <div className="lg:col-span-5">
                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-bold mb-4">What I cover on video</h3>
                  <ul className="space-y-2.5">
                    {videoTopics.map((t) => (
                      <li key={t} className="flex gap-2.5 text-sm text-gray-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] mt-2 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={owner.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#FF0000] hover:bg-[#c10000] text-white font-semibold text-sm transition-colors"
                  >
                    <YouTubeIcon className="w-4 h-4 mr-2" />
                    Subscribe on YouTube
                  </a>
                  <p className="mt-3 text-xs text-gray-400 text-center">
                    New factory videos every week — each description links back to this page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Factory gallery ===== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl mb-10">
            <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
              Factory gallery
            </p>
            <h2 className="text-3xl font-bold text-steel">Real shots from our plant — not stock photos</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              20,000 m² under one roof in Shangqiu, Henan: cutting, assembly, welding, shot
              blasting, painting, panel production and quality inspection.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {factoryShots.map((s) => (
              <figure
                key={s.src}
                className="group relative rounded-xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2.5 text-xs font-medium text-white">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-accent hover:text-steel transition-colors"
            >
              See completed projects <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-accent hover:text-steel transition-colors"
            >
              Browse product range <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ===== Cross-channel ===== */}
        <section className="bg-steel-muted py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-steel-accent font-semibold text-sm tracking-wider uppercase mb-2">
                Follow the factory
              </p>
              <h2 className="text-3xl font-bold text-steel">Where to find me and Laotie Steel</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Videos, photos and project updates — every channel below is run from the factory,
                and every one links back to this site.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href={owner.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <YouTubeIcon className="w-6 h-6 text-[#FF0000] mb-3" />
                <p className="font-bold text-steel">YouTube</p>
                <p className="text-xs text-gray-500 mt-1">Factory tours, pricing and shipping videos</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-steel-accent">
                  Subscribe <ExternalLink className="w-3 h-3" />
                </span>
              </a>
              <a
                href={owner.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-6 h-6 text-[#25D366] mb-3" />
                <p className="font-bold text-steel">WhatsApp</p>
                <p className="text-xs text-gray-500 mt-1">Direct line to the owner — quotes in 24h</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-steel-accent">
                  +86 166 5073 5555 <ExternalLink className="w-3 h-3" />
                </span>
              </a>
              <a
                href={`mailto:${owner.email}`}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-6 h-6 text-steel-accent mb-3" />
                <p className="font-bold text-steel">Email</p>
                <p className="text-xs text-gray-500 mt-1">Send drawings for a technical review</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-steel-accent break-all">
                  {owner.email}
                </span>
              </a>
              <a
                href={owner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <BadgeCheck className="w-6 h-6 text-[#0A66C2] mb-3" />
                <p className="font-bold text-steel">LinkedIn</p>
                <p className="text-xs text-gray-500 mt-1">Company updates and project milestones</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-steel-accent">
                  Follow <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ===== Bottom CTA ===== */}
        <section className="bg-steel">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Tell me about your building — I will quote it myself
            </h2>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
              Send a sketch, drawing or even a rough size. You get tonnage, price range and lead
              time, prepared from the factory that will fabricate it.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={owner.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 text-sm lg:text-base font-bold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-xl transition-all duration-300 shadow-[0_8px_28px_rgba(37,211,102,0.35)] hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp the owner
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3.5 text-sm lg:text-base font-semibold text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                Request a written quote
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
