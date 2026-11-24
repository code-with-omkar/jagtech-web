// Assembles an upload-ready folder for GoDaddy shared hosting: dist/godaddy/
// Contents go straight into public_html (cPanel) or httpdocs (Plesk).
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const browser = new URL('dist/jagtech-web/browser/', root);
const out = new URL('dist/godaddy/', root);

if (!existsSync(browser)) {
  console.error('Build output not found. Run "npm run build" first.');
  process.exit(1);
}

rmSync(out, { recursive: true, force: true });
cpSync(browser, out, { recursive: true });
cpSync(new URL('deploy/apache/.htaccess', root), new URL('.htaccess', out)); // Linux / cPanel
cpSync(new URL('deploy/iis/web.config', root), new URL('web.config', out));  // Windows / Plesk
writeFileSync(new URL('BUILD.txt', out), `JagTech build ${new Date().toISOString()}\n`);

console.log('Ready to upload: dist/godaddy/  (upload the CONTENTS into public_html)');
