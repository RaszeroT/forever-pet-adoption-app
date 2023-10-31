

fetch('https://www.googleapis.com/books/v1/volumes?q=husky')
.then(function (data) {
            console.log('data', data.json());
        })


