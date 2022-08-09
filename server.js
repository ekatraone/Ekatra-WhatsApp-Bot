// external packages
const express = require('express');
require('dotenv').config("./env");
const test = require('./main');

const webApp = express();

webApp.use(express.json());


// Route for WhatsApp
webApp.post('/whatsapp', async (req, res) => {

    let senderID = req.body.waId;

    var keyword = req.body.text || '';

    console.log(req.body);

    /**
     * Check if the incoming message is a option from the list interactive message.
     * If yes, then execute store_responses function.
     */
    if (req.body.listReply != null) {
        reply = JSON.parse(JSON.stringify(req.body.listReply))
        await test.store_responses(senderID, reply.title)
    }

    /**Execute and send the response to the function the user based on incoming message.
     */
    if (keyword == "Start") {

        test.sendModuleContent(senderID).then().catch(e => console.log("Finish start template error " + e))
    }

    else if (keyword == "Finish") {
        test.markDayComplete(senderID).then().catch(e => console.info("Finish day template error " + e))

    }
    else if (keyword == "Next") {
        test.markModuleComplete(senderID).then().catch(e => console.info("Finish module template error " + e))
    }

    res.end();


});

webApp.listen(process.env.PORT, () => {
    console.log(`Server is up and running at ${process.env.PORT}`);
});
