import assert from 'node:assert/strict';
import test from 'node:test';
import { getBasePath, withBasePath, stripBasePath, normalizePathname } from '../src/lib/paths';
import { getSiteConfig } from '../src/lib/seo';

test('Pages base path preserves the project prefix without double prefixing', () => {
  assert.equal(getBasePath('/WebPortFolio/'), '/WebPortFolio');
  assert.equal(withBasePath('/images/profile.webp', '/WebPortFolio'), '/WebPortFolio/images/profile.webp');
  assert.equal(withBasePath('/WebPortFolio/images/profile.webp', '/WebPortFolio'), '/WebPortFolio/images/profile.webp');
  assert.equal(withBasePath('/images/profile.webp', ''), '/images/profile.webp');
  for (const path of ['//evil.test', '/a/../b', '/a?x=1', 'WebPortFolio']) assert.throws(() => getBasePath(path));
});

test('project and custom domains share a validated canonical site URL', () => {
  assert.equal(getSiteConfig({ SITE_URL: 'https://j2an777.github.io', NEXT_PUBLIC_BASE_PATH: '/WebPortFolio' }).siteUrl, 'https://j2an777.github.io/WebPortFolio');
  assert.equal(getSiteConfig({ SITE_URL: 'https://j2an777developer.io' }).siteUrl, 'https://j2an777developer.io');
});

test('animated router destinations strip the deployment prefix exactly once', () => {
  const previous = process.env.NEXT_PUBLIC_BASE_PATH;
  process.env.NEXT_PUBLIC_BASE_PATH = '/WebPortFolio';
  try {
    assert.equal(stripBasePath('/WebPortFolio/projects/'), '/projects/');
    assert.equal(stripBasePath('/projects/'), '/projects/');
    assert.equal(stripBasePath('/WebPortFolio-other/projects/'), '/WebPortFolio-other/projects/');
    assert.equal(normalizePathname('/WebPortFolio/projects/'), '/projects');
    assert.equal(normalizePathname('/WebPortFolio/'), '/');
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previous;
  }
});
