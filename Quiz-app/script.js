const categorySelect = document.getElementById('categorySelect');
const startQuizBtn = document.getElementById('startQuizBtn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartQuizBtn = document.getElementById('restartQuizBtn');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Sample questions data structure (this will come from the backend)
const quizData = {
    general: [
        { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Twain", "Orwell"], answer: "Shakespeare" },
        // Add more questions
    ],
    science: [
        { question: "What is H2O?", options: ["Water", "Oxygen", "Hydrogen", "Carbon"], answer: "Water" },
        // Add more questions
    ],
    math: [
        { question: "What is 2+2?", options: ["3", "4", "5", "6"], answer: "4" },
        // Add more questions
    ]
    // Add more categories
};

function startQuiz() {
    const selectedCategory = categorySelect.value;
    questions = quizData[selectedCategory];
    currentQuestionIndex = 0;
    score = 0;

    categorySelect.parentElement.style.display = 'none';
    quizContainer.style.display = 'block';

    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', selectOption);
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextQuestionBtn.style.display = 'none';
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(e) {
    const selectedButton = e.target;
    const correct = questions[currentQuestionIndex].answer;

    if (selectedButton.innerText === correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        const correctButton = Array.from(optionsContainer.children).find(button => button.innerText === correct);
        correctButton.classList.add('correct');
    }

    Array.from(optionsContainer.children).forEach(button => {
        button.removeEventListener('click', selectOption);
    });

    if (currentQuestionIndex < questions.length - 1) {
        nextQuestionBtn.style.display = 'block';
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.innerText = `${score} / ${questions.length}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function restartQuiz() {
    resultContainer.style.display = 'none';
    categorySelect.parentElement.style.display = 'block';
}

startQuizBtn.addEventListener('click', startQuiz);
nextQuestionBtn.addEventListener('click', nextQuestion);
restartQuizBtn.addEventListener('click', restartQuiz);
