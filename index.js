const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const nomSchema = 'C6.js'; //Deve receber da função passada  
const schema = require(`./Schemas/${nomSchema}`);
const xmlbuilder = require('xmlbuilder');
const crypto = require('crypto');
const fs = require('fs');
const strftime = require('strftime');

//#region Variables
var date = new Date();
var dateFormated = strftime('%Y/%m/%d %H:%M:%S', date);
var dateGeneral = strftime('%Y%m%d', date);
var sFileLog = `${crypto.randomBytes(24).toString('hex')}.txt`;
var sFileTemp = `${crypto.randomBytes(24).toString('hex')}.html`;
var sFileXML = `${crypto.randomBytes(24).toString('hex')}.xml`;
var sUserMiner = '14975209756_000010'; //Deve receber da função passada  
var sPassMiner = 'Cia@$1020'; //Deve receber da função passada  
var dateFist = ''; //Deve receber da função passada  
var dateEnd = ''; //Deve receber da função passada  
var sLoja = ''; //Deve receber da função passada  
var amountAde = 0;
var eventLog = '';
var uLogin = schema.sLogin;
var uEsteira = schema.sEsteira;
var uRows = schema.sRows;
var uCampoLogin = schema.sCampoLogin;
var uCampoPass = schema.uCampoPass;
var uBtnLogin = schema.sBtnLogin;
var uGrid = schema.sGrid;
//#endregion

//#region Functions
async function recordLog(sFile, sMessage) {

    /*

    INCLUIR GRAVAÇÃO NA PASTA DE LOG COM NOME DO SCHEMA

    */

    const streamLog = fs.createWriteStream(sFile, { flags: 'a' });
    streamLog.write(sMessage);
}

function returnTable(page) {
    const bodyPage = page.evaluate(() => {
        return {
            bodyHTML: document.querySelector('#ctl00_Cph_AprCons_grdConsulta').outerHTML,
            lengthRows: $('#ctl00_Cph_AprCons_grdConsulta').find('tr').length
        }
    });
    return bodyPage;
}

async function scrapeDataEsteira(uLogin, uEsteira, sUser, sPass) {
    try {
        const browser = await puppeteer.launch({ devtools: true });
        const page = await browser.newPage();

        //Login
        await page.goto(uLogin, { waitUntil: 'load' });
        await page.type(`[id="EUsuario_CAMPO"]`, sUser, { delay: 50 });
        await page.type(`[id="ESenha_CAMPO"]`, sPass, { delay: 50 });
        //await page.type(`[id='${uCampoLogin}']`, sUser, { delay: 50 });
        //await page.type(`[id='${uCampoPass}']`, sPass, { delay: 50 });
        await page.click('[id="lnkEntrar"]');

        //Get session
        const infoPage = await page.evaluate(() => { return { title: document.title, session: document.location.search } });
        const urlEsteira = uEsteira + infoPage.session;

        await page.waitForSelector('[id="WFP2010_PWTCNPROP"]');
        await page.goto(urlEsteira);
        await page.waitForSelector('[id="ctl00_Cph_AprCons_grdConsulta"]');

        eventLog = dateFormated + ' - [ 🌐 ] URL: ' + urlEsteira + '\n';
        await recordLog(sFileLog, eventLog)

        /*

        REALIZAR FILTRO

        */

        eventLog = dateFormated + ' - [ ⏰ ] Preparando para extrair os dados do HTML da página!\n';
        await recordLog(sFileLog, eventLog)

        //Get datatable
        for (p = 0; p < 300; p++) {
            const streamTempData = fs.createWriteStream(sFileTemp, { flags: 'a' });
            const getData = await returnTable(page);
            const stringHtml = getData.bodyHTML;
            const sRows = (getData.lengthRows - 1);
            amountAde += sRows

            console.log('Tamanho do table: ' + stringHtml.length);
            console.log('Quantidade de propostas: ' + sRows);

            //Verify button next enable
            await page.waitForTimeout(2000);
            const nextPage = await page.evaluate(() => { return { btnext: $("#ctl00_Cph_AprCons_lkbProximo").attr("disabled") } });
            console.log('Retorno nextPage: ' + nextPage.btnext);

            //Verify if button is disabled
            if (nextPage.btnext != 'disabled') {
                page.waitForSelector('[id="ctl00_Cph_AprCons_lkbProximo"]');
                page.click('[id="ctl00_Cph_AprCons_lkbProximo"]');
                console.log('Foi para próxima página!');
            } else {

                //Record stream dataTable
                console.log('Caiu no else');
                streamTempData.write(stringHtml.toString());

                //Close stream and exit for
                streamTempData.end();
                break;
            }

            //Record stream dataTable
            streamTempData.write(stringHtml.toString());
            await page.waitForTimeout(2000);
            returnTable(page);
        }

        console.log('Saiu do for');


        /*

        MELHORAR LOG

        */

        eventLog = dateFormated + ' - [ 📝 ] Quantidade de propostas: ' + amountAde + '\n';
        await recordLog(sFileLog, eventLog);
        eventLog = dateFormated + ' - [ 💾 ] Extraído dados do arquivo e montado XML!\n\n';
        await recordLog(sFileLog, eventLog);

        var sHtml = fs.readFileSync(sFileTemp);
        var table = sHtml;
        var rows = [];
        var data = [];
        const $ = cheerio.load(table);
        const streamXml = fs.createWriteStream(sFileXML, { flags: 'a' });

        console.log('Tamanho do meu arquivo: ' + table.length);

        rows = rows.concat(uRows);

        //Record file xml
        streamXml.write("<root>");
        for (j = 1; j < amountAde; j++) {
            const proposta = xmlbuilder.create('PROPOSTA');
            for (i = 0; i < rows.length; i++) {
                var cell = proposta.ele(rows[i], $(`#ctl00_Cph_AprCons_grdConsulta > tbody > tr:eq(${j}) > td:eq(${i})`).text());
                data.push(cell);

                /*
                
                TRATAR SITUAÇÃO VAZIA 
                
                */


            }
            streamXml.write(proposta.toString());
        }
        streamXml.write("</root>");

        //Logout and close browser
        await page.click('[id="ctl00_lk_Sair"]');
        await browser.close();

        console.log('Fim do processamento!');
        return 'ok';

    } catch (error) {
        console.log(`[ ❌ ] Erro: ${error}`);
        await recordLog(sFileLog, error);
    }
}

//#endregion

eventLog = dateFormated + ` - [ 🤖 ] Iniciando processamento do minerador!\n`;
recordLog(sFileLog, eventLog);

eventLog = dateFormated + ' - [ 🔑 ] Usuário: ' + sUserMiner + '\n';
recordLog(sFileLog, eventLog);

scrapeDataEsteira(uLogin, uEsteira, sUserMiner, sPassMiner);