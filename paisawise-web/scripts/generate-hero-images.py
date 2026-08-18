#!/usr/bin/env python3
"""
Generate the hero backdrop photography with the Gemini image API.

    export GEMINI_API_KEY=...      # never commit this
    python3 scripts/generate-hero-images.py

Writes public/hero/hero-0N.png, replacing the generated placeholders. After
running, update the manifest in src/lib/hero-images.ts to point at .png (or
convert to .jpg first -- see HERO-IMAGES.md for the weight budget).

Art direction is not decoration here, it is load-bearing. The hero scrim is an
ellipse over the LEFT copy column, so a subject placed left gets buried; every
prompt therefore puts the subject in the right third and keeps the left open.
The plates also sit behind display type, so they are graded muted and
low-contrast on purpose.
"""
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request

MODEL = "gemini-3.1-flash-image"   # Nano Banana 2; see `models?key=` for current ids

COMMON = (
    " Composition: the person sits in the RIGHT third of a wide landscape frame, "
    "with the left third open, quiet and softly out of focus so headline text can sit "
    "over it. Muted, desaturated, low-contrast grade with soft warm neutral tones; "
    "nothing bright white or heavily saturated. Candid editorial documentary style, "
    "not stock-photo posed. No text, no watermarks, no logos, no readable screen "
    "content, no brand marks."
)

SCENES = [
    ("hero-01", "Salaried professional at a laptop",
     "A photorealistic editorial photograph of an Indian man in his early 30s in a plain "
     "button-down shirt, sitting at a small dining table at home in the evening, looking "
     "down at a laptop with a calm, thoughtful expression. Environment: a modest Indian "
     "apartment, warm lamp light, a mug and a notebook on the table, a softly blurred "
     "window behind him. Shot at 35mm f/2.0, natural window light mixed with warm "
     "interior lamp light."),
    ("hero-02", "Couple reviewing the month together",
     "A photorealistic editorial photograph of an Indian couple in their early 30s sitting "
     "together on a sofa, one holding a phone, both looking at it and talking, relaxed and "
     "unposed. Environment: a lived-in Indian living room, cushions, a low table with tea, "
     "soft daylight from the side. Shot at 50mm f/2.2, soft diffused daylight."),
    ("hero-03", "Advisor call on a phone",
     "A photorealistic editorial photograph of an Indian woman in her late 20s in smart "
     "casual clothes, standing near a window holding a phone to her ear mid-conversation, a "
     "notepad in her other hand. Environment: a quiet corner of a modern Indian office, "
     "muted grey and warm wood tones, plants softly blurred behind. Shot at 85mm f/2.0, "
     "soft overcast window light."),
    ("hero-04", "Paying at a counter with UPI",
     "A photorealistic editorial photograph of an Indian woman in her 30s holding up a phone "
     "to pay at a small neighbourhood shop counter, shopkeeper partly visible and softly out "
     "of focus. Environment: a warm, cluttered Indian storefront in the late afternoon, "
     "shelves blurred behind. Shot at 35mm f/2.8, warm low-angle afternoon light."),
]


def main() -> int:
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        print("Set GEMINI_API_KEY (https://aistudio.google.com/apikey)", file=sys.stderr)
        return 1

    url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
           f"{MODEL}:generateContent?key={key}")
    os.makedirs("public/hero", exist_ok=True)
    failures = 0

    for name, describes, prompt in SCENES:
        payload = json.dumps({
            "contents": [{"parts": [{"text": prompt + COMMON}]}],
            "generationConfig": {
                "responseModalities": ["TEXT", "IMAGE"],
                "temperature": 0.85,
                "imageConfig": {"aspectRatio": "16:9"},
            },
        }).encode()
        req = urllib.request.Request(
            url, data=payload,
            headers={"Content-Type": "application/json", "User-Agent": "ImageGen/1.0"})
        try:
            result = json.loads(urllib.request.urlopen(req, timeout=180).read())
        except urllib.error.HTTPError as exc:
            detail = exc.read()[:200].decode(errors="replace")
            # 429 here is almost always the free-tier daily image quota, not a bad key.
            print(f"  {name}: HTTP {exc.code} {detail}", file=sys.stderr)
            failures += 1
            continue

        for part in result["candidates"][0]["content"]["parts"]:
            if "inlineData" in part:
                data = base64.b64decode(part["inlineData"]["data"])
                path = f"public/hero/{name}.png"
                with open(path, "wb") as handle:
                    handle.write(data)
                print(f"  {path}  {len(data):,} bytes  ({describes})")
                break
        else:
            print(f"  {name}: response carried no image", file=sys.stderr)
            failures += 1
        time.sleep(1)

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
