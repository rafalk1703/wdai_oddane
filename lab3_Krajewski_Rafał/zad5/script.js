let if_prop = false;
let number = 0;
let result = document.getElementById("number");
blueArea = document.getElementById("blueArea");
redArea = document.getElementById("redArea");
yellowArea = document.getElementById("yellowArea");
blueArea.addEventListener('click', blueA);
redArea.addEventListener('click', redA);
yellowArea.addEventListener('click', yellowA);

function yellowA(event){
    if(number <= 50){
        number += 5;
        result.innerHTML = number;
        alert("nacisnąłeś żółty o wartości 5");
        if(!if_prop){
            event.stopPropagation();
        }
    }
    offArea();
}

function blueA(event){
    number = number + 1;
    result.innerHTML = number ;
    alert("nacisnąłeś niebieski o wartości 1");
    offArea();
}

function redA(event){
    if(number <= 30){
        number += 2;
        result.innerHTML = number;
        alert("nacisnąłeś czerwony o wartości 2");
        if(!if_prop){
            event.stopPropagation();
        }
    }
    offArea();
}



function offArea(){
    if(number > 30){
        redArea.removeEventListener('click', redA);
        redArea.style.backgroundColor = 'gray';
    }
    if(number > 50){
        yellowArea.removeEventListener('click', yellowA);
        yellowArea.style.backgroundColor = "gray"
    }
}

function reset(){
    number = 0;
    result.innerHTML = number;
    onArea();
}


function onArea(){
    redArea.addEventListener('click', redA);
    yellowArea.addEventListener('click', yellowA);
    yellowArea.style.backgroundColor = "yellow";
    redArea.style.backgroundColor = 'red';
}

function changePropagation(){
    if(if_prop){
        if_prop = false;
        document.getElementById("prop").innerHTML = "Start Propagation";
    }
    else{
        if_prop = true;
        document.getElementById("prop").innerHTML = "Stop Propagation";
    }
}



