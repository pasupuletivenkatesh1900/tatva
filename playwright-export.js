const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PROJECT_ROOT = path.resolve(__dirname);
const CLIENT_ROOT = path.join(PROJECT_ROOT, 'client');
const BEERAMGDA_DIR = path.join(PROJECT_ROOT, 'Beeramuda');
const PRAGATHI_DIR = path.join(PROJECT_ROOT, 'PragathiNagar');

function collectClientFiles() {
  const results = [];
  const queue = [CLIENT_ROOT];

  while (queue.length > 0) {
    const dir = queue.shift();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        queue.push(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.json')) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

function getClientSlug(filePath) {
  return path.basename(filePath, '.json').toLowerCase();
}

function determineBranch(clientFilePath) {
  try {
    const clientData = JSON.parse(fs.readFileSync(clientFilePath, 'utf8'));
    const location = String(clientData?.Overview?.Location || '').toLowerCase();
    if (location.includes('pragathi')) {
      return 'PragathiNagar';
    }
    if (location.includes('beeram')) {
      return 'Beeramuda';
    }
  } catch (error) {
    // fallback to file path based heuristic
  }

  const lower = clientFilePath.toLowerCase();
  if (lower.includes('pragathi') || lower.includes('pragathinagar')) {
    return 'PragathiNagar';
  }
  return 'Beeramuda';
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function exportClient(page, clientSlug, outputDir) {
  const url = `http://localhost:3000/?client=${encodeURIComponent(clientSlug)}`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('select[name="client"]');
  await page.selectOption('select[name="client"]', { value: clientSlug });
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  await page.waitForSelector('button:has-text("Export PDF")');

  const outputPath = path.join(outputDir, `${clientSlug}.pdf`);
  ensureDir(outputDir);

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  fs.writeFileSync(outputPath, pdfBuffer);
  console.log(`Saved PDF for ${clientSlug} -> ${outputPath}`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node playwright-export.js <clientName> [clientName...] | --all');
    process.exit(1);
  }

  const allIndex = args.indexOf('--all');
  if (allIndex >= 0) {
    return { all: true, clients: [] };
  }

  return { all: false, clients: args };
}

(async () => {
  const { all, clients } = parseArgs();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const clientFiles = collectClientFiles();
  const filesToProcess = all
    ? clientFiles
    : clientFiles.filter((filePath) => clients.includes(getClientSlug(filePath)));

  if (!all && filesToProcess.length === 0) {
    console.error('No matching client files found for:', clients.join(', '));
    await browser.close();
    process.exit(1);
  }

  for (const filePath of filesToProcess) {
    const slug = getClientSlug(filePath);
    const branch = determineBranch(filePath);
    const outputDir = branch === 'PragathiNagar' ? PRAGATHI_DIR : BEERAMGDA_DIR;
    await exportClient(page, slug, outputDir);
  }

  await browser.close();
})();
