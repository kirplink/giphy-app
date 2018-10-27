var buttonSubjects = ['scrubs', 'the office', 'brooklyn 99', 'archer', 'parks and recreation'];
var favorites = [];

// console.log(storedFavorites);
function searchGiphy(searchParam) {
    $.ajax({
        url: `https://api.giphy.com/v1/gifs/search?q=${searchParam}&api_key=tMVFPPQYYtx6XxIp7FHYD67j8XT67law&limit=20&rating=pg`,
        method: 'get'
    }).then(function (response) {
        for (let val of response.data) {
            // let i = response.data.indexOf(val);
            // console.log(val);
            let arrayOject = JSON.stringify(val);
            $('.giphy-tiles').append(`
                <div class="gif-container">
                    <img class="gif-tile" src="${val.images.original_still.url}" 
                    data-still="${val.images.original_still.url}" 
                    data-gif="${val.images.original.url}" 
                    data-original="${val.images.original.url}" 
                    data-is-still="true">
                    <p>${val.rating}</p>
                    <button class="favorite-btn" value='${arrayOject}'><i class="fa fa-heart" aria-hidden="true"></i></button>
                </div>
                
            `);
            // console.log(val.url);
        }
    })
}

$(document).on('click', '.favorite-btn', function() {
    
    // console.log(JSON.parse($(this).val()));
    var newFavorite = JSON.parse($(this).val())
    // console.log(newFavorite.images.original_still.url);
    
    // console.log(newFavorite.children('.favorite-btn'));
    favorites.push(newFavorite);
    // console.log(favorites);
    changeFavorites();
    displayFavorites();
})

function addButtons() {
    $('#search-buttons').empty();
    for (let val of buttonSubjects) {
       
        // console.log(buttonSubjects.indexOf(val));
        $('#search-buttons').append(`
        <button class="subject-btn" value="${val}">${val}</button>
        `)
    }
}
addButtons();

function displayFavorites() {
    favorites = JSON.parse(localStorage.getItem('favorites'));
    // console.log(favorites);
    
    $('#favorite-tiles').empty();
    for (let val of favorites) {
        // console.log(val);
        let i = favorites.indexOf(val);
        $('#favorite-tiles').append(`
            <div class="gif-container" id=${i}>
                <img class="gif-tile" src="${val.images.original_still.url}" 
                    data-still="${val.images.original_still.url}" 
                    data-gif="${val.images.original.url}" 
                    data-original="${val.images.original.url}" 
                data-is-still="true">
                <p>${val.rating}</p>
                <button class="is-favorite-btn">Remove</button>
            </div>
        `);
    }
    
}

$(document).on('click', '.is-favorite-btn', function() {
    // console.log($(this).parent().attr('id'));
    let indexNumber = $(this).parent().attr('id');
    favorites.splice(indexNumber, 1);

    changeFavorites();
    displayFavorites();
    // $(this).parent().remove();
})

function changeFavorites() {
    var a = [];
    
    for (let val of favorites) {
        a.push(val);
    }
    // console.log(a);
    localStorage.setItem('favorites', JSON.stringify(a));
}

if ((JSON.parse(localStorage.getItem('favorites'))) !== null) {
    displayFavorites();
} else {
    $('#favorite-tiles').append(`
        <p>No favorites to show</p>
    `)
}



$(document).on('click', '.subject-btn', function (event) {
    event.preventDefault();

    var giphyInput = $(this).val();
    // console.log(giphyInput);
    $('.giphy-tiles').empty();
    searchGiphy(giphyInput);
    $('#giphy-input').val('');
})

$(document).on('click', '#select-giphy', function (event) {
    event.preventDefault();

    var newBtn = $('#giphy-input').val().trim();
    // console.log(newBtn);
    if (newBtn !== '') {
        buttonSubjects.push(newBtn);
    }
    
    // console.log(buttonSubjects);
    addButtons();
    $('#giphy-input').val('');
})

$(document).on('click', '.gif-tile', function() {
    
    var currentGif = $(this).attr('data-is-still');
    // console.log(currentGif);
    if (currentGif == 'true') {
        var src = $(this).attr('data-gif')
        // console.log($(this).attr('src'))
        $(this).attr('src', src);
        $(this).attr('data-is-still', false);
    } else if (currentGif == 'false') {
        var src = $(this).attr('data-still')
        $(this).attr('src', src);
        $(this).attr('data-is-still', true);
    }
})


function windowSize() {
    
    if (window.innerWidth > 767) {
        $('#favorites-div, #search-div').fadeIn(0, function () {
            // Animation complete.
        });
        // console.log('big');
    } else if (window.innerWidth < 769) {
        $('#favorites-div').fadeOut(0, function () {
            // Animation complete.
        });
        // $('#search-div').preprend(search);
        // console.log('small')
    }
}

$(document).on('click', '#footer-gifs', function () {
    $('#favorites-div').fadeOut(0, function () {
        // Animation complete.
    });
    $('#search-div').fadeIn(0, function () {
        // Animation complete.
    });
   
});

$(document).on('click', '#footer-favorites', function () {
    $('#search-div').fadeOut(0, function () {
        // Animation complete.
    });
    $('#favorites-div').fadeIn(0, function () {
        // Animation complete.
    });
    
})



windowSize();
$(window).resize(windowSize);

// console.log(window.innerWidth);

