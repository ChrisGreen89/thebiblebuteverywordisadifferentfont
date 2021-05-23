const axios = require('axios');
const cache = require('memory-cache');
const _ = require('underscore')

const GOOGLEFONTSCACHEKEY = "fonts"

const getFonts = async (req, res) => {
    
    const GOOGLEFONTAPIKEY = process.env.GOOGLEFONTAPIKEY
    const numFontsToReturn = req.query.limit

    // Try and get the fonts from our cache frist
    var cachedFonts = cache.get(GOOGLEFONTSCACHEKEY)
    if (cachedFonts) {
        console.log("Found font list in cache. Returning");
        res.send(numFontsToReturn ? _.sample(cachedFonts, numFontsToReturn) : cachedFonts)
        return;
    }
    console.log("No cached fonts found. Querying Google API");
    try {
        const fontQuery = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLEFONTAPIKEY}`, {
            headers: {
                'api-key': GOOGLEFONTAPIKEY
            }
        })
        cache.put(GOOGLEFONTSCACHEKEY, fontQuery.data?.items)

        let fonts = fontQuery.data.items

        if (numFontsToReturn) {
            fonts = _.sample(fonts, numFontsToReturn);
        }
        res.send(fonts);
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {
    getFonts
}