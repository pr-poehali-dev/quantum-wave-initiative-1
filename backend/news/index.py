import os
import json
import urllib.request
import urllib.parse
import time

CATEGORY_QUERIES = {
    "ai": "artificial intelligence OR ChatGPT OR OpenAI OR machine learning",
    "robotics": "robotics OR robot technology OR Boston Dynamics OR humanoid robot",
    "space": "space technology OR SpaceX OR NASA OR rocket launch OR Mars mission",
}

CATEGORY_LABELS = {
    "ai": "Искусственный интеллект",
    "robotics": "Робототехника",
    "space": "Космос",
}


def translate(text: str) -> str:
    """Переводит текст с английского на русский через MyMemory API."""
    if not text:
        return text
    url = "https://api.mymemory.translated.net/get?" + urllib.parse.urlencode({
        "q": text[:500],
        "langpair": "en|ru",
    })
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "FutureWave/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
        translated = data.get("responseData", {}).get("translatedText", "")
        return translated if translated else text
    except Exception:
        return text


def handler(event: dict, context) -> dict:
    """Получает и переводит на русский актуальные новости по темам AI, робототехники и космоса."""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    api_key = os.environ.get("NEWSAPI_KEY")
    params = event.get("queryStringParameters") or {}
    category = params.get("category", "all")
    page_size = min(int(params.get("pageSize", 6)), 6)

    if category == "all":
        query = " OR ".join([
            "artificial intelligence",
            "robotics",
            "space technology SpaceX NASA",
        ])
    else:
        query = CATEGORY_QUERIES.get(category, CATEGORY_QUERIES["ai"])

    url = "https://newsapi.org/v2/everything?" + urllib.parse.urlencode({
        "q": query,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": page_size,
        "apiKey": api_key,
    })

    req = urllib.request.Request(url, headers={"User-Agent": "FutureWave/1.0"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode())

    articles = []
    for item in data.get("articles", []):
        if not item.get("title") or item["title"] == "[Removed]":
            continue

        if category == "all":
            title_lower = item["title"].lower()
            desc_lower = (item.get("description") or "").lower()
            text = title_lower + " " + desc_lower
            if any(w in text for w in ["robot", "robotics", "drone", "autonomous machine"]):
                cat_key = "robotics"
            elif any(w in text for w in ["space", "nasa", "spacex", "rocket", "mars", "moon", "satellite", "astronaut"]):
                cat_key = "space"
            else:
                cat_key = "ai"
        else:
            cat_key = category

        title_ru = translate(item["title"])
        time.sleep(0.3)
        excerpt_ru = translate(item.get("description") or "")
        time.sleep(0.3)

        articles.append({
            "id": item.get("url", ""),
            "title": title_ru,
            "excerpt": excerpt_ru,
            "date": (item.get("publishedAt") or "")[:10],
            "source": item.get("source", {}).get("name", ""),
            "url": item.get("url", ""),
            "image": item.get("urlToImage") or "",
            "category": CATEGORY_LABELS.get(cat_key, "Искусственный интеллект"),
            "categoryKey": cat_key,
        })

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"articles": articles, "total": len(articles)}, ensure_ascii=False),
    }
