//** This file contains WATI API functions */

var request = require('request');
require('dotenv').config("./env")

var request = require('request');

/**
 * 
 * @param {object} file 
 * @param {string} filename 
 * @param {number} senderID 
 */
const sendMedia = async (file, filename, senderID) => {
    var options = {
        'method': 'POST',
        'url': 'https://' + process.env.URL + '/api/v1/sendSessionFile/' + senderID,
        'headers': {
            'Authorization': process.env.API,

        },
        formData: {
            'file': {
                'value': file,
                'options': {
                    'filename': filename,
                    'contentType': null
                }
            }
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });

}

/**
 * Send a button message
 * @param {string} hTxt - Header text
 * @param {string} bTxt - Body Text
 * @param {string} btnTxt - Button text
 * @param {number} senderID - Phone number
 */
const sendInteractiveButtonsMessage = async (hTxt, bTxt, btnTxt, senderID) => {
    var options = {
        'method': 'POST',
        'url': 'https://' + process.env.URL + '/api/v1/sendInteractiveButtonsMessage?whatsappNumber=' + senderID,
        'headers': {
            'Authorization': process.env.API,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "header": {
                "type": "Text",
                "text": hTxt
            },
            "body": bTxt,
            "buttons": [
                {
                    "text": btnTxt
                }
            ]
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

/**
 * Send Text Messages 
 * @param {string} msg 
 * @param {number} senderID 
 */
const sendText = async (msg, senderID) => {

    var options = {
        'method': 'POST',
        'url': 'https://' + process.env.URL + '/api/v1/sendSessionMessage/' + senderID,
        'headers': {
            'Authorization': process.env.API,

        },
        formData: {
            "messageText": msg,
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

/**
 * Send dynamic list interactive messages.
 * @param {object} data - List options
 *  Sample Output:
        [
        {title: option1},
        {title: option2},
        {title: option3},
        ]
        
 * @param {*} body - Body Text
 * @param {*} btnText - Button Text
 * @param {*} senderID 
 */
const sendListInteractive = async (data, body, btnText, senderID) => {
    var options = {
        'method': 'POST',
        'url': 'https://' + process.env.URL + '/api/v1/sendInteractiveListMessage?whatsappNumber=' + senderID,
        'headers': {
            'Authorization': process.env.API,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "header": "",
            "body": body,
            "footer": "",
            "buttonText": btnText,
            "sections": [
                {
                    "title": "Options",
                    "rows": data
                }
            ]
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log("Result returned", response.body);

    });
}


module.exports = {
    sendText,
    sendInteractiveButtonsMessage,
    sendMedia,
    sendListInteractive,
}

