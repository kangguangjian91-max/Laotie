"""Remove FAQPage from Indonesia page (different pattern — inside component function)"""
import re

filepath = r"C:\Users\kang\WorkBuddy\2026-06-04-15-29-02\laotie-steel\src\app\steel-structure-indonesia\page.tsx"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern: "  const faqSchema = {\n" ... "  };\n\n  return (\n" (non-greedy)
pattern = r'  const faqSchema = \{.*?\};\n\n  return \('
new_content = re.sub(pattern, '  return (', content, count=1, flags=re.DOTALL)

# Remove rendering line: "      <JsonLd data={faqSchema} />\n"
new_content = re.sub(r'      <JsonLd data=\{faqSchema\} />\n', '', new_content, count=1)

if new_content != content:
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    # Verify no FAQPage remains
    if "FAQPage" in new_content:
        print("WARN: FAQPage still found in file after edit!")
    else:
        print("OK: Indonesia FAQPage removed")
else:
    print("ERROR: No match found in Indonesia file")
