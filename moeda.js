const puppeteer = require('puppeteer');

async function Robo() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const moedaBase = 'dolar';
    const moedaFinal = 'real';
    const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&rlz=1C1GCEU_pt-BRBR1015BR1015&sxsrf=ALiCzsZbxRka-k6CgZdo6vMiLHlKYgdVkg%3A1664990735057&ei=D749Y_KVA8LJ1sQPs7iSiA0&ved=0ahUKEwiy2cTqzcn6AhXCpJUCHTOcBNEQ4dUDCA8&uact=5&oq=${moedaBase}+para+${moedaFinal}&gs_lcp=Cgdnd3Mtd2l6EAMyCQgjECcQRhCCAjILCAAQgAQQsQMQgwEyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoKCAAQRxDWBBCwAzoHCAAQgAQQCjoICAAQHhAWEAo6BggAEB4QFjoMCCMQsQIQJxBGEIICOg0IABCABBCxAxCDARAKSgQIQRgASgQIRhgAUL8DWNcRYIgTaAJwAXgAgAGhAYgB4gSSAQMwLjWYAQCgAQHIAQjAAQE&sclient=gws-wiz`;
    await page.goto(url);
    //await page.screenshot({ path: 'test.png'});

    const vMoeda = await page.evaluate(() => {
        return document.querySelector('.lWzCpb.a61j6').value;
    });

    console.log(`O valor de um ${moedaBase} em ${moedaFinal} é ${vMoeda}`)
}

Robo();