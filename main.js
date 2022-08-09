//* This file handles the following tasks:
//* 1. Updating day and module values of individual students in Airtable.
//* 2. Fetching and sending the course content based on each student's enrolled course and progress.


var Airtable = require('airtable');
require('dotenv').config();
const WA = require('./wati');
const airtable = require('./airtable-methods');
const sendContent = require('./attachments');

var base = new Airtable({ apiKey: process.env.apiKey }).base(process.env.base);

/** This function handles storing list option selected by the student in Airtable field named Responses
 * Called when the student selects the option from the list message.
 * @param {number} number - Phone number
 * @param {string} value  - Option selected from the list
 */
async function store_responses(number, value) {

    const records = await base("Student").select({
        filterByFormula: "({Phone} =" + number + ")",
        view: "Grid view",

    }).all(
    ); records.forEach(async function (record) {

        let id = record.id
        let currentModule = record.get("Next Module")
        let currentDay = record.get("Next Day")

        let title = await airtable.findTitle(currentDay, currentModule)
        let existingValues = await airtable.findRecord(id)

        // If the existing value of Response field is empty
        if (existingValues == undefined) {
            existingValues = ""
            newValues = title + "\n" + value
        }
        else {
            newValues = existingValues + "\n\n" + title + value
        }


        if (existingValues.includes(title)) {
            console.log("Feedback already recorded")
            await findContent(currentDay, currentModule, number)
        }
        else {
            airtable.updateField(id, "Response", newValues).then(async () => {
                console.log("New Feedback recorded")
                await findContent(currentDay, currentModule, number)

            })
        }
    })
}

/** Executed after updating the Airtable Response field and continues the flow.
 * @param {number} currentDay 
 * @param {number} module_No - current module number
 * @param {number} number - Phone number 
 */
async function findContent(currentDay, module_No, number) {
    var course_tn = await airtable.findTable(number)
    const records = await base(course_tn).select({
        filterByFormula: "({Day} =" + currentDay + ")",
        view: "Grid view",

    }).all(
    );
    records.forEach(function (record) {
        var data = ""

        var day = record.get("Day")
        var module_link = record.get("Module " + module_No + " Link")


        if (!!module_link) {
            console.log("Module link not empty ")

            setTimeout(() => {
                data = module_link

                WA.sendText(data, number)
            }, 5000)

        }

        const hTxt = `Let's move forward!`
        const bTxt = `Click below`
        const btnTxt = "Next"

        setTimeout(() => {
            console.log("Delay of Finish Interactive Button")
            WA.sendInteractiveButtonsMessage(hTxt, bTxt, btnTxt, number)
        }, 15000)

    })
}


/**
 * Send List Interactive Message to the students
 * @param {number} currentDay 
 * @param {number} module_No - current module number
 * @param {number} number - Phone number
 */
async function sendList(currentDay, module_No, number) {
    var course_tn = await airtable.findTable(number)
    const records = await base(course_tn).select({
        filterByFormula: "({Day} =" + currentDay + ")",
        view: "Grid view",

    }).all(
    );
    records.forEach(function (record) {
        let module_title = record.get("Module " + module_No + " LTitle")
        let module_list = record.get("Module " + module_No + " List")

        console.log("Executing List")

        //Each line in the Module LTitle is separated by \n and considered as a new option for the list
        options = module_list.split("\n").filter(n => n)
        // console.log(options)

        // Convert the array of options into a JSONArray
        /**Sample Output:
        [
        {title: option1},
        {title: option2},
        {title: option3},
        ]
        */

        let d = []
        for (const row of options) {
            d.push({
                title: row
            })
        }

        sendContent.sendMediaFile(currentDay, module_No, number).then().catch(e => console.log("Error sending media file in sendList function" + e))

        setTimeout(() => {
            WA.sendListInteractive(d, module_title, "Options", number)
        }, 10000)
    })
}



/** This functions continues the flow based on student's progress  
 * @param {number} number - Phone number 
 */
async function sendModuleContent(number) {

    const records_Student = await base('Student').select({
        filterByFormula: "({Phone} =" + number + ")",
        view: "Grid view",

    }).all();
    records_Student.forEach(function (record) {
        console.log("Entered sendModuleContent")


        var cDay = record.get("Next Day")
        var next_module = record.get("Next Module") // 0

        // If Next Module field value is 0, this indicates all the modules for the day are delivered and the day is completed
        if (next_module == Number(0)) {

            console.log("Next module ", next_module)
            sendEndDayMessage(cDay, number);

        }
        else {
            console.log("Next module No ", next_module)
            findModule(cDay, next_module, number)
        }

    })

}

/** This function finds the current module of the respective students and sends the content accordingly. 
 * Executed only if module text or module list is not empty 
 * @param {number} currentDay 
 * @param {number} module_No - current module number
 * @param {number} number - Phone number
 */

async function findModule(currentDay, module_No, number) {
    var course_tn = await airtable.findTable(number)

    const records = await base(course_tn).select({
        filterByFormula: "({Day} =" + currentDay + ")",
        view: "Grid view",

    }).all();
    records.forEach(async function (record) {
        let day = record.get("Day")

        let module_text = record.get("Module " + module_No + " Text")
        let module_title = record.get("Module " + module_No + " LTitle")
        let module_link = record.get("Module " + module_No + " Link")

        console.log("Executing FindModule")

        // If list title is not empty and module text is empty then execute sendList function
        if (!!module_title && !module_text) {
            await sendList(currentDay, module_No, number)

        }
        /**
         * If list title is  empty and module text is not empty, then execute sendList function
         * Otherwise, Skip the module and call markModuleComplete function  
         */

        else if (!!module_text && !module_title) {

            //If the module contains a link then send the link otherwise only send the media file
            if (!!module_link) {
                console.log("Module link not empty ")

                data = module_text
                WA.sendText(data, number).then().catch(e => console.log("SendText error " + e))

                setTimeout(() => {
                    console.log("Delay of media in not empty link ")
                    sendContent.sendMediaFile(day, module_No, number).then().catch(e => console.log("Error" + e))
                }, 10000)

                setTimeout(() => {
                    console.log("Delay of link ")
                    WA.sendText(module_link, number)


                }, 20000)

            }
            else {


                data = module_text
                console.log("Module link null ")

                WA.sendText(data, number)

                setTimeout(() => {
                    console.log("Delay of sendMediaFile")
                    sendContent.sendMediaFile(day, module_No, number).then().catch(e => console.log("Error" + e))
                }, 10000)



            }
            const hTxt = `Let's move forward!`
            const bTxt = `Click below`
            const btnTxt = "Next"

            setTimeout(() => {
                console.log("Delay of Finish Interactive Button")
                WA.sendInteractiveButtonsMessage(hTxt, bTxt, btnTxt, number)
            }, 30000)

        }
        else if (!!module_text && !!module_title) {
            data = module_text
            WA.sendText(data, number)

            await sendList(currentDay, module_No, number)
        }

        else {
            markModuleComplete(number)
        }

    })
}

/**
 * Check if the next module is greater than 10
 * If yes, then update columns Next Module to 0 and Module Completed to the current module number.
 * Otherwise, update Next Module by 1 and Module Completed to the Next Module.
 * Also executed when Next keyword is received
 * @param {number} number - Phone number 
 */
async function markModuleComplete(number) {
    const records_Student = await base('Student').select({
        filterByFormula: "({Phone} =" + number + ")",
        view: "Grid view",

    }).all();
    records_Student.forEach(function (record) {
        console.log("Entered markModuleComplete")
        var id = record.id
        var current_module = Number(record.get("Next Module")) //
        var cDay = Number(record.get("Next Day"))

        var next_module = current_module + 1 // 1+1 = 1

        if (next_module > 10) {


            airtable.updateField(id, "Module Completed", current_module)

            airtable.updateField(id, "Next Module", 0)
            sendEndDayMessage(cDay, number);
        }

        else {

            airtable.updateField(id, "Next Module", next_module)
            airtable.updateField(id, "Module Completed", current_module)

            findModule(cDay, next_module, number)

        }


    });
}


/**Update Day Completed field and Next Day field in Student's table of the student
 * Called when received Finish day keyword
 * @param {number} number - Phone number.
 */

async function markDayComplete(number) {
    const records_Student = await base('Student').select({
        filterByFormula: "({Phone} =" + number + ")",
        view: "Grid view",

    }).all();

    total_days = 0
    var total_days = await airtable.totalDays(number)

    records_Student.forEach(function (record) {
        console.log("Entered markDayComplete")

        var id = record.id
        var comp_day = Number(record.get("Next Day"))
        var nextDay = comp_day + 1

        if (comp_day <= total_days) {

            try {
                airtable.updateField(id, "Next Day", nextDay)

                airtable.updateField(id, "Day Completed", comp_day)

                console.log("Completed Day " + comp_day)

                //Reset module numbers
                const next_mod = 1
                const module_completed = 0
                airtable.updateField(id, "Next Module", next_mod)

                airtable.updateField(id, "Module Completed", module_completed)
            }
            catch (e) {
                console.log("Error while updating complete day " + e)
            }
        }


    });
}

/** Send end day interactive message to the students. 
 * 
 * @param {*} currentDay 
 * @param {*} number - Phone number
 */
async function sendEndDayMessage(currentDay, number) {
    var course_tn = await airtable.findTable(number).then(`Table name of ${number} is ${course_tn}`).catch(e => console.log(e))
    const records = await base(course_tn).select({
        filterByFormula: "({Day} =" + currentDay + ")",
        view: "Grid view",

    }).all(
    );
    records.forEach(function (record) {
        console.log("Entered sendEndDayMessage module")
        var day = record.get("Day")


        const hTxt = "I hope that was helpful"
        const bTxt = "I'll be back with more updates tomorrow!. \n\n_powered by ekatra_"
        const btnTxt = "Finish"



        setTimeout(() => {
            console.log("Delay of Finish Day")
            WA.sendInteractiveButtonsMessage(hTxt, bTxt, btnTxt, number)


        }, 1000)

    })
}

module.exports = { markDayComplete, sendModuleContent, markModuleComplete, store_responses }

