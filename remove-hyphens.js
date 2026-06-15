const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend/src');

const replacements = [
  { regex: / - /g, replacement: ' ' },
  { regex: / — /g, replacement: ' ' },
  { regex: /G-Maps/g, replacement: 'G Maps' },
  { regex: /Real-time/g, replacement: 'Real time' },
  { regex: /real-time/g, replacement: 'real time' },
  { regex: /game-changer/g, replacement: 'game changer' },
  { regex: /1-Page/g, replacement: '1 Page' },
  { regex: /3-Page/g, replacement: '3 Page' },
  { regex: /1-page/g, replacement: '1 page' },
  { regex: /3-page/g, replacement: '3 page' },
  { regex: /AI-Powered/g, replacement: 'AI Powered' },
  { regex: /Multi-Page/g, replacement: 'Multi Page' },
  { regex: /multi-page/g, replacement: 'multi page' },
  { regex: /mobile-friendly/g, replacement: 'mobile friendly' },
  { regex: /Data-driven/g, replacement: 'Data driven' },
  { regex: /data-driven/g, replacement: 'data driven' },
  { regex: /high-visibility/g, replacement: 'high visibility' },
  { regex: /high-performance/g, replacement: 'high performance' },
  { regex: /1-3/g, replacement: '1 to 3' },
  { regex: /10-14/g, replacement: '10 to 14' },
  { regex: /Next-gen/g, replacement: 'Next gen' },
  { regex: /next-gen/g, replacement: 'next gen' },
  { regex: /co-founder/gi, replacement: 'co founder' },
  { regex: /post-setup/g, replacement: 'post setup' },
  { regex: /flat-fee/g, replacement: 'flat fee' },
  { regex: /About-Us/g, replacement: 'About Us' },
  { regex: /MapMend-Solution/g, replacement: 'MapMend Solution' },
  { regex: /user-friendly/g, replacement: 'user friendly' },
  { regex: /high-conversion/g, replacement: 'high conversion' },
  { regex: /long-tail/g, replacement: 'long tail' },
  { regex: /mobile-responsive/g, replacement: 'mobile responsive' },
  { regex: /built-in/g, replacement: 'built in' },
  { regex: /full-stack/g, replacement: 'full stack' },
  { regex: /Full-Stack/g, replacement: 'Full Stack' },
  { regex: /world-class/g, replacement: 'world class' },
  { regex: /World-class/g, replacement: 'World class' },
  { regex: /top-tier/g, replacement: 'top tier' },
  { regex: /Top-tier/g, replacement: 'Top tier' },
  { regex: /cutting-edge/g, replacement: 'cutting edge' },
  { regex: /Cutting-edge/g, replacement: 'Cutting edge' },
  { regex: /State-of-the-art/gi, replacement: 'State of the art' },
  { regex: /auto-scrolling/g, replacement: 'auto scrolling' },
  { regex: /one-time/gi, replacement: 'one time' },
  { regex: /follow-up/g, replacement: 'follow up' },
  { regex: /pre-loaded/g, replacement: 'pre loaded' },
  { regex: /quick-reply/gi, replacement: 'quick reply' },
  { regex: /context-aware/g, replacement: 'context aware' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
console.log("Done replacing text hyphens.");
