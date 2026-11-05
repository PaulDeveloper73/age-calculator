import { calculateBirthdayInfo } from './app.js'
const initApp = () => {
  const ageCalculatorForm = document.querySelector('#age-calculator-form')

  const dateOfBirthInput = document.querySelector('#date-of-birth')

  const calculateAgeBtn = document.querySelector('#calculate-age-btn')

  const resetAgeBtn = document.querySelector('#reset-age-btn')

  const ageErrorMessage = document.querySelector('#age-error-message')

  const ageYears = document.querySelector('#age-years')

  const ageMonths = document.querySelector('#age-months')

  const ageDays = document.querySelector('#age-days')

  const ageTotalDays = document.querySelector('#age-total-days')

  const calculationDate = document.querySelector('#calculation-date')
  const status = document.querySelector('#status')

  ageCalculatorForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log('Form submitted')
    status.classList.add('hidden')

    const dateOfBirth = dateOfBirthInput.value
    const birthdayInfo = calculateBirthdayInfo(dateOfBirth)
    displayAgeResults(birthdayInfo)
  })
  const displayAgeResults = result => {
    const {
      age,
      remainingMonths,
      remainingDays,
      totalDays,
      UserStatus,
      UserStatusCode
    } = result

    // Display completed years.
    ageYears.textContent = age

    // Display remaining months.
    ageMonths.textContent = remainingMonths

    // Display remaining days.
    ageDays.textContent = remainingDays

    // Display total days lived.
    ageTotalDays.textContent = totalDays
    status.textContent = UserStatus

    status.classList.remove('hidden')
    console.log(ageTotalDays.textContent)
    // const result = calculateBirthdayInfo('2023-12-01')

    console.log(UserStatusCode)

    if (UserStatusCode === 'BIRTHDAY_TODAY') {
      console.log('Send birthday congratulations!')
    }

    if (UserStatusCode === 'BIRTHDAY_UPCOMING') {
      console.log('Schedule upcoming birthday notification.')
    }

    if (UserStatusCode === 'BIRTHDAY_PASSED_THIS_YEAR') {
      console.log("Display next year's birthday.")
    }
  }
}

window.addEventListener('DOMContentLoaded', initApp)
