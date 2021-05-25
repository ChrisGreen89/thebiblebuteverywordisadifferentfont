const screenshotUtil = require('../../utils/screenshot')

const getCapture = async (req, res) => {
    try {
        const screenshot = await screenshotUtil.takeScreenshot();
        console.log("Got screenshot")
        res.setHeader('content-type', 'image/png');
        res.end(screenshot)
    }

    catch (err) {
        console.log(err)
        res.send(err.data)
    }


    
}

module.exports = {
    getCapture
}