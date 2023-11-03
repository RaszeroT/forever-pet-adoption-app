var breedSearchEl = document.querySelector('#breedSelector');
var availablePetsEL = document.querySelector('#availablePets');
var breedForm = document.querySelector('#breedForm');
var displayInfoEl = document.querySelector('#displayInfo');
var clearBtnEl = document.getElementById('clear-button')

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
        var dataItems = dataBooks[i]
        var createBrkPt = document.createElement("br");
        var createTitle = document.createElement("h3");
        createTitle.textContent = dataItems.volumeInfo.title;
        displayInfoEl.appendChild(createTitle);
        displayInfoEl.appendChild(createBrkPt);
        var createInfo = document.createElement("div");
        createInfo.textContent = dataItems.searchInfo.textSnippet;
        displayInfoEl.appendChild(createInfo);
        displayInfoEl.appendChild(createBrkPt);
        if (dataItems.saleInfo.buyLink) {
            var createAnchor = document.createElement("a");
            createAnchor.setAttribute('href', dataItems.saleInfo.buyLink);
            var createButton = document.createElement("button")
            createButton.textContent = "Book"
            createAnchor.appendChild(createButton);
            displayInfoEl.appendChild(createAnchor);
            displayInfoEl.appendChild(createBrkPt);
        } else {
            var createAnchorElseCond = document.createElement("div")
            createAnchorElseCond.textContent = "No Link Available";
            displayInfoEl.appendChild(createAnchorElseCond);
        }
        if (dataItems.volumeInfo.imageLinks) {
            var createImg = document.createElement("img");
            createImg.setAttribute('src', dataItems.volumeInfo.imageLinks.smallThumbnail);
            displayInfoEl.appendChild(createImg);
        } else {
            var createImgElseCond = document.createElement("div")
            createImgElseCond.textContent = "No Image Available";
            displayInfoEl.appendChild(createImgElseCond);
        }
    }}

var favorites = document.createElement('favorites');

var breeds = [];

// render items in a breeds list
function renderBreeds() {
    favorites.innerHTML = '';
    // new <li> for each breed
    for (var i = 0; i < breeds.length; i++) {
        var breed = breeds[i];
        var li = document.createElement('li');
        li.textContent = breed;
        li.setAttribute('ATTRIBUTES', i);
        // create X button
        var button = document.createElement('button');
        button.textContent = 'X';
        li.appendChild(button);
        favorites.appendChild(li);
        button.addEventListener('click', function(event) {
            var element = event.target;
            if (element.matches() === true) {
                var index = element.parentElement.getAttribute('ATTRIBUTE');
                breeds.splice(index, 1);
                storeBreeds();
                renderBreeds();
            }
        })
    }
}
var storedBreeds;
// run when page loads
function init() {
    // get from localStorage
    storedBreeds = JSON.parse(localStorage.getItem('favorites'));
    if (storedBreeds !== null) {
        breeds = storedBreeds;
    }
    // render breeds to DOM
    renderBreeds();
}

function storeBreeds() {
    localStorage.setItem('breeds', JSON.stringify(breeds));
}

// submit event
displayInfoEl.addEventListener('click', function(event) {
    event.preventDefault();
    var breedText = breedSearchEl.value.trim();
    console.log(breedText);
    if (breedText === '') {
        return;
    }
    // add new breeds to array
    breeds.push(breedText);
    breedSearchEl.value = '';
    console.log(breeds);
    storeBreeds();
    renderBreeds();
})


init()
