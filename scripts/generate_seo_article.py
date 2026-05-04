#!/usr/bin/env python3
"""Generate a repo-stored SEO article and publishable HTML page."""

from __future__ import annotations

import datetime as dt
import html
import json
import os
import re
import sys
import textwrap
import urllib.error
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ARTICLES_DIR = ROOT / "articles"
BLOG_FILE = ROOT / "blog.html"


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "seo-article"


def get_env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


def read_site_context() -> str:
    parts: list[str] = []
    for name in ("index.html", "blog.html"):
        path = ROOT / name
        if path.exists():
            text = re.sub(r"<script[\s\S]*?</script>", " ", path.read_text(encoding="utf-8", errors="ignore"))
            text = re.sub(r"<style[\s\S]*?</style>", " ", text)
            text = re.sub(r"<[^>]+>", " ", text)
            text = re.sub(r"\s+", " ", text)
            parts.append(text[:5000])
    return "\n\n".join(parts)


def openai_generate_article(
    title: str,
    topic: str,
    primary_keyword: str,
    secondary_keywords: str,
    category: str,
) -> dict[str, str]:
    api_key = get_env("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is required to generate articles.")

    model = get_env("OPENAI_MODEL", "gpt-4.1-mini")
    today = dt.date.today().isoformat()
    site_context = read_site_context()
    prompt = f"""
Create a publish-ready SEO blog article for Virtexa Solutions.

Brand/site context:
{site_context}

Article request:
- Working title: {title}
- Topic: {topic}
- Primary keyword: {primary_keyword}
- Secondary keywords: {secondary_keywords}
- Category: {category}
- Date: {today}

Return only JSON with these string fields:
title, meta_description, excerpt, category, read_minutes, target_keyword,
secondary_keywords_csv, markdown.

Markdown requirements:
- Start with one H1 matching the title.
- Include at least five H2 sections, one FAQ section, and a conclusion with a Virtexa CTA.
- Use practical, B2B, jargon-light language.
- Include internal link placeholders where useful.
- Include image suggestion placeholders where useful.
- Avoid invented statistics unless clearly framed as examples.
"""

    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": "You are an expert SEO content strategist and practical B2B automation writer. Return valid JSON only.",
            },
            {"role": "user", "content": prompt},
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.7,
    }
    request = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"OpenAI API request failed: {exc.code} {body}") from exc

    content = data["choices"][0]["message"]["content"]
    article = json.loads(content)
    if not article.get("markdown"):
        raise RuntimeError("The generated response did not include markdown.")
    return {key: str(value).strip() for key, value in article.items()}


def markdown_to_html(markdown: str) -> str:
    lines = markdown.strip().splitlines()
    html_lines: list[str] = []
    in_list = False
    skipped_h1 = False

    def close_list() -> None:
        nonlocal in_list
        if in_list:
            html_lines.append("</ul>")
            in_list = False

    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            close_list()
            continue
        if line.startswith("# "):
            close_list()
            if skipped_h1:
                html_lines.append(f"<h2>{html.escape(line[2:].strip())}</h2>")
            skipped_h1 = True
        elif line.startswith("## "):
            close_list()
            html_lines.append(f"<h2>{html.escape(line[3:].strip())}</h2>")
        elif line.startswith("### "):
            close_list()
            html_lines.append(f"<h3>{html.escape(line[4:].strip())}</h3>")
        elif line.startswith("- "):
            if not in_list:
                html_lines.append("<ul>")
                in_list = True
            html_lines.append(f"<li>{inline_markdown(line[2:].strip())}</li>")
        elif line.startswith("> "):
            close_list()
            html_lines.append(f"<blockquote>{inline_markdown(line[2:].strip())}</blockquote>")
        else:
            close_list()
            html_lines.append(f"<p>{inline_markdown(line)}</p>")
    close_list()
    return "\n              ".join(html_lines)


def inline_markdown(value: str) -> str:
    escaped = html.escape(value)
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)
    return escaped


def article_template(article: dict[str, str], slug: str, article_html: str, date: str) -> str:
    title = html.escape(article["title"])
    description = html.escape(article["meta_description"])
    keywords = html.escape(article.get("secondary_keywords_csv", ""))
    category = html.escape(article.get("category", "Automation"))
    read_minutes = html.escape(article.get("read_minutes", "8 min read"))
    schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article["title"],
        "description": article["meta_description"],
        "author": {"@type": "Organization", "name": "Virtexa Solutions"},
        "publisher": {"@type": "Organization", "name": "Virtexa Solutions"},
        "datePublished": date,
        "dateModified": date,
        "keywords": article.get("secondary_keywords_csv", ""),
    }
    return f"""<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="{description}" />
  <meta name="keywords" content="{keywords}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:type" content="article" />
  <title>{title} | Virtexa Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="style.css?v=20260504-blog" />
  <script type="application/ld+json">
    {json.dumps(schema, indent=4)}
  </script>
</head>

<body class="blog-page">
  <nav class="nav" id="nav" role="navigation" aria-label="Main navigation">
    <div class="nav__inner">
      <a href="index.html#hero" class="nav__logo" aria-label="Virtexa Solutions home">
        <span class="nav__logo-mark">V</span>
        <span class="nav__logo-text">irtexa</span>
      </a>
      <ul class="nav__links" role="list">
        <li><a href="index.html#about" class="nav__link">Philosophy</a></li>
        <li><a href="index.html#services" class="nav__link">Services</a></li>
        <li><a href="index.html#os-showcase" class="nav__link">The OS</a></li>
        <li><a href="index.html#process" class="nav__link">Process</a></li>
        <li><a href="blog.html" class="nav__link">Blog</a></li>
      </ul>
      <a href="https://cal.com/virtexasolutions/30min" class="btn btn--outline nav__cta" id="nav-cta" target="_blank"
        rel="noopener noreferrer">Let's Build</a>
      <button class="nav__burger" id="nav-burger" aria-label="Open menu" aria-expanded="false"
        aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <main>
    <article class="article-page">
      <header class="article-hero">
        <div class="container article-hero__inner">
          <a href="blog.html" class="article-back">Back to blog</a>
          <p class="section-tag">{category}</p>
          <h1>{title}</h1>
          <p class="article-hero__dek">{description}</p>
          <div class="article-meta">
            <span>{read_minutes}</span>
            <span>Updated {dt.datetime.strptime(date, "%Y-%m-%d").strftime("%B %Y")}</span>
          </div>
        </div>
      </header>

      <section class="article-body">
        <div class="container article-body__grid">
          <aside class="article-sidebar">
            <p>Article</p>
            <a href="blog.html">All insights</a>
            <a href="https://cal.com/virtexasolutions/30min" target="_blank" rel="noopener noreferrer">Discuss automation</a>
          </aside>
          <div class="article-content">
              {article_html}
          </div>
        </div>
      </section>
    </article>
  </main>

  <script src="main.js"></script>
</body>

</html>
"""


def frontmatter_markdown(article: dict[str, str], slug: str, date: str) -> str:
    markdown = article["markdown"].strip()
    words = len(re.findall(r"\b\w+\b", markdown))
    meta = {
        "title": article["title"],
        "meta_description": article["meta_description"],
        "target_keyword": article.get("target_keyword", ""),
        "secondary_keywords": [
            item.strip()
            for item in article.get("secondary_keywords_csv", "").split(",")
            if item.strip()
        ],
        "word_count": words,
        "date_created": date,
        "slug": slug,
    }
    frontmatter = "\n".join(
        [
            "---",
            f'title: "{meta["title"]}"',
            f'meta_description: "{meta["meta_description"]}"',
            f'target_keyword: "{meta["target_keyword"]}"',
            "secondary_keywords: [" + ", ".join(f'"{kw}"' for kw in meta["secondary_keywords"]) + "]",
            f'word_count: {meta["word_count"]}',
            f'date_created: {date}',
            f'slug: "{slug}"',
            "---",
            "",
        ]
    )
    return frontmatter + markdown + "\n"


def update_blog(article: dict[str, str], slug: str, date: str) -> None:
    if not BLOG_FILE.exists():
        return
    blog = BLOG_FILE.read_text(encoding="utf-8")
    href = f'{slug}.html'
    if href in blog:
        return
    card = f"""
          <a class="blog-card reveal-up" data-delay="0" href="{href}">
            <div class="blog-card__eyebrow">{html.escape(article.get("category", "Automation"))}</div>
            <h3>{html.escape(article["title"])}</h3>
            <p>{html.escape(article["excerpt"])}</p>
            <div class="blog-card__meta">
              <span>{html.escape(article.get("read_minutes", "8 min read"))}</span>
              <span>Updated {dt.datetime.strptime(date, "%Y-%m-%d").strftime("%B %Y")}</span>
            </div>
          </a>
"""
    marker = '        <div class="blog-grid">\n'
    if marker not in blog:
        raise RuntimeError("Could not find the blog grid insertion point.")
    BLOG_FILE.write_text(blog.replace(marker, marker + card, 1), encoding="utf-8")


def main() -> int:
    title = get_env("ARTICLE_TITLE")
    topic = get_env("ARTICLE_TOPIC", title)
    primary_keyword = get_env("PRIMARY_KEYWORD", title)
    secondary_keywords = get_env("SECONDARY_KEYWORDS")
    category = get_env("ARTICLE_CATEGORY", "Automation")
    slug = slugify(get_env("ARTICLE_SLUG", title or primary_keyword))

    if not title and not primary_keyword:
        raise RuntimeError("ARTICLE_TITLE or PRIMARY_KEYWORD is required.")

    article = openai_generate_article(title or primary_keyword, topic, primary_keyword, secondary_keywords, category)
    slug = slugify(get_env("ARTICLE_SLUG", article["title"]))
    date = dt.date.today().isoformat()

    ARTICLES_DIR.mkdir(exist_ok=True)
    markdown_path = ARTICLES_DIR / f"{slug}.md"
    html_path = ROOT / f"{slug}.html"

    markdown = frontmatter_markdown(article, slug, date)
    article_html = markdown_to_html(article["markdown"])
    page = article_template(article, slug, article_html, date)

    markdown_path.write_text(markdown, encoding="utf-8")
    html_path.write_text(page, encoding="utf-8")
    update_blog(article, slug, date)

    print(f"Generated {markdown_path.relative_to(ROOT)}")
    print(f"Generated {html_path.relative_to(ROOT)}")
    print("Updated blog.html")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(textwrap.dedent(f"""
        SEO article generation failed:
        {exc}
        """).strip(), file=sys.stderr)
        raise SystemExit(1)
