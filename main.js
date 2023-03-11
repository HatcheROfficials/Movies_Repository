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


// CONTENT SECTION

var allFeaturedMovies = [];
// Function fetches data for movies in moviesList and stroes in given storageAddress
async function fetchMovieData(moviesList, storageAddress) {
    for (var i = 0; i < moviesList.length; i++) {
        try {
            const movie = await fetch("http://www.omdbapi.com/?t=" + moviesList[i] + "&apikey=55a1897f");
            const movieJson = await movie.json();
            storageAddress.push(movieJson);
        } catch (error) {
            console.log(error);
            // console.log("No movie found for movie name " + moviesList[i]);
        }
    }
}

// HOME SECTION

// Featured Today
var featuredMoviesList = ["mad+max+fury+road", "passion+of+the", "cast+away", "avatar", "the+matrix", "bitter", "predators", "mona", "castaway", "xxx", "3+idiots"];
var featuredMoviesData = new Array();

// Fetching and populating featured movie data
fetchMovieData(featuredMoviesList, featuredMoviesData)
    .then(insertFeaturedMovies);

// Function to insert movies in featured list into the featured section
function insertFeaturedMovies() {
    allFeaturedMovies.push(...featuredMoviesData);
    for (var i = 0; i < featuredMoviesData.length; i++) {
        const newPoster = document.createElement("div");
        newPoster.innerHTML = '<img src=' + featuredMoviesData[i]["Poster"] + '>';
        var featureContainer = document.querySelector("#featured div.carausel");
        featureContainer.appendChild(newPoster);
    }
}

// Up Coming (only 2 or 3 movies)
var upcomingMoviesList = ["avatar+3", "deadpool+3", "fast+x"];
var upcomingMoviesData = new Array();

// Fetching and populating featured movie data
fetchMovieData(upcomingMoviesList, upcomingMoviesData)
    .then(insertupcomingMovies);

// Function to insert movies in featured list into the featured section
function insertupcomingMovies() {
    allFeaturedMovies.push(...upcomingMoviesData);
    for(var i=0; i<upcomingMoviesData.length; i++){
        const newPoster = document.createElement("div");
        newPoster.innerHTML = '<div class="secondaryHeading marginBottom">' + upcomingMoviesData[i]["Title"] + '</div> <img src="' + upcomingMoviesData[i]["Poster"] + '"> <div class="contentText">Expected Release Date: ' + upcomingMoviesData[i]["Year"] + '</div>';
        var upcomingContainer = document.querySelector("#upcoming>div:last-child");
        upcomingContainer.appendChild(newPoster);
    }
}

// Hollywood Classics
var hollywoodMoviesList = ["free+solo", "la+la+land", "edge+of+tomorrow", "the+wolf+of+wall+street", "wall+e", "ratatouille", "paranormal+activity", "texas", "green+lantern", "up", "richie+rich", "finding+nemo", "fast+five"];
var hollywoodMoviesData = new Array();

// Fetching and populating featured movie data
fetchMovieData(hollywoodMoviesList, hollywoodMoviesData)
    .then(insertHollywoodMovies);

// Function to insert movies in featured list into the featured section
function insertHollywoodMovies() {
    allFeaturedMovies.push(...hollywoodMoviesData);
    displayMovieDetails(allFeaturedMovies[9]["Poster"]); // Remove later

    for (var i = 0; i < hollywoodMoviesData.length; i++) {
        const newPoster = document.createElement("div");
        newPoster.innerHTML = '<img src=' + hollywoodMoviesData[i]["Poster"] + '>';
        var hollywoodContainer = document.querySelector("#hollywood div.carausel");
        hollywoodContainer.appendChild(newPoster);
    }
}

function eventDeligation(event){
    if(event.target.tagName == "IMG"){
        displayMovieDetails(event.target.getAttribute("src"));
        displayActiveArticle(2);
    }
}
window.addEventListener("click",eventDeligation);

// MOVIES SECTION


function displayMovieDetails(url){
    var m = allFeaturedMovies.filter((item)=>{
        return item["Poster"] == url;
    })[0];
    
    var movieSection = document.getElementById("movies");

    movieSection.innerHTML = '<div id="mTitle">' + m["Title"] + '</div>' +
    '<div id="mPoster"> <img src="'+ m["Poster"] +'"></div>' +
    '<div id="mPlot">' + m["Plot"] + '</div>' +
    '<div id="mRating">IMDB Rating</div> <div>' + m["imdbRating"] + '</div>' +
    '<div id="mGenre">Genre</div> <div>' + m["Genre"] +'</div>' +
    '<div id="mRuntime">Run Time</div> <div>'+ m["Runtime"] +'</div>' +
    '<div id="mLanguage">Languages</div> <div>'+ m["Language"] +'</div>' +
    '<div id="mRelease">Release Data</div> <div>'+ m["Released"] +'</div>' +
    '<div id="mCollection">Box Office Collection</div> <div>'+ m["BoxOffice"] +'</div>' +
    '<div id="mActors">Actors</div> <div>'+ m["Actors"] +'</div>' +
    '<div id="mDirector">Director</div> <div>'+ m["Director"] +'</div>' +
    '<div id="mWriter">Writer</div> <div>'+ m["Writer"] +'</div>' +
    '<div id="mAward">Awards</div> <div>'+ m["Awards"] +'</div>';
}

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