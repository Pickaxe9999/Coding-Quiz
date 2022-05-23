//global variables
var indexCards = document.getElementById("cards").children; 
var quiz = document.getElementById("cards"); 
//https://stackoverflow.com/questions/2617629/how-to-get-all-elements-inside-div-that-starts-with-a-known-text
//used stackoverflow question to figure out how to select all children elements of a parent

//keep track of the current card
var currentCard = 0;







//assign every child element within the indexCards a new data-card-index variable
for(var i = 0; i < indexCards.length; i++){
    var card = indexCards[i];
    card.setAttribute("data-card-index", i);
}

//when the user selects the next button then it goes to the next index in the quiz
var nextIndex = function(event){
    //select the target clicked and its parent element
    var targetEl = event.target;
    var parentTargetEl = event.target.parentElement;

    //if the target clicked it the next button then it moves on to the next index
    if(targetEl.matches(".next-index")){
        currentCard = parentTargetEl.getAttribute("data-card-index");
        indexCards[currentCard].style.display = "none";
        currentCard++;
        indexCards[currentCard].style.display = "block";
    }
    //if the restart button is selected than the index is set back to 0
    else if(targetEl.matches(".restart-quiz")){
        currentCard = parentTargetEl.getAttribute("data-card-index");
        indexCards[currentCard].style.display = "none";
        currentCard = 0;
        indexCards[currentCard].style.display = "block";
    }
    
    
}

var beginQuiz = function(){
    for(var i = 0; i < indexCards.length; i++){
        indexCards[i].style.display = "none";
    }
    indexCards[0].style.display = "block";
}


//start the quiz
beginQuiz();

//listen for the button push to display the next card
quiz.addEventListener("click", nextIndex);