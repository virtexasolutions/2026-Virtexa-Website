import { describe, expect, it } from "vitest";
import {
  buildPosts,
  parseFrontmatter,
  postStructuredData,
  slugFromPath,
} from "@/lib/blog-core";
import { posts } from "@/lib/blog";

const post = (frontmatter: string, body = "Hello **world**.") =>
  `---\n${frontmatter}\n---\n${body}`;

describe("parseFrontmatter", () => {
  it("parses strings, quoted strings, and lists", () => {
    const { data, body } = parseFrontmatter(
      post('title: "A: B"\ntags: [One, "Two"]\ndate: 2026-01-02'),
    );
    expect(data).toEqual({
      title: "A: B",
      tags: ["One", "Two"],
      date: "2026-01-02",
    });
    expect(body).toBe("Hello **world**.");
  });
});

describe("slugFromPath", () => {
  it("strips the folder, extension, and date prefix", () => {
    expect(slugFromPath("src/content/blog/2026-09-29-my-post.md")).toBe(
      "my-post",
    );
    expect(slugFromPath("my-post.md")).toBe("my-post");
  });
});

describe("buildPosts", () => {
  const base = "description: D\ndate: 2026-01-01";

  it("renders Markdown, drops drafts, and sorts newest first", () => {
    const result = buildPosts({
      "a.md": post(`title: Old\n${base}`),
      "b.md": post("title: New\ndescription: D\ndate: 2026-02-01"),
      "c.md": post(`title: Draft\n${base}\ndraft: true`),
    });
    expect(result.map((p) => p.slug)).toEqual(["b", "a"]);
    expect(result[0].html).toContain("<strong>world</strong>");
    expect(result[0].author).toBe("Virtexa Solutions");
  });

  it("rejects missing required fields and duplicate slugs", () => {
    expect(() => buildPosts({ "a.md": post("title: T") })).toThrow(
      /description/,
    );
    expect(() =>
      buildPosts({
        "2026-01-01-a.md": post(`title: A\n${base}`),
        "a.md": post(`title: B\n${base}`),
      }),
    ).toThrow(/Duplicate/);
  });

  it("builds BlogPosting structured data", () => {
    const [p] = buildPosts({ "a.md": post(`title: T\n${base}`) });
    const data = postStructuredData(p) as { "@graph": { url?: string }[] };
    expect(data["@graph"][0].url).toBe("https://virtexasolutions.com/blog/a");
  });
});

describe("published posts", () => {
  it("all have unique slugs and SEO-friendly metadata", () => {
    expect(posts.length).toBeGreaterThan(0);
    for (const p of posts) {
      expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.description.length).toBeLessThanOrEqual(200);
    }
  });

  it("only link internally to pages that exist", () => {
    const slugs = new Set(posts.map((p) => p.slug));
    for (const p of posts) {
      for (const [, slug] of p.html.matchAll(/href="\/blog\/([^"#?]+)"/g)) {
        expect(slugs, `${p.slug} links to /blog/${slug}`).toContain(slug);
      }
    }
  });
});
