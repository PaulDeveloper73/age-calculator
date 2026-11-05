// 1. Extract today's date
const calculateTodaysDate = (today = new Date()) => {
  if (!(today instanceof Date) || Number.isNaN(today.getTime())) {
    throw new Error('Please provide a valid Date object.')
  }

  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  }
}

// 2. Create a date using UTC calendar values
const createDate = (year, month, day) => {
  const date = new Date(0)

  date.setUTCHours(0, 0, 0, 0)
  date.setUTCFullYear(year, month - 1, day)

  return date
}

// 3. Extract UTC date parts
const getDateParts = date => ({
  year: date.getUTCFullYear(),
  month: date.getUTCMonth() + 1,
  day: date.getUTCDate()
})

// 4. Format a date as YYYY-MM-DD
const formatDate = date => {
  const { year, month, day } = getDateParts(date)

  return [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0')
  ].join('-')
}

// 5. Check leap year
const isLeapYear = year => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

// 6. Calculate difference between two dates
const calculateDaysDifference = (startDate, endDate) => {
  const difference = endDate.getTime() - startDate.getTime()

  return Math.round(difference / 86400000)
}

// 7. Add calendar months safely
const addMonths = (date, months) => {
  const target = createDate(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1 + months,
    1
  )

  const lastDay = createDate(
    target.getUTCFullYear(),
    target.getUTCMonth() + 2,
    0
  ).getUTCDate()

  target.setUTCDate(Math.min(date.getUTCDate(), lastDay))

  return target
}

// 8. Calculate remaining months and days
const calculateRemainingTime = (today, upcomingBirthday) => {
  let months =
    (upcomingBirthday.getUTCFullYear() - today.getUTCFullYear()) * 12 +
    (upcomingBirthday.getUTCMonth() - today.getUTCMonth())

  let anchorDate = addMonths(today, months)

  if (anchorDate > upcomingBirthday) {
    months--

    anchorDate = addMonths(today, months)
  }

  const days = calculateDaysDifference(anchorDate, upcomingBirthday)

  return { months, days }
}

// 9. Main birthday calculator
export const calculateBirthdayInfo = (dateOfBirth, today = new Date()) => {
  // Validate date of birth
  dateOfBirth =
    dateOfBirth instanceof Date ? '2023-12-01' : new Date(dateOfBirth)
  if (!dateOfBirth) {
    throw new Error('Date of birth is required.')
  }

  // Validate today's date
  const todayParts = calculateTodaysDate(today)
  const currentDate = createDate(
    todayParts.year,
    todayParts.month,
    todayParts.day
  )

  // Accept Date object or YYYY-MM-DD string
  let dobParts

  if (dateOfBirth instanceof Date) {
    if (Number.isNaN(dateOfBirth.getTime())) {
      throw new Error('Invalid date of birth.')
    }

    dobParts = calculateTodaysDate(dateOfBirth)
  } else if (typeof dateOfBirth === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth.trim())

    if (!match) {
      throw new Error('Date of birth must use YYYY-MM-DD format.')
    }

    dobParts = {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3])
    }
  } else {
    throw new Error('Date of birth must be a Date object or string.')
  }

  const { year: birthYear, month: birthMonth, day: birthDay } = dobParts
  const birthDate = createDate(birthYear, birthMonth, birthDay)

  // Validate actual calendar date
  if (
    birthYear < 1 ||
    birthMonth < 1 ||
    birthMonth > 12 ||
    birthDay < 1 ||
    birthDate.getUTCFullYear() !== birthYear ||
    birthDate.getUTCMonth() + 1 !== birthMonth ||
    birthDate.getUTCDate() !== birthDay
  ) {
    throw new Error('Invalid date of birth.')
  }

  // Reject future dates
  if (birthDate > currentDate) {
    throw new Error('Date of birth cannot be in the future.')
  }

  const currentYear = todayParts.year

  // 10. Get birthday for a particular year
  // February 29 becomes February 28 in non-leap years
  const birthdayForYear = year => {
    const day =
      birthMonth === 2 && birthDay === 29 && !isLeapYear(year) ? 28 : birthDay

    return createDate(year, birthMonth, day)
  }

  // 11. Get this year's birthday
  const birthdayThisYear = birthdayForYear(currentYear)

  // 12. Determine whether birthday has passed
  const birthdayIsToday = currentDate.getTime() === birthdayThisYear.getTime()

  // IMPORTANT: Only consider it passed when today is AFTER
  // the birthday in the current year.
  const birthdayHasPassed = currentDate.getTime() > birthdayThisYear.getTime()

  // 13. Determine upcoming birthday
  // Add one year ONLY when this year's birthday has passed.
  const upcomingBirthday = birthdayHasPassed
    ? birthdayForYear(currentYear + 1)
    : birthdayThisYear

  // 14. Calculate countdown
  const remainingDays = calculateDaysDifference(currentDate, upcomingBirthday)

  const { months, days } = calculateRemainingTime(currentDate, upcomingBirthday)

  // 15. Calculate current age
  let age = currentYear - birthYear
  const totalDays = calculateDaysDifference(birthDate, currentDate)
  console.log(totalDays)
  if (currentDate < birthdayThisYear) {
    age--
  }

  // 16. Format upcoming birthday
  const formattedBirthday = upcomingBirthday.toLocaleDateString('en-UG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })
  // 17. Calculate countdown description
  const countdownParts = []

  if (months > 0) {
    countdownParts.push(`${months} month${months === 1 ? '' : 's'}`)
  }

  if (days > 0) {
    countdownParts.push(`${days} day${days === 1 ? '' : 's'}`)
  }

  const countdownText = countdownParts.length
    ? countdownParts.join(' and ')
    : 'Less than a day'

  // 18. Determine user birthday status
  const UserStatusCode = birthdayIsToday
    ? 'BIRTHDAY_TODAY'
    : birthdayHasPassed
    ? 'BIRTHDAY_PASSED_THIS_YEAR'
    : 'BIRTHDAY_UPCOMING'

  // 19. Generate user status message
  const UserStatus = birthdayIsToday
    ? 'Happy Birthday! Today is your birthday.'
    : birthdayHasPassed
    ? `Your birthday has passed this year. Your next birthday is on ${formattedBirthday}, in ${countdownText}.`
    : `Your birthday is upcoming this year. Your birthday is on ${formattedBirthday}, in ${countdownText}.`
  // 20. Return results
  return {
    dateOfBirth: {
      year: birthYear,
      month: birthMonth,
      day: birthDay
    },

    today: todayParts,

    age,

    birthdayIsToday,
    birthdayHasPassed,

    upcomingBirthday: getDateParts(upcomingBirthday),

    upcomingBirthdayISO: formatDate(upcomingBirthday),

    formattedBirthday,

    remainingDays,

    remainingMonths: months,

    remainingExtraDays: days,

    totalDays: remainingDays,

    countdownText,

    UserStatusCode,

    UserStatus
  }
}
