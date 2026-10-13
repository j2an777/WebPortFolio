import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { projects, getProjectGroups } from "../src/content/portfolio";

test("every routed case has a unique safe slug and a real local thumbnail", () => {
  assert.equal(
    new Set(projects.map((project) => project.slug)).size,
    projects.length,
  );
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(existsSync(`public${project.image}`), project.image);
    assert.ok(project.imageAlt.length > 10);
    for (const evidence of project.evidence) {
      if (evidence.url) assert.equal(new URL(evidence.url).protocol, "https:");
      if (evidence.label.includes("입사 포트폴리오"))
        assert.equal(
          evidence.url,
          undefined,
          "private PDF must not link to unrelated evidence",
        );
    }
  }
});


test("company groups include every case once and distinguish employment from client work", () => {
  const groups = getProjectGroups();
  assert.deepEqual(groups.map((group) => group.projects.length), [7, 2, 2]);
  assert.equal(new Set(groups.flatMap((group) => group.projects.map((project) => project.slug))).size, projects.length);
  assert.deepEqual(groups.find((group) => group.id === "investi")?.projects.map((project) => project.slug), ["hanwha-vision", "co-play"]);
});
