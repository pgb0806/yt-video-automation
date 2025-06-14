const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  // Read the template
  let template = fs.readFileSync('template.html', 'utf8');

  // Replace placeholders
  const quote = process.env.QUOTE || "Your default quote here";
  const author = process.env.AUTHOR || "Anonymous";
  template = template.replace('{{QUOTE}}', quote).replace('{{AUTHOR}}', author);

  // Save dynamic HTML
  fs.writeFileSync('output.html', template);

  // Render with Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/output.html`);
  await page.screenshot({ path: 'frame.png', fullPage: true });
  await browser.close();
})();
