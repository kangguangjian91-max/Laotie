#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
AI Flavor Audit for Laotie Steel English blog corpus.
量化「AI 味」：套路词密度 / 结构指纹 / 节奏均匀度 / 词汇多样性 / 具体性 / em dash。
只读分析，不修改任何文件。

用法: python _scripts/ai_flavor_audit.py
输出: stdout 表格 + AI_FLAVOR_REPORT.md
"""
import os
import re
import statistics
import json
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(ROOT, "content", "blog")

# ---------- A. AI 套路词（按严重程度分组） ----------
HEAVY = [
    r"\bdelv(e|ing|ed)\b", r"\btestament to\b", r"\btapestry\b", r"\brealm of\b",
    r"\bparadigm\b", r"\bsynergy\b|\bsynergies\b", r"\bholistic\b",
    r"\bgame[- ]chang(er|ing)\b", r"\bever[- ]evolving\b", r"\bcutting[- ]edge\b",
    r"\bstate[- ]of[- ]the[- ]art\b", r"\bunparalleled\b", r"\bmeticulous\b",
    r"\bcornerstone\b", r"\blabdary\b", r"\bnavigate the\b", r"\brobust and\b",
    r"\bseamless(ly)?\b", r"\bunlock the\b", r"\bempower(s|ing)?\b",
    r"\belevate (your|the) \w+", r"\bstreamlin(e|es|ing)\b",
]
MEDIUM = [
    r"\bin today's\b", r"\blandscape\b", r"\bcrucial\b", r"\bpivotal\b",
    r"\bunderscore(s|d|ing)?\b", r"\brobust\b", r"\bcrucial role\b",
    r"\bmultifaceted\b", r"\bmyriad\b", r"\bplethora\b",
    r"^#*.*\bfurthermore\b", r"^#*.*\bmoreover\b", r"^#*.*\badditionally\b",
    r"\bin conclusion\b", r"\bfinal thoughts\b", r"\blet's dive\b",
    r"\bdive into\b", r"\bit('s| is) important to note\b",
    r"\bit('s| is) worth noting\b", r"\bultimately\b", r"\bwhen it comes to\b",
    r"\bbuckle up\b", r"\bat the end of the day\b",
]
WEAK = [
    r"\bgenerally\b", r"\btypically\b", r"\bvarious\b", r"\bseveral\b",
    r"\bnumerous\b", r"\ba wide range of\b", r"\bensure(s|d|ing)? that\b",
    r"\bplays a (vital|key|crucial) role\b", r"\bnot only\b.{0,40}\bbut also\b",
]

# ---------- 具体性信号（真工程师文本里多的东西） ----------
CONCRETE = [
    # 牌号必须带可选后缀字母，否则 Q355B / S355JR 会因 \b 不成立而漏匹配
    r"\bQ\d{3}[A-Z]?\b", r"\bS\d{3}[A-Z]{0,2}\b", r"\bG\d{3}\b", r"\bZ\d{3}\b",
    r"\bASTM\b", r"\bA\d{2,3}\b", r"\bEN \d+\b", r"\bEN 1090\b", r"\bGB/T?\s?\d+",
    r"\bmm\b", r"\bkg/m", r"\bMPa\b", r"\bkN\b", r"\$[\d,]+", r"\b±\d",
    r"\bU-value\b", r"\bH-section\b", r"\bC/Z\b", r"\bsandwich panel\b",
    # 非美元货币（₱菲律宾比索 / ₫越南盾 / Rp印尼盾 / €£¥）——只认 $ 会漏判整篇区域成本文
    r"[₱₫€£¥]\s?[\d.,]+[KMB]?", r"\bRp\s?[\d.,]+", r"\b(PHP|IDR|VND|AUD|SGD)\b",
    # 国家建筑规范代号（NSCP/SNI/TCVN/AISC/Eurocode…）
    r"\b(NSCP|SNI|TCVN|AISC|Eurocode|ASCE|IBC|PEZA|BOC|NPWP)\b",
    r"\b\d+\+?\s?(kph|km/h|mph)\b", r"\b\d+\s?(days|weeks)\b",
    r"\bwe (tested|measured|ship|shipped|fabricat)\w*\b",
    r"\bon[- ]site\b", r"\bour (crew|team|shop|factory|plant)\b",
    r"\bISO 9001\b", r"\bCE (mark|certif)\w*\b",
]

SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")


def strip_code_fences(text):
    return re.sub(r"```.*?```", " ", text, flags=re.S)


def body_rows(md):
    """返回正文行（去掉 frontmatter、代码块、标题行、纯表格分隔行）。"""
    lines = []
    in_fm = False
    fm_done = False
    fence = False
    for ln in md.splitlines():
        if ln.strip() == "---" and not fm_done:
            in_fm = not in_fm
            if not in_fm:
                fm_done = True
            continue
        if in_fm:
            continue
        if ln.strip().startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        lines.append(ln)
    txt = "\n".join(lines)
    txt = strip_code_fences(txt)
    rows = []
    for ln in txt.splitlines():
        s = ln.strip()
        if not s:
            continue
        if s.startswith("|"):          # 表格行不算 AI 味样本
            continue
        if s.startswith("> "):         # 引用块
            continue
        if s.startswith("#"):          # 标题单独处理
            continue
        if re.fullmatch(r"[-*+]\s+.*", s):
            s = re.sub(r"^[-*+]\s+", "", s)
        rows.append(s)
    return rows


def count_patterns(text, pats):
    n = 0
    hits = Counter()
    for p in pats:
        m = re.findall(p, text, flags=re.I | re.M)
        if m:
            n += len(m)
            hits[p] = len(m)
    return n, hits


def analyze(path):
    with open(path, "r", encoding="utf-8") as f:
        md = f.read()
    rows = body_rows(md)
    body = " ".join(rows)
    words = re.findall(r"[A-Za-z][A-Za-z'-]*", body)
    wc = max(1, len(words))

    heavy, heavy_hits = count_patterns(body, HEAVY)
    medium, med_hits = count_patterns(body, MEDIUM)
    weak, weak_hits = count_patterns(body, WEAK)
    concrete, conc_hits = count_patterns(body, CONCRETE)

    sents = [s.strip() for s in SENT_SPLIT.split(body) if len(s.strip()) > 1]
    sents = [s for s in sents if len(re.findall(r"[A-Za-z]", s)) > 3]
    slen = [len(re.findall(r"[A-Za-z][A-Za-z'-]*", s)) for s in sents]
    if len(slen) >= 2:
        mean_sl = statistics.mean(slen)
        cv = statistics.pstdev(slen) / mean_sl if mean_sl else 0
    else:
        mean_sl, cv = 0, 0

    # 段落节奏：相邻段字数变异系数（AI 段落长度过度均匀）
    plen = [len(re.findall(r"[A-Za-z][A-Za-z'-]*", r)) for r in rows]
    plen = [p for p in plen if p >= 15]
    p_cv = (statistics.pstdev(plen) / statistics.mean(plen)) if len(plen) >= 3 else 0

    # 词汇多样性
    ttr = len(set(w.lower() for w in words)) / wc

    # 句首词重复
    firsts = Counter()
    for s in sents:
        w = re.findall(r"[A-Za-z][A-Za-z'-]*", s)
        if w:
            firsts[w[0].lower()] += 1
    top_share = sum(c for _, c in firsts.most_common(10)) / max(1, len(sents))

    # 破折号必须分开统计：
    #   em dash "—" = 插入语/断句，LLM 高发 → 真正的 AI 指纹
    #   en dash "–" = 数字范围（30–50%、$9–$15），是正确排版，不计入
    em = body.count("—")
    en = body.count("–")
    exclaim = body.count("!")

    # ---------- 综合 AI 味打分（0-100）----------
    # 每项先归一化到 0~1 的 penalty，再加权求和；避免单一维度把分数撑爆。
    pm = lambda n: (n / wc) * 1000.0          # 每千词命中数

    p_heavy = min(1.0, pm(heavy) / 4.0)
    p_medium = min(1.0, pm(medium) / 8.0)
    p_weak = min(1.0, pm(weak) / 12.0)
    # em dash "—"：人类写作每千词 <2 个属正常，超出部分线性罚
    p_em = min(1.0, max(0.0, pm(em) - 2.0) / 10.0)
    p_sent = max(0.0, (0.55 - cv) / 0.55)             # 句长过度均匀
    p_para = max(0.0, (0.60 - p_cv) / 0.60)           # 段长过度均匀
    p_ttr = max(0.0, (0.50 - ttr) / 0.50)             # 词汇贫乏
    p_first = min(1.0, max(0.0, (top_share - 0.28) / 0.30))   # 句首词重复
    b_conc = min(1.0, pm(concrete) / 15.0)            # 具体细节（反向加分）

    raw = (0.22 * p_heavy + 0.15 * p_medium + 0.07 * p_weak
           + 0.12 * p_em + 0.10 * p_sent + 0.08 * p_para
           + 0.08 * p_ttr + 0.08 * p_first
           - 0.20 * b_conc)
    score = max(0.0, min(100.0, raw * 100.0 / 0.80))  # 0.80 = 正向项权重和
    score = max(0.0, min(100.0, score))

    return {
        "file": os.path.basename(path),
        "words": wc,
        "heavy": heavy, "medium": medium, "weak": weak,
        "concrete": concrete,
        "sent_cv": round(cv, 3),
        "para_cv": round(p_cv, 3),
        "ttr": round(ttr, 3),
        "top10_first": round(top_share, 3),
        "em_dash": em,
        "en_dash": en,
        "exclaim": exclaim,
        "score": round(score, 1),
        "_hits": {"heavy": heavy_hits.most_common(6),
                  "medium": med_hits.most_common(8),
                  "concrete": conc_hits.most_common(6)},
    }


def band(s):
    if s >= 45: return "🔴 重"
    if s >= 30: return "🟠 中"
    if s >= 18: return "🟡 轻"
    return "✅ 干净"


def main():
    files = sorted([os.path.join(BLOG_DIR, f) for f in os.listdir(BLOG_DIR)
                    if f.endswith(".md")])
    res = [analyze(f) for f in files]
    res.sort(key=lambda r: -r["score"])

    lines = []
    lines.append("# 博客「AI 味」量化审计报告\n")
    lines.append(f"- 样本：{len(res)} 篇英文博客（`content/blog/*.md`）")
    lines.append("- 方法：套路词密度 + 结构指纹 + 句/段节奏变异系数 + 词汇多样性 + 具体性反向加分")
    lines.append("- 分数越高越像 AI 生成。判级：🔴≥45 重 / 🟠30-45 中 / 🟡18-30 轻 / ✅<18 干净\n")

    lines.append("## 总览（按 AI 味降序）\n")
    lines.append("| # | 文件 | 词数 | 🔴重罪 | 🟠中罪 | 🟡弱 | 具体细节 | 句长CV | 段长CV | TTR | em— | 千词em | AI味分 | 级别 |")
    lines.append("|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|")
    for i, r in enumerate(res, 1):
        kpm = round((r["em_dash"] / max(1, r["words"])) * 1000, 1)
        lines.append(f"| {i} | `{r['file']}` | {r['words']} | {r['heavy']} | {r['medium']} | "
                     f"{r['weak']} | {r['concrete']} | {r['sent_cv']} | {r['para_cv']} | "
                     f"{r['ttr']} | {r['em_dash']} | {kpm} | **{r['score']}** | {band(r['score'])} |")

    avg = round(statistics.mean(r["score"] for r in res), 1)
    lines.append(f"\n**语料平均分：{avg}**\n")

    bands = Counter(band(r["score"]) for r in res)
    lines.append("| 级别 | 篇数 |")
    lines.append("|---|---:|")
    for b in ["🔴 重", "🟠 中", "🟡 轻", "✅ 干净"]:
        lines.append(f"| {b} | {bands.get(b,0)} |")

    lines.append("\n## Top 命中词（全场合计）\n")
    agg = Counter()
    for r in res:
        for grp in ("heavy", "medium"):
            for p, c in r["_hits"].get(grp, []):
                agg[p] += c
    lines.append("| 套路写法 | 命中次数 |")
    lines.append("|---|---:|")
    for p, c in agg.most_common(18):
        lines.append(f"| `{p}` | {c} |")

    lines.append("\n## 优先改写清单（AI 味 ≥30）\n")
    todo = [r for r in res if r["score"] >= 30]
    for i, r in enumerate(todo, 1):
        lines.append(f"{i}. `{r['file']}` — {r['score']} 分 {band(r['score'])}")
        hs = ", ".join(f"`{p}`×{c}" for p, c in r["_hits"]["heavy"][:4])
        ms = ", ".join(f"`{p}`×{c}" for p, c in r["_hits"]["medium"][:5])
        if hs: lines.append(f"   - 重罪：{hs}")
        if ms: lines.append(f"   - 中罪：{ms}")
        lines.append(f"   - 具体细节只有 {r['concrete']} 处（工程师文本应 ≥ 词数/100，即 ~{max(1,r['words']//100)} 处）")

    out = os.path.join(ROOT, "AI_FLAVOR_REPORT.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print("\n".join(lines[:40]))
    print(f"\n[+] 完整报告: {out}")
    print(f"[+] 平均分 {avg} | 需改写(>=30): {len(todo)}/{len(res)} 篇")


if __name__ == "__main__":
    main()
