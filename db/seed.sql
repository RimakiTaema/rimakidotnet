INSERT INTO categories (title, description, slug) VALUES
    ('Web', 'Web development projects', 'web'),
    ('Bots', 'Discord and other bot projects', 'bots'),
    ('Tools', 'Developer tools and utilities', 'tools');

INSERT INTO projects (title, description, slug, category_slug, tags, href, has_mdx, created_at) VALUES
    ('Rimaki.net', 'My personal portfolio website', 'rimaki-net', 'web', '["Next.js","Tailwind","Cloudflare"]', NULL, 1, '2026-03-21T00:00:00.000Z');
