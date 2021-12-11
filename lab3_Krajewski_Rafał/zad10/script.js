const renderSite = async () => {

    const responseA = await fetch("http://localhost:3001/ProduktyA");
    const productsA = await responseA.json();
    let categoriesA = productsA.map(product => Object.keys(product).toString());

    const responseB = await fetch("http://localhost:3002/ProduktyB");
    const productsB = await responseB.json();
    let categoriesB = productsB.map(product => Object.keys(product).toString());

    const responseC = await fetch("http://localhost:3003/ProduktyC");
    const productsC = await responseC.json();
    let categoriesC = productsC.map(product => Object.keys(product).toString());

    var allCategories = Array.from(new Set(categoriesA.concat(categoriesB).concat(categoriesC)));

    var allProducts = [];

    for (let i = 0; i < allCategories.length; i++) {
        const prod = {};


        let catAProd = [];
        let catBProd = [];
        let catCProd = [];

        if (categoriesA.indexOf(allCategories[i]) != -1) {
            catAProd = Object.values(productsA[categoriesA.indexOf(allCategories[i])])[0]
                .map(product => Object.values(product).toString());
        }
        
        if (categoriesB.indexOf(allCategories[i]) != -1) {
            catBProd = Object.values(productsB[categoriesB.indexOf(allCategories[i])])[0]
                .map(product => Object.values(product).toString());
        }

        
        if (categoriesC.indexOf(allCategories[i]) != -1) {
            catCProd = Object.values(productsC[categoriesC.indexOf(allCategories[i])])[0]
                .map(product => Object.values(product).toString());
        }

        prod[allCategories[i]] = Array.from(new Set(catAProd.concat(catBProd).concat(catCProd)));

        allProducts[i] = prod;
    }
    let counter = {};
    allProducts.forEach(category => {
        counter[Object.keys(category).toString()] = 0;
    })
    let resultList = [];
    
    let menuSection = document.getElementById("menu");
    allProducts.forEach(category => {
        let categoryKey = Object.keys(category).toString();
        let categoryElement = document.createElement("div");

        let categoryDiv = document.createElement("div");
        categoryDiv.setAttribute("class", "category");

        let categoryBtn = document.createElement("input");
        categoryBtn.setAttribute("class", "category-button");
        categoryBtn.setAttribute("id", categoryKey);
        categoryBtn.setAttribute("type", "checkbox");

        let categoryLabel = document.createElement("div");
        categoryLabel.setAttribute("class", "category-label");

        let categoryName = document.createElement("p");
        categoryName.innerText = categoryKey;
        categoryName.style.cursor = "pointer";
        

        let productList = document.createElement("div");
        productList.setAttribute("class", "product-list");
        
    
        categoryName.addEventListener("click", () => {
            if (productList.style.display === "flex") {
                productList.style.display = "none";
            }
            else {
                productList.style.display = "flex";
            }
        });

        for (let prod of category[categoryKey]) {
            let productDiv = document.createElement("div");
            productDiv.setAttribute("class", "product");

            let productInput = document.createElement("input");
            productInput.setAttribute("class", "product-button");
            productInput.setAttribute("id", prod);
            productInput.setAttribute("type", "checkbox");

            let productLabel = document.createElement("label");
            productLabel.setAttribute("class", "product-label");
            productLabel.setAttribute("id", prod);
            productLabel.htmlFor = prod;

            let productName = document.createElement("p");
            productName.innerText = prod;

            productInput.addEventListener("change", (event) => {
                if (event.currentTarget.checked) {
                    productLabel.innerHTML = "<i class=\"fas fa-check\"></i>";
                    productLabel.style.backgroundColor = "grey";
                    categoryLabel.innerHTML = "<i class=\"fas fa-minus\"></i>";
                    categoryLabel.style.backgroundColor = "grey";
                    counter[categoryKey]++;
                    resultList.push(prod);
                    let main = document.getElementById("main");
                    let prods = document.createElement("div");
                    for (let prod of resultList) {
                        let el = document.createElement("p");
                        el.innerText = prod;
                        prods.appendChild(el);
                    }
                    main.replaceChildren(prods);

                    if (counter[categoryKey] === category[categoryKey].length) {

                        categoryLabel.innerHTML = "<i class=\"fas fa-check\"></i>";
                        categoryBtn.checked = true;
                    }
                }
                else {
                    productLabel.innerHTML = "";
                    productLabel.style.backgroundColor = "white";
                    counter[categoryKey]--;
                    let index = resultList.indexOf(prod);
                    resultList.splice(index, 1);
                    let main = document.getElementById("main");
                    let prods = document.createElement("div");
                    for (let prod of resultList) {
                        let el = document.createElement("p");
                        el.innerText = prod;
                        prods.appendChild(el);
                    }
                    main.replaceChildren(prods);
                    if (counter[categoryKey] > 0) {
                        categoryLabel.innerHTML = "<i class=\"fas fa-minus\"></i>";
                    }
                    else {
                        categoryLabel.innerHTML = "";
                        categoryLabel.style.backgroundColor = "white";
                        categoryBtn.checked = false;
                    }
                }
            })

            productDiv.appendChild(productInput);
            productDiv.appendChild(productLabel);
            productDiv.appendChild(productName);
            productList.appendChild(productDiv);
        }

        categoryDiv.appendChild(categoryBtn);
        categoryDiv.appendChild(categoryLabel);
        categoryDiv.appendChild(categoryName);
        categoryElement.appendChild(categoryDiv);
        categoryElement.appendChild(productList);
        menuSection.appendChild(categoryElement);
    });

}

window.addEventListener("DOMContentLoaded", () => renderSite());