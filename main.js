var hamburger = document.querySelector(".hamburger");

function responsiveMenu() {
    var navMenu = document.querySelector(".topNav");
    if (navMenu.classList.contains("responsive")) {
        navMenu.classList.remove("responsive");
    } else {
        navMenu.classList.add("responsive");
    }
}

hamburger.addEventListener("click", responsiveMenu);

// Select Nav Menu Item
function navMenuItemSelect(event) {
    var navMenuList = document.querySelectorAll(".topNav li");

    for (var i = 0; i < navMenuList.length; i++) {
        if (navMenuList[i].classList.contains("active")) {
            var currentActive = navMenuList[i];
        }
    }

    currentActive.classList.remove("active");
    event.target.classList.add("active");

    displayActiveArticle(event.target.getAttribute("data-id"));
}

// Display active content in the content area
function displayActiveArticle(activeDataId) {
    var articles = document.querySelectorAll("#content>article");

    for (var i = 0; i < articles.length; i++) {
        if (articles[i].getAttribute("data-id") == activeDataId) {
            articles[i].style.display = "";
            articles[i].classList.add("active");
            // articles[i].style.width = "100%";
            // articles[i].style.height = "100%";
        } else {
            articles[i].style.display = "none";
            articles[i].classList.remove("active");
        }
    }
}

// Apply event listner to nav menu item
var navItem = document.querySelectorAll(".topNav li:not(:first-child)");
navItem.forEach((item) => {
    item.addEventListener("click", navMenuItemSelect);
})

// HOME SECTION
var featuredMoviesList = ["mad+max+fury+road", "passion+of+the","cast+away", "avatar", "the+matrix", "bitter", "predators", "mona", "castaway", "xxx", "3+idiots"];
var featuredMoviesData = new Array();

async function fetchMovieData(moviesList, storageAddress) {
    for (var i = 0; i < moviesList.length; i++) {
        try {
            const movie = await fetch("http://www.omdbapi.com/?t=" + moviesList[i] + "&apikey=55a1897f");
            const movieJson = await movie.json();
            storageAddress.push(movieJson);
            insertFeaturesTab(movieJson["Poster"]);
        } catch (error) {
            console.log(error);
            console.log("No movie found for movie name " +  moviesList[i]);
        }
    }
}
fetchMovieData(featuredMoviesList,featuredMoviesData);

function insertFeaturesTab(url){
    const newPoster = document.createElement("div");
    newPoster.innerHTML = '<img src=' + url + '>';
    var featureContainer = document.querySelector(".carausel");
    featureContainer.appendChild(newPoster);
}
// display movies poster in featured list


// collecting featured movies details
// for(var i=0; i<featuredMoviesList.length; i++){

// }

// SEARCH FUNCTIONALITY
// function to activate search bar
var searchIcon = document.querySelector("#searchIcon>i");
searchIcon.addEventListener("click", searchIconClick);

function searchIconClick() {
    var searchBar = document.querySelector("#searchIcon>input");
    var searchContainer = document.querySelector("#searchIcon");

    if (searchContainer.classList.contains("searchActive")) {
        searchContainer.classList.remove("searchActive");
        searchBar.classList.add("noDisplay");
    } else {
        searchContainer.classList.add("searchActive");
        searchBar.classList.remove("noDisplay");
    }
}

// var searchBar = document.querySelector("#searchIcon>input");
// function searchOnEnter(event) {
//     if (event.key == "Enter") {
//     }
// }
// searchBar.addEventListener("keydown", searchOnEnter);



// MOVIE SECTION
function initializeSearch() {
    var search = document.querySelector("#searchIcon>input");
    defaultTitle = search.value;

    fetchData();
}

// Fetch data from API for the search term and show first result
var defaultTitle = "avatar";
async function fetchData() {
    try {
        const allMovies = await fetch("http://www.omdbapi.com/?s=" + defaultTitle + "&apikey=55a1897f");
        const allMoviesJson = await allMovies.json();
        const firstMovie = await fetch("http://www.omdbapi.com/?i=" + allMoviesJson.Search[0]["imdbID"] + "&apikey=55a1897f");
        const firstMovieJson = await firstMovie.json();
        displaySearchResults(firstMovieJson);
    } catch (error) {
        console.log(error);
        console.log("May be the search bar is empty. Type something to search")
    }
}

// Display search results on the screen
var title = document.getElementById("title");
var poster = document.getElementById("poster");
var plot = document.getElementById("plot");

function displaySearchResults(data) {
    displayActiveArticle(2);
    title.textContent = data["Title"];
    poster.src = data["Poster"];
    plot.textContent = data["Plot"];
}

// Initialize the movie app on load
function iniializeApp() {
    displayActiveArticle(1); // show default tab on screen
}
window.addEventListener("load", iniializeApp);