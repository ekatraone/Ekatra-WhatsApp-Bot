require('dotenv').config("./env");
var Airtable = require('airtable');
const WA = require('./wati');


var base = new Airtable({ apiKey: process.env.apiKey }).base(process.env.base);

async function getStudentNumbers(studentTable, contact) {
    return new Promise((resolve, reject) => {
        var jsonResponse = {}

        base(`${studentTable}`).select({
            view: "Grid view"
        }).eachPage(async function page(records, fetchNextPage) {

            records.forEach(function (record) {
                let response = record.get(contact)
                let number = record.get("Phone")
                // console.log(number)
                response = "Number\n" + number + "\n" + response
                // console.log(response)
                arrayRes = (response.split("\n"))
                arrayRes = arrayRes.filter(e => e)
                // console.log(arrayRes)
                //jsonResponse = arrayRes.reduce((json, value, key) => { json[key] = value; return json; }, {});
                let d = []
                for (let i = 0; i < arrayRes.length; i++) {
                    if (i < arrayRes.length - 1) {
                        d.push({
                            [arrayRes[i]]: arrayRes[i + 1]
                        })
                        i++
                    }

                };
                console.log(d);
                // jo = new JSONObject();
                // //arrayRes = new JSONArray();
                // // populate the array
                // jo.put("arrayName", d);
                // console.log(jo)


                // key = "What is your dream business?"
                // var rta = d.filter(it => it.key === 'Start a Tuition Centre');
                // console.log(rta);
                // for (const row of arrayRes) {
                //     console.log(row)
                //     // d.push({
                //     //     arrayRes: row
                //     // })
                // }
                // jsonResponse.push(response)
                // console.log(jsonResponse)

            });

            for (i = 0; i < jsonResponse.length; i++) {

                // sendContent(json[i], studentTable, contact)
                //     .then().catch(e => console.log("Error 1 " + e))
                // resolve("ok1")
                // reject("Error")
            }

            fetchNextPage();

        }, function done(err) {
            if (err) {
                console.error("Error " + err);
            }
        });

    })
}

// async function sendContent(number, studentTable, contact) {
//     const records_Student = await base(`${studentTable}`).select({
//         filterByFormula: "({" + contact + "} =" + number + ")",
//         view: "Grid view",

//     }).all();
//     var td = await totalDays(number, studentTable, contact)

//     records_Student.forEach(async function (record) {
//         studentName = record.get("Name")
//         course = record.get("Course")
//         completed_Day = record.get("Day Completed")
//         day = record.get("Next Day")

//         if (completed_Day < td) {
//             try {
//                 // console.log(studentTable)

//                 // WA.sendTemplateMessage(studentName, number)

//                 // else if (studentTable == "Student") {
//                 //     //WhatsApp Template
//                 //     
//                 // }


//             }
//             catch (e) {
//                 console.log("sendContent error " + e)
//             }



//         }

//     })

// }

// const totalDays = async (number, studentTable, contact) => {
//     var course_tn = await findTable(number, studentTable, contact)

//     const course_table = await base(`${course_tn}`).select({
//         //filterByFormula: "({Phone} = " + number + ")",
//         fields: ["Day"],
//         view: "Grid view"
//     }).all();
//     return new Promise((resolve, reject) => {
//         count = 0
//         course_table.forEach(function (record) {
//             count += 1

//         })
//         resolve(count)
//         reject("Error")
//     })

// }
// const findTable = async (number, studentTable, contact) => {
//     const course_table = await base(`${studentTable}`).select({
//         filterByFormula: "({" + contact + "} = " + number + ")",
//         view: "Grid view"
//     }).all();

//     return new Promise((resolve, reject) => {
//         course_tn = ""
//         course_table.forEach(function (record) {
//             course_tn = record.get("Course")
//             // console.log("Table Name = " + record.get("Course"))
//             resolve(course_tn)
//             reject("error")

//         })
//     })
// }

// try {
// getStudentNumbers("Telegram-Students", "ChatID").then().catch(e => console.log("E", e))

getStudentNumbers("Student copy", "Response")

// }
// catch (e) {
//     console.log("error " + e)
// }