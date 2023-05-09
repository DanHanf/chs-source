

// replaceSkippedNumbers.js

/**
 * Replaces skipped numbers in a list of name:date pairs with { name: null, date: missingNumber } objects.
 * @param {Array} data - An array of name:date pairs.
 * @returns {Array} - A new array with skipped numbers replaced with { name: null, date: missingNumber } objects.

export const replaceSkippedNumbers = (data, replacementNumber) => {
  const filteredData = [];

  for (let i = 0; i < data.length; i++) {
    const curr = data[i];
    const prev = data[i - 1];

    if (prev && curr[1] - prev[1] > 1) {
      // Add missing objects for skipped numbers
      for (let j = prev[1] + 1; j < curr[1]; j++) {
        filteredData.push({ name: "Nothing Today!", date: replacementNumber });
      }
    }

    // Create object with name and date properties
    const obj = { name: curr[0], date: curr[1] };
    // Add object to filteredData
    filteredData.push(obj);
  }

  return filteredData;
};

 */

import { format } from 'date-fns';
import { eachDayOfInterval } from 'date-fns';

/**
 * Replaces skipped dates in an array of name:date pairs with { name: null, date: missingDate } objects.
 * @param {Array} data - An array of name:date pairs.
 * @returns {Array} - A new array with skipped dates replaced with { name: null, date: missingDate } objects.
 */
export const replaceSkippedDates = (data) => {
  const filteredData = [];
  const dateFormat = 'yyyy-MM-dd';

  for (let i = 0; i < data.length; i++) {
    const curr = data[i];
    const prev = data[i - 1];

    if (prev && curr[1] !== prev[1]) {
            // Find missing dates
const startDate = new Date(prev[1]);
const endDate = new Date(curr[1]);
const allDates = eachDayOfInterval({
  start: startDate,
  end: endDate
}).map(date => format(date, dateFormat));

      // Add missing objects for skipped dates
      allDates.forEach(date => {
        filteredData.push({ name: null, date: date });
      });
    }

    // Create object with name and date properties
    const obj = { name: curr[0], date: curr[1] };
    // Add object to filteredData
    filteredData.push(obj);
  }

  return filteredData;
};


