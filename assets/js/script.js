//global variables

var indexCards = document.getElementById("cards").children; //create an array by selecting each direct child element within the class cards element
var quiz = document.getElementById("cards");
//https://stackoverflow.com/questions/2617629/how-to-get-all-elements-inside-div-that-starts-with-a-known-text
//used stackoverflow question to figure out how to select all children elements of a parent
var timerEl = document.getElementById("timer");
var submitName = document.getElementById("highscore-name");
var highscoreTable = document.getElementById("highscores");

//keep track of the current card
var currentCard = 0;

//array of local highscores
var allHighscores = [];

//quiz total time length
var totalTime = 75;
//the time that will actually be displayed
var timer = totalTime;





//assign every child element within the indexCards a new data-card-index variable
for(var i = 0; i < indexCards.length; i++){
    var card = indexCards[i];
    card.setAttribute("data-card-index", i);
}

//begin the quiz
var beginQuiz = function(){
    //make all cards invisible but the start
    for(var i = 0; i < indexCards.length; i++){
        indexCards[i].style.display = "none";
    }
    indexCards[0].style.display = "block";
}

var restartQuiz = function(event){
    var parentTargetEl = event.target.parentElement;

    //jump back to begining of cards
    currentCard = parentTargetEl.getAttribute("data-card-index");
    indexCards[currentCard].style.display = "none";
    currentCard = 0;
    indexCards[currentCard].style.display = "block";

    //reset the timer back to how it originally was
    timerEl.textContent = "Time Left: ";
}

//determine which function should be ran depending on the button clicked
var btnHandler = function(event){
    var btnEl = event.target;
    if(btnEl.matches("#next-index")){
        nextIndex(event);
    }else if(btnEl.matches("#start-quiz")){
        startTimer();
        nextIndex(event);
    }else if(btnEl.matches("#restart-quiz")){
        restartQuiz(event);
    }else if(btnEl.matches("#save-highscore")){
        //check if the user actually input anything for a username
        if(submitName.value === ""){
            alert("Please enter a name to save your score!");
        }else{
            creatHighscore();
            nextIndex(event);
        }
    }else if(btnEl.matches("#clear-highscores")){
        resetHighscores();
    }
}

//when the user selects the next button then it goes to the next index in the quiz
var nextIndex = function(event){
    var parentTargetEl = event.target.parentElement;
    //if the target clicked it the next button then it moves on to the next index
    currentCard = parentTargetEl.getAttribute("data-card-index");
    indexCards[currentCard].style.display = "none";
    currentCard++;
    indexCards[currentCard].style.display = "block";
}


var startTimer = function(){
    var textHold = timerEl.textContent;

    //start the timer once the start quiz button is clicked
    var updateTime = setInterval(function() {

        //if the timer variable is more than one second
        if(timer > 0){

            //if on a question deduct time else reset the timer and stop the countdown  
            if(indexCards[currentCard].matches(".question")){
                timerEl.textContent = textHold + timer;
                timer--;
            }else{
                timer = totalTime;
                clearInterval(updateTime);
            }
            
        //if they are out of time display that they are and reset timer and set score to 0
        }else if(timer === 0){
            timerEl.textContent = "Out of Time! No Score";
            timer = totalTime;
            score = 0;
            clearInterval(updateTime);
        }
    }, 1000);
}

//print the current highscore table table
var creatHighscore = function(savedData){
    if(!savedData){
        var player = {
            name: submitName.value,
            score: timer
        }
    }else{
        var player = {
            name: savedData.name,
            score: savedData.score
        }
    }
    
    //add the new player to the array
    allHighscores.push(player);

    //print the array to the highscore screen
    printHighscore(allHighscores[allHighscores.length-1]);

    //save the highscores locally
    saveHighscore();
}

//save the highscore locally
var saveHighscore = function(){
    localStorage.setItem("highscoreTable", JSON.stringify(allHighscores));
}

//load locally saved highscores
var getHighscore = function(){
    var savedData = localStorage.getItem("highscoreTable");
    savedData = JSON.parse(savedData);

    if(savedData === null){
        return false;
    }

    for(var i = 0; i < savedData.length; i++){
        creatHighscore(savedData[i]);
    }
}

var printHighscore = function(allHighscoresObj){
    var listItemEl = document.createElement("li");
    listItemEl.textContent = allHighscoresObj.name + " - " + allHighscoresObj.score;
    highscoreTable.appendChild(listItemEl);
}

//reset highscores
var resetHighscores = function(){
    allHighscores = [];
    localStorage.clear();
}


//start the quiz
beginQuiz();


//listen for the button push to display the next card
quiz.addEventListener("click", btnHandler);
getHighscore();