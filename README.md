# The Inner Map — GitHub Pages release

This folder is the complete publishable website for GitHub Pages.

## Publish it

1. In your new GitHub repository, remove the files currently there.
2. Upload the **contents of this folder** (not the folder itself), including `.nojekyll`.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/(root)**.
4. Wait for GitHub to show the temporary Pages address, then open it and test the homepage, Start Here, Your Map and the “Very little capacity” route.
5. Only after that test passes, add `theinnermap.co.uk` as the custom domain in GitHub Pages and update the domain DNS records as GitHub instructs.

Do not add a `CNAME` file until you are ready to move the custom domain.

## What is included

- Static HTML pages for every main route.
- Browser-only interactive First Signal Map.
- Brand files, favicon, social-sharing image, sitemap and robots file.
- `.nojekyll`, which makes sure GitHub Pages serves the website’s `_next` asset folder correctly.
