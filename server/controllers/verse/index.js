const axios = require('axios');

const getVerse = (req, res) => {
    const specificVerse = req.query.verse || "random"
    try {
        axios.get(`https://labs.bible.org/api/?passage=${encodeURIComponent(specificVerse)}&type=json`)
        .then(data => {
            if (data.data[0]) {
                console.log(data)
                res.send(data.data)
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

module.exports = {
    getVerse
}