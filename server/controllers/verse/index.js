const axios = require('axios');
const fontUtil = require('../../utils/fonts')
const getVerse = async (req, res) => {
    console.log(req.query.verse == '')
    const specificVerse = (req.query.verse != 'null' && req.query.verse != '' && req.query.verse != null) ? req.query.verse : "random"
    const fonts = (req.query.fonts != 'null' && req.query.fonts != '') ? req.query.fonts : null
    var response = {
        verse: "",
        fonts: []
    }
    try {
        axios.get(`https://labs.bible.org/api/?passage=${encodeURIComponent(specificVerse)}&type=json`)
        .then(data => {
            if (data.data[0]) {
                console.log(data)
                response.verse = data.data[0]
                if (fonts) {
                    response.fonts = fonts.split(',');
                    res.send(JSON.stringify(response))
                }
                else {
                    fontUtil.getFonts(response.verse?.text?.split(' ').length).then(fonts => {
                        response.fonts = fonts
                        res.send(JSON.stringify(response))
                    })
                }
            }
            else {
                throw new Error("Bad response from Bible API")
            }

        })
        .catch(err => {
            res.status(500).send()
        })
    }
    catch (err) {
        res.send(err)
    }   
}

const generateUrlForScreenshot =(req, res) => {
    getVerseAndFonts().then(verseData => {

        const verseReference = `${verseData.verse.bookname} ${verseData.verse.chapter}:${verseData.verse.verse}`
        const url = `https://thebiblebuteverywordisadifferentfont.azurewebsites.net?verse=${encodeURIComponent(verseReference)}&fonts=${encodeURIComponent(verseData.fonts.join(','))}&hideUi=1`
        var response = {
            ...verseData,
            url
        }
        res.send(JSON.stringify(response))
    });
    
}

const getVerseAndFonts = async () => {
    return new Promise((resolve, reject) => {
        var response = {
            verse: "",
            fonts: []
        }
            axios.get(`https://labs.bible.org/api/?passage=random&type=json&formatting=plain`)
            .then(data => {
                if (data.data[0]) {
                    console.log(data)
                    response.verse = data.data[0]
                    fontUtil.getFonts(response.verse?.text?.split(' ').length).then(fonts => {
                        response.fonts = fonts
                        resolve(response);
                    })
                }
                else {
                    reject()
                }
    
            })
            .catch(err => {
                reject(err)
            })
        
    })
    
}

module.exports = {
    getVerse,
    generateUrlForScreenshot

}