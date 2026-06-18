import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Building, Factory, Warehouse, Truck } from "lucide-react";
import ProjectCarousel from "@/components/ProjectCarousel";

export const metadata: Metadata = {
  title: "老铁钢结构 - 专业钢结构设计、制造、安装",
  description: "老铁钢结构，20年经验，出口20+国家。提供钢结构厂房、仓库、物流中心设计、制造、安装一站式服务。24小时内免费报价。",
  openGraph: {
    title: "老铁钢结构 - 专业钢结构设计、制造、安装",
    description: "老铁钢结构，20年经验，出口20+国家。提供钢结构厂房、仓库、物流中心设计、制造、安装一站式服务。",
    url: "https://www.laotie-steel.com/zh",
    locale: "zh_CN",
    images: [
      {
        url: "https://www.laotie-steel.com/images/og-home-zh.jpg",
        width: 1200,
        height: 630,
        alt: "老铁钢结构",
      },
    ],
  },
};

const services = [
  {
    icon: <Building className="w-8 h-8 text-steel-accent" />,
    title: "钢结构厂房",
    description: "定制设计钢结构厂房，适应各种工业需求。支持起重机系统、ESD地板、通风系统。",
    features: ["定制设计", "起重机系统", "ESD地板", "通风系统"],
  },
  {
    icon: <Warehouse className="w-8 h-8 text-steel-accent" />,
    title: "钢结构仓库",
    description: "大跨度钢结构仓库，快速建造，成本效益高。支持防火、防腐、隔热系统。",
    features: ["大跨度设计", "快速建造", "防火系统", "防腐处理"],
  },
  {
    icon: <Factory className="w-8 h-8 text-steel-accent" />,
    title: "物流中心",
    description: "现代化物流中心设计，优化空间利用。支持自动化系统、货架系统、装卸平台。",
    features: ["空间优化", "自动化支持", "装卸平台", "货架系统"],
  },
  {
    icon: <Truck className="w-8 h-8 text-steel-accent" />,
    title: "一站式服务",
    description: "从设计到安装，提供一站式服务。包括设计、制造、运输、安装指导。",
    features: ["设计服务", "制造加工", "全球运输", "安装指导"],
  },
];

const projects = [
  {
    image: "/images/vietnam/3c827b0a462391a3e3486e39a5ae25d4.webp",
    alt: "越南河内钢结构仓库 - 5,000平方米",
    title: "河内仓库项目",
    description: "5,000平方米钢结构仓库，2025年完成。",
    tags: [{ label: "仓库", color: "blue" }, { label: "越南", color: "green" }],
  },
  {
    image: "/images/indonesia/project-jakarta-01.webp",
    alt: "印尼雅加达电子厂房 - 8,000平方米",
    title: "雅加达工厂项目",
    description: "8,000平方米电子厂房，2024年完成。",
    tags: [{ label: "厂房", color: "blue" }, { label: "印尼", color: "green" }],
  },
  {
    image: "/images/nigeria/project-lagos-01.webp",
    alt: "尼日利亚拉各斯物流中心 - 3,500平方米",
    title: "拉各斯物流项目",
    description: "3,500平方米物流中心，2025年完成。",
    tags: [{ label: "物流", color: "blue" }, { label: "尼日利亚", color: "green" }],
  },
  {
    image: "/images/projects/project-04.webp",
    alt: "菲律宾马尼拉厂房 - 6,000平方米",
    title: "马尼拉工厂项目",
    description: "6,000平方米钢结构厂房，2025年完成。",
    tags: [{ label: "厂房", color: "blue" }, { label: "菲律宾", color: "green" }],
  },
  {
    image: "/images/projects/project-05.webp",
    alt: "泰国曼谷加工厂 - 4,200平方米",
    title: "曼谷加工项目",
    description: "4,200平方米加工厂，2025年完成。",
    tags: [{ label: "加工", color: "blue" }, { label: "泰国", color: "green" }],
  },
  {
    image: "/images/projects/project-06.webp",
    alt: "马来西亚吉隆坡仓库 - 5,500平方米",
    title: "吉隆坡仓库项目",
    description: "5,500平方米钢结构仓库，2025年完成。",
    tags: [{ label: "仓库", color: "blue" }, { label: "马来西亚", color: "green" }],
  },
];

export default function HomeZh() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-steel via-steel-dark to-steel-light text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              专业钢结构解决方案
            </h1>
            <p className="text-xl md:text-2xl text-steel-light mb-8">
              设计、制造、安装一站式服务 • 20年经验 • 出口20+国家
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/zh/contact"
                className="bg-steel-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-steel-accent-dark transition-colors"
              >
                获取免费报价
              </Link>
              <a
                href="https://wa.me/8616650735555"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.123c-1.016-1.687-1.687-3.646-1.687-5.732 0-3.371 2.762-6.133 6.133-6.133 1.672 0 3.246.659 4.422 1.856l.657.755 4.197-1.1-1.46-4.213c.88-1.946.88-4.133-.043-6.087C17.63.953 15.074-.31 12.217-.31c-3.646 0-6.936 2.153-8.538 5.48C1.826 8.026.18 11.137.18 14.146c0 2.714 1.244 5.303 3.346 7.043l-1.427 5.316z" />
                </svg>
                WhatsApp咨询
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">我们的服务</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">成功案例</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            我们已经完成500+钢结构项目，遍布全球20+国家。
          </p>
          <ProjectCarousel
            projects={projects}
            title="近期项目"
            subtitle="我们已完成500+钢结构项目，遍布全球。以下是部分近期项目。"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-steel text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-steel-light">完成项目</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-steel-light">出口国家</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-steel-light">年经验</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-steel-light">客户满意度</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始您的项目了吗？</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            联系老铁钢结构，24小时内获取免费报价。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/zh/contact"
              className="bg-steel text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-steel-dark transition-colors"
            >
              联系我们
            </Link>
            <a
              href="https://wa.me/8616650735555"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.123c-1.016-1.687-1.687-3.646-1.687-5.732 0-3.371 2.762-6.133 6.133-6.133 1.672 0 3.246.659 4.422 1.856l.657.755 4.197-1.1-1.46-4.213c.88-1.946.88-4.133-.043-6.087C17.63.953 15.074-.31 12.217-.31c-3.646 0-6.936 2.153-8.538 5.48C1.826 8.026.18 11.137.18 14.146c0 2.714 1.244 5.303 3.346 7.043l-1.427 5.316z" />
              </svg>
              WhatsApp咨询
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
