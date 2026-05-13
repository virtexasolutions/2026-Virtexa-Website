---
name: seo-blog-agent
description: >
  End-to-end SEO blog content agent. Use this skill whenever the user wants to:
  generate blog posts, write SEO articles, research keywords from their website,
  find trending topics, create long-form content, optimize existing blog content,
  build a content calendar, improve search rankings through written content,
  or save articles to Notion. Trigger this skill any time someone mentions "blog",
  "SEO article", "content marketing", "keyword research", "write a post",
  "trending topics for our site", or "save to Notion" — even if they don't use
  the word "skill." This agent handles the full pipeline: content strategy →
  site scanning → keyword extraction → trend research → article writing →
  Notion publishing.
compatibility:
  tools:
    - web_search      # research trending topics and keyword volume data
    - web_fetch       # skim competitor pages during trend research only
    - create_file     # write the finished article to disk (GitHub only)
    - present_files   # deliver the article to the user
    - github_actions  # generate, store, and publish finished articles from GitHub
    - mcp__claude_ai_Notion__notion-search           # find existing Notion databases
    - mcp__claude_ai_Notion__notion-create-database  # create blog database if needed
    - mcp__claude_ai_Notion__notion-create-pages     # publish articles to Notion
    - mcp__claude_ai_Notion__notion-update-page      # update/refresh existing articles
  input:
    - Uploaded HTML, PDF, .txt, .docx, or .md files from the user's website
---

# SEO Blog Agent

A five-phase pipeline that turns a website into a stream of high-ranking, long-form blog articles — automatically published to Notion for cloud-based storage.

```
Phase 0: Content Strategy    →   Map topical authority gaps vs. competitors
Phase 1: Website Scan        →   Extract keywords, voice, E-E-A-T signals
Phase 2: Trend Research      →   Find trending angles + SERP feature opportunities
Phase 3: Article Writing     →   Produce SEO-optimized, E-E-A-T-rich long-form content
Phase 4: Notion Publishing   →   Save to Notion (primary) and/or GitHub
```

Run all phases in sequence unless the user tells you to skip one.

---

## Phase 0 — Content Strategy & Topical Authority Planning

### Goal
Before writing a single article, map the site's topical landscape and identify where it can realistically build authority. Google rewards **topical depth** — a site that covers one subject thoroughly outranks one that covers many subjects shallowly.

### The Pillar/Cluster Model

Build content in interconnected groups:
```
Pillar Page (2,500–4,000 words)
├── Cluster Post 1 (1,500–2,000 words) → links back to pillar
├── Cluster Post 2 (1,500–2,000 words) → links back to pillar
├── Cluster Post 3 (1,500–2,000 words) → links back to pillar
└── Cluster Post 4 (1,500–2,000 words) → links back to pillar
```

Each cluster post targets a long-tail variation of the pillar's primary keyword and links back to the pillar. The pillar links out to all clusters. This structure signals topical authority to Google.

### Steps

1. **Identify 2–3 core topic pillars** from Phase 1 keyword clusters — these become pillar pages.

2. **Map cluster gaps** — for each pillar, find 5–8 long-tail questions and subtopics not yet covered on the site.

3. **Classify each article opportunity by search intent**:
   | Intent | What the searcher wants | Best format |
   |---|---|---|
   | **Informational** | Learn something | How-to, guide, explainer |
   | **Navigational** | Find a specific site/page | Brand + category pages |
   | **Commercial** | Research before buying | Comparison, review, list |
   | **Transactional** | Buy / hire / sign up | Landing page, service page |
   > Match the article format to the intent — mismatched intent = zero rankings regardless of quality.

4. **Competitive gap analysis** — search the top 3 competitors' blog sections and identify:
   - Topics they rank for that the site doesn't cover
   - Topics where competitors have thin content (< 800 words) — takeover opportunities
   - Topics where the site already has content — update these rather than writing from scratch

5. **Recommend the publishing order**:
   - Write the pillar page first
   - Then write cluster posts one by one, each linking to the pillar
   - Interlink clusters to each other where relevant

---

## Phase 1 — Uploaded File Scan, Keyword Extraction & E-E-A-T Analysis

### Goal
Parse the user's uploaded website files to understand topics, brand voice, E-E-A-T signals, and existing content inventory — without crawling the live site.

### E-E-A-T (Experience · Expertise · Authoritativeness · Trustworthiness)
Google's core quality framework. Every article must demonstrate:
- **Experience**: First-hand knowledge, specific examples, real scenarios
- **Expertise**: Accurate information, proper terminology, depth of coverage
- **Authoritativeness**: Citations, credentials, expert quotes
- **Trustworthiness**: Balanced perspective, clear sourcing, no misleading claims

### Accepted File Types
- **HTML files** — exported pages, templates, or full-site dumps
- **Markdown files** — existing blog posts or page content
- **PDF files** — brochures, service pages, or exported web content
- **Plain text (.txt)** — raw page copy or content briefs
- **Word docs (.docx)** — drafts, content inventories, or copy docs

> If no files are uploaded yet, prompt the user:
> _"Please upload your website files — HTML exports, existing blog posts, or any page content works great. I'll extract keyword themes, brand voice, and E-E-A-T signals from there."_

### Steps

1. **Locate uploaded files** at `/mnt/user-data/uploads/` and list what's available.

2. **Read each file** using the appropriate method:
   - `.html` → read with `bash_tool` (`cat file.html`) and parse headings + visible text, stripping tags
   - `.md` / `.txt` → read directly
   - `.pdf` → read `/mnt/skills/public/pdf-reading/SKILL.md` for extraction guidance
   - `.docx` → read `/mnt/skills/public/file-reading/SKILL.md` for extraction guidance

3. **Extract keyword signals**:
   - `<title>`, `<h1>`, `<h2>`, `<h3>` tags (or `#`, `##`, `###` in Markdown)
   - `<meta name="description">` content
   - Repeated noun phrases and industry terminology
   - Product/service names and brand descriptors
   - Existing blog post titles and topic areas

4. **Infer brand voice** from writing style:
   - Formal vs. conversational
   - Technical vs. accessible
   - B2B vs. B2C tone
   - Note 3–5 distinctive voice traits for use in Phase 3

5. **Extract existing E-E-A-T signals**:
   - Does the site have author bios? What credentials are mentioned?
   - Are there testimonials, case studies, or data-backed claims?
   - What trust signals exist (certifications, years in business, awards)?
   - Note these for reuse and reinforcement in articles

6. **Inventory existing content** — list all blog posts/articles found in uploaded files with their topics so Phase 3 can add internal links to real pages (not placeholders).

7. **Produce a Keyword Theme Map** — group extracted keywords into 5–10 thematic clusters:
   ```
   Theme Clusters Identified:
   1. [Primary theme]   — e.g., "residential solar installation"
   2. [Secondary theme] — e.g., "solar financing and incentives"
   3. [Adjacent theme]  — e.g., "energy storage / battery backup"
   ...
   ```

8. **Select a target cluster** — recommend the highest-opportunity cluster, or ask the user which direction to pursue.

---

## Phase 2 — Trend Research, Keyword Targeting & SERP Feature Analysis

### Goal
Find the highest-traffic, most rankable angle on the target keyword cluster — specifically targeting SERP features (featured snippets, People Also Ask, rich results) that drive outsized click-through rates.

### Steps

1. **Generate keyword candidates** — expand into 8–12 specific keyword phrases:
   - Short-tail (1–2 words): high volume, competitive
   - Mid-tail (3–4 words): balanced volume + competition
   - Long-tail (5+ words): lower volume, easier to rank, higher intent

2. **Classify each keyword by search intent** (see Phase 0 table) — only pursue keywords whose intent matches what the site can deliver.

3. **Research search demand** using `web_search`:
   ```
   "[keyword] statistics [current year]"
   "[keyword] trends [current year]"
   "best [keyword] [current year]"
   "[keyword] guide"
   "top [keyword] questions"
   ```

4. **Analyze the SERP landscape** — use `web_fetch` to skim the top 2–3 ranking pages and note:
   - Domain Authority signals (are smaller sites ranking? = opportunity)
   - Article formats ranking (listicles, how-tos, comparisons, pillar pages)
   - Word counts of top results — match or beat them
   - Content gaps — subtopics skipped or treated poorly
   - "People Also Ask" questions visible in results — gold for FAQ sections and featured snippets

5. **Identify SERP feature opportunities**:
   | Feature | How to target it |
   |---|---|
   | **Featured snippet** | Write a 40–60 word direct answer immediately after the H2 |
   | **People Also Ask** | Match question phrasing exactly in an H3, answer in 40–60 words |
   | **How-to rich result** | Use numbered steps with HowTo schema markup |
   | **FAQ rich result** | Use FAQ schema markup on the FAQ section |
   | **Article rich result** | Use Article schema + publish date + author |

6. **Score each keyword angle**:
   | Signal | What to look for |
   |---|---|
   | Trending | Rising searches, recent news hooks, year-specific demand |
   | High volume | Broad applicability, many searchers |
   | Rankable | Mid-authority sites on page 1 = opportunity |
   | Content gap | Top results miss important subtopics |
   | SERP feature available | Featured snippet or PAA box present = quick-win traffic |
   | Intent match | Format matches what the searcher actually wants |
   | Commercial intent | Searchers likely to convert after reading |

7. **Select the winning angle** and present the article proposal:
   ```
   Proposed Article:
   - Working Title:          "[Compelling SEO title — keyword near front]"
   - Primary Keyword:        "[keyword phrase]" — [why it's high-opportunity]
   - Secondary Keywords:     [3–5 supporting phrases]
   - LSI / Semantic Terms:   [5–8 related entities and concepts to cover]
   - Search Intent:          [Informational / Commercial / Transactional]
   - Format:                 [listicle / how-to / comparison / deep-dive / pillar page]
   - SERP Feature Target:    [featured snippet / PAA / how-to / FAQ rich result]
   - Content Gap to Fill:    [what top results are missing]
   - Hook / Differentiator:  [what makes our version better or more current]
   - Estimated Word Count:   [1,500 / 2,000 / 2,500+]
   - Trend Basis:            [why this is timely right now]
   - Pillar or Cluster:      [pillar page or cluster post? which pillar does it support?]
   ```

   Wait for user approval before proceeding to Phase 3, unless they said to run the full pipeline automatically.

---

## Phase 3 — Long-Form SEO Article Writing

### Goal
Write a compelling, well-structured, thoroughly researched blog article that ranks well, earns SERP features, demonstrates E-E-A-T, and genuinely serves the reader.

### Article Structure Template

```
1. SEO Title          (55–60 characters, include primary keyword near the front)
2. Meta Description   (150–160 characters, include keyword, end with a soft CTA)
3. Introduction       (150–200 words)
                      → Hook + acknowledge the reader's problem + preview the solution
                      → Primary keyword in first 100 words
                      → E-E-A-T opener: "After [X years / X clients / X research]..."
4. [H2] Section 1     (300–400 words)
   └── Featured Snippet Block: 40–60 word direct answer immediately below the H2
   └── [H3] Subsection (optional — adds depth, targets PAA questions)
5. [H2] Section 2
6. [H2] Section 3
...
N-2. [H2] FAQ         (4–6 questions — each answer 40–60 words, targets PAA snippets)
N-1. [H2] Conclusion  (150–200 words — key takeaways + CTA)
N.   Author Note      (1–2 sentences: name, role, years of experience)
```

**Minimum article length:** 1,500 words for competitive keywords; 2,000–3,000 for high-competition topics.

### E-E-A-T Requirements (mandatory in every article)

| Signal | How to add it |
|---|---|
| **Experience** | Include at least one specific real-world example, scenario, or data point |
| **Expertise** | Use accurate industry terminology; demonstrate depth in every section |
| **Authoritativeness** | Cite 2–3 authoritative external sources with actual URLs |
| **Trustworthiness** | Balanced perspective; acknowledge limitations or caveats where relevant |
| **Author signal** | End with: `*Written by [Name], [Role] with [X] years of experience in [field].*` |

### Semantic SEO Requirements

Go beyond the primary keyword — cover the **topic**, not just the term:

1. **LSI keywords** — use all 5–8 semantic terms from Phase 2 naturally throughout
2. **Entity coverage** — mention related concepts, people, places, tools, or brands Google associates with the topic
3. **Question coverage** — answer at least 3 "People Also Ask" questions found in Phase 2
4. **Subtopic completeness** — cover all major subtopics a reader would expect, even briefly

### Featured Snippet Formatting

For every major H2 section, add a **snippet block** immediately below the heading:

```markdown
## How to [Topic]

**[Topic]** means [40–60 word direct answer written as a standalone paragraph
that could be extracted by Google and displayed without surrounding context.]

[Continue with the full section below...]
```

For list-format snippets:
```markdown
## Best [Topic] Methods

The best [topic] methods are:
1. **[Method 1]** — [brief description]
2. **[Method 2]** — [brief description]
3. **[Method 3]** — [brief description]

[Continue with detailed explanations below...]
```

### SEO Writing Rules

| Element | Requirement |
|---|---|
| Primary keyword | Title, first 100 words, at least 2 H2s, conclusion |
| Keyword density | 1–2% (reads naturally — no stuffing) |
| Secondary keywords | Woven in naturally throughout |
| LSI/semantic terms | All 5–8 terms from Phase 2 appear at least once |
| Internal links | Use real page titles from Phase 1 inventory; prefer partial-match anchor text over exact-match |
| External links | Cite 2–3 authoritative sources with actual URLs |
| Sentence length | Vary short and long; aim for Flesch Reading Ease > 60 |
| Paragraph length | 2–4 sentences max for web readability |
| Lists and tables | Use where content benefits (comparisons, steps, features) |
| Image suggestions | Add `[IMAGE: description + suggested alt text]` placeholders |
| CTA | One clear CTA at the end matching the site's business goal |
| Freshness signal | Include the current year in the title and at least one section heading |

### Internal Linking Strategy

- Link to the **pillar page** from every cluster post using partial-match anchor text
- Link to **2–3 cluster posts** from within each article where relevant
- Never use "click here" or "read more" as anchor text
- Only link to pages confirmed in the Phase 1 content inventory — no guessed URLs

### Brand Voice

- Match the tone inferred from uploaded files in Phase 1
- Apply the 3–5 voice traits extracted in Phase 1
- Default (if no files provided): **confident, helpful, jargon-light, reader-first**
- Avoid filler phrases: "In conclusion," "It's important to note," "In today's world," "In the digital age"

### Writing Process

1. Draft the full article in a single pass — don't stop mid-draft
2. Run self-check before Phase 4:
   - [ ] Title ≤ 60 chars, includes primary keyword
   - [ ] Meta description ≤ 160 chars
   - [ ] Primary keyword in intro (first 100 words)
   - [ ] At least 4 H2 sections
   - [ ] Featured snippet block under each major H2
   - [ ] FAQ section with 4+ questions (40–60 word answers each)
   - [ ] Author note at the end
   - [ ] 2–3 external citations with real URLs
   - [ ] Internal links with proper anchor text (real pages from Phase 1)
   - [ ] All 5–8 LSI/semantic terms appear
   - [ ] Word count ≥ 1,500
   - [ ] No keyword stuffing — reads naturally
   - [ ] E-E-A-T: experience example, expertise depth, authoritative sources, trust signals
3. Fix any issues from the checklist, then proceed to Phase 4

### Output Format

All articles are written as **Markdown** with publish-ready YAML frontmatter:

```markdown
---
title: "Full SEO Title Here"
meta_description: "150-160 char meta description here."
target_keyword: "primary keyword"
secondary_keywords: ["kw2", "kw3", "kw4"]
lsi_keywords: ["term1", "term2", "term3", "term4", "term5"]
search_intent: "informational"
serp_target: "featured_snippet"
content_type: "pillar | cluster"
pillar_topic: "parent pillar title (if cluster)"
word_count: XXXX
author: "Name, Role"
date_created: YYYY-MM-DD
last_updated: YYYY-MM-DD
slug: "url-friendly-slug-here"
schema_type: "Article | HowTo | FAQPage"
---

# Full SEO Title Here

[Article body in clean Markdown]
```

**Markdown conventions:**
- `#` — Article title (H1, appears once)
- `##` — Major sections (H2)
- `###` — Subsections / PAA questions (H3)
- `**bold**` — Key terms and important phrases
- `> blockquote` — Callout tips, stats, featured snippet candidates
- `-` or `1.` — Lists for scannable content
- Tables using `|---|` for comparisons

---

## Phase 4 — Publishing: Notion (Primary) + GitHub (Optional)

### Goal
Save every finished article to Notion for organized, cloud-based storage — no local files needed. Optionally also commit to GitHub for static site publishing.

---

### 4A — Notion Publishing (Primary)

#### Step 1 — Set Up Notion Blog Database (first run only)

1. Search for an existing blog database using `notion-search` with query `"SEO Articles"` or `"Blog Posts"`.
2. If found, use it. If not found, create one with `notion-create-database`:
   - **Database name**: `SEO Articles`
   - **Properties**:

   | Property | Type |
   |---|---|
   | Title | Title |
   | Status | Select: `Draft` / `Review` / `Published` |
   | Primary Keyword | Rich text |
   | Search Intent | Select: `Informational` / `Commercial` / `Transactional` |
   | Content Type | Select: `Pillar` / `Cluster` |
   | Pillar Topic | Rich text |
   | Word Count | Number |
   | Author | Rich text |
   | Date Created | Date |
   | Last Updated | Date |
   | Slug | Rich text |
   | SERP Target | Select: `Featured Snippet` / `PAA` / `HowTo` / `FAQ` / `Article` |
   | Published URL | URL |

#### Step 2 — Create the Notion Page

Use `notion-create-pages` to create a new page in the SEO Articles database. Map the article to Notion blocks:

```
Page title     → Article SEO title
Properties     → filled from YAML frontmatter

Content blocks:
  heading_1        → Article H1 title
  paragraph        → Introduction paragraphs
  heading_2        → Each H2 section title
  paragraph        → Section body (split long text into multiple paragraph blocks)
  heading_3        → H3 subsections / PAA questions
  bulleted_list_item → Bullet list items
  numbered_list_item → Numbered steps
  quote            → Blockquotes / callout stats / snippet candidates
  divider          → Between major sections
  heading_2        → "FAQ"
  heading_3 + paragraph → Each FAQ Q&A pair
  heading_2        → "Conclusion"
  paragraph        → Conclusion text
  paragraph        → Author note (italicized)
```

> After creating the page, share the Notion page URL with the user immediately.

---

### 4B — Schema Markup (for GitHub/HTML publishing)

Generate JSON-LD schema appropriate to the article type. Include in the `<head>` of any HTML output.

**Article schema** (all articles):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[SEO Title]",
  "description": "[Meta description]",
  "author": { "@type": "Person", "name": "[Author Name]" },
  "publisher": { "@type": "Organization", "name": "[Site Name]" },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]"
}
```

**FAQPage schema** (when article has a FAQ section):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 1]" }
    }
  ]
}
```

**HowTo schema** (when article has numbered steps):
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "[Article title]",
  "step": [
    { "@type": "HowToStep", "text": "[Step 1]" },
    { "@type": "HowToStep", "text": "[Step 2]" }
  ]
}
```

---

### 4C — HTML Output (GitHub publishing)

When publishing to GitHub, generate a full HTML file with all SEO meta tags:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[SEO Title]</title>
  <meta name="description" content="[Meta description]">
  <link rel="canonical" href="https://[domain]/blog/[slug]">
  <!-- Open Graph -->
  <meta property="og:title" content="[SEO Title]">
  <meta property="og:description" content="[Meta description]">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://[domain]/blog/[slug]">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[SEO Title]">
  <meta name="twitter:description" content="[Meta description]">
  <!-- JSON-LD Schema -->
  <script type="application/ld+json">[Article schema]</script>
  <script type="application/ld+json">[FAQPage schema — if applicable]</script>
  <script type="application/ld+json">[HowTo schema — if applicable]</script>
</head>
<body>
  [Article content]
</body>
</html>
```

---

### 4D — GitHub Actions Workflow (optional)

Use `.github/workflows/seo-article-agent.yml` when GitHub automation is needed. The workflow:
- Accepts: title, topic, primary keyword, secondary keywords, category, optional slug
- Calls `scripts/generate_seo_article.py`
- Stores Markdown source in `articles/`
- Creates static HTML with full meta tags and schema markup
- Updates `blog.html` with a new article card
- Commits and pushes when `publish` is enabled

Required GitHub secret:
- `ANTHROPIC_API_KEY`

Recommended model: `claude-sonnet-4-6` (best long-form writing quality with prompt caching for cost efficiency)

Optional GitHub variable:
- `CLAUDE_MODEL` — defaults to `claude-sonnet-4-6`

---

## Phase 5 — Content Freshness & Refresh Strategy

Google heavily weights freshness, especially for year-specific queries. Every article needs a refresh plan.

### Freshness Signals to Include in Every Article
- Current year in the title (e.g., "Best [X] in 2026")
- `dateModified` in JSON-LD schema
- "Last Updated: [Month Year]" visible near the top of the article
- At least one current statistic with its source year cited

### Refresh Schedule

| Article age | Action |
|---|---|
| 0–6 months | Monitor rankings; no action unless rankings drop |
| 6–12 months | Update statistics, check for broken links, add new sections if the topic evolved |
| 12+ months | Full refresh: update title year, replace outdated stats, expand thin sections, re-run Phase 2 |

### When the User Says "Refresh This Post"
1. Accept the existing post as an uploaded file
2. Run Phase 2 on the same topic to find new keyword and SERP feature opportunities
3. Identify: outdated statistics, missing PAA questions, thin sections, broken external links
4. Rewrite with improvements, preserving the URL slug
5. Update `last_updated` in YAML and JSON-LD schema
6. Update the existing Notion page using `notion-update-page`

---

## Handling Common Variations

**"Just write an article about [topic]" (no files uploaded)**
→ Skip Phase 1 file scan. Run Phase 0 strategy + Phase 2 research on the user-supplied topic, then write and publish to Notion.

**"Here's our keyword list, write me a post"**
→ Skip Phases 0–2. Go straight to Phase 3 using the provided keywords, then publish to Notion.

**"Extract keywords but don't write yet"**
→ Run Phases 0–1 only. Deliver the Keyword Theme Map and pillar/cluster plan, then stop.

**"Find trending topics for [keyword]"**
→ Run Phase 2 only. Present 3–5 article angle proposals with titles, hooks, and trend rationale.

**"Write 3 articles from our site files"**
→ Run Phases 0–2 once, propose 3 distinct high-volume angles, then write and publish all 3 to Notion sequentially.

**"Generate a content calendar"**
→ Run Phases 0–2 fully. Output a 4-week or 12-week calendar with one row per article: date, title, primary keyword, format, word count target, pillar/cluster type. Save as a Notion page.

**"Refresh / improve this existing post"**
→ See Phase 5 Refresh workflow above.

**"Build our topical authority in [niche]"**
→ Run Phase 0 fully. Produce a pillar/cluster map with 1 pillar page + 5–8 cluster post briefs. Write the pillar first, then cluster posts in order. Publish each to Notion.

---

## Quality Bar

Before publishing to Notion, verify all bars are cleared:

- **Useful**: Answers the question better than the top 3 search results?
- **Original**: Unique angle, stat, example, or framing — not just a summary of existing content?
- **Readable**: A non-expert in the field could read it without a dictionary?
- **Actionable**: Reader knows what to do next after finishing?
- **On-brand**: Sounds like the website it's written for?
- **E-E-A-T**: Experience markers, expertise depth, authoritative citations, trust signals all present?
- **SERP-ready**: Featured snippet blocks present? FAQ section with 40–60 word answers? Schema markup generated?
- **Semantically complete**: All LSI terms covered? Related entities mentioned?

If any bar is not met, revise before publishing.

---

## Example Workflow (full pipeline)

```
User: "Here are our HVAC company's website HTML files. Write us an SEO blog post."
       [uploads: homepage.html, services.html, about.html]

Agent:
Phase 0 — Content Strategy
  Maps topic pillars: "HVAC maintenance", "AC installation", "energy efficiency"
  → Recommends pillar: "Complete HVAC Maintenance Guide"
  → Identifies cluster gaps: smart thermostats, seasonal prep, energy bills, filter types
  → Competitive gap: competitor's maintenance posts are thin (< 700 words) — takeover opportunity

Phase 1 — File Scan
  Reads uploaded files → extracts keyword signals from headings, meta tags, body copy
  → Keyword clusters: furnace repair, AC installation, HVAC maintenance, energy efficiency
  → Brand voice: friendly, homeowner-focused, non-technical
  → E-E-A-T signals found: "20 years in business", NATE-certified technicians, 500+ five-star reviews
  → Content inventory: 4 existing blog posts identified for internal linking

Phase 2 — Trend Research
  Searches "HVAC maintenance tips 2026", "home energy efficiency HVAC trending"
  Skims top-ranking competitors → content gap: none cover smart thermostats + seasonal prep together
  SERP feature: Featured snippet available for "how to maintain HVAC system"
  PAA questions found: "How often should HVAC be serviced?", "What maintenance does an HVAC need?"
  → Proposes: "10 HVAC Maintenance Tips That Cut Energy Bills in 2026"
  → Primary keyword: "HVAC maintenance tips" (high volume, mid-competition)
  → Search intent: Informational → format: listicle with how-to elements
  → Pillar/Cluster: Cluster post under "Complete HVAC Maintenance Guide" pillar
  → Gets user approval

Phase 3 — Article Writing
  Writes 2,200-word article:
  - YAML frontmatter with all metadata
  - E-E-A-T opener: "After servicing 5,000+ HVAC systems across 20 years..."
  - Featured snippet block under first H2 (55-word direct answer)
  - 6 H2 sections + smart thermostat H3 subsection
  - FAQ targeting 6 PAA questions (50-word answers each)
  - Author note: "Written by John Smith, NATE-certified HVAC technician with 20 years experience."
  - Internal links to 3 real pages from Phase 1 content inventory
  - External citations from ENERGY STAR and ASHRAE (real URLs)
  - Conclusion CTA: "Schedule your annual HVAC tune-up today"
  - Self-check: all 12 items cleared ✓

Phase 4 — Notion Publishing
  Searches Notion for "SEO Articles" database → found ✓
  Creates new Notion page: "10 HVAC Maintenance Tips That Cut Energy Bills in 2026"
  - Properties: Status=Draft, Keyword="HVAC maintenance tips", Intent=Informational,
                Type=Cluster, Pillar="Complete HVAC Maintenance Guide", WordCount=2200
  - Content formatted as Notion blocks: heading_2 sections, paragraphs, bulleted lists,
    numbered steps, FAQ heading_3 + paragraph pairs, author note
  → Shares Notion page URL with user ✓
  → JSON-LD Article + FAQPage schema generated for GitHub HTML output
```
