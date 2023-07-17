const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({devtools: true});
    const page = await browser.newPage();
    await page.goto('https://pt.wikipedia.org/wiki/Manchester_United_Football_Club', {
      waitUntil: 'networkidle2',
    });
    await page.pdf({path: 'hn.pdf', format: 'a4'});
  
    await browser.close();
  })();