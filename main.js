var game = {
    money: 5,
    totalMoney: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.01,

    addToMoney: function(amount) {
        this.money += amount;
        this.totalMoney += amount;
        display.updateScreen();
    },

    getMoneyPerSecond: function() {
        var MpS = 0;
        for (i = 0; i < building.name.length; i++){
            MpS += building.income[i] * building.count[i];
        }
        return MpS;
    },

    getMoneyPerTick: function() {
        var MpT = 0;
        if (this.getMoneyPerSecond() > 0){
            MpT = this.getMoneyPerSecond() / 50;
        } 
        return MpT;
    }
};

var building = {
    name: [
        "Miner",
        "Saw",
        "Pump",
        "Magnet"
    ],
    image:[
        "pickaxe.png",
        "saw.jpg",
        "pump.jpg",
        "magnet.jpg"
    ],
    count: [0, 0, 0, 0],
    income: [
        1,
        8,
        70,
        250
    ],
    cost: [
        15,
        100,
        600,
        4000
    ],

    purchase: function(index) {
        if (game.money >= this.cost[index]) {
            game.money -= this.cost[index];
            this.count[index]++
            this.cost[index] = Math.floor(this.cost[index] * 1.10);
            display.updateScreen();
            display.updateShop();
        }
    }
};

var upgrade = {
    name: [
        "Stone pickaxe",
        "Iron pickaxe",
    ],
    description: [
        "Miners are twice as efficient",
        "Miners are twice as efficient"
    ],
    image:[
        "pickaxe.png",
        "pickaxe.png"
    ],
    type:[
        "building",
        "building"
    ],
    cost:[
        300,
        500
    ],
    buildingIndex:[
        0,
        0
    ],
    requirement: [
        1,
        5
    ],
    bonus: [
        2,
        2
    ],
    purchased: [false, false, false],

    purchase: function(index) {
        if (!this.purchased[index] && game.money >= this.cost[index]){
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.money -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScreen();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]){
                game.money -= this.cost[index];
                game.clickValue *= this.bonus[index];

                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScreen();
                display.updateUpgrades();
            }
        }
    }

}

var display = {
    updateScreen: function() {
        document.getElementById("money").innerHTML = game.money.toFixed(0);
        document.getElementById("mps").innerHTML = game.getMoneyPerSecond().toFixed(0);
        document.title = game.money + " money - Mining Emperor";

        
    },

    updateShop: function(){
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++){
            document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img src="images/'+building.image[i]+'"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span></p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
        }
    },

    updateUpgrades: function(){
        document.getElementById("upgradeContainer").innerHTML ="";
        for (i = 0; i < upgrade.name.length; i++){
            if (!upgrade.purchased[i]){
                if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
                    document.getElementById("upgradeContainer").innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+ ' &#10; ('+upgrade.cost[i]+' money)" onclick="upgrade.purchase('+i+')">';
                }
                else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+ ' &#10; ('+upgrade.cost[i]+' money)" onclick="upgrade.purchase('+i+')">';
                }
            }
        }
    }
};

function saveGame() {
    var gameSave = {
        money: game.money,
        totalMoney: game.totalMoney,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.money !== "undefined") game.money = savedGame.money;
        if (typeof savedGame.totalMoney !== "undefined") game.totalMoney = savedGame.totalMoney; 
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks; 
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue; 
        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++){
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++){
                building.income[i] = savedGame.buildingIncome[i];
            }
        } 
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++){
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (i = 0; i < savedGame.upgradePurchased.length; i++){
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }  
    }
}

function resetGame() {
    if(confirm("Are you sure you want to reset your game")){
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

document.getElementById("clicker").addEventListener("click", function() {
    game.totalClicks++;
    game.addToMoney(game.clickValue);
}, false);

window.onload = function() {
    loadGame();
    display.updateScreen();
    display.updateUpgrades();
    display.updateShop();
};

setInterval(function(){
    game.money += game.getMoneyPerTick();
    game.totalMoney += game.getMoneyPerTick();
    display.updateScreen()
}, 20);

setInterval(function(){
    display.updateScreen();
    display.updateUpgrades();
}, 10000);

setInterval(function(){
    saveGame();
}, 30000);

document.addEventListener("keydown", function(event){
    if (event.ctrlKey && event.which == 83) { // ctrl + s
        event.preventDefault();
        saveGame();
    }
}, false);