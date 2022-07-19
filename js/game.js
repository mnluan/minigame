let params = new URLSearchParams(location.search);
let isOver = false;
let score = 0;
var idgame = params.get('id');

//function to show games by id
function gameConfig(){
    if (idgame != "" && idgame == "game_1"){
        document.getElementById('board').innerHTML = '' +
            '<div class="over"></div>' +
            '<div class="line"></div>' +
            '<div class="side"></div>' +
            '<div class="track"></div>'+
            '<div class="side"></div>' +
            '<div class="line"></div>' +
            '<div class="over"></div>' +
            '<div id="score"></div>'+
            '<div id="hscore"></div>'+
            '<div class="player" id="player"></div>'+
            '<div class="rival" id="rival"></div>'+
            '<div id="gameOver"><div id="title">Game Over</div><p>Press Button <b>A</b> to Try Again</p></div>';
    }
    document.getElementById("score").innerHTML = `Score: ${score}`;
}

//Game 1: function to generate foe cars
function generate(){
    var generate = setInterval(()=>{
        var rival = document.createElement("div");
        if(isOver == false){
            rival.classList.add("rival");
    
            //generate value between rival position to 100px in top
            rival.style.top = Math.floor(Math.random()*150) + "px"
        
            board.appendChild(rival);
        }
    }, 3000);
}

//Game 1: function to move foe cars
function moverivalcar(){
    var moveEnemies = setInterval(()=>{
        var enemies = document.getElementsByClassName("rival");
    
        if(enemies != undefined){
            for (var i = 0; i < enemies.length; i++){
                var enemy = enemies[i]; //getting each enemies
                var enemyLeft = parseInt(
                    window.getComputedStyle(enemy).getPropertyValue("left")
                );
                if (enemyLeft < -210){
                    enemy.parentElement.removeChild(enemy); 
                    score++;
                    document.getElementById("score").innerHTML = `Score: ${score}`;
                }
                enemy.style.left = enemyLeft + -20 + "px";

                //check if the car hits others
                var enemybound = enemy.getBoundingClientRect();
                var playerbound = player.getBoundingClientRect();
                var playertop = (playerbound.top + 60);
                var playerbottom = (playerbound.bottom - 60);
                //Condition to check whether the player's car and the other car are at the same position
                if  ( 
                        ((playerbound.right >= enemybound.left) && (playerbound.left <= enemybound.right)) &&
                        ((playertop >= enemybound.top) && (playerbottom <= enemybound.bottom))
                    )
                    {
                        //Game 1 - GameOver
                        isOver = true;
                        clearInterval(moveEnemies);
                        gameOver.style.display = "block";
                    }

            }
        }
    }, 200);
}

//Game 1: function to move up player car
function movecarUp(){
    var player = document.getElementById("player");
    var top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    if(top > -20){
        player.style.top = top - 10 + "px";
    }
}

//Game 1: function to move down player car
function movecarDown(){
    var player = document.getElementById("player");
    var top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    if(top <= 160){
        player.style.top = top + 10 + "px";
    }
}

//Button Up actions
function pressUp(){
    if (idgame != "" && idgame == "game_1"){
        movecarUp();
    }
}

//Button Down actions
function pressDown(){
    if (idgame != "" && idgame == "game_1"){
        movecarDown();
    }
}

//Button A actions
function pressA(){
    if (idgame == "game_1" && isOver == true){
        //restart game
        window.location.reload();
    }
}

//Keyboard buttons
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp") {
        pressUp();
    }
    else if (e.key == "ArrowDown") {
        pressDown();
    }
    if((e.code == "Space" || e.key == " ") && isOver == true){
        //restart game
        window.location.reload();
    }
});

gameConfig();
generate();
moverivalcar();