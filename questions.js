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
        title: "A tool used during the debugging process for printing content to the console is called:",
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
var wrapper = document.querySelector("#wrapper");

// Created variables for timer function
var secondsLeft = 120;
// Hold interval for time
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
// Create function to compare choices with correct answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition will increment score
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Else statement to deduct -10 seconds off secondsLeft for wrong answers and gives wrong answer statement below
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on to determine end of quiz (reaching last question)
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done function will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// Create quiz end fuction and append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Create heading for end of quiz page:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Create paragraph 
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining to determine final score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }
    // Create element label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // Create input element
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // Create submit element/button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);
    // Added event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.search(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}