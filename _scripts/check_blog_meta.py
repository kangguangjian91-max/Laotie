#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
博客元数据体检（SEO 守卫）

检查三件事，防止 md → JSON 同步时把 SEO 元数据改坏：
  1. md 文件名 与 frontmatter 里的 slug 是否一致（不一致会导致按文件名生成出重复 JSON）
  2. 每篇 JSON 的 title 渲染长度是否 ≤70（& 渲染成 &amp;，+4/个）
  3. description 渲染长度是否 ≤175、image/category/readTime 是否缺失

用法: python _scripts/check_blog_meta.py
"""
import glob
import json
import os
import re
import sys

TITLE_MAX = 70
DESC_MAX = 175

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(root)

problems = []

# ---- 1. slug 一致性 ----
print("=== 1. md 文件名 vs frontmatter slug ===")
mismatch = []
for f in sorted(glob.glob("content/blog/*.md")):
    base = os.path.basename(f)[:-3]
    raw = open(f, encoding="utf-8").read()
    m = re.search(r'^slug:\s*"?([^"\n]+)"?\s*$', raw, re.M)
    if m and m.group(1).strip() != base:
        mismatch.append((base, m.group(1).strip()))
if mismatch:
    for b, s in mismatch:
        print(f"  ⚠️ 文件名 {b}")
        print(f"     slug   {s}")
        problems.append(f"slug 不一致: {b}")
else:
    print("  ✅ 全部一致")

# ---- 2/3. JSON 元数据 ----
print("\n=== 2. JSON title / description 长度 ===")
n = 0
bad_title, bad_desc, missing = [], [], []
for f in sorted(glob.glob("public/data/blog/*.json")):
    if os.path.basename(f) == "blog-list.json":
        continue
    d = json.load(open(f, encoding="utf-8"))
    if not isinstance(d, dict):
        continue
    n += 1
    name = os.path.basename(f)
    t = d.get("title", "")
    if len(t.replace("&", "&amp;")) > TITLE_MAX:
        bad_title.append((len(t.replace("&", "&amp;")), name, t))
    s = d.get("description", "")
    if len(s.replace("&", "&amp;")) > DESC_MAX:
        bad_desc.append((len(s.replace("&", "&amp;")), name))
    for k in ("image", "category", "readTime", "content"):
        if not d.get(k):
            missing.append((name, k))

print(f"  共 {n} 篇")
if bad_title:
    for ln, nm, t in bad_title:
        print(f"  ❌ title {ln} 字符: {nm}")
        print(f"     {t}")
        problems.append(f"title 超限: {nm}")
else:
    print(f"  ✅ title 全部 ≤{TITLE_MAX}")

if bad_desc:
    for ln, nm in bad_desc:
        print(f"  ❌ desc {ln} 字符: {nm}")
        problems.append(f"desc 超限: {nm}")
else:
    print(f"  ✅ description 全部 ≤{DESC_MAX}")

print("\n=== 3. 必填字段 ===")
if missing:
    for nm, k in missing:
        print(f"  ❌ 缺 {k}: {nm}")
        problems.append(f"缺字段 {k}: {nm}")
else:
    print("  ✅ image / category / readTime / content 齐全")

print("\n" + ("=" * 46))
if problems:
    print(f"❌ 发现 {len(problems)} 个问题，需修复后再提交")
    sys.exit(1)
print("✅ 元数据体检全部通过")
