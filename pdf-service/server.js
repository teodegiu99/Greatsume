const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-pdf', async (req, res) => {
  const { url } = req.body;
  let browser;

  try {
    console.log("Navigazione verso:", url);
    
    browser = await puppeteer.launch({
      headless: "new", // Usa la nuova modalità invisibile
      args: ['--no-sandbox'] // Meno restrizioni in locale
    });
    
    const page = await browser.newPage();

    // 1. Vai alla pagina
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 2. Aspetta che il CV sia stato caricato dal DB
    await page.waitForSelector('#cv-ready', { timeout: 10000 }); 
    await new Promise(resolve => setTimeout(resolve, 500)); // Mezzo secondo extra di sicurezza

    // 3. Stampa il PDF
  const rawPdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true
    });
    await browser.close();

    console.log("PDF generato, invio al client...");
   // MODIFICA FONDAMENTALE QUI: Forziamo il formato in Node Buffer
    const pdfBuffer = Buffer.from(rawPdf); 

    // 4. Invio al client
    res.status(200);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.end(pdfBuffer); // res.end è più sicuro di res.send per i file binari

  } catch (e) {
    console.error("ERRORE:", e.message);
    if (browser) await browser.close();
    res.status(500).send("Errore generazione PDF");
  }
});

app.listen(4000, () => console.log('PDF Service locale avviato su porta 4000'));