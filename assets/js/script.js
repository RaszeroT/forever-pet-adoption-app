var formEl = document.querySelector('#petForm');
var inputEl = document.querySelector('#petSelector');
var availablePetsEL = document.querySelector('#availablePets');
var breedURL = `https://dog.ceo/api/breeds/list/all`

fetch(breedURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

console.log(formEl);
console.log(inputEl);
console.log(availablePetsEL);