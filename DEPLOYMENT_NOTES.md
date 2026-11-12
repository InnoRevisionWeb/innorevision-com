# InnoRevision — GitHub Pages deployment files

The four support files are intended for the root of the GitHub Pages repository. The existing HTML, CSS, JavaScript, and images from V22 are unchanged.

- `CNAME`: registers `innorevision.com` as the GitHub Pages custom domain.
- `.nojekyll`: disables Jekyll processing for the static site.
- `robots.txt`: permits crawler access and points to the sitemap.
- `sitemap.xml`: lists all five public HTML pages, with the homepage at `/`.

## Deployment cautions

Verify the preferred canonical domain is `https://innorevision.com/` and that the GitHub Pages repository settings match `CNAME`. Do not alter unrelated DNS records. Upload these files to the repository root. GitHub Pages may generate or update `CNAME` when the domain is configured through its settings.

No canonical `<link>` elements or other changes have been made to the original HTML. These can be addressed in a separate SEO update if desired. The sitemap does not assert a last-modified date.
