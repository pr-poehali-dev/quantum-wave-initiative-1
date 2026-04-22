import os
import json
import psycopg2

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Получает и обновляет лайки/дизлайки для статей."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    method = event.get("httpMethod", "GET")

    # GET — получить счётчики для статьи
    if method == "GET":
        params = event.get("queryStringParameters") or {}
        url = params.get("url", "")
        if not url:
            return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "url required"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "SELECT likes, dislikes FROM article_reactions WHERE article_url = %s",
            (url,)
        )
        row = cur.fetchone()
        conn.close()

        likes, dislikes = row if row else (0, 0)
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"likes": likes, "dislikes": dislikes}),
        }

    # POST — добавить реакцию
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        url = body.get("url", "")
        reaction = body.get("reaction", "")  # "like" или "dislike"

        if not url or reaction not in ("like", "dislike"):
            return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "invalid params"})}

        field = "likes" if reaction == "like" else "dislikes"

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""
            INSERT INTO article_reactions (article_url, {field})
            VALUES (%s, 1)
            ON CONFLICT (article_url)
            DO UPDATE SET {field} = article_reactions.{field} + 1, updated_at = NOW()
            RETURNING likes, dislikes
            """,
            (url,)
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"likes": row[0], "dislikes": row[1]}),
        }

    return {"statusCode": 405, "headers": CORS_HEADERS, "body": json.dumps({"error": "method not allowed"})}
