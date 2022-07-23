let params = new URLSearchParams(location.search);
let isOver = false;
let score = 0;
var idgame = params.get('id');

//function to show games by id
function gameConfig(){
    if (idgame == "game_1"){
        document.getElementById('board').innerHTML = '' +
            '<div class="over"></div>' +
            '<div class="line"></div>' +
            '<div class="side"></div>' +
            '<div class="track"></div>'+
            '<div class="side"></div>' +
            '<div class="line"></div>' +
            '<div class="over"></div>' +
            '<div id="score"></div>'+
            '<div class="player" id="player"></div>'+
            '<div class="rival" id="rival"></div>'+
            '<div id="gameOver"><div id="title">Game Over</div><p>Press Button <b>A</b> to Try Again</p></div>';

            player.style.background = "url('./assets/game1/player.png')";
            rival.style.background = "url('./assets/game1/rival.png')";
    }

    if(idgame == "game_2"){
        document.getElementById('board').innerHTML ='<div id="score"></div>'+
        '<div class="player" id="player"></div>'+
        '<div class="asteroid" id="asteroid"></div>'+
        '<div id="gameOver"><div id="title">Game Over</div><p>Press Button <b>A</b> to Try Again</p></div>';

        asteroid.style.background = "url('./assets/game2/rival.gif') no-repeat"
        player.style.background = "url('./assets/game2/player.gif') no-repeat";
        board.style.background = "url('./assets/game2/background.png')";
    }
    
    document.getElementById("score").innerHTML = `Score: ${score}`;
}

//Game 1: function to generate foe cars
function generate(){
    if (idgame == "game_1"){
        var generate = setInterval(()=>{
            var rival = document.createElement("div");
            if(isOver == false){
                rival.classList.add("rival");
        
                rival.style.top = Math.floor(Math.random()*150) + "px"
                board.appendChild(rival);
                rival.style.background = "url('./assets/game1/rival.png')";
            }
        }, 4000);
    }
}

//Game 2: function to generate asteroids
function generateRocks(){
    if(idgame == "game_2"){
        var generaterocks = setInterval(() => {
            var rock = document.createElement("div");
            rock.classList.add("asteroid");
            //Just getting the left of the rock to place it in random position...
            var rockleft = parseInt(
              window.getComputedStyle(rock).getPropertyValue("left")
            );
        
            rock.style.left = Math.floor(Math.random() * 450) + "px";
            board.appendChild(rock);
            rock.style.background = "url('./assets/game2/rival.gif')";
          }, 1000);
    }
}


//Game 1: function to move enemy cars
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
                        isOver = true;
                        clearInterval(moveEnemies);
                        gameOver.style.display = "block";
                    }

            }
        }
    }, 200);
}

//Games 1 - 2: function to move up player's car/ship
function movecarUp(){
    var player = document.getElementById("player");
    var top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    if(top > -20){
        player.style.top = top - 10 + "px";
    }
}

//Games 1 - 2: function to move down player's car/ship
function movecarDown(){
    var player = document.getElementById("player");
    var top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    if(top <= 160){
        player.style.top = top + 10 + "px";
    }
}

//Game 2: function to move up player's ship
function moveshipUp(){
    var player = document.getElementById("player");
    var top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    if(top > 0){
        player.style.top = top - 10 + "px";
    }
}

//Game 2: function to move down player's ship
function moveshipDown(){
    var player = document.getElementById("player");
    var top = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    if(top <= 230){
        player.style.top = top + 10 + "px";
    }
}

//Game 2: function to move Right player's ship
function moveshipRight(){
    var player = document.getElementById("player");
    var left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    if(left <= 530){
        player.style.left = left + 10 + "px";
    }
}

//Game 2: function to move left player's ship
function moveshipLeft(){
    var player = document.getElementById("player");
    var left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    if(left > 0){
        player.style.left = left - 10 + "px";
    }
}

//Game 2: function to drop down asteroid from sky
function moveAsteroid(){
    var moveEnemies = setInterval(()=>{
        var enemies = document.getElementsByClassName("asteroid");
    
        if(enemies != undefined){
            for (var i = 0; i < enemies.length; i++){
                var enemy = enemies[i]; //getting each enemies
                var enemyTop = parseInt(
                    window.getComputedStyle(enemy).getPropertyValue("top")
                );
                if (enemyTop > 220){
                    enemy.parentElement.removeChild(enemy); 
                    isOver = true;
                    clearInterval(moveEnemies);
                    gameOver.style.display = "block";
                }
                enemy.style.top = enemyTop + 20 + "px";
            }
        }
    }, 500);
}

function shoot(){
    var left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
        var rocks =  document.getElementsByClassName("asteroid");
  
        for (var i = 0; i < rocks.length; i++) {
          var rock = rocks[i];
          if (rock != undefined) {
            var rockbound = rock.getBoundingClientRect();
            var bulletbound = bullet.getBoundingClientRect();
            console.log("left = " + bulletbound.left + "Down = " + bulletbound.bottom);
            //Condition to check whether the player's car and the other car are at the same position
            if  ( 
                    (bulletbound.left >= rockbound.left) && (bulletbound.top <= rockbound.top)
                )
                {
                    console.log("Hit");
                    rock.parentElement.removeChild(rock); //Just removing that particular rock;
                }
          }
        }
        var bulletbottom = parseInt(
          window.getComputedStyle(bullet).getPropertyValue("bottom")
        );
  
        //Stops the bullet from moving outside the gamebox
        if (bulletbottom >= 400) {
          clearInterval(movebullet);
        }
        bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
        bullet.style.bottom = bulletbottom + 3 + "px";
      });

}

//Button Up actions
function pressUp(){
    if (idgame == "game_1" && isOver == false){
        movecarUp();
    }

    if (idgame == "game_2" && isOver == false){
        moveshipUp();
    }
}

//Button Down actions
function pressDown(){
    if (idgame == "game_1" && isOver == false){
        movecarDown();
    }

    if (idgame == "game_2" && isOver == false){
        moveshipDown();
    }
}

//Button Left actions
function pressLeft(){
    if (idgame == "game_2" && isOver == false){
        moveshipLeft();
    }
}

//Button Right actions
function pressRight(){
    if (idgame == "game_2" && isOver == false){
        moveshipRight();
    }
}

//Button A actions
function pressA(){
    if ((idgame == "game_1" || "game_2") && isOver == true){
        //restart game
        window.location.reload();
    }
}

function pressB(){
    if ((idgame == "game_2") && isOver == false){
        shoot();
    }   
}

//Keyboard buttons
window.addEventListener("keydown", (e) => {
    //Up - Down
    if (e.key == "ArrowUp") {
        pressUp();
    }
    else if (e.key == "ArrowDown") {
        pressDown();
    }

    // Left - Right
    if (e.key == "ArrowLeft") {
        pressLeft();
    }
    else if (e.key == "ArrowRight") {
        pressRight();
    }
    
    //A button -> Z in keyboard
    if( e.key == "z" || e.key == "Z"){
        pressA();
    }

    //B button -> X in keyboard
    if( e.key == "x" || e.key == "X"){
        pressB();
    }

    if((e.code == "Space" || e.key == " ") && isOver == true){
        //restart game
        window.location.reload();
    }
});

gameConfig();

generate();
generateRocks();

moverivalcar();
moveAsteroid();