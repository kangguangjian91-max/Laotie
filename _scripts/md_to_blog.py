# -*- coding: utf-8 -*-
"""Regenerate blog JSON from markdown, preserving category/readTime from existing JSON."""
import json
import os
import re
import sys

for slug in sys.argv[1:]:
    md_path = "content/blog/%s.md" % slug
    if not os.path.exists(md_path):
        print("skip (no md):", slug)
        continue

    with open(md_path, "r", encoding="utf-8") as f:
        raw = f.read()

    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)
    fm_block, content = m.group(1), m.group(2).strip()

    fm = {}
    for line in fm_block.split("\n"):
        if ": " in line:
            k, v = line.split(": ", 1)
            fm[k] = v.strip().strip('"').strip("'").strip()

    out = "public/data/blog/%s.json" % slug
    # preserve category/readTime from existing JSON if present
    category, read_time = "Design Guide", "8 min read"
    if os.path.exists(out):
        with open(out, "r", encoding="utf-8") as f:
            existing = json.load(f)
        category = existing.get("category", category)
        read_time = existing.get("readTime", read_time)

    post = {
        "slug": slug,
        "title": fm["title"],
        "description": fm["description"],
        "date": fm["date"],
        "category": category,
        "readTime": read_time,
        "image": fm["image"],
        "content": content,
    }

    with open(out, "w", encoding="utf-8") as f:
        json.dump(post, f, ensure_ascii=False, indent=2)
    print("updated", out, "| chars:", len(content), "| cat:", category, "| rt:", read_time)
