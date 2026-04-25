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
    console.log("Richiesta ricevuta...");
    
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox',
		'--disable-setuid-sandbox',
    	'--disable-dev-shm-usage'] 
    });
    
    const page = await browser.newPage();

    // LOGICA UNIVERSALE: Sceglie se navigare un URL o iniettare HTML
    if (url) {
        console.log("Navigazione verso:", url);
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.waitForSelector('#cv-ready', { timeout: 10000 }); 
    } else if (req.body.html) {
        console.log("Rendering Snapshot HTML diretto...");
        // Inietta l'HTML nudo e crudo nel browser vuoto
        await page.setContent(req.body.html, { waitUntil: 'networkidle0' });
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Sicurezza extra

    const rawPdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true
    });

    await browser.close();

    console.log("PDF generato, conversione in buffer binario...");
    const pdfBuffer = Buffer.from(rawPdf); 

    res.status(200);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.end(pdfBuffer);

  }catch (e) {
    console.error("ERRORE:", e.message);
    if (browser) await browser.close();
    res.status(500).send("Errore generazione PDF");
  }
});

app.listen(4000, () => console.log('PDF Service locale avviato su porta 4000'));