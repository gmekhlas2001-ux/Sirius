# Sirius Deployment Guide

## Publishing to sirius.pxpmanagement.es

Your site is now optimized for SEO and ready to be published. Here's what has been set up:

### SEO Optimizations Complete ✓

1. **Meta Tags**: Comprehensive title, description, and keywords optimized for "Sirius", "Siri" and related searches
2. **Open Graph Tags**: Social media preview cards for Facebook, LinkedIn, etc.
3. **Twitter Cards**: Optimized Twitter sharing
4. **Favicon & Icons**: Custom Sirius logo favicon and app icons
5. **Sitemap**: XML sitemap for search engines
6. **Robots.txt**: Search engine crawling instructions
7. **Structured Data**: JSON-LD schema for enhanced Google search results
8. **Canonical URLs**: Set to https://sirius.pxpmanagement.es/

### Deployment Options

#### Option 1: Using Your Current Hosting (Recommended)

If you already have hosting with PXP Management:

1. **Upload the `dist` folder** contents to your web server:
   ```bash
   # Via FTP/SFTP, upload all files from the dist/ folder to your web root
   # OR via SSH:
   scp -r dist/* user@pxpmanagement.es:/path/to/sirius/
   ```

2. **Configure your web server** to point sirius.pxpmanagement.es to the uploaded files

3. **Ensure HTTPS** is enabled (Let's Encrypt or existing SSL certificate)

#### Option 2: Vercel (Fast & Free)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Add custom domain in Vercel dashboard:
   - Go to your project settings
   - Add domain: `sirius.pxpmanagement.es`
   - Update DNS records as instructed by Vercel

#### Option 3: Netlify (Free with Custom Domain)

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

3. Configure custom domain in Netlify dashboard

### DNS Configuration

For sirius.pxpmanagement.es, you'll need to add DNS records:

**If using Vercel/Netlify:**
- Follow their custom domain setup instructions

**If using your own hosting:**
```
Type: A or CNAME
Name: sirius
Value: [Your server IP or hostname]
TTL: 3600 (or automatic)
```

### Google Search Console Setup (Important for SEO!)

After deployment, register your site with Google:

1. **Go to**: https://search.google.com/search-console

2. **Add Property**: Enter `https://sirius.pxpmanagement.es`

3. **Verify Ownership**: Choose a verification method (HTML file, DNS, or meta tag)

4. **Submit Sitemap**:
   - In Search Console, go to "Sitemaps"
   - Submit: `https://sirius.pxpmanagement.es/sitemap.xml`

5. **Request Indexing**: Use the URL Inspection tool to request immediate indexing

### Boost SEO Rankings

To improve search visibility for "Sirius", "Siri" searches:

1. **Google My Business**: Create a listing if applicable
2. **Social Signals**: Share on social media to build backlinks
3. **Content Updates**: Regular updates help with SEO
4. **Performance**: Site already optimized for speed
5. **Mobile-Friendly**: Already responsive and mobile-optimized

### Monitoring & Analytics (Optional)

Consider adding:
- **Google Analytics 4**: Track visitors
- **Google Search Console**: Monitor search performance
- **Core Web Vitals**: Already optimized, monitor in Search Console

### Technical Details

- **Canonical URL**: https://sirius.pxpmanagement.es/
- **Sitemap**: /sitemap.xml
- **Robots**: /robots.txt
- **Favicon**: /favicon.svg
- **Apple Touch Icon**: /apple-touch-icon.svg
- **Web Manifest**: /site.webmanifest

### Keywords Optimized For

The site is optimized to rank for these search terms:
- Sirius
- Siri (alternate spelling)
- Eternal love
- Love connection
- Celestial love
- Brightest star
- Devotion
- Romantic journey
- Forever love
- Soulmate

### Need Help?

If you need assistance with deployment or DNS configuration, contact your hosting provider (PXP Management) with this guide.
