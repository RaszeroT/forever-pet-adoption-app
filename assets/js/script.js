var breedSearchEl = document.querySelector('#breedSelector');
var availablePetsEL = document.querySelector('#availablePets');
var breedURL = `https://dog.ceo/api/breed/hound/images`

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

fetch(breedURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
