var counter = document.querySelector(".counter");
var nickBox = document.querySelector(".nick");
var score = document.querySelector(".score");
var popUpBox = document.querySelector(".score-popup-box");
var background = document.querySelector(".background");
var scorePanel = document.querySelector(".score-panel");
var startBtn = document.querySelector(".button");
var tryAgainBtn = document.querySelector(".try-again");
var highScores = document.querySelector(".highScores");
var gameStarted = false;
var current_score = 0;
var lost = false;
var time = 0;
let x = 0;
let nick = "";
let finalScore = 0;


function updateScores(nick, score) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    let url = "http://localhost:3000/scores";

    fetch(url, {
        contentType: "application/json",
        method: 'GET',
        headers: headers
    }).then(response => {
        return response.json()
    }).then(data => {

        newScore = {
            name: nick,
            score: score,
            date: getDate()
        }

        let ids = data.map(element => element.id)
        data.forEach(data => delete data["id"])
        data.push(newScore)

        let sortedScores = data.sort((a, b) => a.score < b.score ? 1 : -1).splice(0, 7);

        showScores(sortedScores);
        

        ids.forEach(id => {
            fetch(url + "/" + id, {
                method: 'DELETE',
                headers: headers,
            });
        });

        sortedScores.forEach(element => {
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(element)
            });
        });
    })
}


function showScores(nick, score) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');


    let url = "http://localhost:3000/scores";

    fetch(url, {
        contentType: "application/json",
        method: 'GET',
        headers: headers
    }).then(response => {
        return response.json()
    }).then(data => {


        newScore = {
            name: nick,
            score: score,
            date: getDate()
        }

        data.forEach(data => delete data["id"])
        data.push(newScore)

        let sortedScores = data.sort((a, b) => a.score < b.score ? 1 : -1).splice(0, 7);

        var header = document.createElement("tr");
            header.innerHTML = `
                <th> Nick </th>
                <th> Points </th> 
                <th> Date </th> 
            `
            highScores.appendChild(header);
            for(var i = 0; i <= sortedScores.length; i++){
                var row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sortedScores[i].name}</td> 
                    <td>${sortedScores[i].score}</td>
                    <td>${sortedScores[i].date}</td>
                `
                highScores.appendChild(row);
            }

    })
}


function lostGame(a) {

    a.addEventListener("animationend", function () {
        x = x + 1;
        if (x >= 3) {
            background.querySelectorAll(".zombie").forEach(function (el) {
                el.remove();
                gameStarted = false;
            });
           
            score.innerText = current_score;
            if (lost === false) {
                background.classList.toggle("lost");
                popUpBox.classList.toggle("hidden");
                scorePanel.classList.toggle("hidden");
            }
            
            showScores(nick, current_score);
            finalScore = current_score;
            lost = true;
            current_score = 0;
            x = 0;
            counter.innerText = current_score;
            clearInterval(time);
        }
    });
}

function getDate(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date+' '+time;
}


function createZombie() {
    var zombie = document.createElement("div");

    zombie.style.animationDuration = "0.7s, " + Math.floor((Math.random() * 10) + 3) + "s";

    zombie.classList.add("zombie");
    zombie.classList.add("animationDuration");
    var bottom = Math.floor((Math.random() * 300) + -10);
    zombie.style.bottom = bottom + "px";
    zombie.style.zIndex = 400 - bottom;
    const size = Math.random() * 0.6 + 0.4;
    zombie.style.transform = `scale(${size})`;
    background.appendChild(zombie);
    lostGame(zombie);
}


startBtn.addEventListener("click", function ZombieStart() {


    if (!gameStarted) {
        do {
            nick = prompt("Wpisz swój nick: ");
        } while (nick === null || nick === "");
        nickBox.innerText = nick;
        time = setInterval(createZombie, 500);
        this.style.display = "none";
        gameStarted = true;
    }
});


gameStarted = false;

tryAgainBtn.addEventListener("click", function hideScorePanel() {

    updateScores(nick, finalScore)
    finalScore = 0;
    popUpBox.classList.toggle("hidden");
    scorePanel.classList.toggle("hidden");
    current_score = 0;
    counter.innerText = current_score;
    lost = false;
    startBtn.style.display = "block";
});

background.addEventListener("click", function (e) {
    if (e.target.classList.contains("zombie")) {
        if (gameStarted) {

            current_score += 12;
            e.target.remove();
        }
    }
    else if (e.target.classList.contains("button")) {

    }
    else {
        if (gameStarted) {

            current_score -= 6;
        }
    }
    counter.innerText = current_score;
});


