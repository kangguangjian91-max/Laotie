#!/usr/bin/env python3
"""
图片优化脚本 - 压缩并转换为 WebP 格式
"""
import os
import sys
from pathlib import Path

# 尝试导入 Pillow
try:
    from PIL import Image
    print("✅ Pillow 已安装")
except ImportError:
    print("❌ Pillow 未安装，正在安装...")
    os.system(f"{sys.executable} -m pip install Pillow -q")
    from PIL import Image

# 配置
IMAGES_DIR = Path("public/images/factory")
TARGET_MAX_SIZE_KB = 500  # 目标最大文件大小
WEBP_QUALITY = 82  # WebP 质量 (0-100)

def optimize_image(image_path: Path, target_path: Path = None) -> dict:
    """优化单个图片：压缩并转换为 WebP"""
    if target_path is None:
        target_path = image_path.with_suffix(".webp")
    
    original_size = image_path.stat().st_size / 1024  # KB
    
    # 打开图片
    img = Image.open(image_path)
    
    # 如果是 PNG 且有透明通道，保持 RGBA 模式
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")
    
    # 保存为 WebP
    img.save(target_path, "WebP", quality=WEBP_QUALITY, method=6)
    
    new_size = target_path.stat().st_size / 1024  # KB
    compression_ratio = (1 - new_size / original_size) * 100
    
    return {
        "original": image_path.name,
        "original_size_kb": round(original_size, 1),
        "new": target_path.name,
        "new_size_kb": round(new_size, 1),
        "compression_ratio": round(compression_ratio, 1),
        "dimensions": img.size
    }

def main():
    print("🚀 开始优化工厂图片...\n")
    
    # 找出需要优化的图片（>500KB 或 PNG 格式）
    images_to_optimize = []
    for ext in ["*.png", "*.jpg", "*.jpeg"]:
        for img_path in IMAGES_DIR.glob(ext):
            size_kb = img_path.stat().st_size / 1024
            if size_kb > TARGET_MAX_SIZE_KB or img_path.suffix.lower() == ".png":
                images_to_optimize.append(img_path)
    
    if not images_to_optimize:
        print("✅ 所有图片都已经优化过了！")
        return
    
    print(f"📊 找到 {len(images_to_optimize)} 张图片需要优化：\n")
    
    # 优化每张图片
    results = []
    for img_path in sorted(images_to_optimize):
        print(f"⏳ 处理: {img_path.name}...")
        try:
            result = optimize_image(img_path)
            results.append(result)
            print(f"   ✅ {result['original_size_kb']}KB → {result['new_size_kb']}KB ({result['compression_ratio']}% 压缩)")
        except Exception as e:
            print(f"   ❌ 错误: {e}")
    
    # 打印汇总报告
    print("\n" + "="*80)
    print("📊 优化汇总报告")
    print("="*80)
    print(f"{'原始文件':<35} {'原始大小':>12} {'新文件':<35} {'新大小':>12} {'压缩率':>10}")
    print("-"*80)
    
    total_original = 0
    total_new = 0
    for r in results:
        print(f"{r['original']:<35} {r['original_size_kb']:>10}KB  {r['new']:<35} {r['new_size_kb']:>10}KB  {r['compression_ratio']:>8}%")
        total_original += r['original_size_kb']
        total_new += r['new_size_kb']
    
    print("-"*80)
    print(f"{'总计':<35} {total_original:>10}KB  {'':<35} {total_new:>10}KB  {(1-total_new/total_original)*100:>8.1f}%")
    print("="*80)
    
    print(f"\n✅ 优化完成！节省了 {round(total_original - total_new, 1)}KB")
    print(f"\n💡 提示：现在可以删除原始的 PNG/JPG 文件，只保留 WebP 格式。")

if __name__ == "__main__":
    main()
