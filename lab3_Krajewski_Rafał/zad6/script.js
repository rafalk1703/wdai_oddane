var contactsList = document.querySelector(".list")

function addContact(event) {
    event.preventDefault();
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");

    if (name.value === "") {
        alert("Podaj imię i nazwisko")
    }

    else if (!nameValidation(name.value)) {
        name.value = "";
    }

    else if (phone.value === "") {

        alert("Podaj telefon")
    }

    else if (!phone.value.match(/^[0-9]{9}$/)) {
        phone.value = "";
        alert("Podaj telefon w poprawnym formacie")
    }



    else {
        var contact = document.createElement("div");
        contact.classList.add("contact-el")

        newContact = `
        <div class="contact">
            <p>${name.value}</p>
            <p>${phone.value}</p>
        </div>
        <div class="button">
            <button class="remove-button"><i class="fas fa-trash-alt"></i></button>
        </div>
        `;

        contact.innerHTML = newContact;
        const removeButton = contact.querySelector('.remove-button');
        removeButton.addEventListener('click', removeFunc);

        contactsList.appendChild(contact);

        name.value = "";
        phone.value = "";
    }

}

function removeFunc(event) {
    const contact = event.currentTarget.parentElement.parentElement;
    contactsList.removeChild(contact)
}

function nameValidation(name) {
    var names = name.split(" ");
    var pattern = /^[A-Z][a-z]+$/


    if (names.length == 2) {
        for (var name of names) {
            if (!name.match(pattern)) {
                alert("Podaj Imie i Nazwisko w poprawnym formacie")
                return false
            }
        }
    } else {
        alert("Podaj Imie i Nazwisko rozdzielone spacja")
        return false;
    }
    return true;
}

