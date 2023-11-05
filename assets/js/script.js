var breedSearchEl = document.querySelector("#breedSelector");
var breedForm = document.querySelector("#breedForm");
var displayInfoEl = document.querySelector("#displayInfo");
var clearBtnEl = document.getElementById("clear-button");

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
      var createOption = document.createElement("option");
      createOption.textContent = allBreedsArray[i][0];
      breedSearchEl.appendChild(createOption);
    }
  });

breedForm.addEventListener("submit", function (e) {
  console.log("form submitted");
  e.preventDefault();
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=dog+${breedSearchEl.value}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.items);
      var dataBooks = data.items;
      displayResults(dataBooks);
    });
});

function displayResults(dataBooks) {
  console.log(dataBooks);
  for (i = 0; i < dataBooks.length; i++) {
  console.log(dataBooks[i].searchInfo.textSnippet);
  var dataItems = dataBooks[i];
  // var createBrkPt = document.createElement("br");
  let bookDiv = document.createElement("div");
  bookDiv.style.display = "flex";
  bookDiv.style.flex="30%"
  let imageDiv = document.createElement("div");
  if (dataItems.volumeInfo.imageLinks) {
    var createImg = document.createElement("img");
    createImg.setAttribute(
      "src",
      dataItems.volumeInfo.imageLinks.smallThumbnail
    );
    createImg.style.height="100px";
    createImg.style.width="100px";
    imageDiv.appendChild(createImg);
  } else {
    var createImgElseCond = document.createElement("div");
    createImgElseCond.textContent = "No Image Available";
    imageDiv.appendChild(createImgElseCond);
  }
  imageDiv.style.flex = "20%"
  bookDiv.append(imageDiv)
  let infoDiv = document.createElement("div");
  let titleDiv = document.createElement("div");
  var createTitle = document.createElement("h3");
  createTitle.textContent = dataItems.volumeInfo.title;
  // createTitle.classList.add("bookTitle");
  titleDiv.appendChild(createTitle);
  infoDiv.appendChild(titleDiv);
  // displayInfoEl.appendChild(createBrkPt);
  var createInfo = document.createElement("div");
  createInfo.textContent = dataItems.searchInfo.textSnippet;
  infoDiv.appendChild(createInfo);
  infoDiv.style.flex = "80%"
//
if (dataItems.saleInfo.buyLink) {
    var createAnchor = document.createElement("a");
    createAnchor.setAttribute("href", dataItems.saleInfo.buyLink);
    var createButton = document.createElement("button");
    createButton.textContent = "Book";
    createAnchor.appendChild(createButton);
    infoDiv.appendChild(createAnchor);
    // infoDiv.appendChild(createBrkPt);
} else {
    var createAnchorElseCond = document.createElement("div");
    createAnchorElseCond.textContent = "No Link Available";
    infoDiv.appendChild(createAnchorElseCond);
}
bookDiv.append(infoDiv)  // // displayInfoEl.appendChild(createBrkPt);
displayInfoEl.append(bookDiv)
    }
}
