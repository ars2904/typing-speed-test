# 🧠 Typing Speed Test Web App

A modern and responsive **Typing Speed Test** built using **HTML, CSS, JavaScript, and JSON**.

This application allows users to test their typing speed based on difficulty level and selected time mode, while providing real-time feedback and performance statistics.

---

## 🚀 Features

* 🎯 Multiple Difficulty Levels (Easy / Medium / Hard)
* ⏱ Multiple Time Modes (30s / 60s / 90s)
* 📚 Dynamic passages loaded from `data.json`
* ⚡ Real-time character highlighting (Correct / Incorrect)
* 📊 Live statistics:

  * Words Per Minute (WPM)
  * Accuracy %
  * Time Remaining
* 🔁 Restart functionality
* 🎨 Modern glassmorphism UI
* 📱 Fully responsive design

---

## 🛠 Tech Stack

* **HTML5**
* **CSS3**
* **Vanilla JavaScript**
* **JSON (for storing typing passages)**

---

## 📂 Project Structure

```
typing-speed-test/
│
├── index.html
├── style.css
├── script.js
├── data.json        <-- Stores passages by difficulty
└── README.md
```

---

## 📄 About data.json

The `data.json` file stores typing passages categorized by difficulty level.

Example structure:

```json
{
  "easy": [
    "Typing is a useful skill that improves productivity.",
    "Practice every day to increase your speed."
  ],
  "medium": [
    "JavaScript enables dynamic web development and interactive applications."
  ],
  "hard": [
    "Consistency and deliberate practice are the foundations of mastery in any skill."
  ]
}
```

This allows:

* Easy addition of new passages
* Clean separation between data and logic
* Better scalability

---

## 🎮 How It Works

1. User selects:

   * Difficulty
   * Time duration
2. A random passage is loaded from `data.json`.
3. User types the passage.
4. The app:

   * Highlights correct letters in green
   * Highlights incorrect letters in red
   * Shows current cursor position
5. When time ends:

   * WPM is calculated
   * Accuracy is calculated
   * Final results are displayed

---

## 🧮 WPM Formula

```
WPM = (Total Characters Typed / 5) / Time in Minutes
```

Accuracy Formula:

```
Accuracy = (Correct Characters / Total Characters Typed) × 100
```

---

## 📱 Responsive Design

The application works seamlessly on:

* Desktop
* Tablet
* Mobile

Media queries ensure layout adaptability.

---

## 🔧 How to Run Locally

1. Clone the repository:

```
git clone https://github.com/ars2904/typing-speed-test.git
```

2. Open the project folder.
3. Run using a Live Server (recommended).

⚠ Important: Since the app fetches `data.json`, open it using Live Server or a local development server. Opening directly via file path may cause CORS errors.

---

## 🌟 Future Improvements

* 🏆 High Score System (LocalStorage)
* 📊 Performance History Graph
* 🌙 Dark / Light Mode Toggle
* 🌍 Multiplayer Mode
* 🔊 Typing sound effects
* 🧠 AI-generated passages

---

## 👨‍💻 Author

**Aryan Shrivastav**

---