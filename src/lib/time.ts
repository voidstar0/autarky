import moment = require("moment");

/**
 *
 * @param timeVal
 */
export function TimeRelative(timeVal): string {
  const timeNow = new Date().getTime();
  const timeDiff = timeNow - timeVal;
  return moment(timeVal).fromNow(true);
}

/**
 *
 * Converts time in months to milliseconds
 *
 * @param {Number} timeMonths - Time in months
 * @returns {Number} timeMilli - Return time in milliSeconds
 */

export function TimeMonthToMilli(time: any): number {
  return time * 2.628e9;
}
