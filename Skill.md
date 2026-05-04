---
name: seo-blog-agent
description: >
  End-to-end SEO blog content agent. Use this skill whenever the user wants to:
  generate blog posts, write SEO articles, research keywords from their website,
  find trending topics, create long-form content, optimize existing blog content,
  build a content calendar, or improve search rankings through written content.
  Trigger this skill any time someone mentions "blog", "SEO article", "content marketing",
  "keyword research", "write a post", or "trending topics for our site" — even if they
  don't use the word "skill." This agent handles the full pipeline: site scanning →
  keyword extraction → trend research → article writing.
compatibility:
  tools:
    - web_search      # research trending topics and keyword volume data
    - web_fetch       # skim competitor pages during trend research only
    - create_file     # write the finished article to disk
    - present_files   # deliver the article to the user
    - github_actions # generate, store, and publish finished articles from GitHub
  input:
    - Uploaded HTML, PDF, .txt, .docx, or .md files from the user's website
---

# SEO Blog Agent

A three-phase pipeline that turns a website into a stream of high-ranking, long-form blog articles.

```
Phase 1: Website Scan      →   Extract existing keywords & topics
Phase 2: Trend Research    →   Find trending angles on those keywords
Phase 3: Article Writing   →   Produce a compelling, SEO-optimized blog post
```

Run all three phases in sequence unless the user tells you to skip one (e.g., they already have a keyword list).

---

## Phase 1 — Uploaded File Scan & Keyword Extraction

### Goal
Parse the user's uploaded website files to understand what topics the site covers, its brand voice, and which keyword themes are already present — without crawling the live site.

### Accepted File Types
The user should upload one or more of the following:
- **HTML files** — exported pages, templates, or full-site dumps
- **Markdown files** — existing blog posts or page content
- **PDF files** — brochures, service pages, or exported web content
- **Plain text (.txt)** — raw page copy or content briefs
- **Word docs (.docx)** — drafts, content inventories, or copy docs

> If no files are uploaded yet, prompt the user:
> _"Please upload your website files — HTML exports, existing blog posts, or any page content works great. I'll extract the keyword themes from there."_

### Steps

1. **Locate uploaded files** at `/mnt/user-data/uploads/` and list what's available.

2. **Read each file** using the appropriate method:
   - `.html` → read with `bash_tool` (`cat file.html`) and parse headings + visible text, stripping tags
   - `.md` / `.txt` → read directly
   - `.pdf` → read `/mnt/skills/public/pdf-reading/SKILL.md` for extraction guidance
   - `.docx` → read `/mnt/skills/public/file-reading/SKILL.md` for extraction guidance

3. **Extract keyword signals** from the file content:
   - `<title>`, `<h1>`, `<h2>`, `<h3>` tags (or `#`, `##`, `###` in Markdown)
   - `<meta name="description">` content
   - Repeated noun phrases and industry terminology
   - Product/service names
   - Existing blog post titles and topic areas
   - Brand descriptors and value propositions

4. **Infer brand voice** from the writing style:
   - Formal vs. conversational
   - Technical vs. accessible
   - B2B vs. B2C tone
   - Note 3–5 distinctive voice traits for use in Phase 3

5. **Produce a Keyword Theme Map** — group extracted keywords into 5–10 thematic clusters:

   ```
   Theme Clusters Identified:
   1. [Primary theme]   — e.g., "residential solar installation"
   2. [Secondary theme] — e.g., "solar financing and incentives"
   3. [Adjacent theme]  — e.g., "energy storage / battery backup"
   ...
   ```

6. **Select a target cluster** — recommend the highest-opportunity cluster based on breadth and specificity, or ask the user which direction to pursue.

---

## Phase 2 — Trend Research & High-Volume Keyword Targeting

### Goal
Find the highest-traffic, most rankable angle on the target keyword cluster. Priority is **search volume and trending demand** — not just relevance. We want articles that can capture significant organic traffic.

### Steps

1. **Generate keyword candidates** from the Phase 1 theme cluster — expand into 8–12 specific keyword phrases:
   - Short-tail (1–2 words): high volume, competitive
   - Mid-tail (3–4 words): balanced volume + competition
   - Long-tail (5+ words): lower volume, easier to rank, higher intent

2. **Research search demand** using `web_search` — for each candidate keyword, run searches to gauge competition and trend signals:

   ```
   "[keyword] statistics [current year]"
   "[keyword] trends [current year]"
   "how many people search for [keyword]"
   "best [keyword] [current year]"
   "[keyword] guide"
   "top [keyword] questions"
   ```

3. **Analyze the SERP landscape** — use `web_fetch` to skim the top 2–3 ranking pages per keyword and note:
   - Domain Authority signals (is it all mega-sites, or are smaller sites ranking?)
   - Article formats ranking (listicles, how-tos, comparisons, pillar pages)
   - Word counts of top results
   - Content gaps — subtopics they skip or treat poorly
   - "People Also Ask" questions visible in results (these are gold for FAQ sections)

4. **Score each keyword angle** against these criteria:

   | Signal | What to look for |
   |---|---|
   | Trending | Rising searches, recent news hooks, year-specific demand |
   | High volume | Broad applicability, many searchers could use this |
   | Rankable | Mid-authority sites appearing on page 1 = opportunity |
   | Content gap | Top results miss important subtopics |
   | Commercial intent | Searchers likely to convert after reading |

5. **Select the winning angle** and present the article proposal:

   ```
   Proposed Article:
   - Working Title:        "[Compelling SEO title — keyword near front]"
   - Primary Keyword:      "[keyword phrase]" — [why it's high-opportunity]
   - Secondary Keywords:   [3–5 supporting phrases]
   - Format:              [listicle / how-to / comparison / deep-dive / pillar page]
   - Content Gap to Fill: [what top results are missing that we'll cover]
   - Hook / Differentiator: [what makes our version better or more current]
   - Estimated Word Count: [1,500 / 2,000 / 2,500+ — match or beat top results]
   - Trend Basis:         [why this is timely right now]
   ```

   Wait for user approval before proceeding to Phase 3, unless they said to run the full pipeline automatically.

---

## Phase 3 — Long-Form SEO Article Writing

### Goal
Write a compelling, well-structured, thoroughly researched blog article that ranks well and serves the reader.

### Article Structure Template

Use this as a skeleton — adapt section names and order to the article's angle:

```
1. SEO Title         (55–60 characters, include primary keyword near the front)
2. Meta Description  (150–160 characters, include keyword, end with a soft CTA)
3. Introduction      (150–200 words — hook, acknowledge the reader's problem, preview the solution)
4. [H2] Section 1    (first major point, 300–400 words)
   └── [H3] Subsection (optional, adds depth)
5. [H2] Section 2
6. [H2] Section 3
...
N-1. [H2] FAQ        (4–6 questions in Q&A format — targets "People Also Ask" snippets)
N.   Conclusion      (150–200 words — summarize key takeaways, include a CTA)
```

**Minimum article length:** 1,500 words for competitive keywords; 2,000–3,000 for high-competition topics.

### SEO Writing Rules

| Element | Requirement |
|---|---|
| Primary keyword | Appears in title, first 100 words, at least 2 H2s, and conclusion |
| Keyword density | 1–2% (not stuffed — reads naturally) |
| Secondary keywords | Woven in naturally throughout |
| Internal link placeholders | Mark as `[INTERNAL LINK: topic]` where relevant |
| External links | Cite 2–3 authoritative sources (actual URLs from research) |
| Sentence length | Vary short and long; aim for Flesch Reading Ease > 60 |
| Paragraph length | 2–4 sentences max for web readability |
| Lists and tables | Use where content benefits (comparisons, steps, features) |
| Images | Add `[IMAGE SUGGESTION: description]` placeholders |
| Call to Action | End with one clear CTA matching the site's business goal |

### Brand Voice
- Match the tone inferred from uploaded files during Phase 1 (formal/informal, technical/accessible)
- Apply the 3–5 voice traits extracted in Phase 1
- If no files were provided, default to: **confident, helpful, jargon-light, reader-first**
- Avoid filler phrases: "In conclusion," "It's important to note," "In today's world"

### Writing Process

1. Draft the full article in a single pass — don't stop to ask for feedback mid-draft
2. After the draft, run a self-check:
   - [ ] Title is ≤60 chars and includes primary keyword
   - [ ] Meta description is ≤160 chars
   - [ ] Primary keyword in intro (first 100 words)
   - [ ] At least 4 H2 sections
   - [ ] FAQ section with 4+ questions
   - [ ] Conclusion with CTA
   - [ ] Word count ≥ 1,500
   - [ ] No keyword stuffing — reads naturally
3. Fix any issues from the checklist, then output the final article

### Output Format

All articles are saved as **Markdown files** (`.md`) with publish-ready YAML frontmatter.

File path when running locally: `articles/[slug-of-article-title].md`

File path when running in GitHub Actions: `articles/[slug-of-article-title].md`, with a matching publishable `[slug-of-article-title].html` page committed to the repository and linked from `blog.html`.

File structure:
```markdown
---
title: "Full SEO Title Here"
meta_description: "150-160 char meta description here."
target_keyword: "primary keyword"
secondary_keywords: ["kw2", "kw3", "kw4"]
word_count: XXXX
date_created: YYYY-MM-DD
slug: "url-friendly-slug-here"
---

# Full SEO Title Here

[Article body in clean Markdown — headings, bullet lists, bold text, tables as needed]
```

**Markdown conventions to follow:**
- `#` — Article title (H1, appears once)
- `##` — Major sections (H2)
- `###` — Subsections (H3)
- `**bold**` — Key terms and important phrases
- `> blockquote` — Callout tips or notable stats
- `-` bullet lists for scannable content
- Tables using `|---|` syntax for comparisons

Then commit the `.md` source file and generated `.html` article page to GitHub. If running outside GitHub Actions, save to the repo's `articles/` directory so the article lives in source control instead of a local-only computer folder.

### GitHub Publishing Workflow

Use `.github/workflows/seo-article-agent.yml` when the user wants GitHub to create, store, and post an article. The workflow:
- accepts a title, topic, primary keyword, secondary keywords, category, and optional slug
- calls `scripts/generate_seo_article.py`
- stores Markdown source in `articles/`
- creates a static HTML article page at the repo root
- updates `blog.html` with a new article card
- commits and pushes the generated article when `publish` is enabled

Required GitHub secret:
- `OPENAI_API_KEY`

Optional GitHub variable:
- `OPENAI_MODEL` defaults to `gpt-4.1-mini`

---

## Handling Common Variations

**"Just write an article about [topic]" (no files uploaded)**
→ Skip Phase 1. Go straight to Phase 2 with the user-supplied topic, then write the article.

**"Here's our keyword list, write me a post"**
→ Skip Phases 1 & 2. Go straight to Phase 3 using the provided keywords.

**"Here are our website files — extract keywords but don't write yet"**
→ Run Phase 1 only. Deliver the Keyword Theme Map and stop.

**"Find trending topics for [keyword]"**
→ Run Phase 2 only. Present 3–5 article angle proposals with titles, hooks, and trend rationale.

**"Write 3 articles from our site files"**
→ Run Phases 1 & 2 once, propose 3 distinct high-volume angles, then write all 3 articles sequentially. Save each as a separate `.md` file.

**"Rewrite / improve this existing post"**
→ Accept the existing post as an uploaded file. Analyze gaps vs. current top-ranking competitors (Phase 2). Rewrite with improvements, targeting higher-volume keywords while preserving the URL slug.

**"Generate a content calendar"**
→ Run Phases 1 & 2 fully. Instead of writing articles, output a 4-week or 12-week calendar with one row per article: date, title, primary keyword, format, word count target. Save as a `.md` table.

---

## Quality Bar

Before presenting the article, verify it clears these bars:

- **Useful:** Does it answer the question better than the top 3 search results?
- **Original:** Does it offer a unique angle, stat, example, or framing — not just a summary of what's already out there?
- **Readable:** Could a non-expert in the field read it without a dictionary?
- **Actionable:** Does the reader know what to do next after reading?
- **On-brand:** Does it sound like the website it's written for?

If any bar is not met, revise before delivering.

---

## Example Workflow (full pipeline)

```
User: "Here are our HVAC company's website HTML files. Write us an SEO blog post."
       [uploads: homepage.html, services.html, about.html]

Agent:
Phase 1 — File Scan
  Reads uploaded files → extracts keyword signals from headings, meta tags, and body copy
  → Identifies clusters: furnace repair, AC installation, HVAC maintenance tips, energy efficiency
  → Infers brand voice: friendly, homeowner-focused, non-technical

Phase 2 — Trend Research
  Searches "HVAC maintenance tips 2026", "home energy efficiency HVAC trending"
  Skims top-ranking competitor articles → spots content gap: none cover smart thermostats + seasonal prep together
  → Proposes: "10 HVAC Maintenance Tips That Cut Energy Bills in 2026"
  → Primary keyword: "HVAC maintenance tips" (high volume, mid-competition)
  → Gets user approval (or auto-proceeds if user said "just do it")

Phase 3 — Article Writing
  Writes 2,100-word article:
  - YAML frontmatter with title, meta description, keywords, slug
  - Intro with energy-cost hook
  - 6 H2 sections + smart thermostat subsection
  - FAQ targeting "People Also Ask" questions found in SERP
  - Conclusion with CTA: "Schedule your annual HVAC tune-up today"
  - Internal link placeholders: [INTERNAL LINK: AC installation services]
  - 2 external citations from authoritative sources

  Saves to: /mnt/user-data/outputs/hvac-maintenance-tips-2026.md
  Presents file to user ✓
```
