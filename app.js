let gameSeq= [];
let userSeq= [];

let btns= ["yellow","red" ,"purple","green"];
let started = false;
let level= 0;
let acceptingInput = false;

h2 = document.querySelector("h2");
h2.innerText = "Tap to Start";

h2.addEventListener("click", function () {
    if (started) return;

    started = true;
    h2.style.pointerEvents = "none"; // 🔥 THIS IS THE FIX
    levelUp();
});


function gameflash(btn){
    btn.classList.add("flash")
    setTimeout(function (){
        btn.classList.remove("flash");
    },250)
}

function userflash(btn){
    btn.classList.add("userflash")
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250)
}

function levelUp(){
    userSeq = [];
    acceptingInput = false;

    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    setTimeout(() => {
        gameflash(randBtn);
        acceptingInput = true; // 🔥 now user can tap
    }, 500);
}



function checkAns(idx){
    // console.log("current level: ",level);
   
    if (userSeq[idx]=== gameSeq[idx]){
      if(userSeq.length== gameSeq.length){
        setTimeout(levelUp,1000);
      }
    } else {
    let finalScore = level;

    document.body.style.backgroundColor = "red";
    setTimeout(function(){
        document.body.style.backgroundColor = "beige";
    },150);

    reset();

    h2.innerHTML = `Game Over! <br> Your Score: <b>${finalScore}</b> <br> Tap here to start again.`;
}
}


function btnPress(){
    if (!acceptingInput) return; // 🔥 block accidental taps

    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns){
btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];

    h2.style.pointerEvents = "auto"; // 🔥 re-enable touch
    h2.innerText = `your score is ${level} press here to start again.`;
}
