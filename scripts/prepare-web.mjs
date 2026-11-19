// Turns the Expo web export in dist/ into an installable Home Screen web app
// that works from any sub-path (e.g. https://<user>.github.io/<repo>/).
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';

const dir = 'dist';
let html = readFileSync(`${dir}/index.html`, 'utf8');
html = html.replaceAll('src="/', 'src="./').replaceAll('href="/', 'href="./');
html = html.replace(
  '</head>',
  `  <link rel="manifest" href="./manifest.json">
  <link rel="apple-touch-icon" href="./icon.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="Home Needs">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <style>body{background:#F6F7F4}</style>
</head>`,
);
html = html.replace('content="width=device-width, initial-scale=1, shrink-to-fit=no"', 'content="width=device-width, initial-scale=1, viewport-fit=cover"');
writeFileSync(`${dir}/index.html`, html);

copyFileSync('assets/icon.png', `${dir}/icon.png`);
writeFileSync(
  `${dir}/manifest.json`,
  JSON.stringify(
    {
      name: 'Home Needs',
      short_name: 'Home Needs',
      start_url: './',
      scope: './',
      display: 'standalone',
      background_color: '#F6F7F4',
      theme_color: '#1F8A4C',
      icons: [{ src: './icon.png', sizes: '1024x1024', type: 'image/png', purpose: 'any' }],
    },
    null,
    2,
  ),
);
writeFileSync(`${dir}/.nojekyll`, '');
console.log('Web app prepared in dist/');
