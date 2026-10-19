
import React, { useState } from "react";
import "./App.css";

const activities = [
    { id: "greeting", name: "1. Greeting App", fields: [["name", "Your Name", "text"]] },
    { id: "sum", name: "2. Sum of Two Numbers", fields: [["num1", "First Number"], ["num2", "Second Number"]] },
    { id: "rectangle", name: "3. Area of Rectangle", fields: [["length", "Length"], ["width", "Width"]] },
    { id: "circle", name: "4. Area and Circumference of Circle", fields: [["radius", "Radius"]] },
    { id: "temperature", name: "5. Celsius to Fahrenheit", fields: [["celsius", "Temperature in Celsius"]] },
    { id: "swap", name: "6. Swap Two Variables", fields: [["a", "First Value (A)"], ["b", "Second Value (B)"]] },
    { id: "average", name: "7. Average of Three Grades", fields: [["grade1", "First Grade"], ["grade2", "Second Grade"], ["grade3", "Third Grade"]] },
    { id: "seconds", name: "8. Seconds Converter", fields: [["seconds", "Total Seconds"]] },
    { id: "change", name: "9. Change Counter", fields: [["amount", "Amount in Pesos"]] },
    { id: "interest", name: "10. Simple Interest Calculator", fields: [["principal", "Principal Amount"], ["rate", "Annual Interest Rate (%)"], ["time", "Time (Years)"]] },
    { id: "evenOdd", name: "11. Even or Odd", fields: [["number", "Enter Number"]] },
    { id: "numberSign", name: "12. Positive, Negative, or Zero", fields: [["number", "Enter Number"]] },
    { id: "largestTwo", name: "13. Largest of Two Numbers", fields: [["num1", "First Number"], ["num2", "Second Number"]] },
    { id: "largestThree", name: "14. Largest of Three Numbers", fields: [["num1", "First Number"], ["num2", "Second Number"], ["num3", "Third Number"]] },
    { id: "leapYear", name: "15. Leap Year Checker", fields: [["year", "Enter Year"]] },
    { id: "passFail", name: "16. Pass or Fail", fields: [["grade", "Enter Grade"]] },
    { id: "gradeCategory", name: "17. Grade Category", fields: [["grade", "Enter Grade"]] },
    { id: "calculator", name: "18. Basic Calculator", fields: [["num1", "First Number"], ["operator", "Operator (+, -, *, /)", "text"], ["num2", "Second Number"]] },
    { id: "triangleType", name: "19. Triangle Type", fields: [["a", "Side A"], ["b", "Side B"], ["c", "Side C"]] },
    { id: "daysInMonth", name: "20. Days in a Month", fields: [["month", "Month (1-12)"], ["year", "Year"]] },
    { id: "countToN", name: "21. Count from 1 to N", fields: [["n", "Enter N"]] },
    { id: "sumToN", name: "22. Sum from 1 to N", fields: [["n", "Enter N"]] },
    { id: "multiplicationTable", name: "23. Multiplication Table", fields: [["number", "Enter Number"]] },
    { id: "evenNumbers", name: "24. Even Numbers up to N", fields: [["n", "Enter N"]] },
    { id: "factorial", name: "25. Factorial", fields: [["n", "Enter Non-negative Integer"]] },
    { id: "power", name: "26. Power Calculator", fields: [["base", "Base"], ["exponent", "Exponent"]] },
    { id: "digitSum", name: "27. Sum of Digits", fields: [["number", "Enter Number"]] },
    { id: "reverseNumber", name: "28. Reverse a Number", fields: [["number", "Enter Number"]] },
    { id: "countDigits", name: "29. Count Digits", fields: [["number", "Enter Number"]] },
    { id: "fibonacci", name: "30. Fibonacci Series", fields: [["n", "Number of Terms"]] },
    { id: "rightTriangle", name: "31. Right Triangle Pattern", fields: [["n", "Number of Rows"]] },
    { id: "pyramid", name: "32. Pyramid Pattern", fields: [["n", "Number of Rows"]] },
    { id: "stringLength", name: "33. String Length", fields: [["text", "Enter Text", "text"]] },
    { id: "reverseString", name: "34. Reverse a String", fields: [["text", "Enter Text", "text"]] },
    { id: "palindrome", name: "35. Palindrome Checker", fields: [["text", "Enter Text", "text"]] },
    { id: "vowelConsonant", name: "36. Vowel and Consonant Counter", fields: [["text", "Enter Text", "text"]] },
    { id: "wordCount", name: "37. Word Counter", fields: [["text", "Enter Sentence", "text"]] },
    { id: "capitalizeWords", name: "38. Capitalize Each Word", fields: [["text", "Enter Sentence", "text"]] },
    { id: "characterFrequency", name: "39. Character Frequency", fields: [["text", "Enter Text", "text"]] },
    { id: "anagram", name: "40. Anagram Checker", fields: [["text1", "First Word or Phrase", "text"], ["text2", "Second Word or Phrase", "text"]] }
];

function App() {
    const [activity, setActivity] = useState("greeting");
    const [values, setValues] = useState({});
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const selected = activities.find((item) => item.id === activity);

    function changeActivity(event) {
        setActivity(event.target.value);
        setValues({});
        setResult("");
        setError("");
    }

    function updateValue(key, value) {
        setValues((previous) => ({
            ...previous,
            [key]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setResult("");
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:3000/api/calculate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ activity, values })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Calculation failed.");
            }

            setResult(
                typeof data.result === "string"
                    ? data.result
                    : JSON.stringify(data.result, null, 2)
            );
        } catch (err) {
            setError(
                err.message || "Cannot connect to the server."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container">
            <section className="card">
                <h1>Basic Programming </h1>
                <p className="subtitle">
                    
                </p>

                <label htmlFor="activity">Choose an Activity</label>
                <select
                    id="activity"
                    value={activity}
                    onChange={changeActivity}
                >
                    {activities.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <h2>{selected.name}</h2>

                <form onSubmit={handleSubmit}>
                    {selected.fields.map(([key, label, type]) => (
                        <div className="form-group" key={key}>
                            <label htmlFor={key}>{label}</label>
                            <input
                                id={key}
                                type={type || "number"}
                                step={type === "text" ? undefined : "any"}
                                value={values[key] ?? ""}
                                onChange={(event) =>
                                    updateValue(key, event.target.value)
                                }
                                placeholder={`Enter ${label.toLowerCase()}`}
                                required
                            />
                        </div>
                    ))}

                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Run "}
                    </button>
                </form>

                {result !== "" && (
                    <div className="result">
                        <h3>Result</h3>
                        <pre>{result}</pre>
                    </div>
                )}

                {error && (
                    <p className="error">{error}</p>
                )}
            </section>
        </main>
    );
}

export default App;
