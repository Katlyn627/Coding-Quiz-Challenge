// Created var questions for quiz
var questions = [
    {
        title: "What does HTML stand for?",
        choices: ["Hypertext Markup Language", "Hypo Text Mockup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"],
        answer: "Hypertext Markup Language"
    },
    {
        title: "A loop that never ends is referred to as a(n)_________.",
        choices: ["Infinite loop", "While loop", "For loop", "Recursive loop"],
        answer: "Infinite loop"
    },
    {
        title: "In JavaScript, what is a block of code called that is used to perform a specific task?",
        choices: ["variable", "function", "boolean", "array"],
        answer: "function"
    },
    {
        title: "_______ is the process of finding errors and fixing them within a program.",
        choices: ["compiling", "executing", "debugging", "scanning"],
        answer: "debugging"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
    {
        title: "Sal needs to execute a section of code ten times within a program. Compare the selection structures below and select which one meets the needs identified.",
        choices: ["If-Else", "For", "While", "If"],
        answer: "For"
    },
    {
        title: "Kim has just constructed her first for loop within the Java language.  Which of the following is not a required part of a for loop?",
        choices: ["Initialization", "Condition", "Variable", "Increment"],
        answer: "Variable"
    },
    {
        title: "Who created Javascript?",
        choices: ["Brendan Eich", "Bill Gates", "Tim Berners-Lee", "Dave Shea"],
        answer: "Brendan Eich"
    },

];
// Declared variables
var score = 0;
var questionIndex = 0;

// Declared variables for working code functions
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#maincontent");

// Created variables for timer function
var secondsLeft = 120;
// Hold interval for timem
var holdInterval = 0;
// Holds penalty time for incorrect questions
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");
// Declared variables
var score = 0;
var questionIndex = 0;

// Declared variables for working code functions
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#maincontent");

// Created variables for timer function
var secondsLeft = 120;
// Hold interval for timem
var holdInterval = 0;
// Holds penalty time for incorrect questions
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Created starter trigger for timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are creating if else statements for timer to function properly
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            // Decrement timer by seconds
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            // Shows current time counting down by 1 second
            // Create if statement for when time runs out.
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    // Renders questions index function
    render(questionIndex);
});

// Create funtion to render questions and choices with variables above: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all questions
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New choice for each question
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
