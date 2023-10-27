// text in search in localStorage
// keep saved searches
// clicked old searches shows results


var petForm = document.querySelector('petForm');
var previousPets = document.querySelector('');

var pets = [];
// renders items in a pets list
function renderPets() {
    previousPets.innerHTML = '';
    // render a new <li> for each pet
    for (var i = 0; i < pets.length; i++) {
        var pet = pets[i];
        var li = document.createElement('li');
        li.textContent = pet;
        li.setAttribute('data-index', i);
        // create X button
        var button = document.createElement('button');
        button.textContent = 'X';
        li.appendChild(button);
        previousPets.appendChild(li);
    }
}

// run when page loads
function init() {
    // get from localStorage
    var storedPets = JSON.parse(localStorage.getItem('pets'));
    if (storedPets !== null) {
        pets = storedPets;
    }
    // rendder pets to DOM
    renderPets();
}

function storePets() {
    localStorage.setItem('pets', JSON.stringify(pets));
}

// submit event
petForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var petText = petInput.value.trim();
    if (petText === '') {
        return;
    }
    // add new pets to array, clear input
    pets.push(petText);
    petInput.value = '';
    storePets();
    renderPets();
});

petList.addEventListener('click', function(event) {
    var element = event.target;
    if (element.matches('button') === true) {
        var index = element.parentElement.getAttribute('data-index');
        pets.splice(index, 1);
        storePets();
        renderPets();
    }
});

init()