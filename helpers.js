export const DAYS_ARRAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export const MONTHS_ARRAY = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function getCurrentDate() {
  const currentDate = new Date()
  const currentYear = currentDate.getUTCFullYear()
  const currentMonth = currentDate.getUTCMonth()

  return {
    currentYear: currentYear,
    currentMonth: currentMonth,
  }
}
