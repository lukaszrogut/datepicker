import { getDay, getDaysInMonth } from "date-fns"
import { getCurrentDate, MONTHS_ARRAY } from "./helpers"

const datePickerButton = document.querySelector("button.date-picker-button")
const datePicker = document.querySelector(".date-picker")
const datePickerGrid = document.querySelector(".date-picker-grid-dates")
const calendarHeader = document.querySelector(".current-month")

let activeDate = {
  day: null,
  month: null,
  year: null,
}

let { currentMonth, currentYear } = getCurrentDate()

function firstRender() {
  const { currentMonth, currentYear } = getCurrentDate()
  renderCalendarGrid(currentYear, currentMonth)
  renderCalendarDate(currentYear, currentMonth)
}
firstRender()

function renderCalendarDate(year, month) {
  const monthName = MONTHS_ARRAY[month]
  calendarHeader.innerText = `${monthName} - ${year}`
}

function clearCalendarGrid() {
  datePickerGrid.innerHTML = ""
}

function renderCalendarGrid(year, month) {
  clearCalendarGrid()
  const firstDayOfTheMonth = getDay(new Date(year, month, 1))

  let prevMonthDays = null
  if (month === 0) {
    prevMonthDays = getDaysInMonth(new Date(year - 1, 11))
  } else {
    prevMonthDays = getDaysInMonth(new Date(year, month - 1))
  }

  let currentMonthDays = getDaysInMonth(new Date(year, month))
  const lastDayOfTheMonth = getDay(new Date(year, month, currentMonthDays))

  const nextMonthDays = 6 - lastDayOfTheMonth
  const prevMonthVisibleDays = firstDayOfTheMonth
  const calendarGridButtonsLength =
    prevMonthVisibleDays + currentMonthDays + nextMonthDays

  let index = 0

  while (index < calendarGridButtonsLength) {
    const button = document.createElement("button")
    button.classList.add("date")
    if (index < firstDayOfTheMonth) {
      button.classList.add("date-picker-other-month-date")
      button.innerText = prevMonthDays - firstDayOfTheMonth + index
    } else if (
      index >= firstDayOfTheMonth &&
      index < currentMonthDays + firstDayOfTheMonth
    ) {
      button.innerHTML = index - firstDayOfTheMonth + 1
    } else {
      button.classList.add("date-picker-other-month-date")
      button.innerHTML = index - (currentMonthDays + firstDayOfTheMonth - 1)
    }
    datePickerGrid.appendChild(button)
    index++
  }
  if (year === activeDate.year && month === activeDate.month) {
    const dateBtn = document.querySelectorAll(".date")
    const searchText = `${activeDate.day}`.toString()
    let found

    for (let i = 0; i < dateBtn.length; i++) {
      if (dateBtn[i].textContent == searchText) {
        found = dateBtn[i]
        break
      }
    }
    if (found) {
      found.classList.add("selected")
    }
  }
}

datePickerButton.addEventListener("click", handleDatePicker)

function handleDatePicker() {
  datePicker.classList.toggle("show")
}

function handleMainButtonDate(activeDate) {
  const { day, month, year } = activeDate
  let suffix
  if (day === 1) {
    suffix = "st"
  } else if (day === 2) {
    suffix = "nd"
  } else if (day === 3) {
    suffix = "rd"
  } else {
    suffix = "th"
  }
  if (day && month && year) {
    datePickerButton.innerText = `${MONTHS_ARRAY[month]} ${day}${suffix}, ${year}`
  }
}

const prevMonthButton = document.querySelector(".prev-month-button")
const nextMonthButton = document.querySelector(".next-month-button")

prevMonthButton.addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11
    currentYear -= 1
  } else {
    currentMonth -= 1
  }

  clearCalendarGrid()
  renderCalendarGrid(currentYear, currentMonth, 1)
  renderCalendarDate(currentYear, currentMonth)
})

nextMonthButton.addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0
    currentYear += 1
  } else {
    currentMonth += 1
  }

  clearCalendarGrid()
  renderCalendarGrid(currentYear, currentMonth, 1)
  renderCalendarDate(currentYear, currentMonth)
})

function handleDateClick(e) {
  if (e.target.className === "date") {
    const prevSelectedDay = document.querySelector(".date.selected")
    if (prevSelectedDay) prevSelectedDay.classList.remove("selected")
    const currentDay = parseInt(e.target.innerText)
    activeDate = {
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    }
    e.target.classList.add("selected")
    handleMainButtonDate(activeDate)
  }
}

document.addEventListener("click", (e) => handleDateClick(e))
