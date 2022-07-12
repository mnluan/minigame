let params = new URLSearchParams(location.search);
var idgame = params.get('id');

function gameConfig(){
    if (idgame != "" && idgame == "game_1"){
        console.log(true);
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
    console.log(false);
}

gameConfig();