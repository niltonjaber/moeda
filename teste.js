const puppeteer = require('puppeteer');

(async () => {
    var dateFormated = strftime('%Y/%m/%d %H:%M:%S', date);
    var dateGeneral = strftime('%Y%m%d', date);
    const name = 'emailinvalid' + dateFormated;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.site24x7.com/pt/tools/email-validator.html', {waitUntil: 'networkidle2'});
    await page.type(`[id="emailInput"]`, sUser, { delay: 50 });
    await page.pdf({path: name, format: 'a4'});

    await browser.close();
})();