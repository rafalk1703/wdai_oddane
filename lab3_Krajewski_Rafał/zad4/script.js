

function off() {
    if (document.getElementById("button1").disabled === false) {
        document.getElementById("button2").innerHTML = "Włącz licznik";
        document.getElementById("number").innerHTML = 0;

        button1.disabled = true;
    } else {
        document.getElementById("button2").innerHTML = "Wyłącz licznik";

        button1.disabled = false;
    }
}



function add() {
    let number = document.getElementById("number");
    number.innerHTML++;
}