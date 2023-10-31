var breedSearchEl = document.querySelector('#breedSelector');
var availablePetsEL = document.querySelector('#availablePets');
var breedForm = document.querySelector('#breedForm');

fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var allBreeds = data.message;
        var allBreedsArray = Object.entries(allBreeds);
        for (let i = 0; i < allBreedsArray.length; i++) {
            console.log(allBreedsArray[i][0]);
            var createOption = document.createElement('option');
            createOption.textContent = allBreedsArray[i][0];
            breedSearchEl.appendChild(createOption);
        }
    })

breedForm.addEventListener('submit', function (e) {
    console.log("form submitted");
    e.preventDefault();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${breedSearchEl.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.items);
            var dataBooks = data.items
            for(i=0; i < dataBooks.length; i++ ) {
                console.log(dataBooks[i]);
            }    
        })
   


})
