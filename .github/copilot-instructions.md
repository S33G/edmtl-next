<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

# EDMTL Website Development Guidelines

## Project Overview
This is a Next.js website for EDMTL (Entretien Domestique Montreal), a home maintenance service company. The site features:
- Multi-language support (English/French)
- Markdown-based content management
- JSON configuration files
- Mobile-responsive design

## Content Management
- All content is stored in markdown files in the `content/` directory
- Site configuration is in `config/site.json`
- Content can be easily updated by editing markdown files directly in GitHub

## Development Best Practices
- Use TypeScript for all React components
- Follow Next.js App Router patterns
- Keep components small and focused
- Use Tailwind CSS for styling
- Ensure mobile responsiveness

## File Structure
- `content/` - Markdown content files
- `config/` - Site configuration (JSON)
- `src/app/` - Next.js pages and layouts
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions

## Multi-language Support
- English: `/` (default route)
- French: `/fr`
- Language switching via header component
- Content files use `.en.md` and `.fr.md` suffixes
