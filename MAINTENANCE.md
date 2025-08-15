# EDMTL Website - Easy Maintenance Guide

## 🎯 Quick Content Updates

### To update the main content:
1. **Edit text and FAQ**: Update `config/site.json`
2. **Change contact info**: Update `config/site.json` → `contact` section
3. **Add/remove services**: Update `config/site.json` → `services` section

### Example: Adding a new FAQ item
```json
{
  "question": "NEW QUESTION HERE?",
  "answer": "Answer goes here..."
}
```

## 🖼️ Adding Service Images

1. Add image files to the `public/images/` folder
2. Update the service image paths in `config/site.json`:
```json
{
  "name": "Window Cleaning",
  "image": "/images/your-image.jpg"
}
```

## 🌍 Language Support

- English content: All `"en"` sections in `config/site.json`
- French content: All `"fr"` sections in `config/site.json`
- URLs: `/` for English, `/fr` for French

## 🎨 Design Customization

### Colors (in `config/site.json`):
- `"primary"`: Main yellow color (`#FFB800`)
- `"background"`: Dark background (`#2A2A2A`)
- Easy to change all at once!

### Layout:
- Responsive design works on mobile/desktop
- Hexagonal background pattern
- Professional dark theme with gold accents

## 🚀 Going Live

1. **GitHub**: Push your changes
2. **Vercel/Netlify**: Will auto-deploy
3. **Custom domain**: Configure in hosting platform

## 🔧 Technical Notes

- Built with Next.js (React framework)
- All content configurable via JSON
- No coding required for content updates
- Mobile-responsive design
- SEO optimized

---

**Need help?** The website is designed to be maintainable by anyone who can edit a JSON file. All content changes can be done through the `config/site.json` file!
