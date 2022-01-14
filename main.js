var money = 0;
var MpT = 0;
var MpS = 0;

var minerCost = 15;
var miners = 0;
var sawCost = 100;
var saws = 0;
var pumpCost = 1000;
var pumps = 0;

money = money + 1;

function addToMoney(amount){
    money = money + amount;
    updateScreen()
}

function hireMiner(){
    if (money >= minerCost){
        money = money - minerCost;
        miners = miners + 1;
        minerCost = Math.floor(minerCost * 1.15);

        updateScreen()
    }
}

function buySaw(){
    if (money >= sawCost){
        money = money - sawCost;
        saws = saws + 1;
        sawCost = Math.floor(sawCost * 1.15);

        updateScreen()
    }
}

function buyPump(){
    if (money >= pumpCost){
        money = money - pumpCost;
        pumps = pumps + 1;
        pumpCost = Math.floor(pumpCost * 1.15);

        updateScreen()
    }
}

function updateMoneyPerTick(){
    MpT = miners * 0.02 + saws * 0.1 + pumps * 1;
    MpS = MpT * 50;
    updateScreen()
}

function updateScreen(){

    document.getElementById("money").innerHTML = displayMoney;
    document.getElementById("miners").innerHTML = miners;
    document.getElementById("minerCost").innerHTML = minerCost;
    document.getElementById("saws").innerHTML = saws;
    document.getElementById("sawCost").innerHTML = sawCost;
    document.getElementById("pumps").innerHTML = pumps;
    document.getElementById("pumpCost").innerHTML = pumpCost;
    document.getElementById("mps").innerHTML = displayMpS;
    document.title = displayMoney + " money - Mining Emperor";
    
}

function saveGame() {
    var gameSave = {
        money: money,
        minerCost: minerCost,
        miners: miners,
        sawCost: sawCost,
        saws: saws,
        pumpCost: pumpCost,
        pumps: pumps
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.money !== "undefined") money = savedGame.money;
    if (typeof savedGame.minerCost !== "undefined") money = savedGame.minerCost; 
    if (typeof savedGame.miners !== "undefined") money = savedGame.miners; 
    if (typeof savedGame.sawCost !== "undefined") money = savedGame.sawCost; 
    if (typeof savedGame.saws !== "undefined") money = savedGame.saws; 
    if (typeof savedGame.pumpCost !== "undefined") money = savedGame.pumpCost; 
    if (typeof savedGame.pumps !== "undefined") money = savedGame.pumps; 
}

window.onload = function() {
    loadGame();
    updateScreen();
}

setInterval(function(){
    money = money + MpT;
    displayMoney = money.toFixed(0);
    displayMpS = MpS.toFixed(0);
    updateMoneyPerTick();
    updateScreen()
}, 20);

setInterval(function(){
    saveGame();
}, 30000);