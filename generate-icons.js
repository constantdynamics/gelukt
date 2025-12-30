// Generate PWA icons for Kids Habit Tracker
// This script creates simple PNG icons using canvas (node-canvas would be needed)
// For now, we'll create SVG icons that can be used as fallbacks

const fs = require('fs');

function generateSVGIcon(size) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ef4444;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Rounded rectangle background -->
  <rect x="0" y="0" width="${size}" height="${size}" rx="${size * 0.2}" ry="${size * 0.2}" fill="url(#bgGradient)" />

  <!-- Train emoji (using text) -->
  <text x="${size/2}" y="${size/2}" font-size="${size * 0.5}" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif">🚂</text>

  <!-- Optional: Add stars for decoration -->
  <text x="${size * 0.15}" y="${size * 0.2}" font-size="${size * 0.15}" opacity="0.8">✨</text>
  <text x="${size * 0.85}" y="${size * 0.8}" font-size="${size * 0.15}" opacity="0.8">✨</text>
</svg>`;
}

// Generate icons
const icon192 = generateSVGIcon(192);
const icon512 = generateSVGIcon(512);

// Save as SVG files (can be used as fallback)
fs.writeFileSync('icon-192.svg', icon192);
fs.writeFileSync('icon-512.svg', icon512);

console.log('✅ SVG icons generated!');
console.log('📝 icon-192.svg');
console.log('📝 icon-512.svg');
console.log('\n💡 To convert to PNG:');
console.log('   Open generate-icons.html in a browser and download the PNG icons');
console.log('   OR use an online SVG to PNG converter');
console.log('   OR use ImageMagick: convert icon-192.svg icon-192.png');
