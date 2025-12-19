# GitHub Pages Deployment Guide

## 🚀 Quick Deploy Steps

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `portfolio` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. Don't initialize with README (you already have files)
5. Click "Create repository"

### 2. Update vite.config.js
**IMPORTANT**: In `vite.config.js`, change the base path to match your repo name:
```javascript
base: '/portfolio/', // Change 'portfolio' to YOUR repo name
```

If your repo is named `manvik-portfolio`, use:
```javascript
base: '/manvik-portfolio/',
```

### 3. Push Your Code to GitHub
Run these commands in your terminal:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add your GitHub repo as remote (replace with YOUR username and repo name)
git remote add origin https://github.com/CodexManvik/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Build and Deploy
```bash
# Build the production version
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### 5. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under "Source", select branch: `gh-pages`
5. Click **Save**

### 6. Access Your Site
Your portfolio will be live at:
```
https://codexmanvik.github.io/portfolio/
```

Replace `codexmanvik` with your GitHub username and `portfolio` with your repo name.

---

## 🔄 Update Your Portfolio Later

Whenever you make changes:

```bash
# Make your changes, then:
git add .
git commit -m "Update portfolio"
git push

# Rebuild and redeploy
npm run build
npm run deploy
```

---

## 🎯 Custom Domain (Optional)

Want `manviktalwar.com` instead of `codexmanvik.github.io/portfolio`?

1. Buy domain from Namecheap/GoDaddy (~$10-15/year)
2. Create a file named `CNAME` in the `public` folder with your domain:
   ```
   manviktalwar.com
   ```
3. In your domain registrar, add these DNS records:
   - Type: A, Host: @, Value: 185.199.108.153
   - Type: A, Host: @, Value: 185.199.109.153
   - Type: A, Host: @, Value: 185.199.110.153
   - Type: A, Host: @, Value: 185.199.111.153
4. Redeploy: `npm run build && npm run deploy`
5. In GitHub Settings > Pages, add your custom domain

---

## 🐛 Troubleshooting

### Issue: Blank page after deployment
- Check that `base` in `vite.config.js` matches your repo name
- Make sure repo is **Public**
- Wait 2-3 minutes for GitHub Pages to build

### Issue: 404 errors
- Verify the base path in vite.config.js
- Check that gh-pages branch exists
- Ensure GitHub Pages is enabled in Settings

### Issue: CSS/JS not loading
- Confirm base path ends with `/`
- Clear browser cache
- Check browser console for errors

---

## 📝 Your URLs

After deployment, your portfolio will be at:
- **Main site**: `https://codexmanvik.github.io/portfolio/`
- **With custom domain**: `https://manviktalwar.com` (if configured)

---

## ✅ Checklist

- [ ] Created GitHub repository
- [ ] Updated `base` in vite.config.js to match repo name
- [ ] Pushed code to GitHub
- [ ] Ran `npm run build`
- [ ] Ran `npm run deploy`
- [ ] Enabled GitHub Pages in Settings
- [ ] Verified site is live

---

**Need help?** Check the GitHub Pages documentation: https://docs.github.com/en/pages
