// const getDatesOfMonth = numOfDays => {
//   let dates = [];
//   const availableDays = [28, 29, 30, 31];

//   if (availableDays.includes(numOfDays)) {
//     var date;
//     for (date = 1; date <= numOfDays; date++) {
//       dates.push(date);
//     }
//     return dates;
//   } else {
//     console.log("number of days can only be 28, 29, 30, 31");
//   }
// };

// const getMonthsOfYear = year => {
//   const currentYear = new Date().getFullYear();
//   if (year >= currentYear) {
//     const isLeapYear = year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
//     const longMonth = [0, 2, 4, 6, 7, 9, 11];
//     const shortMonth = [3, 5, 8, 10];
//     let allDates = [];

//     let month;
//     for (month = 0; month < 12; month++) {
//       if (longMonth.includes(month)) {
//         allDates.push(getDatesOfMonth(31));
//       } else if (shortMonth.includes(month)) {
//         allDates.push(getDatesOfMonth(30));
//       } else if (month == 1) {
//         isLeapYear
//           ? allDates.push(getDatesOfMonth(29))
//           : year.push(getDatesOfMonth(28));
//       }
//     }
//     return allDates;
//   } else {
//     console.log(`do not accept past year, it's ${currentYear} now.`);
//   }
// };

// find leap year
// const isLeapYear = year => {
//   if (typeof year == "number") {
//     if (year >= 1752) {
//       const isLeapYear = year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
//       return isLeapYear;
//     } else {
//       console.log("The first leap year is 1752.");
//     }
//   } else {
//     console.log("year must be number");
//   }
// };

export const getCurrentWeek = sundayFirst => {
  const today = new Date();
  let week = [today];

  // console.log(today)

    let tail;
    let tailNum = 1;
    for (tail = today.getDay() + 1; tail < (sundayFirst ? 7 : 8); tail++) {
      let newDay = new Date();
      newDay.setDate(today.getDate() + tailNum);
      week.push(newDay);
      tailNum += 1;
    }

    let head;
    let headNum = 1;
    for (head = today.getDay() - 1; head >= (sundayFirst ? 0 : 1); head--) {
      let newDay = new Date();
      newDay.setDate(today.getDate() - headNum);
      week.unshift(newDay);
      headNum += 1;
    }

    return week;
};
