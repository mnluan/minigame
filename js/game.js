let params = new URLSearchParams(location.search);
let isOver = false;
var idgame = params.get('id');

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
            '<div class="player"></div>'+
            '<div class="rival"></div>';
    }
}
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
                    //score++;
                }
                enemy.style.left = enemyLeft + -20 + "px"
            }
        }
    }, 200);
}

function movecarUp(){
    
}

function movecarDown(){
    
}

function pressUp(){
    if (idgame != "" && idgame == "game_1"){
        movecarUp();
    }
}

function pressDown(){
    if (idgame != "" && idgame == "game_1"){
        movecarDown();
    }
}

gameConfig();
generate();
moverivalcar();