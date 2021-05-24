var screenshot = require("node-server-screenshot");

const getCapture = async (req, res) => {

    screenshot.fromURL('https://thebiblebuteverywordisadifferentfont.azurewebsites.net', null, {
        waitMilliseconds: 3000,
    }, function(err, buffer) {
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': buffer.length
          });
        
          res.end(buffer)
    })

    
}

module.exports = {
    getCapture
}