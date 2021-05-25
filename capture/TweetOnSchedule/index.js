const {tweetVerse} = require('../utils/twitter');

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    console.log(myTimer)
    
        await tweetVerse()
        context.log("The Bible, but every word is a different font blessed the masses successfully")
    
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};
