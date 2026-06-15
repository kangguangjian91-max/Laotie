#!/usr/bin/env python3
"""
Convert images to AVIF format for better compression
AVIF is ~20-30% smaller than WebP
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Installing...")
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image

# Key images to convert (prioritize by visibility)
KEY_IMAGES = [
    "public/images/hero-bg.webp",
    "public/images/factory-workshop.webp",
    "public/images/product-steel-building.webp",
    "public/images/product-floor-deck.webp",
    "public/images/product-space-frame.webp",
    "public/images/product-cladding.webp",
    "public/images/factory-building.webp",
]

def convert_to_avif(input_path, output_path=None, quality=80):
    """Convert image to AVIF format"""
    try:
        img = Image.open(input_path)
        
        # Convert to RGB if necessary (AVIF doesn't support RGBA well)
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Determine output path
        if output_path is None:
            output_path = str(Path(input_path).with_suffix('.avif'))
        
        # Save as AVIF
        img.save(output_path, 'AVIF', quality=quality)
        
        # Get file sizes
        original_size = os.path.getsize(input_path)
        avif_size = os.path.getsize(output_path)
        savings = (1 - avif_size / original_size) * 100
        
        print(f"✅ {Path(input_path).name}")
        print(f"   Original: {original_size / 1024:.1f} KB")
        print(f"   AVIF: {avif_size / 1024:.1f} KB")
        print(f"   Savings: {savings:.1f}%")
        print()
        
        return True
        
    except Exception as e:
        print(f"❌ Failed to convert {input_path}: {e}")
        return False

def main():
    print("🚀 Starting AVIF conversion...\n")
    
    # Check if Pillow supports AVIF
    try:
        Image.new('RGB', (1, 1)).save('/tmp/test.avif', 'AVIF')
        os.remove('/tmp/test.avif')
    except Exception as e:
        print("❌ Your Pillow version doesn't support AVIF.")
        print("Please install Pillow 10.0.0+ with: pip install --upgrade Pillow")
        return
    
    success_count = 0
    for img_path in KEY_IMAGES:
        if os.path.exists(img_path):
            if convert_to_avif(img_path):
                success_count += 1
        else:
            print(f"⚠️  Skipping {img_path} (file not found)")
    
    print(f"\n✨ Converted {success_count}/{len(KEY_IMAGES)} images to AVIF")

if __name__ == "__main__":
    main()
