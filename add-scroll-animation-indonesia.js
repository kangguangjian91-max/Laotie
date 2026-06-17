const fs = require('fs');
const filePath = 'src/app/steel-structure-indonesia/page.tsx';

// 读取文件
let content = fs.readFileSync(filePath, 'utf8');

// 1. 为Why Choose Us部分添加动画（3个卡片）
content = content.replace(
  /(<section className="py-16 bg-gray-50">[\s\S]*?<div className="grid md:grid-cols-3 gap-8">)([\s\S]*?)(<\/div>\n\s*<\/div>\n\s*<\/section>)/,
  (match, p1, p2, p3) => {
    // 为每个卡片添加ScrollAnimator包装
    const cards = p2.split(/(?=<div className="bg-white p-6 rounded-xl shadow-sm">)/);
    const animatedCards = cards.map((card, index) => {
      if (card.trim() && card.includes('bg-white p-6')) {
        return `\n            <ScrollAnimator animation="fade-in" delay={${index * 200}}>\n            ${card.trim()}\n            </ScrollAnimator>`;
      }
      return card;
    }).join('');
    
    return p1 + animatedCards + p3;
  }
);

// 2. 为Why Indonesia部分添加动画（4个卡片，左右交替）
content = content.replace(
  /(<section className="py-16">[\s\S]*?<div className="grid md:grid-cols-2 gap-8">)([\s\S]*?)(<\/div>\n\s*<\/div>\n\s*<\/section>)/,
  (match, p1, p2, p3) => {
    // 为每对卡片添加左右滑入动画
    const sections = p2.split(/(?=<div className="bg-white p-6 rounded-xl border)/);
    let delay = 0;
    const animatedSections = sections.map((section, index) => {
      if (section.trim() && section.includes('bg-white p-6')) {
        const animation = index % 2 === 0 ? 'slide-in-left' : 'slide-in-right';
        const result = `\n            <ScrollAnimator animation="${animation}" delay={${delay}}>\n            ${section.trim()}\n            </ScrollAnimator>`;
        delay += 100;
        return result;
      }
      return section;
    }).join('');
    
    return p1 + animatedSections + p3;
  }
);

// 3. 为Logistics部分添加淡入动画
content = content.replace(
  /(<\/section>\n\s*\n\s*<\/div>\n\s*<\/div>\n\s*<\/section>)/,
  '</ScrollAnimator>$1'
);

content = content.replace(
  /(<\/div>\n\s*\n\s*<div className="bg-white rounded-2xl p-8 shadow-sm">)/,
  '$1'
);

// 添加开始标签（在Logistics section开始后）
content = content.replace(
  /(<section className="py-16 bg-gray-50">[\s\S]*?<\/h2>)/,
  '$1\n        <ScrollAnimator animation="fade-in">'
);

// 4. 为Project Cases部分添加动画（需要在ProjectCarousel外面包装）
// 这个比较复杂，先跳过，后面手动处理

// 5. 为Testimonials部分添加动画
content = content.replace(
  /(<\/section>\n\s*\n\s*<\/div>\n\s*<\/div>)/,
  '$1'
);

// 6. 为FAQ部分添加动画
// 需要在FAQ section开始后添加<ScrollAnimator>

// 写回文件
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ 印尼页面滚动动画已添加（部分）');
