

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let avaliableQuestions = [];
let avaliableOptions = [];
let correctAnswers = 0;
let attempt = 0;


function setAvaliableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++) {
        avaliableQuestions.push(quiz[i])
    }
}

function getNewQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    const questionIndex = avaliableQuestions[Math.floor(Math.random() * avaliableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    const index1 = avaliableQuestions.indexOf(questionIndex);
    avaliableQuestions.splice(index1,1);
    
    const optionLen = currentQuestion.options.length
    
    for(let i=0; i<optionLen; i++){
        avaliableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;

    for(let i=0; i<optionLen; i++){
        const optonIndex = avaliableOptions[Math.floor(Math.random() * avaliableOptions.length)];
        const index2 = avaliableOptions.indexOf(optonIndex); 
        avaliableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++
}

function getResult(element){
    const id = parseInt(element.id); 
    console.log(typeof id)
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:"+correctAnswers);
    }
    else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++) {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}


function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}

//####START ####

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvaliableQuestions();
    getNewQuestion();
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
