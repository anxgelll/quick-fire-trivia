const questions = [
  {
    text: "Who invented the World Wide Web?",
    answers: ["Tim Berners-Lee", "Bill Gates", "Linus Torvalds", "Ada Lovelace"],
    correct: 0
  },
  {
    text: "What year was the first iPhone released?",
    answers: ["2005", "2007", "2009", "2010"],
    correct: 1
  },
  {
    text: "What color do you get by mixing blue and yellow?",
    answers: ["Green", "Purple", "Orange", "Brown"],
    correct: 0
  },
  {
    text: "How many days are there in a week?",
    answers: ["5", "6", "7", "8"],   
    correct: 2
  },
  {
    text: "What planet do we live on?",
    answers: ["Mars", "Venus", "Earth", "Jupiter"],
    correct: 2
  }



];

let currentIndex = 0;
let score = 0;

















const gameTitle = document.getElementById('game-title');
const scoreDisplay = document.getElementById("score");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const questionCard = document.getElementById("question-card");
const answerList = document.getElementById("answer-list");


const nextBtn = document.getElementById("next-btn");
const endScreen = document.getElementById("end-screen");

const answerBtnsCollections = document.getElementsByClassName("answer-btn");
const answerBtnsNodeList = document.querySelectorAll(".answer-btn");

console.log("Collection", answerBtnsCollections);
console.log("NodeList", answerBtnsNodeList);

// getElementsByClassName returns an HTMLCollection.
// querySelectorAll returns a NodeList.
// To use .map() on either, convert with Array.from() (or the spread operator [...]).

gameTitle.textContent = "⚡ Quick Fire Trivia";
console.log("FIrst question:", questionText.textContent);
questionNumber.textContent = questionNumber.textContent.toUpperCase()
const firstBtn = answerBtnsNodeList[0]
const firstLi = firstBtn.parentElement
console.log("Button:", firstBtn)
console.log("Its <li>:", firstLi)
console.log("The <ul>:", firstLi.parentElement)
questionCard.classList.add("answered");
questionCard.classList.remove("answered")

function loadQuestion(index) {
const current = questions[index]

questionNumber.textContent = `Question ${index + 1} of ${questions.length}`

questionText.textContent = current.text

Array.from(answerBtnsNodeList).forEach((btn, i) => {
btn.textContent = current.answers[i]
btn.className = "answer-btn"
})

nextBtn.classList.add("hidden")

questionCard.classList.remove("answered")
}
loadQuestion(0);
answerList.addEventListener("click", (event) => {
  // ignore clicks that land on the gap, not a button
  if (event.target.tagName !== "BUTTON") return

  const clickedBtn = event.target
  const clickedIndex = Array.from(answerBtnsNodeList).indexOf(clickedBtn)
  const correctIndex = questions[currentIndex].correct

  if (clickedIndex === correctIndex) {
    clickedBtn.classList.add("correct")
    score++
    scoreDisplay.textContent = score
  } else {
    clickedBtn.classList.add("wrong")
    answerBtnsNodeList[correctIndex].classList.add("correct")
  }

  // lock in the answer — disable every button
  Array.from(answerBtnsNodeList).forEach((btn) => btn.classList.add("disabled"))

  // finish the turn: mark the card answered, reveal "Next Question"
  questionCard.classList.add("answered")
  nextBtn.classList.remove("hidden")
})

// TODO (your own words — required by the workshop):
// Why does clicking a button inside #answer-list trigger this listener?
// Answer: Clicking a button inside #answer-list triggers this listener because of event delegation. The click event bubbles up from the button to its parent elements, and since the listener is attached to #answer-list, it can catch the event when it reaches that level in the DOM. This allows us to handle clicks on any of the answer buttons without needing to attach individual listeners to each button.
//
// What is the difference between event.target and event.currentTarget here?
// event.target  →
// event.currentTarget →


// ---------- Phase 5: Next question + end screen ----------

nextBtn.addEventListener("click", () => {
  currentIndex++
  if (currentIndex < questions.length) {
    loadQuestion(currentIndex)
  } else {
    showEndScreen()
  }
})

function showEndScreen() {
  // hide the question card, reveal the end screen
  questionCard.classList.add("hidden")
  endScreen.classList.remove("hidden")

  // build the final-score heading from scratch in JavaScript
  const heading = document.createElement("h2")
  heading.textContent = `You scored ${score} out of ${questions.length}`

  // build an encouragement message based on how the player did
  const message = document.createElement("p")
  if (score === questions.length) {
    message.textContent = "Flawless! You didn't miss a single one. 🏆"
  } else if (score >= questions.length / 2) {
    message.textContent = "Solid run — you know your stuff! 👏"
  } else {
    message.textContent = "Tough round! Give it another go — you've got this. 💪"
  }

  // build the "Play Again" button
  const restartBtn = document.createElement("button")
  restartBtn.id = "restart-btn"
  restartBtn.textContent = "Play Again"

  // nothing appears on the page until appendChild puts these nodes in the tree
  endScreen.appendChild(heading)
  endScreen.appendChild(message)
  endScreen.appendChild(restartBtn)
}


// ---------- Phase 6: Restart ----------

endScreen.addEventListener("click", (event) => {
  // the restart button was created by JS, so we delegate to #end-screen
  if (event.target.id !== "restart-btn") return

  // reset game state
  score = 0
  currentIndex = 0
  scoreDisplay.textContent = score

  // clear everything showEndScreen built
  endScreen.innerHTML = ""

  // bring the question card back and hide the end screen
  endScreen.classList.add("hidden")
  questionCard.classList.remove("hidden")

  // start over at the first question
  loadQuestion(0)
})




