import assert from "node:assert/strict";
import { test } from "node:test";
import { getSiteConfig, serializeJsonLd } from "../src/lib/seo";

test("JSON-LD cannot escape its script element", () => {
  const attack = { name: "</script><script>alert(1)</script>&\u2028" };
  const result = serializeJsonLd(attack);
  assert.equal(result.includes("</script>"), false);
  assert.deepEqual(JSON.parse(result), attack);
});
test("indexing requires an explicit HTTPS deployment origin", () => {
  assert.equal(getSiteConfig({}).indexable, false);
  assert.equal(getSiteConfig({ SITE_INDEXABLE: "true" }).indexable, false);
  assert.equal(
    getSiteConfig({ SITE_INDEXABLE: "true", SITE_URL: "http://localhost:3100" })
      .indexable,
    false,
  );
  assert.equal(
    getSiteConfig({ SITE_INDEXABLE: "true", SITE_URL: "https://example.com" })
      .indexable,
    true,
  );
});
test("canonical origin is validated and normalized", () => {
  assert.equal(
    getSiteConfig({ SITE_URL: "https://example.com/" }).origin,
    "https://example.com",
  );
  assert.throws(() => getSiteConfig({ SITE_URL: "javascript:alert(1)" }));
  assert.throws(() =>
    getSiteConfig({ SITE_URL: "https://user:password@example.com" }),
  );
  assert.throws(() =>
    getSiteConfig({ SITE_URL: "https://example.com/portfolio" }),
  );
});
