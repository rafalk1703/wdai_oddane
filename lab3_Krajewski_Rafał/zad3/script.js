let list = document.getElementById("list")
var counter = 0;

function add(){
    let element = document.createElement("li");
    counter++;
    element.innerHTML = counter + " Item";
    list.appendChild(element);
}


function remove(){
    if(counter > 0){
        list.removeChild(list.childNodes[0]);
        counter--;
    }
}