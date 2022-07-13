let params = new URLSearchParams(location.search);
let isOver = false;
var idgame = params.get('id');

function gameConfig(){
    if (idgame != "" && idgame == "game_1"){
        document.getElementById('screen').innerHTML = '' + 
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
moverivalcar();