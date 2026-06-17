#!/usr/bin/env python3
"""
批量转换剩余图片为WebP格式
优化质量：85 (平衡质量和文件大小)
"""
import os
from PIL import Image
import sys

# 项目路径
project_dir = r"C:\Users\kang\WorkBuddy\2026-06-04-15-29-02\laotie-steel"
images_dir = os.path.join(project_dir, "public", "images")

# 需要转换的图片扩展名
extensions = ['.jpg', '.jpeg', '.png']

# 统计
converted = 0
skipped = 0
errors = 0

print("🚀 开始批量转换图片为WebP...\n")

# 遍历所有图片
for root, dirs, files in os.walk(images_dir):
    for file in files:
        file_lower = file.lower()
        
        # 检查是否是需要转换的格式
        if any(file_lower.endswith(ext) for ext in extensions):
            # 跳过backup-old目录
            if "backup-old" in root:
                continue
                
            img_path = os.path.join(root, file)
            
            # 生成WebP文件名
            webp_path = os.path.splitext(img_path)[0] + ".webp"
            
            # 检查WebP是否已存在
            if os.path.exists(webp_path):
                print(f"⏭️  跳过（WebP已存在）: {os.path.relpath(img_path, images_dir)}")
                skipped += 1
                continue
            
            try:
                # 打开图片
                img = Image.open(img_path)
                
                # 如果是PNG且有透明通道，需要特殊处理
                if img.mode == 'RGBA':
                    # 创建白色背景
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[3])  # 使用alpha通道作为mask
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # 保存为WebP（质量85）
                img.save(webp_path, 'WEBP', quality=85, method=6)
                
                # 获取文件大小对比
                original_size = os.path.getsize(img_path)
                webp_size = os.path.getsize(webp_path)
                savings = (1 - webp_size / original_size) * 100
                
                print(f"✅ {os.path.relpath(img_path, images_dir)}")
                print(f"   {original_size/1024:.1f}KB → {webp_size/1024:.1f}KB ({savings:.1f}% 节省)")
                
                converted += 1
                
            except Exception as e:
                print(f"❌ 错误: {os.path.relpath(img_path, images_dir)} - {str(e)}")
                errors += 1

print(f"\n{'='*60}")
print(f"✅ 转换完成!")
print(f"   转换: {converted} 张")
print(f"   跳过: {skipped} 张 (WebP已存在)")
print(f"   错误: {errors} 张")
print(f"{'='*60}")
