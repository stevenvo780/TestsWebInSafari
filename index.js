
const { webkit } = require('playwright');


// Configuraciones para cada tipo de dispositivo y orientación
const devices = {
  pc: {
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_0) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/16.0 Safari/605.1.15',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'en-US',
    colorScheme: 'light',
  },
  'movil-vertical': {
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/16.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 390, height: 844 }, // iPhone 13 Pro vertical
    deviceScaleFactor: 3,
    locale: 'es-ES',
    colorScheme: 'light',
  },
  'movil-horizontal': {
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/16.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 844, height: 390 }, // iPhone 13 Pro horizontal
    deviceScaleFactor: 3,
    locale: 'es-ES',
    colorScheme: 'light',
  },
  'tablet-vertical': {
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/16.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 834, height: 1112 }, // iPad Air vertical
    deviceScaleFactor: 2,
    locale: 'es-ES',
    colorScheme: 'light',
  },
  'tablet-horizontal': {
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/16.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 1112, height: 834 }, // iPad Air horizontal
    deviceScaleFactor: 2,
    locale: 'es-ES',
    colorScheme: 'light',
  },
};


// Lee el argumento de línea de comandos y determina orientación
let tipo = (process.argv[2] || 'pc').toLowerCase();
if (tipo === 'movil' || tipo === 'movil-vertical') tipo = 'movil-vertical';
if (tipo === 'movil-horizontal') tipo = 'movil-horizontal';
if (tipo === 'tablet' || tipo === 'tablet-vertical') tipo = 'tablet-vertical';
if (tipo === 'tablet-horizontal') tipo = 'tablet-horizontal';
const config = devices[tipo] || devices['pc'];

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: config.userAgent,
    viewport: config.viewport,
    deviceScaleFactor: config.deviceScaleFactor,
    locale: config.locale,
    colorScheme: config.colorScheme,
    javaScriptEnabled: true,
    extraHTTPHeaders: {
      'accept-language': config.locale + ',en;q=0.9',
    },
  });

  const page = await context.newPage();
  await page.goto('https://www.soydigital.gob.do/', { waitUntil: 'networkidle' });

  console.log('User-Agent real:', await page.evaluate(() => navigator.userAgent));
  console.log('Viewport:', await page.viewportSize());
  console.log('Tipo de dispositivo emulado:', tipo);
})();
