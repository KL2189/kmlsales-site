// Renders public/og.png (social share image) at build time from the brand logo + fonts.
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const files = ['public/fonts/libre-baskerville.ttf', 'public/fonts/inter.ttf'];

const logo = fs.readFileSync('public/brand/kml-horizontal-white.svg', 'utf8').replace(/<svg[^>]*>/, '').replace('</svg>', '');
const line = (y, t) => `<text x="80" y="${y}" font-family="Libre Baskerville" font-size="62" fill="url(#t)" letter-spacing="-1.5">${t}</text>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
<radialGradient id="a" cx="85%" cy="5%" r="70%"><stop offset="0" stop-color="#ffffff" stop-opacity=".22"/><stop offset=".45" stop-color="#8a8a8a" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<radialGradient id="b" cx="10%" cy="110%" r="60%"><stop offset="0" stop-color="#ffffff" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<radialGradient id="c" cx="65%" cy="30%" r="55%"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#a9a9a9"/></linearGradient>
<linearGradient id="s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#d0d0d0"/><stop offset="1" stop-color="#8a8a8a"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="#000"/><rect width="1200" height="630" fill="url(#c)"/><rect width="1200" height="630" fill="url(#a)"/><rect width="1200" height="630" fill="url(#b)"/>
<g transform="translate(60 44) scale(.32)">${logo}</g>
${line(300, 'Your team should know')}${line(378, 'what happens next.')}
<rect x="80" y="510" width="120" height="4" rx="2" fill="url(#s)"/>
<text x="80" y="566" font-family="Inter" font-size="26" fill="#bdbdbd">Go-to-market workflow design.  kmlsales.com</text>
</svg>`;

const png = new Resvg(svg, { font: { fontFiles: files, loadSystemFonts: files.length === 0, defaultFontFamily: 'Inter' }, fitTo: { mode: 'width', value: 1200 } }).render().asPng();
fs.writeFileSync('public/og.png', png);
console.log(`[og] wrote public/og.png (${png.length} bytes, ${files.length} fonts)`);
