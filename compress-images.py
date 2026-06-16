#!/usr/bin/env python3
"""Compress and convert project images to WebP format."""

from PIL import Image
import os

# Project images directory
img_dir = r"C:\Users\kang\WorkBuddy\2026-06-04-15-29-02\laotie-steel\public\images\projects"

# Images to process
images = [
    "project-perth-01.png",
    "project-sydney-01.png",
    "project-lagos-01.png",
    "project-manila-01.png",
    "project-dubai-01.png",
    "project-jakarta-01.png",
]

for img_name in images:
    img_path = os.path.join(img_dir, img_name)
    webp_name = img_name.replace(".png", ".webp")
    webp_path = os.path.join(img_dir, webp_name)

    # Skip if WebP already exists
    if os.path.exists(webp_path):
        print(f"Skipping {img_name} - WebP already exists")
        continue

    # Open, compress, save as WebP
    with Image.open(img_path) as img:
        # Convert to RGB (if RGBA)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Save as WebP at 85% quality
        img.save(webp_path, "WEBP", quality=85, method=6)

        # Get file sizes
        original_size = os.path.getsize(img_path)
        webp_size = os.path.getsize(webp_path)
        savings = (1 - webp_size / original_size) * 100

        print(f"✓ {img_name} → {webp_name}")
        print(f"  Original: {original_size / 1024:.1f} KB")
        print(f"  WebP: {webp_size / 1024:.1f} KB")
        print(f"  Savings: {savings:.1f}%")

print("\nDone! All images compressed to WebP.")
