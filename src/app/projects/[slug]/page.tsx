import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projectDetails, type ProjectDetail } from "@/data/projects-detail";
import JsonLd from "@/components/JsonLd";
import DOMPurify from "isomorphic-dompurify";
import ProjectImage from "@/components/ProjectImage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectDetails[slug];
  if (!project) return {};

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: {
      canonical: `https://www.laotie-steel.com/projects/${slug}`,
    },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `https://www.laotie-steel.com/projects/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle,
      description: project.metaDescription,
    },
  };
}

export default async function ProjectDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const project = projectDetails[slug];
  if (!project) notFound();

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.h1,
    description: project.metaDescription,
    url: `https://www.laotie-steel.com/projects/${slug}`,
    author: {
      "@type": "Organization",
      name: "Henan Laotie Steel Structure Engineering Co., Ltd.",
    },
    dateCreated: "2025",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: project.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Henan Laotie Steel Structure Engineering Co., Ltd.",
    url: "https://www.laotie-steel.com",
    description:
      "CE & ISO certified steel structure manufacturer in China. 5 production lines, 5,000T/month capacity.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+86-166-5073-5555",
      availableLanguage: ["English", "Chinese"],
    },
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={organizationSchema} />
      <Header />

      <main className="bg-white">
        {/* ===== Project Hero Image ===== */}
        <section className="relative bg-steel">
          <ProjectImage
            src={project.image}
            alt={project.h1}
            className="w-full h-[400px] lg:h-[500px] object-cover"
            containerClassName="w-full h-[400px] lg:h-[500px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-steel/90 via-steel/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <a href="/projects" className="inline-flex items-center gap-1 text-sm text-steel-accent hover:text-white transition-colors mb-4">
              ← Back to All Projects
            </a>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {project.h1}
            </h1>
            <p className="mt-3 text-lg text-gray-300 max-w-3xl">
              {project.metaDescription}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="text-xs font-bold text-steel-accent bg-steel-muted px-2.5 py-1 rounded-full">
                {project.location ?? "China"}
              </span>
              <span className="text-xs text-gray-400 bg-white/10 px-2.5 py-1 rounded-full">
                {project.category ?? "Steel Structure Project"}
              </span>
              <span className="text-xs text-gray-400 bg-white/10 px-2.5 py-1 rounded-full">
                Completed {project.completedYear ?? "2025"}
              </span>
            </div>
          </div>
        </section>

        {/* ===== Project Overview ===== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.overview) }}
              />
            </div>
            <aside className="lg:col-span-1">
              <div className="bg-section rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
                <table className="w-full text-sm">
                  <tbody>
                    {project.specs.map((s) => (
                      <tr key={s.label} className="border-b border-gray-100">
                        <td className="py-2.5 text-gray-500 font-medium">{s.label}</td>
                        <td className="py-2.5 text-gray-900 text-right">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <a
                  href="/contact"
                  className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 bg-steel-accent text-white font-semibold rounded-xl hover:bg-steel transition-colors shadow-lg"
                >
                  Get a Similar Quote
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* ===== Project Challenges ===== */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Challenges</h2>
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.challenges) }}
            />
          </div>
        </section>

        {/* ===== Our Solution ===== */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Solution</h2>
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.solution) }}
            />
          </div>
        </section>

        {/* ===== Steel Structure Design ===== */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Steel Structure Design</h2>
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.design) }}
            />
          </div>
        </section>

        {/* ===== Fabrication Process ===== */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Fabrication Process</h2>
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.fabrication) }}
            />
          </div>
        </section>

        {/* ===== Quality Control ===== */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quality Control</h2>
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.qualityControl) }}
            />
          </div>
        </section>

        {/* ===== Packing & Shipping ===== */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Packing & Shipping</h2>
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.packingShipping) }}
            />
          </div>
        </section>

        {/* ===== Installation Guide ===== */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Installation Guide</h2>
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.installationGuide) }}
            />
          </div>
        </section>

        {/* ===== Why Choose Henan Laotie ===== */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Henan Laotie</h2>
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.whyChoose) }}
            />
          </div>
        </section>

        {/* ===== Project Photos ===== */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Photos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(project.galleryImages ?? [
                { src: "/images/projects/project-01.webp", alt: `${project.h1} - front view` },
                { src: "/images/projects/project-02.webp", alt: `${project.h1} - interior view` },
                { src: "/images/projects/project-03.webp", alt: `${project.h1} - structural detail` },
              ]).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
                  <ProjectImage
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    containerClassName="w-full h-full"
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              More project photos available upon request. Contact our team for the full project gallery including factory fabrication, container loading, and on-site erection photos.
            </p>
          </div>
        </section>

        {/* ===== Customer Feedback ===== */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Customer Feedback</h2>
            <div className="max-w-3xl mx-auto bg-section rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                ★★★★★
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                "Laotie Steel delivered a high-quality structure that fully complies with Australian standards. The engineering team was responsive, the fabrication was precise, and the on-site erection went smoothly. We highly recommend them for any steel warehouse project in Australia."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-steel-accent/10 flex items-center justify-center text-steel-accent font-bold">
                  DM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">David Mitchell</p>
                  <p className="text-sm text-gray-500">Project Manager, Perth Agricultural Processing Plant</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ Section ===== */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {project.faq.map((f, i) => (
                <details key={i} className="group bg-white rounded-xl border border-gray-200 p-6">
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                    {f.question}
                    <span className="ml-4 text-steel-accent group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA Section ===== */}
        <section className="bg-gradient-to-br from-steel to-steel-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Steel Warehouse Project?</h2>
            <div
              className="max-w-2xl mx-auto text-gray-300 mb-8"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.cta) }}
            />
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-steel font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors shadow-xl"
              >
                Get a Free Quote
              </a>
              <a
                href="https://wa.me/8616650735555"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center px-8 py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl hover:bg-[#1DA851] transition-colors shadow-xl"
              >
                WhatsApp: +86 166 5073 5555
              </a>
            </div>
          </div>
        </section>

        {/* ===== Related Projects ===== */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="/projects/industrial-warehouse-sydney" className="group block bg-section rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <ProjectImage src="/images/projects/project-01.webp" alt="Industrial warehouse Sydney Australia AS/NZS compliant steel structure" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" containerClassName="w-full h-full" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-steel-accent">Sydney, Australia</p>
                  <h3 className="font-semibold text-gray-900 mt-1">Industrial Warehouse Complex</h3>
                </div>
              </a>
              <a href="/projects/aircraft-hangar-jakarta" className="group block bg-section rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <ProjectImage src="/images/projects/project-06.webp" alt="Aircraft hangar Jakarta Indonesia space frame structure" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" containerClassName="w-full h-full" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-steel-accent">Jakarta, Indonesia</p>
                  <h3 className="font-semibold text-gray-900 mt-1">Aircraft Maintenance Hangar</h3>
                </div>
              </a>
              <a href="/projects/logistics-center-dubai" className="group block bg-section rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <ProjectImage src="/images/projects/project-04.webp" alt="Logistics center Dubai UAE steel building mezzanine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" containerClassName="w-full h-full" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-steel-accent">Dubai, UAE</p>
                  <h3 className="font-semibold text-gray-900 mt-1">Logistics Distribution Center</h3>
                </div>
              </a>
              <a href="/projects/yunda-bozhou-modern-industrial-park" className="group block bg-section rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <ProjectImage src="/images/projects/yunda-bozhou/yunda-02.webp" alt="Yunda Bozhou modern industrial park logistics distribution center" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" containerClassName="w-full h-full" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-steel-accent">Bozhou, China</p>
                  <h3 className="font-semibold text-gray-900 mt-1">Yunda Bozhou Logistics Park</h3>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ===== Conclusion ===== */}
        <section className="bg-section py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="max-w-4xl mx-auto prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.conclusion) }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
