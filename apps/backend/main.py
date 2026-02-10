import re
import json
from docx import Document

def parse_arabic_list(file_path):
    doc = Document(file_path)
    words_data = []
    rank = 1
    # Regex to match: Arabic : English
    # It handles multiple meanings, examples, and the grammar notes in your file
    pattern = r'\\s*([^:]+)\s*:\s*(.*)'

    for para in doc.paragraphs:
        line = para.text.strip()
        if not line:
            continue
            
        match = re.search(pattern, line)
        if ":" in line:
            # split(separator, maxsplit) -> 1 ensures it only splits at the first colon
            parts = line.split(":", 1)
            
            arabic = parts[0].strip()
            english = parts[1].strip()

            words_data.append({
                "rank": rank,
                "arabic": arabic,
                "english": english,
                "transliteration": "", # Placeholder
                "type": "",        # Placeholder
                "level": "easy",      # Placeholder
                "examples": []
            })
            rank += 1


    return words_data

# Run the parser
data = parse_arabic_list('data.docx')

# Save to JSON
with open('words_seed.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully parsed {len(data)} words into words_seed.json")