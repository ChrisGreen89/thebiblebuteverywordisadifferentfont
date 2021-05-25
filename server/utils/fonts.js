const axios = require('axios');
const cache = require('memory-cache');
const _ = require('underscore')

const GOOGLEFONTSCACHEKEY = "fonts"

const getFonts = async (limit) => {
    
    const GOOGLEFONTAPIKEY = process.env.GOOGLEFONTAPIKEY
    const numFontsToReturn = limit

    // Try and get the fonts from our cache frist
    var cachedFonts = cache.get(GOOGLEFONTSCACHEKEY)
    if (cachedFonts) {
        console.log("Found font list in cache. Returning");
        return numFontsToReturn ? _.sample(cachedFonts, numFontsToReturn) : cachedFonts
        return;
    }
    console.log("No cached fonts found. Querying Google API");
    try {
        const fontQuery = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLEFONTAPIKEY}`, {
            headers: {
                'api-key': GOOGLEFONTAPIKEY
            }
        })
        cache.put(GOOGLEFONTSCACHEKEY, fontQuery.data?.items.map(x=>x.family))

        let fonts = fontQuery.data.items

        if (numFontsToReturn) {
            fonts = _.sample(fonts, numFontsToReturn);
        }
        return fonts.map(x=>x.family)
    }
    catch (err) {
        console.log(err);
        return []
    }
}

module.exports = {
    getFonts
}