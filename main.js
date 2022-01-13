var money = 0;
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

function updateMoneyPerSecond(){
    MpS = miners + saws * 5 + pumps * 50;
    updateScreen()
}

function updateScreen(){

    document.getElementById("money").innerHTML = money;
    document.getElementById("miners").innerHTML = miners;
    document.getElementById("minerCost").innerHTML = minerCost;
    document.getElementById("saws").innerHTML = saws;
    document.getElementById("sawCost").innerHTML = sawCost;
    document.getElementById("pumps").innerHTML = pumps;
    document.getElementById("pumpCost").innerHTML = pumpCost;
    document.getElementById("mps").innerHTML = MpS;
    document.title = money + " money - Mining Emperor";
    
}

setInterval(function(){
    money = money + MpS;
    updateMoneyPerSecond();
    updateScreen()
}, 1000);