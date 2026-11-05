# 🎂 Birthday Countdown Calculator

A lightweight JavaScript Birthday Countdown Calculator that calculates a person's current age, determines their birthday status, identifies their next upcoming birthday, and displays the exact time remaining in months and days.

The application uses JavaScript's native `Date` object to handle date calculations, birthday comparisons, leap years, and calendar validation.

---

## 📌 Project Overview

The Birthday Countdown Calculator helps users determine when their next birthday will occur and how much time remains before that special day.

It intelligently identifies whether a birthday:

- Is happening today.
- Is still upcoming this year.
- Has already passed this year.
- Falls in the following calendar year.

It also calculates the user's current age and provides a readable birthday status message.
###Project Preview link is here: https://pauldeveloper73.github.io/age-calculator/

## ✨ Key Features

### 1. Automatic Current Date Detection

- Retrieves the current date using JavaScript's `new Date()`.
- Extracts the year, month, and day.
- Supports custom dates for testing.
- Normalizes dates to midnight to avoid time-of-day comparison errors.

### 2. Date of Birth Validation

- Accepts dates in `YYYY-MM-DD` format.
- Supports JavaScript `Date` objects.
- Rejects missing dates.
- Rejects invalid calendar dates.
- Prevents future dates of birth.
- Validates months and days correctly.

### 3. Automatic Age Calculation

- Calculates the user's current age.
- Accounts for whether the birthday has occurred in the current year.
- Prevents premature age increases.
- Handles February 29 birthdays.

### 4. Intelligent Birthday Detection

The calculator automatically determines three possible birthday states:

| Status                      | Description                                         |
| --------------------------- | --------------------------------------------------- |
| `BIRTHDAY_TODAY`            | The user's birthday is today.                       |
| `BIRTHDAY_UPCOMING`         | The user's birthday is still ahead this year.       |
| `BIRTHDAY_PASSED_THIS_YEAR` | The user's birthday has already occurred this year. |

### 5. Upcoming Birthday Calculation

- Identifies the next birthday.
- Keeps upcoming birthdays in the current year when they have not yet occurred.
- Moves to the following year only when this year's birthday has passed.
- Provides the next birthday as a structured date and ISO-formatted string.

### 6. Birthday Countdown

Calculates:

- Total remaining days.
- Remaining complete calendar months.
- Additional remaining days.
- Human-readable countdown messages.

Example:

`1 month and 21 days remaining`

### 7. Leap Year Support

- Detects leap years correctly.
- Validates February 29 birthdays.
- Uses February 28 as the birthday in non-leap years.

---

## 🛠️ Technologies Used

- **JavaScript (ES6+)** – Application logic and date calculations.
- **Date Object** – Date manipulation and calendar calculations.
- **ES Modules** – Reusable and maintainable JavaScript functions.
- **HTML5** – Can be used to build the user interface.
- **CSS3 / Tailwind CSS** – Optional interface styling.

No external JavaScript date library is required.

---

## 📂 Suggested Project Structure

```text
birthday-countdown-calculator/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── birthday.js
│       └── app.js
│
├── README.md
│
└── package.json
```

**File responsibilities:**

- `index.html` – Application interface and date-of-birth input.
- `style.css` – Application styling and responsive layout.
- `birthday.js` – Birthday calculations, validation and countdown logic.
- `app.js` – Handles form submission, user interactions and displaying results.
- `README.md` – Project documentation.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/birthday-countdown-calculator.git
```

### 2. Navigate into the project

```bash
cd birthday-countdown-calculator
```

### 3. Open the project

Open `index.html` in your browser or use the VS Code Live Server extension.

No dependency installation is required for the standalone JavaScript calculator.

---

## 💻 How to Use the Calculator

The main exported function is:

```javascript
calculateBirthdayInfo(dateOfBirth, today);
```

It accepts two parameters:

| Parameter     | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `dateOfBirth` | Required. A date string (`YYYY-MM-DD`) or JavaScript `Date` object.                            |
| `today`       | Optional. A JavaScript `Date` object used as the reference date. Defaults to the current date. |

### Example 1: Calculate a Birthday Automatically

```javascript
import { calculateBirthdayInfo } from "./birthday.js";

const result = calculateBirthdayInfo("1998-12-25");

console.log(result);
```

### Example 2: Test with a Specific Date

```javascript
const result = calculateBirthdayInfo("2023-12-01", new Date(2026, 10, 5));

console.log(result);
```

Expected countdown:

```text
Upcoming birthday: 1 December 2026
Remaining days: 26
Remaining months: 0
Remaining extra days: 26
Status: Birthday is upcoming.
```

### Example 3: Handle Errors

```javascript
try {
  const result = calculateBirthdayInfo("2023-12-01");

  console.log(result.UserStatus);
} catch (error) {
  console.error(error.message);
}
```

---

## 📊 Returned Data Structure

The `calculateBirthdayInfo()` function returns a structured JavaScript object.

```javascript
{
  dateOfBirth: {
    year: 2023,
    month: 12,
    day: 1
  },

  today: {
    year: 2026,
    month: 11,
    day: 5
  },

  age: 2,

  birthdayIsToday: false,

  birthdayHasPassed: false,

  upcomingBirthday: {
    year: 2026,
    month: 12,
    day: 1
  },

  upcomingBirthdayISO: '2026-12-01',

  formattedBirthday: '1 December 2026',

  remainingDays: 26,

  remainingMonths: 0,

  remainingExtraDays: 26,

  totalDays: 26,

  countdownText: '26 days',

  UserStatusCode: 'BIRTHDAY_UPCOMING',

  UserStatus: 'Your birthday is upcoming this year. Your birthday is on 1 December 2026, in 26 days.'
}
```

### Return Properties Explained

| Property              | Data type | Purpose                                            |
| --------------------- | --------- | -------------------------------------------------- |
| `dateOfBirth`         | Object    | Original date of birth.                            |
| `today`               | Object    | Current reference date.                            |
| `age`                 | Number    | User's current age.                                |
| `birthdayIsToday`     | Boolean   | Indicates whether today is the birthday.           |
| `birthdayHasPassed`   | Boolean   | Indicates whether this year's birthday has passed. |
| `upcomingBirthday`    | Object    | Year, month and day of the next birthday.          |
| `upcomingBirthdayISO` | String    | Upcoming birthday in `YYYY-MM-DD` format.          |
| `formattedBirthday`   | String    | Human-readable upcoming birthday.                  |
| `remainingDays`       | Number    | Total days until the next birthday.                |
| `remainingMonths`     | Number    | Complete calendar months remaining.                |
| `remainingExtraDays`  | Number    | Additional days after complete months.             |
| `totalDays`           | Number    | Total days remaining.                              |
| `countdownText`       | String    | Readable countdown.                                |
| `UserStatusCode`      | String    | Machine-readable birthday status.                  |
| `UserStatus`          | String    | User-friendly birthday message.                    |

---

## 🧪 Testing Different Birthday Scenarios

The calculator supports different birthday situations.

For the examples below, assume today's date is November 5, 2026.

| Date of Birth | Upcoming Birthday | Expected Status  |
| ------------- | ----------------- | ---------------- |
| `1998-11-05`  | November 5, 2026  | Birthday today   |
| `1998-11-10`  | November 10, 2026 | Upcoming         |
| `1998-12-01`  | December 1, 2026  | Upcoming         |
| `2023-10-15`  | October 15, 2027  | Passed this year |
| `2000-02-29`  | February 28, 2027 | Upcoming         |

### Example Testing Script

```javascript
const testCases = [
  "1998-11-05",
  "1998-11-10",
  "1998-12-01",
  "2023-10-15",
  "2000-02-29",
];

testCases.forEach((dateOfBirth) => {
  try {
    const result = calculateBirthdayInfo(dateOfBirth, new Date(2026, 10, 5));

    console.log({
      dateOfBirth,
      upcomingBirthday: result.upcomingBirthdayISO,
      remainingDays: result.remainingDays,
      status: result.UserStatusCode,
      message: result.UserStatus,
    });
  } catch (error) {
    console.error(error.message);
  }
});
```

---

## ⚙️ How the Birthday Calculation Works

The application follows a sequence of calculations.

1. Receive and validate the date of birth.
2. Extract the birth year, month and day.
3. Retrieve the current date.
4. Calculate the user's current age.
5. Generate the birthday for the current calendar year.
6. Compare today's date with this year's birthday.
7. Determine whether the birthday is today, upcoming or passed.
8. Select the correct upcoming birthday.
9. Calculate the number of days remaining.
10. Convert the countdown into complete months and additional days.
11. Generate a readable birthday message.
12. Return the complete result object.

### Important Birthday Comparison

The following condition is responsible for deciding whether to move the birthday into the following year:

```javascript
const birthdayHasPassed = currentDate.getTime() > birthdayThisYear.getTime();
```

The next birthday is determined using:

```javascript
const upcomingBirthday = birthdayHasPassed
  ? birthdayForYear(currentYear + 1)
  : birthdayThisYear;
```

This ensures a birthday in December does not incorrectly move to January of the following year when the current date is still in November.

---

## 🛡️ Validation and Error Handling

The calculator protects against invalid user input.

| Invalid input           | Expected error                            |
| ----------------------- | ----------------------------------------- |
| Empty date              | Date of birth is required.                |
| `2023-15-01`            | Invalid date of birth.                    |
| `2023-02-30`            | Invalid date of birth.                    |
| `2023-00-10`            | Invalid date of birth.                    |
| Future date             | Date of birth cannot be in the future.    |
| Incorrect string format | Date of birth must use YYYY-MM-DD format. |
| Invalid Date object     | Invalid date of birth.                    |

Errors are thrown using JavaScript's `Error` object and can be handled with `try...catch`.

---

## 📌 Important Implementation Notes

- JavaScript months are zero-indexed when using `getMonth()`, so January is `0` and December is `11`.
- This application returns calendar months and additional days, not an approximation based on 30-day months.
- The countdown uses UTC calendar arithmetic to avoid daylight-saving and time-of-day differences during day calculations.
- Dates supplied as JavaScript `Date` objects are interpreted using their local calendar date.
- Dates supplied as strings must follow `YYYY-MM-DD`.
- February 29 birthdays are treated as February 28 in non-leap years.
- `birthdayHasPassed` refers to this year's birthday, not whether the user's lifetime birthday has passed.

---

## 🔮 Possible Future Enhancements

The calculator can be extended into a complete birthday management application.

Potential enhancements include:

- Responsive birthday dashboard.
- Multiple birthday records.
- Birthday reminders and notifications.
- Email and SMS birthday notifications.
- WhatsApp birthday reminders.
- Birthday calendar and event management.
- Search, filtering and sorting.
- Export birthday records to CSV, Excel and PDF.
- Local storage or database integration.
- React-based birthday management dashboard.
- User profiles and birthday management.
- Custom birthday messages and greetings.

---

## 🎯 Learning Objectives

This project demonstrates practical JavaScript concepts used in real-world applications:

- Arrow functions.
- Default parameters.
- Object destructuring.
- Template literals.
- Conditional statements.
- Ternary operators.
- JavaScript `Date` object.
- Date validation.
- Date comparison.
- UTC date calculations.
- Array and object manipulation.
- Error handling with `try...catch`.
- ES Modules and named exports.
- Reusable functions.
- Business logic and application status management.

---

## 👨‍💻 Developer

**Developed By:** Kisakye Paul – Software Developer

**Project:** Birthday Countdown Calculator

**Technologies:** JavaScript ES6+, HTML5 and CSS3.

---

## 📄 License

This project can be used, modified and extended for educational and personal development purposes. Add an explicit open-source license, such as MIT, to the repository before distributing it under those terms.

---

**Calculate birthdays. Track upcoming celebrations. Never miss a special day!** 🎂
