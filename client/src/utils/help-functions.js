import moment from "moment";

export const today = moment();
export const thisDay = moment().format("DD");
export const thisMonth = moment().month() + 1;
export const thisYear = moment().year();

export const generateArrayOfYears = () => {
  var max = thisYear;
  var fark = thisYear - 2013;
  var min = max - fark;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const dateFormat = (date) => {
  return moment(date).format("DD.MM.YYYY");
};

export const dateFormatNormal = (date) => {
  return moment(date).format();
};

export const dateFormatMonths = (date) => {
  return moment(date).format("MM-YYYY");
};

export const dateFormatYears = (date) => {
  return moment(date).format("YYYY");
};

export const sortDate = (dateA, dateB, direction = "asc") => {
  const formats = ["DD-MM-YYYY"]; // can be several
  return (
    (moment(dateA, formats).isBefore(moment(dateB, formats))
      ? -1
      : moment(dateA, formats).isAfter(moment(dateB, formats))
      ? 1
      : 0) * (direction === "asc" ? 1 : -1)
  );
};

export const uniqListFunc = (arr, att, track = new Set()) =>
  arr.filter((cat) => (track.has(cat[att]) ? false : track.add(cat[att])));

export const twoDecimalRound = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

export const fourDecimalRound = (num) => {
  return +(Math.round(num + "e+4") + "e-4");
};

const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

export const materialDateInput = `${year}-${month}-${date}`;
