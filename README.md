# EDMTL - Entretien Domestique Montreal

A modern, multi-language website for EDMTL home maintenance services, built with Next.js and powered by markdown files for easy content management.

## 🚀 Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production
```bash
npm run build
npm start
```

## 📝 Content Management

### Easy Content Updates
All website content is stored in markdown files in the `content/` directory:

- `content/index.en.md` - English content
- `content/index.fr.md` - French content

To update content:
1. Edit the markdown files directly in GitHub
2. The changes will be automatically deployed (if using Vercel/Netlify)

### Site Configuration
The `config/site.json` file contains:
- Contact information
- Services list
- Features/testimonials
- Supported languages

### Adding New Content
1. Create new markdown files in the `content/` directory
2. Use the naming convention: `filename.en.md`, `filename.fr.md`
3. Update the routing in the app if needed

## 🌐 Multi-Language Support

The site supports English (`en`) and French (`fr`):
- Default: `/` (English)
- French: `/fr`

Language switching is handled automatically via the header language switcher.

## 📁 Project Structure

```
edmtl/
├── content/           # Markdown content files
│   ├── index.en.md    # English homepage content
│   └── index.fr.md    # French homepage content
├── config/            # Site configuration
│   └── site.json      # Global site settings
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   └── lib/           # Utilities (markdown parser)
└── public/           # Static assets
```

## 🛠 Key Features

- ✅ **Markdown-driven content** - Easy to edit and maintain
- ✅ **Multi-language support** - English and French
- ✅ **Mobile responsive** - Works on all devices
- ✅ **SEO optimized** - Built with Next.js best practices
- ✅ **Fast loading** - Optimized for performance
- ✅ **Easy deployment** - Works with Vercel, Netlify, etc.

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on every push

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next/`

### Manual Deployment
```bash
npm run build
npm start
```

## 📞 Contact Information

To update contact details, edit `config/site.json`:
```json
{
  "contact": {
    "email": "info@edmtl.com",
    "phone": "438-500-3099"
  }
}
```

## 🎨 Styling

The site uses Tailwind CSS for styling. Custom styles are in `src/app/globals.css`.

## 📋 Maintenance Checklist

### Regular Updates
- [ ] Update content in markdown files
- [ ] Check contact information in `config/site.json`
- [ ] Verify all links work
- [ ] Test language switching
- [ ] Check mobile responsiveness

### Dependencies
- [ ] Run `npm audit` for security updates
- [ ] Update Next.js and other dependencies regularly

## 🆘 Troubleshooting

### Common Issues
1. **Site not loading**: Check if development server is running (`npm run dev`)
2. **Content not updating**: Clear browser cache or hard refresh
3. **Build errors**: Check markdown syntax in content files

### Getting Help
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review markdown syntax guides
- Contact the developer if needed

---

Made with ❤️ for EDMTL - Professional Home Maintenance Services in Montreal
