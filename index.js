
const { webkit } = require('playwright');



// Configuraciones para cada tipo de dispositivo y orientación
const devices = {
  pc: {
    nombre: 'PC',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_0) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/16.0 Safari/605.1.15',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'en-US',
    colorScheme: 'light',
  },
  'movil-baja': {
    nombre: 'Celular baja resolución (320x568)',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/12.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 320, height: 568 }, // iPhone SE
    deviceScaleFactor: 2,
    locale: 'es-ES',
    colorScheme: 'light',
  },
  'movil-media': {
    nombre: 'Celular media resolución (375x667)',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/14.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 375, height: 667 }, // iPhone 8
    deviceScaleFactor: 2,
    locale: 'es-ES',
    colorScheme: 'light',
  },
  'movil-alta': {
    nombre: 'Celular alta resolución (390x844)',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) ' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
      'Version/16.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 390, height: 844 }, // iPhone 13 Pro
    deviceScaleFactor: 3,
    locale: 'es-ES',
    colorScheme: 'light',
  },
  'movil-alta-horizontal': {
    nombre: 'Celular alta resolución horizontal (844x390)',
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
    nombre: 'Tablet vertical (834x1112)',
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
    nombre: 'Tablet horizontal (1112x834)',
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



// Sistema de selección flexible y ayuda
function printHelp() {
  console.log('Opciones disponibles:');
  Object.entries(devices).forEach(([key, val]) => {
    console.log(`  ${key.padEnd(22)} → ${val.nombre}`);
  });
  console.log('\nEjemplo: node index.js movil-baja');
}

let tipo = (process.argv[2] || 'pc').toLowerCase();
if (tipo === '--help' || tipo === '-h') {
  printHelp();
  process.exit(0);
}
if (tipo === 'movil') tipo = 'movil-baja';
if (tipo === 'movil-media-horizontal') tipo = 'movil-media-horizontal'; // futuro
if (tipo === 'movil-alta-horizontal') tipo = 'movil-alta-horizontal';
if (tipo === 'tablet') tipo = 'tablet-vertical';
if (!devices[tipo]) {
  console.log('Dispositivo no reconocido. Usa --help para ver opciones.');
  printHelp();
  process.exit(1);
}
const config = devices[tipo];

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
  console.log('Tipo de dispositivo emulado:', tipo, '-', config.nombre);
})();
