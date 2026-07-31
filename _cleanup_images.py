"""Consolidate duplicate geo page images and clean .orig files."""
import os, shutil, glob, re

BASE = r"C:\Users\kang\WorkBuddy\2026-06-04-15-29-02\laotie-steel"
IMAGES = os.path.join(BASE, "public", "images")

# === Phase 1: Consolidate duplicate hash images ===
SRC_DIR = os.path.join(IMAGES, "indonesia")
DST_DIR = os.path.join(IMAGES, "geo-shared")
os.makedirs(DST_DIR, exist_ok=True)

HASH_MAP = {
    "0e25f79a69e0c6f3787bdf7e1e7f9ee7.webp": "geo-project-01.webp",
    "1a3e5a019b4c71eda2da853679708074.webp": "geo-project-02.webp",
    "3c827b0a462391a3e3486e39a5ae25d4.webp": "geo-project-03.webp",
    "5704819281f8e9ad3038915e967864ad.webp": "geo-project-04.webp",
    "679234a53ccd9c56cf26658f4f072138.webp": "geo-project-05.webp",
    "67dd07a1917aa291f1631e16ce010c88.webp": "geo-project-06.webp",
    "688e07390f62e21cbb8bd1a1ba455959.webp": "geo-project-07.webp",
    "7ea1821bc8fdfac59547d2c042c2f6ae.webp": "geo-project-08.webp",
    "967a25ac2c3ec808229a990e27529ba2.webp": "geo-project-09.webp",
    "bd585762b3e96733450d3660029a1ab4.webp": "geo-project-10.webp",
    "fedb6be73f856b715d506bdf2ffc3a0f.webp": "geo-project-11.webp",
}

print("=== Phase 1: Consolidating hash images ===")
for old_name, new_name in HASH_MAP.items():
    src = os.path.join(SRC_DIR, old_name)
    dst = os.path.join(DST_DIR, new_name)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"  {old_name[:12]}... → {new_name}")
    else:
        print(f"  MISSING: {old_name}")

# === Phase 2: Update 4 page.tsx files ===
print("\n=== Phase 2: Updating page references ===")
geo_dirs = ["indonesia", "nigeria", "philippines", "vietnam"]

for geo in geo_dirs:
    page_file = os.path.join(BASE, "src", "app", f"steel-structure-{geo}", "page.tsx")
    if not os.path.exists(page_file):
        print(f"  SKIP: {page_file} not found")
        continue
    
    with open(page_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    for old_name, new_name in HASH_MAP.items():
        old_path = f"/images/{geo}/{old_name}"
        new_path = f"/images/geo-shared/{new_name}"
        content = content.replace(old_path, new_path)
    
    if content != original:
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(content)
        changes = original.count("/images/" + geo + "/") - content.count("/images/" + geo + "/")
        print(f"  {geo}: {changes} references updated")
    else:
        print(f"  {geo}: no changes needed")

# === Phase 3: Remove old geo image directories ===
print("\n=== Phase 3: Removing old geo image directories ===")
for geo in geo_dirs:
    geo_dir = os.path.join(IMAGES, geo)
    if os.path.exists(geo_dir):
        shutil.rmtree(geo_dir)
        print(f"  Removed: images/{geo}/")

# === Phase 4: Clean .orig backup files ===
print("\n=== Phase 4: Cleaning .orig backup files ===")
orig_files = []
for root, dirs, files in os.walk(IMAGES):
    for f in files:
        if f.endswith(".orig"):
            orig_files.append(os.path.join(root, f))

print(f"  Found {len(orig_files)} .orig files")
for f in orig_files:
    os.remove(f)
    rel = os.path.relpath(f, BASE)
    print(f"  Deleted: {rel}")

print("\n=== Done ===")
