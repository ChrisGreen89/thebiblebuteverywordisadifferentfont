const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const url = req.query.url || "https://thebiblebuteverywordisadifferentfont.azurewebsites.net";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await waitTillHTMLRendered(page)
    const buffer = await page.screenshot();

    await page.close();
    await browser.close();

    context.res = {
        body: buffer,
        headers: {
            "content-type": "image/png"
        }
    };
};


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