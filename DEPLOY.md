# ErideCommerce Static Site Deployment

This folder is ready to upload as a static website.

## Files to upload

Upload everything inside `outputs/eride-website/`:

- `index.html`
- `services.html`
- `case-studies.html`
- `proof-vault.html`
- `about.html`
- `contact.html`
- `free-audit.html`
- `page.css`
- `assets/`

## GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from `outputs/eride-website/` to the repository root.
3. Go to repository `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Choose branch `main` and folder `/root`.
6. Save.

GitHub will give you a live URL like:

`https://yourusername.github.io/repository-name/`

## Custom Domain

1. In GitHub Pages, add your custom domain.
2. In your domain DNS, add the GitHub Pages records GitHub shows you.
3. Enable `Enforce HTTPS` after DNS verifies.

## Form Note

The forms are currently static. To receive submissions, connect Formspree, Netlify Forms, Tally, HubSpot, or your CRM endpoint.
