//** This file handles Airtable operations* /

var Airtable = require('airtable');
require('dotenv').config();

var base = new Airtable({ apiKey: process.env.apiKey }).base(process.env.base);

/**
 * Update the column in Airtable.
 * @param {number} id - Unique row ID
 * @param {string} field_name - Field name to update
 * @param {*} updatedValue - Value to update
 */
async function updateField(id, field_name, updatedValue) {

  base('Student').update([

    {
      "id": id,
      "fields": {
        [field_name]: updatedValue
      }
    }
  ], function (err, records) {
    if (err) {
      // throw new Error(err)
      console.log(err);
      // return;
    }

  });
}

/**
 * Find total days in a given course.
 * @param {*} number 
 * @returns total days 
 */
const totalDays = async (number) => {

  var course_tn = await findTable(number)
  const course_table = await base(course_tn).select({
    fields: ["Day"],
    view: "Grid view"
  }).all();
  return new Promise((resolve, reject) => {
    count = 0

    course_table.forEach(function (record) {
      count += 1

    })
    console.log(count)
    resolve(count)
    reject("Error")
  })
}

/** 
 * Finds the course table of individual students.
 * Note: Course name and Course table name must be same.
 * @param {*} number 
 * @returns course name 
 */
const findTable = async (number) => {


  const course_table = await base('Student').select({
    filterByFormula: "({Phone} = " + number + ")",
    view: "Grid view"
  }).all();

  return new Promise((resolve, reject) => {
    course_tn = ""
    course_table.forEach(function (record) {
      course_tn = record.get("Course")

      resolve(course_tn)
      reject("error")

    })
  })
}

/**
 * Find the current value in Response column
 * @param {*} id 
 * @returns Response field value for the given ID.
 */
const findRecord = async (id) => {
  return new Promise((resolve, reject) => {
    base('Student').find(id, function (err, record) {
      if (err) { console.error(err); return; }

      resolve(record.fields.Response);
    });
  }
  )
}

/**
 * Find the Title and list options for a given module number
 * @param {number} currentDay 
 * @param {number} module_no 
 * @returns 
 */
const findTitle = async (currentDay, module_no) => {
  var course_tn = await findTable(number)
  const records = await base(course_tn).select({
    filterByFormula: "({Day} =" + currentDay + ")",
    view: "Grid view",

  }).all(
  );
  return new Promise((resolve, reject) => {
    records.forEach(function (record) {
      let title = record.get('Module ' + module_no + ' LTitle');
      resolve(title)
      reject("error")
    })
  })
}

module.exports = {
  findTable,
  totalDays,
  updateField,
  findRecord,
  findTitle
}
