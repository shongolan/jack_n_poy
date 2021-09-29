let n = document.getElementById("name")
let homePage = document.getElementById("homePage");
let gamePage = document.getElementById("gamePage");
let winnerPage = document.getElementById("winnerPage");
let w = document.getElementById("w")
let limit = 3
let player1 = false
let ai = false
let aipoints = 0
 let playerpoints = 0
 let displaypoints = document.getElementById("points")
var poisons = document.getElementById("poisons");
var btns = poisons.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
function play_now() {
    if(n.value.length == 0){
        alert("please enter your Name")
        return
    }
    else{
        pick_poison()
    }
}
function play_again() {
    if(player1 || ai){
        w.innerHTML = ""
        aipoints = 0 
        playerpoints = 0
        displaypoints.innerHTML= `${n.value}: ${playerpoints}pts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Computer: ${aipoints}pts`
        player1 = false
        ai = false
    }
  pick_poison();
}
function pick_poison() {
    displaypoints.innerHTML= `${n.value}: ${playerpoints}pts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Computer: ${aipoints}pts`
 gamePage.style.display = "block";
 homePage.style.display = "none";
 winnerPage.style.display = "none";
 timer();
}
function timer() {
 let time = 3;
 let t = setInterval(function() {
  time -= 1;
  if(time < 0){
   clearInterval(t)
   userPick = userChoice();
   aiPick = aiChoice();
   whosWinner(userPick, aiPick)
   winnerPage.style.display = "block";
   gamePage.style.display = "none";
   homePage.style.display = "none";
   document.getElementById("countdown").innerHTML = '3';
  } else {
   document.getElementById("countdown").innerHTML = time;
  }
 }, 1000);
}
function userChoice() {
 if ($(".rock").hasClass("active")){
  document.getElementById("user").innerHTML = '✊';
  return 'r'
 }
 if ($(".paper").hasClass("active")){
  document.getElementById("user").innerHTML = '✋';
  return 'p'
 }
 if ($(".scissor").hasClass("active")){
  document.getElementById("user").innerHTML = '✌';
  return 's'
 } 
}
function aiChoice() {
 let aiList = ['r', 'p', 's']
 aiPick = aiList[Math.floor((Math.random()*aiList.length))];
 if (aiPick == 'r') {document.getElementById("comp").innerHTML = '✊';}
 if (aiPick == 'p') { document.getElementById("comp").innerHTML = '✋';}
 if (aiPick == 's') {document.getElementById("comp").innerHTML = '✌';}
 return aiPick
};
function whosWinner(userPick, aiPick) {
 if (userPick == aiPick) {
  tiePoints();
  tie()
 } else if (userPick == 'r') {
  if (aiPick == 'p') {
   deductPoints();
   lose()
  } else {
   addPoints();
   win()
  }
 } else if (userPick == 'p') {
  if (aiPick == 's') {
   deductPoints();
   lose()
  } else {
   addPoints();
   win()
  }
 } else if (userPick == 's') {
  if (aiPick == 'r') {
   deductPoints();
   lose()
  } else {
   addPoints();
   win()
  }
 }
};

let displayResult = document.getElementById("result");

function tie() {displayResult.innerHTML = 'Its a Tie 💪';}
function win() {displayResult.innerHTML = 'You Win! 🎉';}
function lose() {displayResult.innerHTML = 'You Lose! 😭';}
let u = document.getElementById("u");//user side
let c = document.getElementById("c");//AI side
function addPoints() {
    playerpoints++
    displaypoints.innerHTML= `${n.value}: ${playerpoints}pts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Computer: ${aipoints}pts`
    if(playerpoints == limit){
        w.innerHTML="Playerwin🥳"
        player1 = true
        winnerPage.style.display = "none";
        gamePage.style.display = "none";
        homePage.style.display = "block";
    }
 c.classList.remove("winner");
}
function deductPoints() {
    aipoints++
    displaypoints.innerHTML= `${n.value}: ${playerpoints}pts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Computer: ${aipoints}pts`
    if(aipoints == limit){
        w.innerHTML="Computerwin🥳"
        ai = true
        winnerPage.style.display = "none";
        gamePage.style.display = "none";
        homePage.style.display = "block";
    } 
 $(".comp").addClass(" winner");
 u.classList.remove("winner");
}
function tiePoints() {
 u.classList.remove("winner");
 c.classList.remove("winner");
}