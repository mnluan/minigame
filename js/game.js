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

        asteroid.style.background = "url('./assets/game2/rival.gif') no-repeat";
        player.style.background = "url('./assets/game2/player.gif') no-repeat";
        board.style.background = "url('./assets/game2/background.png')";
    }

    if(idgame == "game_3"){
        document.getElementById('board').innerHTML ='<div id="score"></div>'+
        '<div class="sea"></div>' +
        '<div class="wave" id="wave"></div>'+
        '<div class="surfer" id="surfer"></div>'+
        '<div class="shark" id="shark"></div>'+
        '<div id="gameOver"><div id="title">Game Over</div><p>Press Button <b>A</b> to Try Again</p></div>';
        
        wave.style.background = "url('./assets/game3/wave.gif') no-repeat";
        surfer.style.background = "url('./assets/game3/player.png') no-repeat";
        shark.style.background = "url('./assets/game3/shark.png') no-repeat";
        board.style.background = "orange";
    }

    if(idgame == "how_to_play"){
        document.getElementById('board').innerHTML=''+
        '<h2>Game 1:</h2>'+
        '<p>To move the car, use the ArrowUp or ArrowDown [Buttons | Keyboard]</p>'+
        '<h2>Game 2:</h2>'+
        '<p>To move the starship, use the Up, Down, Left or Right Arrows [Buttons | Keyboard]</p>'+
        '<p>To attack the asteroids, press B [Button] or Z [Keyboard]</p>'+
        '<h2>Game 3:</h2>'+
        '<p>To avoid the sharks, press A, B or ArrowUp [Buttons]<br>Or Space / ArrowUp [Keyboard]</p>'+
        '';
        document.getElementById('leftbuttons').innerHTML='';
    }
    
    document.getElementById("score").innerHTML = `Score: ${score}`;
}

//Game 1: function to generate foe cars
function generateCars(){
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

//Game2: function to destroy asteroids
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
            //Condition to check whether the player's car and the other car are at the same position
            if( (bulletbound.top >= rockbound.bottom) && (bulletbound.left >= rockbound.left) && (rockbound.right >= (bulletbound.left + 50)) ) {
                rock.parentElement.removeChild(rock); //Just removing that particular rock;
                
                //Score Here!
                score++;
                document.getElementById("score").innerHTML = `Score: ${score}`;
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

//Game3 Function to move shark
function moveShark(){
    var moveEnemies = setInterval(()=>{
        var enemies = document.getElementsByClassName("shark");
    
        if(enemies != undefined){
            for (var i = 0; i < enemies.length; i++){
                var enemy = enemies[i]; //getting each enemies
                var enemyLeft = parseInt(
                    window.getComputedStyle(enemy).getPropertyValue("left")
                );
                if (enemyLeft < -100){
                    enemy.parentElement.removeChild(enemy); 
                    score++;
                    document.getElementById("score").innerHTML = `Score: ${score}`;
                }
                enemy.style.left = enemyLeft + -20 + "px";

                //check if the shark bite the player
                var enemybound = enemy.getBoundingClientRect();
                var playerbound = surfer.getBoundingClientRect();
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
                        enemy.style.background = "none";
                        surfer.style.background = "url('./assets/game3/shark_GO.png') no-repeat";
                        gameOver.style.background = "rgba(255, 255, 255, .5)"
                        gameOver.style.display = "block";
                    }

            }
        }
    }, 200);
}

//Game 3: function to generate sharks
function generateSharks(){
    if (idgame == "game_3"){
        var generate = setInterval(()=>{
            var rival = document.createElement("div");
            if(isOver == false){
                rival.classList.add("shark");
                board.appendChild(rival);
                rival.style.background = "url('./assets/game3/shark.png') no-repeat";
            }
        }, 4000);
    }
}

//Game 3: function to jump
function jump(){
    if(idgame == "game_3" && isOver == false){
        if (surfer.classList != "jumpActive") {
            surfer.classList.add("jumpActive");
    
            // Impede de pular apos 0.5 segundos
            setTimeout(() => {
                surfer.classList.remove("jumpActive");
            }, 2200);
        }
    }
}


//Button Up actions
function pressUp(){
    if (idgame == "game_1" && isOver == false){
        movecarUp();
    }

    if (idgame == "game_2" && isOver == false){
        moveshipUp();
    }

    jump();
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

    jump();
}

//Button B actions
function pressB(){
    if ((idgame == "game_2") && isOver == false){
        shoot();
    }  
    
    jump();
}

//Button Start actions
function pressStart(){
    location.href='./index.html';
}

//Keyboard buttons
window.addEventListener("keydown", (e) => {
    //Up - Down
    if (e.key == "ArrowUp") {
        pressUp();
        jump();
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

    if((e.code == "Space" || e.key == " ") && isOver == false){
        jump();
    }

    if((e.code == "Space" || e.key == " ") && isOver == true){
        //restart game
        window.location.reload();
    }
});

gameConfig();

generateCars();
generateRocks();
generateSharks();

moverivalcar();
moveAsteroid();
moveShark();