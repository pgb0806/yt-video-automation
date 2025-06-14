const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load template
  let html = fs.readFileSync('template.html', 'utf8');
  html = html.replace('{{QUOTE}}', process.env.QUOTE);
  html = html.replace('{{AUTHOR}}', process.env.AUTHOR);

  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.setViewport({ width: 1280, height: 720 });

  await page.screenshot({ path: 'frame.png' });

  await browser.close();
})();
