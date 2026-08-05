"""Remove deprecated FAQPage JSON-LD schema from all pages."""
import re
import sys

# Type A files: geo pages — identical pattern
TYPE_A_FILES = [
    r"src\app\steel-structure-australia\page.tsx",
    r"src\app\steel-structure-brazil\page.tsx",
    r"src\app\steel-structure-india\page.tsx",
    r"src\app\steel-structure-indonesia\page.tsx",
    r"src\app\steel-structure-logistics-center\page.tsx",
    r"src\app\steel-structure-nigeria\page.tsx",
    r"src\app\steel-structure-philippines\page.tsx",
    r"src\app\steel-structure-price-guide\page.tsx",
    r"src\app\steel-structure-saudi-arabia\page.tsx",
    r"src\app\steel-structure-thailand\page.tsx",
    r"src\app\steel-structure-uae\page.tsx",
    r"src\app\steel-structure-vietnam\page.tsx",
]

base_dir = r"C:\Users\kang\WorkBuddy\2026-06-04-15-29-02\laotie-steel"

for rel_path in TYPE_A_FILES:
    filepath = f"{base_dir}\\{rel_path}"
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Step 1: Remove the faqSchema constant block
    # Pattern: "const faqSchema = {\n" ... "};\n" (any content in between, non-greedy)
    # followed by a blank line and "export default function"
    pattern_faq_block = r'\nconst faqSchema = \{.*?\};\n'
    new_content = re.sub(pattern_faq_block, '\n', content, count=1, flags=re.DOTALL)

    if new_content == content:
        print(f"  WARN: faqSchema block not found in {rel_path}")
        continue

    # Step 2: Remove the rendering line: <JsonLd data={faqSchema} />
    pattern_faq_render = r'        <JsonLd data=\{faqSchema\} />\n'
    new_content = re.sub(pattern_faq_render, '', new_content, count=1)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  OK: {rel_path}")

print("\nType A files done!")
