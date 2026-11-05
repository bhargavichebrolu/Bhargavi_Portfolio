import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  experience,
  projectGroups,
  projects,
  profile,
  publishedProjects,
  skillCategories,
  type ProjectGroup,
} from "@/data/portfolio";

const allTechnologies = [
  ...skillCategories.flatMap((c) => c.technologies),
  ...projects.flatMap((p) => p.stack),
];

describe("portfolio data", () => {
  it("has a logo file for every technology that names one", () => {
    const missing = allTechnologies
      .filter((t) => t.logo)
      .filter((t) => !fs.existsSync(path.resolve("public/logos", `${t.logo}.svg`)))
      .map((t) => t.name);
    expect(missing).toEqual([]);
  });

  it("gives every technology a logo or a neutral icon", () => {
    const bare = allTechnologies.filter((t) => !t.logo && !t.glyph).map((t) => t.name);
    expect(bare).toEqual([]);
  });

  it("does not list C++", () => {
    const names = skillCategories.flatMap((c) => c.technologies.map((t) => t.name));
    expect(names).not.toContain("C++");
  });

  it("uses unique category ids and project slugs", () => {
    const ids = skillCategories.map((c) => c.id);
    const slugs = projects.map((p) => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("shows the groups in the agreed order", () => {
    expect(projectGroups.map((g) => g.key)).toEqual([
      "featured-ai-research",
      "professional-real-world",
      "personal-ai-research",
      "personal-software",
    ]);
  });

  it("places each project in the right group", () => {
    const inGroup = (key: ProjectGroup["key"]) =>
      projects.filter((p) => p.group === key).map((p) => p.slug);
    expect(inGroup("featured-ai-research")).toEqual(["medquery-ai"]);
    expect(inGroup("professional-real-world")).toEqual([
      "iirm",
      "professional-development-project-1",
      "professional-development-project-2",
    ]);
    expect(inGroup("personal-ai-research")).toHaveLength(7);
    expect(inGroup("personal-software")).toEqual(["art-platform"]);
  });

  it("marks MedQuery AI as in progress, with no clinical claim or final result", () => {
    const medquery = projects.find((p) => p.slug === "medquery-ai");
    expect(medquery?.status).toBe("in-progress");
    expect(medquery?.note).toMatch(/not been clinically validated/);
    expect(medquery?.caseStudy.results).toBeUndefined();
  });

  it("describes IIRM from the supplied details", () => {
    const iirm = projects.find((p) => p.slug === "iirm");
    expect(iirm?.contribution).toBe("Automation Testing");
    expect(iirm?.caseStudy.contributions).toHaveLength(5);
    expect(iirm?.stack.map((t) => t.name)).toEqual([
      "Playwright",
      "TypeScript",
      "Rest Assured",
      "Postman",
      "Swagger",
      "Jira",
      "Visual Studio Code",
    ]);
  });

  it("does not invent details for projects still to be described", () => {
    const pending = projects.filter(
      (p) => p.status === "details-pending" && p.slug !== "explainable-skin-lesion-classification",
    );
    expect(pending).toHaveLength(8);
    for (const draft of pending) {
      expect(draft.stack).toEqual([]);
      expect(draft.caseStudy).toEqual({});
      expect(draft.github).toBeUndefined();
      expect(draft.demo).toBeUndefined();
    }
  });

  it("gives case study pages only to projects that are written up", () => {
    expect(publishedProjects.map((p) => p.slug)).toEqual(["medquery-ai", "iirm", "art-platform"]);
  });

  it("publishes no result figures that have not been supplied", () => {
    expect(projects.flatMap((p) => p.caseStudy.results ?? [])).toEqual([]);
    expect(experience.flatMap((e) => e.achievements)).toEqual([]);
  });

  it("keeps the accent phrase inside the headline", () => {
    expect(profile.headline).toContain(profile.headlineAccent);
  });
});
