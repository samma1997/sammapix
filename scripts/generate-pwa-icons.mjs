// Generate PWA icons matching the SammaPix pixel logo
import sharp from "sharp";

// SVG of the SammaPix pixel logo (4x4 grid, same as navbar)
const logoSvg = `
<svg width="512" height="512" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="20" height="20" fill="#171717"/>
  <rect x="2" y="2" width="3" height="3" fill="#E5E5E5"/>
  <rect x="6" y="2" width="3" height="3" fill="#E5E5E5"/>
  <rect x="10" y="2" width="3" height="3" fill="#E5E5E5"/>
  <rect x="14" y="2" width="3" height="3" fill="#E5E5E5"/>
  <rect x="2" y="6" width="3" height="3" fill="#E5E5E5"/>
  <rect x="14" y="6" width="3" height="3" fill="#E5E5E5"/>
  <rect x="2" y="10" width="3" height="3" fill="#E5E5E5"/>
  <rect x="14" y="10" width="3" height="3" fill="#E5E5E5"/>
  <rect x="2" y="14" width="3" height="3" fill="#E5E5E5"/>
  <rect x="6" y="14" width="3" height="3" fill="#E5E5E5"/>
  <rect x="10" y="14" width="3" height="3" fill="#E5E5E5"/>
  <rect x="14" y="14" width="3" height="3" fill="#E5E5E5"/>
  <rect x="6" y="6" width="3" height="3" fill="#E5E5E5"/>
  <rect x="10" y="6" width="3" height="3" fill="#E5E5E5"/>
  <rect x="6" y="10" width="3" height="3" fill="#E5E5E5"/>
  <rect x="10" y="10" width="3" height="3" fill="#E5E5E5"/>
</svg>
`;

const buf = Buffer.from(logoSvg);

await sharp(buf).resize(512, 512).png().toFile("public/icon-512.png");
console.log("icon-512.png generated");

await sharp(buf).resize(192, 192).png().toFile("public/icon-192.png");
console.log("icon-192.png generated");

await sharp(buf).resize(180, 180).png().toFile("public/apple-touch-icon.png");
console.log("apple-touch-icon.png generated");
