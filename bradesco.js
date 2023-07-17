const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({devtools: true});
    const page = await browser.newPage();
    await page.goto('https://www.intergrall.com.br/callcenter/cc_login.php', {waitUntil: 'networkidle2'});
    await page.type('[id="login"]', 'bpro42543');
    await page.type('[id="password"]', 'zapola20');
    await page.click('[id="loginBtn"]');
    
    page.waitForResponse()
    //page.waitForXPath('')
    
    await page.goForward('https://www.intergrall.com.br/callcenter/pbc/bp_pbc_extrato_financeiro.php')
    //await page.click('[onclick="abreProgramaNivel(&#39;PHR&#39;,&#39;pbc/bp_pbc_extrato_financeiro.php&#39;);"]');

    //await browser.close();
})();