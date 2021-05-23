const axios = require('axios');

const getVerse = (req, res) => {
    axios.get('https://labs.bible.org/api/?passage=random&type=json')
        .then(data => {
            console.log(data)
            res.send(data.data)
        })
        .catch(err => {
            throw new Error(err)
        })
}

module.exports = {
    getVerse
}