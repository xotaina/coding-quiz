// Quiz questions and answers
const quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    correctAnswer: 2,
  },
  {
    question: "The condition in an if/else statement is enclosed within _______.",
    answers: ["1. Quotes", "2. Curly Brackets", "3. Parenthesis", "4. Square Brackets"],
    correctAnswer: 3,
  },
  {
    question: "Arrays in JavaScript can be used to store _______.",
    answers: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the above"],
    correctAnswer: 3,
  },
  {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answers: ["1. Commas", "2. Quotes", "3. Curly Brackets", "4. Parenthesis"],
    correctAnswer: 1,
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["1. console.log", "2. For Loops", "3. Terminal/Bash", "4. JavaScript"],
    correctAnswer: 0,
  },
];

// Quiz state variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 75;
let timerInterval;

// Start the quiz
function startQuiz() {
  document.getElementById("main").style.display = "none";
  document.getElementById("question-1").style.display = "block";
  startTimer();
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Check the selected answer
function checkAnswer(e) {
  const selectedAnswer = e.target.textContent;
  const question = quizQuestions[currentQuestion];

  if (selectedAnswer === question.answers[question.correctAnswer]) {
    score++;
    showResult(true);
  } else {
    showResult(false);
    timeLeft -= 10;
  }

  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion(currentQuestion);
  } else {
    clearInterval(timerInterval);
    endQuiz();
  }
}

// Show the result of the answer (right or wrong)
function showResult(isCorrect) {
  const resultElement = isCorrect ? "result-right" : "result-wrong";
  document.getElementById(resultElement).style.display = "block";

  setTimeout(function () {
    document.getElementById(resultElement).style.display = "none";
  }, 1000);
}

// Show the current question
function showQuestion(index) {
  const questionElement = document.getElementById(`question-${index + 1}`);
  questionElement.style.display = "block";

  const question = quizQuestions[index];
  questionElement.querySelector("h2").textContent = question.question;

  const buttons = questionElement.querySelectorAll("button");
  buttons.forEach(function (button, i) {
    button.textContent = question.answers[i];
  });
}

// End the quiz and show the final score
function endQuiz() {
  document.getElementById("timer").style.display = "none";
  document.getElementById("end-quiz").style.display = "block";
  document.getElementById("final-score").textContent = `Your final score is ${score}.`;
}

// Initialize the quiz
function initQuiz() {
  document.getElementById("start").addEventListener("click", startQuiz);
  quizQuestions.forEach((_, index) => {
    const questionElement = document.getElementById(`question-${index + 1}`);
    const buttons = questionElement.querySelectorAll("button");
    buttons.forEach(function (button) {
      button.addEventListener("click", checkAnswer);
    });
  });
}

// Initialize the quiz on page load
window.addEventListener("load", initQuiz);

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  var initials = document.getElementById("initials").value;
  var score = document.getElementById("final-score").textContent;
  var scoreList = document.getElementById("score-list");
  var scoreListItem = document.createElement("li");
  scoreListItem.textContent = initials + " - " + score;
  scoreList.appendChild(scoreListItem);
  document.getElementById("end-quiz").style.display = "none";
  document.getElementById("high-scores").style.display = "block";
});