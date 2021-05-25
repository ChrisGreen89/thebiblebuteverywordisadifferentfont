const axios = require('axios')
const TwitterClient = require('twitter-api-client')

const tweetVerse = async () => {
    try {
        const twitterClient = new TwitterClient.TwitterClient({
            apiKey: process.env.TWITTER_API_KEY,
            apiSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
          });
        const SCREENSHOTURL = process.env.SCREENSHOTURL
        const url = await axios.get("https://thebiblebuteverywordisadifferentfont-api.azurewebsites.net/verse/generate")
        const screenshot = await axios.get(`${SCREENSHOTURL}&url=${encodeURIComponent(url.data.url)}`, {responseType: 'arraybuffer' });
        console.log("Got screenshot")
        if (screenshot.data) {
            const screenshotImage = screenshot.data.toString('base64');
            const mediaid = await twitterClient.media.mediaUpload({
                media_data: screenshotImage
            });
            let tweetText = `${url.data.verse.bookname} ${url.data.verse.chapter}:${url.data.verse.verse} - ${url.data.fonts.join(", ")}`
            tweetText = tweetText.length > 237 ? tweetText.substr(0, 237) : tweetText;
            tweetText = tweetText + "... #thebible #buteverywordisadifferentfont"
            await twitterClient.tweets.statusesUpdate({
                status: tweetText,
                media_ids: mediaid.media_id_string
            })

        }
        
    }

    catch (err) {
        console.log(err)
    }
}

module.exports = {
    tweetVerse
}