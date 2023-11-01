var breedSearchEl = document.querySelector('#breedSelector');
var availablePetsEL = document.querySelector('#availablePets');
var breedForm = document.querySelector('#breedForm');
var displayInfoEl = document.querySelector('#displayInfo');


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
    fetch(`https://www.googleapis.com/books/v1/volumes?q=dog+${breedSearchEl.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.items);
            var dataBooks = data.items
            displayResults(dataBooks);
        })
})

function displayResults(dataBooks) {
    for (i = 0; i < dataBooks.length; i++) {
        console.log(dataBooks[i].searchInfo.textSnippet);
        var item = dataBooks[i]
        var createTitle = document.createElement("div");
        createTitle.textContent = item.volumeInfo.title;
        displayInfoEl.appendChild(createTitle);
    }
}
