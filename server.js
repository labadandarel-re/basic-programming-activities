
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Receive the selected activity and input values from React
app.post("/api/calculate", (req, res) => {
    const { activity, values = {} } = req.body || {};

    // Convert an input into a number and validate it
    const number = (key) => {
        const value = values?.[key];

        if (value === "" || value === undefined || value === null) {
            throw new Error("Please complete all required fields.");
        }

        const result = Number(value);

        if (!Number.isFinite(result)) {
            throw new Error("Please enter valid numbers.");
        }

        return result;
    };

    // Get text input
    const text = (key) => {
        const value = values?.[key];

        if (value === undefined || value === null) {
            throw new Error("Please complete all required fields.");
        }

        if (typeof value !== "string") {
            throw new Error("Please enter valid text.");
        }

        return value;
    };

    // Check whether a value is a non-negative whole number
    const wholeNumber = (key) => {
        const value = number(key);

        if (!Number.isSafeInteger(value) || value < 0) {
            throw new Error("Enter a non-negative whole number.");
        }

        return value;
    };

    try {
        let result;

        switch (activity) {

            // ==========================================
            // ACTIVITY 1: GREETING APP
            // ==========================================
            case "greeting": {
                const name = String(values?.name ?? "").trim();

                if (!name) {
                    throw new Error("Please enter your name.");
                }

                result = `Hello, ${name}!`;
                break;
            }

            // ==========================================
            // ACTIVITY 2: SUM OF TWO NUMBERS
            // ==========================================
            case "sum": {
                const num1 = number("num1");
                const num2 = number("num2");

                result = num1 + num2;
                break;
            }

            // ==========================================
            // ACTIVITY 3: AREA OF RECTANGLE
            // ==========================================
            case "rectangle": {
                const length = number("length");
                const width = number("width");

                if (length < 0 || width < 0) {
                    throw new Error("Dimensions cannot be negative.");
                }

                result = `Area: ${(length * width).toFixed(2)}`;
                break;
            }

            // ==========================================
            // ACTIVITY 4: AREA AND CIRCUMFERENCE OF CIRCLE
            // ==========================================
            case "circle": {
                const radius = number("radius");

                if (radius < 0) {
                    throw new Error("Radius cannot be negative.");
                }

                const area = Math.PI * radius * radius;
                const circumference = 2 * Math.PI * radius;

                result =
                    `Area: ${area.toFixed(2)}\n` +
                    `Circumference: ${circumference.toFixed(2)}`;
                break;
            }

            // ==========================================
            // ACTIVITY 5: CELSIUS TO FAHRENHEIT
            // ==========================================
            case "temperature": {
                const celsius = number("celsius");
                const fahrenheit = (celsius * 9 / 5) + 32;

                result = `${fahrenheit.toFixed(2)} °F`;
                break;
            }

            // ==========================================
            // ACTIVITY 6: SWAP TWO VARIABLES
            // ==========================================
            case "swap": {
                const a = number("a");
                const b = number("b");

                result =
                    `Before: A = ${a}, B = ${b}\n` +
                    `After: A = ${b}, B = ${a}`;
                break;
            }

            // ==========================================
            // ACTIVITY 7: AVERAGE OF THREE GRADES
            // ==========================================
            case "average": {
                const grade1 = number("grade1");
                const grade2 = number("grade2");
                const grade3 = number("grade3");

                const average = (grade1 + grade2 + grade3) / 3;

                result = `Average: ${average.toFixed(2)}`;
                break;
            }

            // ==========================================
            // ACTIVITY 8: SECONDS CONVERTER
            // ==========================================
            case "seconds": {
                const total = wholeNumber("seconds");

                const hours = Math.floor(total / 3600);
                const minutes = Math.floor((total % 3600) / 60);
                const seconds = total % 60;

                result =
                    `${hours} hour(s), ${minutes} minute(s), ` +
                    `${seconds} second(s)`;
                break;
            }

            // ==========================================
            // ACTIVITY 9: CHANGE COUNTER
            // ==========================================
            case "change": {
                let amount = wholeNumber("amount");

                const denominations = [
                    1000, 500, 200, 100, 50, 20, 10, 5, 1
                ];

                result = denominations.map((denomination) => {
                    const count = Math.floor(amount / denomination);
                    amount %= denomination;

                    return `₱${denomination}: ${count}`;
                }).join("\n");

                break;
            }

            // ==========================================
            // ACTIVITY 10: SIMPLE INTEREST
            // ==========================================
            case "interest": {
                const principal = number("principal");
                const rate = number("rate");
                const time = number("time");

                if (principal < 0 || rate < 0 || time < 0) {
                    throw new Error("Values cannot be negative.");
                }

                const interest = principal * (rate / 100) * time;
                const total = principal + interest;

                result =
                    `Simple Interest: ${interest.toFixed(2)}\n` +
                    `Total Amount: ${total.toFixed(2)}`;
                break;
            }

            // ==========================================
            // ACTIVITY 11: EVEN OR ODD
            // ==========================================
            case "evenOdd": {
                const num = number("num");

                result = num % 2 === 0 ? "Even" : "Odd";
                break;
            }

            // ==========================================
            // ACTIVITY 12: POSITIVE, NEGATIVE, OR ZERO
            // ==========================================
            case "numberSign": {
                const num = number("num");

                if (num > 0) {
                    result = "Positive";
                } else if (num < 0) {
                    result = "Negative";
                } else {
                    result = "Zero";
                }

                break;
            }

            // ==========================================
            // ACTIVITY 13: LARGEST OF TWO NUMBERS
            // ==========================================
            case "largestTwo": {
                const num1 = number("num1");
                const num2 = number("num2");

                result = `Largest number: ${Math.max(num1, num2)}`;
                break;
            }

            // ==========================================
            // ACTIVITY 14: LARGEST OF THREE NUMBERS
            // ==========================================
            case "largestThree": {
                const num1 = number("num1");
                const num2 = number("num2");
                const num3 = number("num3");

                result = `Largest number: ${Math.max(num1, num2, num3)}`;
                break;
            }

            // ==========================================
            // ACTIVITY 15: LEAP YEAR CHECKER
            // ==========================================
            case "leapYear": {
                const year = number("year");

                if (!Number.isSafeInteger(year) || year <= 0) {
                    throw new Error("Enter a valid positive year.");
                }

                const leap =
                    year % 400 === 0 ||
                    (year % 4 === 0 && year % 100 !== 0);

                result = leap ? "Leap Year" : "Not a Leap Year";
                break;
            }

            // ==========================================
            // ACTIVITY 16: PASS OR FAIL
            // ==========================================
            case "passFail": {
                const grade = number("grade");

                if (grade < 0 || grade > 100) {
                    throw new Error("Grade must be between 0 and 100.");
                }

                result = grade >= 75 ? "Passed" : "Failed";
                break;
            }

            // ==========================================
            // ACTIVITY 17: GRADE CATEGORY
            // ==========================================
            case "gradeCategory": {
                const grade = number("grade");

                if (grade < 0 || grade > 100) {
                    throw new Error("Grade must be between 0 and 100.");
                }

                if (grade >= 90) {
                    result = "Excellent";
                } else if (grade >= 80) {
                    result = "Very Good";
                } else if (grade >= 75) {
                    result = "Passed";
                } else {
                    result = "Failed";
                }

                break;
            }

            // ==========================================
            // ACTIVITY 18: SIMPLE CALCULATOR
            // ==========================================
            case "calculator": {
                const num1 = number("num1");
                const num2 = number("num2");
                const operator = text("operator").trim();

                switch (operator) {
                    case "+":
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "*":
                        result = num1 * num2;
                        break;
                    case "/":
                        if (num2 === 0) {
                            throw new Error("Cannot divide by zero.");
                        }
                        result = num1 / num2;
                        break;
                    default:
                        throw new Error(
                            "Use one of these operators: +, -, *, /."
                        );
                }

                break;
            }

            // ==========================================
            // ACTIVITY 19: TRIANGLE TYPE
            // ==========================================
            case "triangleType": {
                const a = number("a");
                const b = number("b");
                const c = number("c");

                if (
                    a <= 0 || b <= 0 || c <= 0 ||
                    a + b <= c || a + c <= b || b + c <= a
                ) {
                    throw new Error("Enter valid triangle sides.");
                }

                if (a === b && b === c) {
                    result = "Equilateral Triangle";
                } else if (a === b || a === c || b === c) {
                    result = "Isosceles Triangle";
                } else {
                    result = "Scalene Triangle";
                }

                break;
            }

            // ==========================================
            // ACTIVITY 20: DAYS IN A MONTH
            // ==========================================
            case "daysInMonth": {
                const month = number("month");
                const year = number("year");

                if (
                    !Number.isInteger(month) ||
                    month < 1 || month > 12 ||
                    !Number.isSafeInteger(year) ||
                    year <= 0
                ) {
                    throw new Error("Enter a valid month and year.");
                }

                const days = new Date(year, month, 0).getDate();

                result = `${days} day(s)`;
                break;
            }

            // ==========================================
            // ACTIVITY 21: COUNT FROM 1 TO N
            // ==========================================
            case "countToN": {
                const n = wholeNumber("n");

                if (n > 1000) {
                    throw new Error("Please enter a number up to 1000.");
                }

                const numbers = [];

                for (let i = 1; i <= n; i++) {
                    numbers.push(i);
                }

                result = numbers.join(", ");
                break;
            }

            // ==========================================
            // ACTIVITY 22: SUM FROM 1 TO N
            // ==========================================
            case "sumToN": {
                const n = wholeNumber("n");

                result = (n * (n + 1)) / 2;
                break;
            }

            // ==========================================
            // ACTIVITY 23: MULTIPLICATION TABLE
            // ==========================================
            case "multiplicationTable": {
                const n = number("n");

                if (!Number.isSafeInteger(n)) {
                    throw new Error("Enter a whole number.");
                }

                const lines = [];

                for (let i = 1; i <= 10; i++) {
                    lines.push(`${n} x ${i} = ${n * i}`);
                }

                result = lines.join("\n");
                break;
            }

            // ==========================================
            // ACTIVITY 24: EVEN NUMBERS
            // ==========================================
            case "evenNumbers": {
                const n = wholeNumber("n");

                if (n > 10000) {
                    throw new Error("Please enter a number up to 10000.");
                }

                const even = [];

                for (let i = 2; i <= n; i += 2) {
                    even.push(i);
                }

                result = even.length > 0 ? even.join(", ") : "No even numbers";
                break;
            }

            // ==========================================
            // ACTIVITY 25: FACTORIAL
            // ==========================================
            case "factorial": {
                const n = wholeNumber("n");

                if (n > 170) {
                    throw new Error("Please enter a number from 0 to 170.");
                }

                let answer = 1;

                for (let i = 1; i <= n; i++) {
                    answer *= i;
                }

                result = answer;
                break;
            }

            // ==========================================
            // ACTIVITY 26: POWER WITHOUT **
            // ==========================================
            case "power": {
                const base = number("base");
                const exponent = number("exponent");

                if (
                    !Number.isSafeInteger(exponent) ||
                    Math.abs(exponent) > 1000
                ) {
                    throw new Error(
                        "Exponent must be a whole number between -1000 and 1000."
                    );
                }

                if (base === 0 && exponent < 0) {
                    throw new Error("Zero cannot have a negative exponent.");
                }

                let answer = 1;

                for (let i = 0; i < Math.abs(exponent); i++) {
                    answer *= base;
                }

                if (exponent < 0) {
                    answer = 1 / answer;
                }

                result = answer;
                break;
            }

            // ==========================================
            // ACTIVITY 27: SUM OF DIGITS
            // ==========================================
            case "digitSum": {
                const n = number("n");

                if (!Number.isSafeInteger(n)) {
                    throw new Error("Enter a whole number.");
                }

                let digits = Math.abs(n);
                let sum = 0;

                do {
                    sum += digits % 10;
                    digits = Math.floor(digits / 10);
                } while (digits > 0);

                result = sum;
                break;
            }

            // ==========================================
            // ACTIVITY 28: REVERSE A NUMBER
            // ==========================================
            case "reverseNumber": {
                const n = number("n");

                if (!Number.isSafeInteger(n)) {
                    throw new Error("Enter a whole number.");
                }

                const sign = n < 0 ? "-" : "";
                const reversed = Array.from(
                    String(Math.abs(n))
                ).reverse().join("");

                result = sign + reversed;
                break;
            }

            // ==========================================
            // ACTIVITY 29: COUNT DIGITS
            // ==========================================
            case "countDigits": {
                const n = number("n");

                if (!Number.isSafeInteger(n)) {
                    throw new Error("Enter a whole number.");
                }

                result = String(Math.abs(n)).length;
                break;
            }

            // ==========================================
            // ACTIVITY 30: FIBONACCI SERIES
            // ==========================================
            case "fibonacci": {
                const n = wholeNumber("n");

                if (n > 100) {
                    throw new Error("Please enter a number up to 100.");
                }

                const series = [];
                let a = 0;
                let b = 1;

                for (let i = 0; i < n; i++) {
                    series.push(a);

                    const next = a + b;
                    a = b;
                    b = next;
                }

                result = series.join(", ");
                break;
            }

            // ==========================================
            // ACTIVITY 31: RIGHT TRIANGLE PATTERN
            // ==========================================
            case "rightTriangle": {
                const rows = wholeNumber("rows");

                if (rows > 30) {
                    throw new Error("Please enter between 0 and 30 rows.");
                }

                const pattern = [];

                for (let i = 1; i <= rows; i++) {
                    pattern.push("*".repeat(i));
                }

                result = pattern.join("\n");
                break;
            }

            // ==========================================
            // ACTIVITY 32: PYRAMID PATTERN
            // ==========================================
            case "pyramid": {
    const n = Number(values.n);

    if (values.n === undefined || values.n === "" ||
        !Number.isInteger(n) || n < 1 || n > 50) {
        throw new Error("Please enter a number of rows from 1 to 50.");
    }

    let pyramid = "";

    for (let i = 1; i <= n; i++) {
        pyramid +=
            " ".repeat(n - i) +
            "*".repeat(2 * i - 1) +
            "\n";
    }

    result = pyramid;
    break;
}

            // ==========================================
            // ACTIVITY 33: STRING LENGTH
            // Count characters without using .length
            // ==========================================
            case "stringLength": {
                const value = text("text");
                let count = 0;

                for (const character of value) {
                    count++;
                }

                result = count;
                break;
            }

            // ==========================================
            // ACTIVITY 34: REVERSE A STRING
            // ==========================================
            case "reverseString": {
                const value = text("text");

                result = Array.from(value).reverse().join("");
                break;
            }

            // ==========================================
            // ACTIVITY 35: PALINDROME CHECKER
            // ==========================================
            case "palindrome": {
                const value = text("text");

                const cleaned = value
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

                if (!cleaned) {
                    throw new Error("Please enter a word or sentence.");
                }

                const reversed = Array.from(cleaned)
                    .reverse()
                    .join("");

                result = cleaned === reversed ? "Yes" : "No";
                break;
            }

            // ==========================================
            // ACTIVITY 36: VOWEL AND CONSONANT COUNTER
            // ==========================================
            case "vowelConsonant": {
                const value = text("text").toLowerCase();

                let vowels = 0;
                let consonants = 0;

                for (const character of value) {
                    if (character >= "a" && character <= "z") {
                        if ("aeiou".includes(character)) {
                            vowels++;
                        } else {
                            consonants++;
                        }
                    }
                }

                result =
                    `Vowels: ${vowels}\n` +
                    `Consonants: ${consonants}`;
                break;
            }

            // ==========================================
            // ACTIVITY 37: WORD COUNTER
            // ==========================================
            case "wordCount": {
                const value = text("text").trim();

                const count = value === ""
                    ? 0
                    : value.split(/\s+/).length;

                result = count;
                break;
            }

            // ==========================================
            // ACTIVITY 38: CAPITALIZE EACH WORD
            // ==========================================
            case "capitalizeWords": {
                const value = text("text");

                result = value.toLowerCase().replace(
                    /\b[a-z]/g,
                    (letter) => letter.toUpperCase()
                );

                break;
            }

            // ==========================================
            // ACTIVITY 39: CHARACTER FREQUENCY
            // ==========================================
            case "characterFrequency": {
                const value = text("text");

                const frequency = new Map();

                for (const character of value) {
                    frequency.set(
                        character,
                        (frequency.get(character) || 0) + 1
                    );
                }

                const entries = [];

                for (const [character, count] of frequency) {
                    const label = character === " "
                        ? "[space]"
                        : character;

                    entries.push(`${label}: ${count}`);
                }

                result = entries.join(", ");
                break;
            }

            // ==========================================
            // ACTIVITY 40: ANAGRAM CHECKER
            // ==========================================
            case "anagram": {
                const first = text("text1")
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

                const second = text("text2")
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

                if (!first || !second) {
                    throw new Error("Please enter both words.");
                }

                const sortedFirst = Array.from(first).sort().join("");
                const sortedSecond = Array.from(second).sort().join("");

                result = sortedFirst === sortedSecond ? "Yes" : "No";
                break;
            }

            // ==========================================
            // INVALID ACTIVITY
            // ==========================================
            default:
                throw new Error("Please select a valid activity.");
        }

        // Send the answer to React
        res.json({ result: String(result) });

    } catch (error) {
        // Return a readable error message to React
        res.status(400).json({
            error: error.message || "Something went wrong."
        });
    }
});

// Start the backend
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
