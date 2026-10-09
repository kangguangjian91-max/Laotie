#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
em dash 瘦身器（去 AI 味）

把 content/blog/*.md 正文里密度过高的 em dash "—" 按语法规则替换为
冒号 / 逗号 / 句号，把密度从 ~13/千词 降到 ~5/千词（人类写作区间）。

规则（保守优先，宁可少改也不错改）：
  R1 行首引导 "— xxx"            -> "- xxx"（保持列表语义）
  R2 左侧以 .!? 结尾（句间）      -> ". " + 右侧首字母大写
  R3 右侧首字母大写（解释/列举）   -> ": "
  R4 插入语 + 配额超限           -> 短的(<=5词)改 ", "；以 or/and/but 开头改 ", "；
                                    长的改 ". " + 首字母大写
保留配额：每篇保留 词数/1000*TARGET 个"最有存在价值"的（右侧最长的）插入语。

只处理正文：跳过 frontmatter、代码块、表格行、标题行、HTML 注释。
用法: python _scripts/emdash_slim.py [--apply]   (默认 dry-run 只打印清单)
"""
import re
import sys
import glob
import os

TARGET_PER_K = 5       # 目标密度：每千词保留几个
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(ROOT, "content", "blog")
CONJ = ("or", "and", "but", "nor", "yet", "so", "because", "which", "though")

WORD_RE = re.compile(r"[A-Za-z][A-Za-z'-]*")


def is_skippable(line):
    s = line.strip()
    return (not s or s.startswith(("|", "#", ">", "```", "<!--", "!", "["))
            or s.startswith("---"))


def split_candidates(text):
    """返回 (可替换位置列表)。只取正文段落里的 ' — '。"""
    out = []
    for m in re.finditer(r"(?<= )—(?= )", text):
        i = m.start()
        # 右侧内容：到本行末或下一个句子终止符
        rest = text[i + 2:]
        stop = re.search(r"(?<=[.!?])\s", rest)
        right = rest[:stop.start()] if stop else rest.split("\n")[0]
        left = text[max(0, i - 200):i]
        out.append({"pos": i, "left": left, "right": right})
    return out


def classify(c):
    left, right = c["left"].rstrip(), c["right"].lstrip()
    if not left or left.endswith(("\n", "|")):
        return "R1"
    if left.endswith((".", "!", "?")):
        return "R2"
    if right[:1].isupper():
        return "R3"
    if right.split(" ")[0].lower().strip(",") in CONJ:
        return "R4-conj"
    return "R4"


def capitalize(s):
    return s[:1].upper() + s[1:] if s else s


def apply_rule(text, c, rule):
    """在 text 上把位置 c['pos'] 的 '—' 替换掉，返回 (新text, 展示串)"""
    i = c["pos"]
    before, after = text[:i], text[i + 1:]
    if rule == "R1":
        return before + "-" + after, "— » -"
    if rule == "R2":
        return before.rstrip() + ". " + capitalize(after.lstrip()), "— » . "
    if rule == "R3":
        return before.rstrip() + ": " + after.lstrip(), "— » : "
    # R4
    right_words = len(WORD_RE.findall(c["right"]))
    if right_words <= 5 or rule == "R4-conj":
        return before.rstrip() + ", " + after.lstrip(), "— » , "
    return before.rstrip() + ". " + capitalize(after.lstrip()), "— » . "


def process(md):
    lines = md.split("\n")
    # frontmatter
    fm_end = 0
    if lines and lines[0].strip() == "---":
        for k in range(1, len(lines)):
            if lines[k].strip() == "---":
                fm_end = k
                break
    body = "\n".join(lines[fm_end + 1:])
    words = len(WORD_RE.findall(body))
    quota = max(1, int(words / 1000 * TARGET_PER_K))

    # ---- 阶段1：收集全篇候选 ----
    out_lines = list(lines)
    fence = False
    per_line = {}           # idx -> [(rule, cand)]
    r4_all = []             # (idx, cand) 全篇 R4 候选
    for idx in range(fm_end + 1, len(lines)):
        ln = lines[idx]
        if ln.strip().startswith("```"):
            fence = not fence
            continue
        if fence or is_skippable(ln):
            continue
        if "—" not in ln:
            continue
        items = []
        for c in split_candidates(ln):
            r = classify(c)
            items.append((r, c))
            if r.startswith("R4"):
                r4_all.append((idx, c, r))
        if items:
            per_line[idx] = items

    # ---- 阶段2：全篇配额 —— 保留右侧最长的 quota 个 R4 ----
    r4_all.sort(key=lambda t: -len(WORD_RE.findall(t[1]["right"])))
    keep = set((idx, c["pos"]) for idx, c, _ in r4_all[:quota])

    # ---- 阶段3：逐行应用 ----
    changes = []
    for idx, items in per_line.items():
        ln = lines[idx]
        todo = [(r, c) for r, c in items
                if not (r.startswith("R4") and (idx, c["pos"]) in keep)]
        for r, c in sorted(todo, key=lambda t: -t[1]["pos"]):
            ln, tag = apply_rule(ln, c, r)
            changes.append((idx, tag, c["left"][-45:].strip(), c["right"][:45].strip()))
        out_lines[idx] = ln

    return "\n".join(out_lines), changes, words, quota


def main():
    do_apply = "--apply" in sys.argv
    files = sorted(glob.glob(os.path.join(BLOG_DIR, "*.md")))
    total_before = total_after = 0
    report = []

    for f in files:
        src = open(f, encoding="utf-8").read()
        before = src.count("—")
        new, changes, words, quota = process(src)
        after = new.count("—")
        total_before += before
        total_after += after
        if changes:
            report.append((os.path.basename(f), words, before, after, quota, changes))
            if do_apply:
                open(f, "w", encoding="utf-8").write(new)

    mode = "已写入" if do_apply else "DRY-RUN"
    print(f"[{mode}] em dash 总数 {total_before} -> {total_after}")
    for name, words, b, a, quota, ch in report:
        kpm_b = b / max(1, words) * 1000
        kpm_a = a / max(1, words) * 1000
        print(f"\n### {name}\n  词数={words}  em {b}->{a}  ({kpm_b:.1f} -> {kpm_a:.1f}/千词)  保留配额={quota}  改动={len(ch)}")
        for idx, tag, left, right in ch[:6]:
            print(f"    L{idx+1} {tag}  …{left}  ⟦⟧  {right}…")
        if len(ch) > 6:
            print(f"    …另有 {len(ch)-6} 处")


if __name__ == "__main__":
    main()
