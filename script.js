// Timer var
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;

// Var for buttons
const start = document.querySelector("#start");

// Start var
const codersIntro = document.querySelector("#challenge-begins");

// Call end load var
var questionsEl = document.querySelector(".all-question");

// Element locations var
let questionEl = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;

// Final score var
const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// Highscore var 
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

// Call out answer class
const ansBtn = document.querySelectorAll("button.answer-btn")

// Var submit
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


// Var answer call
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");


// Array of questions
const questions = [ 
        {question: "What is the purpose of the Fetch API in JavaScript?",
        answers: ["1. to display data in an HTML document ", "2. to style HTML elements with CSS ", "3. to retrieve data from a server using HTTP requests", "4. to validate user input in a form"],
        correctAnswer: "2"
    },
        {question: "What is a variable in JavaScript?",
        answers: ["1. A type of HTML element", "2. A library of pre-built code snippets", "3. A function used for server-side processing", "4. A named container for storing data values"],
        correctAnswer: "3"
    },
        {question: "How do you write an IF statement in JavaScript?",
        answers: ["1. if i == 5 then", "2. if (i == 5) ", "3. if i = 5 then", "4. if i = 5"],
        correctAnswer: "2"
    },
        {question: "What is an API?",
        answers: ["1. A library of pre-built CSS styles", "2. A set of rules and protocols that allow different software applications to communicate with each other", "3. A method for storing data on the client-side", "4. A tool for managing server-side databases"],
        correctAnswer: "1"
    },
        {question: "What is the box model in CSS?",
        answers: ["1.  A model for creating 3D animations in web pages", "2.  A layout model for creating responsive web designs", "3. A layout model for representing HTML elements as a rectangular box", "A model for creating dynamic user interfaces in web applications"],
        correctAnswer: "2"
    }
];

// Timer function Starts
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// Quiz begins Function
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Set Question Function
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// EVENT FUNCTION CHECK ANSWERS BEGING PROCESS
function checkAnswer(event) {
    event.preventDefault();

    //CREATING ELEMENT OF RIGHT OR WRONG
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // DISPLAY NEW ELEMENT FOR X AMOUNR OF TIME
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // RIGHT OR WRONG ANSWER CONDITIONAL STATEMENTS CORRECT
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // RIGHT OR WRONG ANSWER CONDITIONAL STATEMENTS WRONG
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // CYCLE 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // High score list sort
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // Storing score
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {

    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// Clear score
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

clearScrBtn.addEventListener("click", clearScores);

// Start timer and display first question when click start quiz
start.addEventListener("click", startQuiz);

// Check answer listener event
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Adding a score event
submitScrBtn.addEventListener("click", addScore);

// Go back listener event function
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

// High Score Button Alert
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Take the quiz");
    }
});