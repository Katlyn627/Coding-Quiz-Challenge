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
        choices: ["Compiling", "Executing", "Debugging", "Scanning"],
        answer: "Debugging"
    },
    {
        title: "A tool used during the debugging process for printing content to the console is called:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
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
    // Renders questions in index function
    render(questionIndex);
});

function render(questionIndex) {
    // Clears  all existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // Loop through array of questions
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
// Function to create event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Created label element
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // Created input element
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // Created submit element
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Created event listener to capture initials and score and save to local storage 
    createSubmit.addEventListener("click", function () {
        // debugger
        var initials = createInput.value;
        console.log(initials);
        if (initials === "") {
            createInput.style.borderColor = "red";
            console.log("No??value??entered!");

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
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Create window location to go to Highscores page
            window.location.replace("HighScores.html");
        }
    });

}
