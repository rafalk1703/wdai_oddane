function typeName() {
    var name = prompt("Wpisz swoje imię: ", "");
    if(name != null) {
       document.getElementById("name").innerHTML = name;
        
    }
}