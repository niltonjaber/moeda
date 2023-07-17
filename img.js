const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false, slowMo: 250}); //propriedades headless para o chrome
  const page = await browser.newPage();
  await page.setViewport({ //propriedades da imagem
    width: 1600,
    height: 800,
    deviceScaleFactor: 1,
  });
  await page.goto('https://www.bmgconsig.com.br/Index.do?method=prepare&logout=true');
  await page.screenshot({path: 'example1.png'});

  //debug
  page.on('console', msg => console.log('PAGE LOG:', msg.text()))
  await page.evaluate(() => console.log(`url is ${location.href}`));

  await browser.close();

})();