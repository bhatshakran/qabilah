import re
import json
import argparse
from pathlib import Path


# -------------------------
# ARGUMENTS
# -------------------------

parser = argparse.ArgumentParser(
    description="Tokenize Arabic news article into Reader JSON format"
)

parser.add_argument("input_file", help="Path to article text file")

parser.add_argument("--id", required=True, help="Article ID")
parser.add_argument("--headline", required=True, help="Article headline/title")
parser.add_argument("--date", required=True, help="Publication date (YYYY-MM-DD)")
parser.add_argument("--source", required=True, help="News source")
parser.add_argument("--author", default=None, help="Author name (optional)")

args = parser.parse_args()


# -------------------------
# LOAD ARTICLE TEXT
# -------------------------

raw_text = Path(args.input_file).read_text(encoding="utf-8")

raw_text = raw_text.replace("\r\n", "\n").replace("\r", "\n")
raw_text = re.sub(r"[ \t]+", " ", raw_text)


# -------------------------
# SPLIT INTO PARAGRAPHS
# -------------------------

paragraphs_raw = [p.strip() for p in raw_text.split("\n\n") if p.strip()]


# -------------------------
# SENTENCE SPLITTING
# -------------------------

SENTENCE_SPLIT_RE = re.compile(r"(?<=[.!؟])\s+")


# -------------------------
# TOKENIZER
# -------------------------

arabic_punct = r"[،؛:!؟()\[\]«»…—\-\"']"

def tokenize(sentence: str):
    cleaned = re.sub(arabic_punct, "", sentence)
    tokens = cleaned.split()
    return [t for t in tokens if t]


# -------------------------
# BUILD ARTICLE STRUCTURE
# -------------------------

article = {
    "id": args.id,
    "headline": args.headline,
    "date": args.date,
    "source": args.source,
    "author": args.author,
    "paragraphs": [],
}


for p_idx, para in enumerate(paragraphs_raw, start=1):

    para_obj = {
        "paragraphIndex": p_idx,
        "sentences": [],
    }

    sentences = SENTENCE_SPLIT_RE.split(para)

    for s_idx, sentence in enumerate(sentences, start=1):

        sentence = sentence.strip()
        if not sentence:
            continue

        tokens = tokenize(sentence)

        sentence_obj = {
            "id": f"p{p_idx}_s{s_idx}",
            "ar": sentence,
            "en": None,
            "tokens": [
                {"surface": tok, "index": i}
                for i, tok in enumerate(tokens)
            ],
        }

        para_obj["sentences"].append(sentence_obj)

    article["paragraphs"].append(para_obj)


# -------------------------
# SAVE
# -------------------------

output_path = Path(args.input_file).with_suffix(".json")

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(article, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {output_path}")
