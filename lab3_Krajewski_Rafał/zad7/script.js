const url = "http://localhost:3000/cities"

//exercise a
fetch(url)
    .then((response) => {
        response.json()
            .then((data) => {
                const exerciseA = document.querySelector(".exercise-a");
                exerciseA.innerHTML = data
                    .filter(city => city.province === "małopolskie")
                    .map(city => city.name)
                    .join(", ");

            })
    })

//exercise b
fetch(url)
    .then((response) => {
        response.json()
            .then((data) => {
                const exerciseB = document.querySelector(".exercise-b");
                exerciseB.innerHTML = data
            // jezeli chodzi o litery a to city => ((city.name.toLowerCase().match(new RegExp("a", "g")) || []).length === 2)
            //obecnie tylko znaki 'a'
                    .filter(city => ((city.name.match(new RegExp("a", "g")) || []).length === 2))
                    .map(city => city.name)
                    .join(", ");

            })
    })

//exercise c
fetch(url)
    .then((response) => {
        response.json()
            .then((data) => {
                //warszawa?
                const exerciseC = document.querySelector(".exercise-c");
                exerciseC.innerHTML = getFifthMostDenseCity(data).name;

            })
    })

//exercise d
fetch(url)
    .then((response) => {
        response.json()
            .then((data) => {
                const exerciseD = document.querySelector(".exercise-d");
                exerciseD.innerHTML = data
                    .map(city => city.people > 100000 ? city.name = city.name + "City" : city.name)
                    .join(", ");
            })
    })

//exercise e
fetch(url)
    .then((response) => {
        response.json()
            .then((data) => {
                const exerciseE = document.querySelector(".exercise-e");
                exerciseE.innerHTML = '<p> Liczba miast ponad 80000 mieszkańców: ' + getOver80000(data) + '</p>' +
                    '<p>Liczba miast poniej 80000 mieszkańców: ' + getLessThan80000(data) + '</p>' +
                    '<p>' + result(getOver80000(data), getLessThan80000(data)) + '</p>'

            })
    })

//exercise f
fetch(url)
    .then((response) => {
        response.json()
            .then((data) => {
                const exerciseF = document.querySelector(".exercise-f");
                exerciseF.innerHTML = startFromP(data)
                    .map(city => city.area)
                    .reduce((a1, a2) => a1 + a2, 0) / (startFromP(data).length || 1);

            })
    })

//helper functions

function getFifthMostDenseCity(cities) {
    cities.sort((city1, city2) => city2.dentensity - city1.dentensity);
    return cities[4];
}

function getOver80000(cities) {
    return cities.filter(city => city.people > 80000).length;
}

function getLessThan80000(cities) {
    return cities.filter(city => city.people < 80000).length;
}

function result(over, less) {
    if (over > less)
        return "Więcej miast ponad 80000";
    if (over < less)
        return "Więcej miast poniej 80000";
    if (over === less)
        return "Tyle samo";
}

function startFromP(cities) {
    // zaczynają się i małe i duze 'p'
    return cities.filter(city => city.township.toLowerCase().startsWith("p"));
}