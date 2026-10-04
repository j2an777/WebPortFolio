import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { projects } from "../src/content/portfolio";

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
