let count = 1
document.getElementById('radio1').checked = true;

function nextGame(){
    var game1 = "Game 1";
    var game2 = "Game 2";
    var game3 = "Game 3";
    var game4 = "Game 4";
    var game5 = "Game 5";

    if(document.getElementById('radio1').checked){
        document.getElementById('game1').innerHTML = '>>> ' + game1 + ' <<<';
    }else{
        document.getElementById('game1').innerHTML = game1;
    }

    if(document.getElementById('radio2').checked){
        document.getElementById('game2').innerHTML = '>>> ' + game2 + ' <<<';
    }else{
        document.getElementById('game2').innerHTML = game2;
    }

    if(document.getElementById('radio3').checked){
        document.getElementById('game3').innerHTML = '>>> ' + game3 + ' <<<';
    }else{
        document.getElementById('game3').innerHTML = game3;
    }

    if(document.getElementById('radio4').checked){
        document.getElementById('game4').innerHTML = '>>> ' + game4 + ' <<<';
    }else{
        document.getElementById('game4').innerHTML = game4;
    }

    if(document.getElementById('radio5').checked){
        document.getElementById('game5').innerHTML = '>>> ' + game5 + ' <<<';
    }else{
        document.getElementById('game5').innerHTML = game5;
    }
}

function pressUp(){
    if (count >= 2) {
        count--;
        document.getElementById('radio' + count).checked = true;
        nextGame();
    }
}

function pressDown(){
    if (count <= 4) {
        count++;
        document.getElementById('radio' + count).checked = true;
        nextGame();
    }
}

document.addEventListener("keydown", function (e) {
    if ( ( e.code == "ArrowUp" ) && (count >= 2) ) {
        pressUp();
    } else if ( (e.code == "ArrowDown")  && (count <= 4)) {
        pressDown();
    }
});

nextGame();
