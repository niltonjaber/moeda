const axios = require('axios');
const qs = require('querystring');

// definir o payload do formulário com os dados de login
const payload = {
     'username' : '73534560353',
     'loja' : '003094',
     'password' : 'Workgft@35'
  
};

// definir as configurações da requisição
const config = {
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'AUTH_SESSION_ID=8852de24-5d97-45bf-8e99-7003c0cf3644.ip-10-21-245-101.panamericano.com.br; AUTH_SESSION_ID_LEGACY=8852de24-5d97-45bf-8e99-7003c0cf3644.ip-10-21-245-101.panamericano.com.br; KC_RESTART=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzMDljMjA5Ni00MDYwLTRkNzYtOWFiYS0wN2QxMTJlZmFjYTgifQ.eyJjaWQiOiJnb3BhbiIsInB0eSI6Im9wZW5pZC1jb25uZWN0IiwicnVyaSI6Imh0dHBzOi8vZ29wYW4uYmFuY29wYW4uY29tLmJyL2hvbWUiLCJhY3QiOiJBVVRIRU5USUNBVEUiLCJub3RlcyI6eyJzY29wZSI6Im9wZW5pZCIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMtc3NvLmJhbmNvcGFuLmNvbS5ici9hdXRoL3JlYWxtcy9wYW4tcGFyY2Vpcm9zIiwicmVzcG9uc2VfdHlwZSI6ImNvZGUiLCJjb2RlX2NoYWxsZW5nZV9tZXRob2QiOiJTMjU2IiwicmVkaXJlY3RfdXJpIjoiaHR0cHM6Ly9nb3Bhbi5iYW5jb3Bhbi5jb20uYnIvaG9tZSIsInN0YXRlIjoiYzhmYjQ4NmQtZWFlOS00NjgyLTg4NjMtOGIwMDM2NzQ5MDFjIiwibm9uY2UiOiJjOGZiNDg2ZC1lYWU5LTQ2ODItODg2My04YjAwMzY3NDkwMWMiLCJjb2RlX2NoYWxsZW5nZSI6Im1paDZReHdGa0ZVQVdobjg0bWdxV2dPa3FkM18yODB2cjlieFluQ3E4aTgifX0.K6vrZRklrpMHOfEYi3ri4Y9FK0lqVESFyhRZ9XGwNyU; OptanonAlertBoxClosed=2023-01-26T11:49:31.599Z; _hjSessionUser_3286716=eyJpZCI6IjQxMGFkNzhjLTUwZmEtNTRmNi1hZGNkLTFiMmMxMDgxM2IyYSIsImNyZWF0ZWQiOjE2Nzg0Nzc0NTU2NjcsImV4aXN0aW5nIjp0cnVlfQ==; dtCookie=v_4_srv_14_sn_C035B3AECB30A59E5CE196283E82AE7D_perc_100000_ol_0_mul_1_app-3A5ab161b0fa09b35e_0; bm_sz=FB1D7634EB98AF9AB5CC49C667461C47~YAAQzwQavUON7VmHAQAA7YuwZxM0X8r2j84nMPjVn0eEiDxrm9keAlTvccr4emwj8EErIG9IgF5efrlxuY2Ra9mv0AJONu0+LyMuGDiFZzRaoCJKILnF4Ta65CoZqY9Is/CHNHCbfYcXFu8IdCmELTi0/sOF9lS5ehrDaeEdB1n9qkTKCWNNS8KIt5BWY4tz8+wt8b3yRqAML5c5Yj2TvvpjSlejNLiuhJG1+nSbr15gJ4Q4DCkjxBe3MxP42qBDPNuxMXGO81+yzinJh+5HLMozM1oVrTswvNhAls6uIZDhkToVBm5Myg==~3490357~3422008; rxVisitor=168107183536034MS9T1K6H0H0MJ132M52M7BSDDK3BS3; RT="z=1&dm=accounts-sso.bancopan.com.br&si=07ff650a-80c8-4a55-850d-e1f835873615&ss=lg9urjxo&sl=0&tt=0"; AMCVS_C0BA356C5CF531FA0A495C43@AdobeOrg=1; AKA_A2=A; BIGipServeraws_zb_ltm_pool-secv4web-internal-rhsso-alb-prd_bancopan_com_br=2381649162.47873.0000; ak_bmsc=051A4D0A761937381F66ADBA9F02CF69~000000000000000000000000000000~YAAQtgQave+nSFyHAQAAI6xRaBNK5pPKXp0GVdFIgKOvs4EZ0j5P+78W4bacSabfiCkNRpWSvP6KuQ9IqU/ArY7zaQIy4nbDLD+wqYsMCfBL9igqDNHgbOLcSeM/LBqIT1EnCj5x/+lzKUwGXPLM28Smqvvot9zKISKeaZ6IKCDF6T1uEfDBjIa5DiMxwIsr1hRCwSCSwC4C+xeKfgckNlcjP5OvJyjxaQGKd3+91QT0GQxGauca3KnwwFJCyffPsglF2zpwMSJDz9KTcbyekW9f9I8Y+kd+bzVtTQE8HV+dVa/gq7bRxBTr1o2hxXpRa93y2t4YaegnouKJjabBCXJpEXiVdl4T5UwjS8jHFIQ6yFPzgexZEL2LzZs4Qxm/wY2jZ+S/Cq4lcO4xpVsqUiUa/Dfk6qA92jV2zUW6OBcmbTENMVZwh5oC6SZA+aHV+x/3deQ7WO+vJPORSlBLCHPoNWa9jl4UtMk7ha1n+OIPJC7f2Pgv2uVIQR1MxsTqqA==; BIGipServeraws_za_ltm_pool-secv4web-internal-rhsso-alb-prd_bancopan_com_br=2381649162.47873.0000; _hjSession_3286716=eyJpZCI6IjQxNzkzYzE3LTM1MmQtNGZlNS04ZmRhLTE0NTg1MmQzMjI1ZiIsImNyZWF0ZWQiOjE2ODEwODI1MzAwNDgsImluU2FtcGxlIjp0cnVlfQ==; _hjAbsoluteSessionInProgress=1; AMCV_C0BA356C5CF531FA0A495C43@AdobeOrg=1176715910|MCIDTS|19457|MCMID|86986590468564948647887936631717027391|MCAID|NONE|MCOPTOUT-1681089778s|NONE|vVersion|5.4.0|MCAAMLH-1681687378|4|MCAAMB-1681687378|j8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI; _abck=7F95BE3E0D8960BD04BDAF73E3FD05A5~0~YAAQtgQavWDWSVyHAQAAIwhjaAnHhALqZL9nH8BDEtOxTFwhxMVgXC8/ezk2Z0bZsGFZ/k+/FJSvo67/0AkcnXVAeZ+W9CMOwWRYkaANIZ7fG+bn/uX3672pwyyal+bK6I2SyJ+FHngItbU2KsT3an3wq5I/5bdY44wJCuSUGKI+wzZ9k73GR9uWXMcQ9W9x83pS3gFz2DrhTQKI0Cfz724a9KMe6RHxWe1Zu3zMnE8m5QoJDVNO/t3oEJQwnly+HiZo5eDHnRxhzCj7KdaVsCRbelOrhI4UjVkVmEoL02f4lNH/mEabOtws5V4sbkZYJyUHrQdz4xYkE5WFZ+Q5h5pw+BYqU/vlUIPOyB/WRmQ0v/X8mhGeWRCOL0nbRDgtcOD4EYrMUYrIXVTZKFu0TfkPR4OK9RKO19wqk80=~-1~-1~-1; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Apr+09+2023+20:38:52+GMT-0300+(Horário+Padrão+de+Brasília)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=91916051-9e6c-48d9-9f8a-1181fdb31d33&interactionCount=1&landingPath=NotLandingPage&groups=C0001:1,C0002:1,C0003:1,C0004:1&geolocation=BR;MG&AwaitingReconsent=false; rxvt=1681085332812|1681082393555; dtPC=14$483532446_183h-vECCAVVSKUHSMAOPTLDFGHNPWEIKHPKJA-0e0; bm_sv=8D61B7BC4B979D97712BB19B9FA8BDAF~YAAQtgQavZnXSVyHAQAAFyFjaBPMU5DchhsIHJ0/dFqnwRE5xCfmiCuYXYTiLS2Rxc7QBLDllnzIqLcCbQ3J5JcgZM3rYe4A0Vpsnr8yeONvM68P5cyi4BET2XJ4MYDAXvL5hbgrCrmViW6jORIDXszwRJVj3QzxBp5qY9SsrJp5aL7Wx4ouNgenzcv8CpUXns3iPdeQZ6pCaXEWXQ4uDlO77JjfATZbvDi5tqUisxYMzv1ZZ7vRKOjAlTZAFGtjiH3dtaVI~1; dtLatC=1; AWSALB=JDEtPP2ImfHRpJGHVTkzvfzEhtNpX292NxuvYjr7gOeIuqr9BoPjKLs0k75tjqc7N5b6Sqd8d5nsjTSf2J7jnOPi0BW6QF2IsO3MdTg/rApiy0tuYQPxFuZt/7ke; AWSALBCORS=JDEtPP2ImfHRpJGHVTkzvfzEhtNpX292NxuvYjr7gOeIuqr9BoPjKLs0k75tjqc7N5b6Sqd8d5nsjTSf2J7jnOPi0BW6QF2IsO3MdTg/rApiy0tuYQPxFuZt/7ke; dtSa=true|C|-1|Entrar|-|1681083552652|483532446_183|https://accounts-sso.bancopan.com.br/auth/realms/pan-parceiros/login-actions/authenticate?execution=46c99f17-0646-4822-944d-e4996d856e69&client_5Fid=gopan&tab_5Fid=J-7sKuPHsUI||||'
  }
};

// enviar a requisição GET para buscar os parâmetros de query string
axios.get('https://accounts-sso.bancopan.com.br/auth/realms/pan-parceiros/login-actions/authenticate', config)
  .then(response => {
    // obter os parâmetros de query string da resposta
    const params = response.data;
    console.log('PARAMS: ' + params);

    // enviar a requisição POST com o payload do formulário e os parâmetros de query string
    axios.post('https://accounts-sso.bancopan.com.br/auth/realms/pan-parceiros/login-actions/authenticate?' + qs.stringify(params), qs.stringify(payload), config)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });
