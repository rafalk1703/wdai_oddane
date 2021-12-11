const startSize = 40;

let baloonElement = document.getElementById("balloon");
let size = startSize;


//naciśnięcie klawisza
document.body.addEventListener("keydown", function changeSize(e) {
    let tenPercentage = size * 0.1;
    if (e.key === "ArrowUp") {
        if (size > 299) {
            baloonElement.textContent = "💥";
            document.body.removeEventListener("keydown", changeSize);
        }
        else {
            size = size + tenPercentage;
            baloonElement.style.fontSize = size + "px";
            e.preventDefault();
        }
    }
    else if (e.key === "ArrowDown") {
        if (size > 40) {
            size = size - tenPercentage;
            baloonElement.style.fontSize = size + "px";
        }
        e.preventDefault();
    }
});

// przycisk myszki został naciśnięty
baloonElement.addEventListener("mousedown", e => {
    if (size <= 400) {
        if (e.ctrlKey) {
            e.preventDefault();
            showSizeMenu(e.pageX, e.pageY);
        }
    }
});

let menu = document.getElementById("size-menu");

// przycisk myszki został kliknięty
document.addEventListener("click", () => menu.style.display = "none");

menu.addEventListener("contextmenu", e => e.preventDefault());

function showSizeMenu(x, y) {
    menu.innerText = "Rozmiar balona: " + (size).toFixed(2) + "px";
    menu.style.display = "block";
    menu.style.left = x + "px";
    menu.style.top = y + "px";
}