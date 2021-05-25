const axios = require('axios')
const TwitterClient = require('twitter-api-client')


const tweetVerse = async (req, res) => {
    


    try {
        const twitterClient = new TwitterClient.TwitterClient({
            apiKey: process.env.TWITTER_API_KEY,
            apiSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
          });
        const SCREENSHOTURL = process.env.SCREENSHOTURL
        const screenshot = await axios.get(SCREENSHOTURL, {responseType: 'arraybuffer' });
        console.log("Got screenshot")
        if (screenshot.data) {
            const screenshotImage = screenshot.data.toString('base64');
            const mediaid = await twitterClient.media.mediaUpload({
                media_data: screenshotImage
            });
            await twitterClient.tweets.statusesUpdate({
                status: "Testing a test tweet test!",
                media_ids: mediaid.media_id_string
            })
        }
        
    }

    catch (err) {
        console.log(err)
        res.send(err.data)
    }


    
}

module.exports = {
    tweetVerse
}