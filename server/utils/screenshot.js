
const puppeteer = require('puppeteer');

async function takeScreenshot() {
    const browser = await puppeteer.connect({  browserWSEndpoint: 'ws://thebiblebuteverywordisadifferentfont.azurewebsites.net'})
    const page = await browser.newPage();
    await page.goto("https://thebiblebuteverywordisadifferentfont.azurewebsites.net", {waitUntil: 'networkidle2'});

    await waitTillHTMLRendered(page)
    const buffer = await page.screenshot();

    await page.close();
    await browser.close();

    return buffer;
}

const waitTillHTMLRendered = async (page, timeout = 30000) => {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;
  
    while(checkCounts++ <= maxChecks){
      let html = await page.content();
      let currentHTMLSize = html.length; 
  
      let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);
  
      console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);
  
      if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
        countStableSizeIterations++;
      else 
        countStableSizeIterations = 0; //reset the counter
  
      if(countStableSizeIterations >= minStableSizeIterations) {
        console.log("Page rendered fully..");
        break;
      }
  
      lastHTMLSize = currentHTMLSize;
      await page.waitFor(checkDurationMsecs);
    }  
  };

module.exports = {
    takeScreenshot
}