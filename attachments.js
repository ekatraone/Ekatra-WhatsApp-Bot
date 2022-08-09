//** This file handles fetching attachments from Airtable and sending media content  to WhatsApp*/

const request = require('request-promise')
const WA = require('./wati');
const airtable = require('./airtable-methods')
var Airtable = require('airtable');
require('dotenv').config("./env")

var base = new Airtable({ apiKey: process.env.apiKey }).base(process.env.base);

/**
 * Check if the module contains any files
 * If yes, then fetch the file name and file URL from Airtable, pass it to load() function
 * @param {number} cDay - Current Day
 * @param {number} cModule - Current Module
 * @param {number} number - Phone number
 */
async function sendMediaFile(cDay, cModule, number) {
    var course_tn = await airtable.findTable(number)

    const records = await base(course_tn).select({
        filterByFormula: "({Day} =" + cDay + ")",
        view: "Grid view",

    }).all(
    );
    records.forEach(function (record) {
        img = record.get("Module " + cModule + " File")
        len = img.length

        if (len > 0)
            for (i = 0; i < len; i++) {
                filename = img[i].filename
                imgurl = img[i].url

                console.log("Delay of sending images")
                load(imgurl, filename, number)

            }

    })
}


// Process the airtable attachment URL and send it to WhatsApp
async function load(uri, path, number) {
    const options = {
        uri: uri,
        encoding: null
    };
    const body = await request(options)
    console.log(typeof body)
    WA.sendMedia(body, path, number)

}
module.exports = { sendMediaFile }


