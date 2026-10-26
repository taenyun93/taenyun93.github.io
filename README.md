# Taenyun Kim — Personal website

A responsive, dependency-free academic portfolio based on https://www.taenyunkim.com/.

## Preview

Open `index.html`, or run `python3 -m http.server 8000` from this directory.

## GitHub Pages

1. Put these files in the intended GitHub repository on its `main` branch.
2. In Settings → Pages → Build and deployment, choose **GitHub Actions**.
3. Run the included Pages workflow or push a commit to `main`.

The site supports both user and project Pages URLs through relative asset paths. No package installation or build is required. Google Fonts is optional; system fonts are used if unavailable.

## Edit

Content and links: `index.html`. Colors, typography, and mobile layouts: `style.css`.

The site uses a compact academic layout with a researcher sidebar, research interests, selected publications with DOI links, and education. Publication metadata was checked against publisher pages and bibliographic records; Google Scholar links to the full list. CV links to the original site's Google Drive file.

The existing taenyunkim.com domain has not been moved. To migrate it, first verify the GitHub Pages site, then configure the custom domain and DNS separately.
