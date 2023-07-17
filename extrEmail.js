const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false, 
        slowMo: 250 
    });

    let page = await browser.newPage();
    await page.goto('https://sic.cetelem.com.br/Login/AC.UI.LOGIN.aspx');

    await page.evaluate(() => {
        let input = document.querySelector('input[name=EUsuario$CAMPO]')
        input.value = "01481017632_000359";
    });

    let entrar = await page.$('#lnkEntrar');
    entrar.click();

    /*
    const hrefElement = await page.$('a'); '#i0116kbankvirtual.com.br');
    const idElementBtn = await page.$('#idSIButton9');
    await hrefElement.click();
    await hrefElement.value('nilton@wor
    await idElementBtn.click(); 

    const user = await page.$('#EUsuario_CAMPO');
    user.type("01481017632_000359");
    const pass = await page.$('#ESenha_CAMPO');
    pass.type("Cred@2026");
    */

})();