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
        // if (dataItems.volumeInfo.imageLinks.smallThumbnail) {
            var createImg = document.createElement("img");
            createImg.setAttribute('src', dataItems.volumeInfo.imageLinks.smallThumbnail);
            displayInfoEl.appendChild(createImg);
        // } else {
            // var createImgElseCond = document.createElement("div")
            // createImgElseCond.textContent = "No Image Available";
            // displayInfoEl.appendChild(createImgElseCond);
        // }
    }
}
