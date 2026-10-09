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
    # ⚠️ 关键：已有 JSON 一律优先（title/description/image/date 全部保留）。
    # 原因：md 的 frontmatter 与线上 JSON 历史上已不同步，JSON 里才是经过 SEO 校验
    # （title ≤70 渲染字符、desc ≤175）并在用的版本。若用 md 覆盖，会把超长 title 写回线上。
    # 重新生成 md_to_blog 的目的只是把「正文 content」同步过去，元数据不动。
    category, read_time, image, description = "Design Guide", "8 min read", "", ""
    title, date = "", ""
    if os.path.exists(out):
        with open(out, "r", encoding="utf-8") as f:
            existing = json.load(f)
        category = existing.get("category", category)
        read_time = existing.get("readTime", read_time)
        image = existing.get("image", image)
        description = existing.get("description", description)
        title = existing.get("title", title)
        date = existing.get("date", date)

    post = {
        "slug": slug,
        "title": title or fm["title"],
        "description": description or fm.get("description", ""),
        "date": date or fm.get("date", ""),
        "category": category,
        "readTime": read_time,
        "image": image or fm.get("image", ""),
        "content": content,
    }

    with open(out, "w", encoding="utf-8") as f:
        json.dump(post, f, ensure_ascii=False, indent=2)
    print("updated", out, "| chars:", len(content), "| cat:", category, "| rt:", read_time)
