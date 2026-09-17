const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../out');
const port = Number(process.env.PORT || 3000);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff2':'font/woff2', '.xml':'application/xml', '.txt':'text/plain', '.webmanifest':'application/manifest+json' };
const aliases = { 'commercial-window-cleaning':'window-cleaning', 'deck-refinishing':'deck-staining', 'gutter-services':'gutter-cleaning' };

http.createServer((req,res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end('Preview only: use mocked form submissions.'); }
  const alias = url.pathname.match(/^(\/fr)?\/services\/([^/]+)\/?$/);
  if (alias && aliases[alias[2]]) { res.writeHead(301,{Location:`${alias[1] || ''}/services/${aliases[alias[2]]}${url.search}${alias[2] === 'commercial-window-cleaning' ? '#commercial' : ''}`}); return res.end(); }
  if (url.pathname === '/en/contact' || url.pathname === '/thank-you.html') { res.writeHead(301,{Location:`${url.pathname === '/en/contact' ? '/contact' : '/thank-you'}${url.search}`}); return res.end(); }
  let requested;
  try { requested = decodeURIComponent(url.pathname); } catch { res.writeHead(400); return res.end(); }
  const target = path.resolve(root, '.' + requested);
  if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  const candidates = [target, target+'.html', path.join(target,'index.html')];
  const file = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file) { res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}); const fallback=path.join(root,'404.html'); return res.end(fs.existsSync(fallback)?fs.readFileSync(fallback):'Not found'); }
  res.writeHead(200, { 'Content-Type':types[path.extname(file)] || (requested.includes('opengraph-image') || requested.includes('icon') ? 'image/png':'application/octet-stream'), 'Cache-Control':'no-store' });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log(`EDMTL preview: http://localhost:${port}`));
