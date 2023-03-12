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
    var topNav = document.querySelectorAll(".topNav>li:not(:first-child)");

    for (var i = 0; i < articles.length; i++) {
        if (articles[i].getAttribute("data-id") == activeDataId) {
            articles[i].style.display = "";
            // articles[i].classList.add("active");
            // articles[i].style.width = "100%";
            // articles[i].style.height = "100%";
        } else {
            articles[i].style.display = "none";
            articles[i].classList.remove("active");
        }
    }
    for (var i = 0; i < topNav.length; i++) {
        if (topNav[i].getAttribute("data-id") == activeDataId) {
            topNav[i].classList.add("active")
        } else {
            topNav[i].classList.remove("active");
        }
    }
}

// Apply event listner to nav menu item
var navItem = document.querySelectorAll(".topNav li:not(:first-child)");
navItem.forEach((item) => {
    item.addEventListener("click", navMenuItemSelect);
})


// CONTENT SECTION

// All movies displayed on home page
var allFeaturedMovies = [];

// Function fetches data for movies in moviesList and stroes in given storageAddress
async function fetchMovieData(moviesList, storageAddress) {
    for (var i = 0; i < moviesList.length; i++) {
        try {
            const movie = await fetch("http://www.omdbapi.com/?t=" + moviesList[i] + "&apikey=55a1897f");
            const movieJson = await movie.json();
            if(movieJson["Response"] == "False"){
                throw new Error("something worng");
            }
            storageAddress.push(movieJson);
        } catch (error) {
            alertNotification(moviesList[i] + " Not Found !!!");
            console.log("No movie found for movie name " + moviesList[i]);
        }
    }
}

async function fetchMovieFromID(imdbID, arrarToPushTo) {
    try {
        const movie = await fetch("http://www.omdbapi.com/?i=" + imdbID + "&apikey=55a1897f");
        const movieJson = await movie.json();
        arrarToPushTo.push(movieJson);
    } catch (error) {
        console.log(error);
        console.log("No movie found with id " + imdbID);
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
    for (var i = 0; i < upcomingMoviesData.length; i++) {
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
var hollywoodMovieFetchCall = fetchMovieData(hollywoodMoviesList, hollywoodMoviesData)
    .then(insertHollywoodMovies);

// Function to insert movies in featured list into the featured section
function insertHollywoodMovies() {
    allFeaturedMovies.push(...hollywoodMoviesData);

    for (var i = 0; i < hollywoodMoviesData.length; i++) {
        const newPoster = document.createElement("div");
        newPoster.innerHTML = '<img src=' + hollywoodMoviesData[i]["Poster"] + '>';
        var hollywoodContainer = document.querySelector("#hollywood div.carausel");
        hollywoodContainer.appendChild(newPoster);
    }
}

// MOVIES SECTION
// Movie section default movie is the first movie in hollywood section
async function setDefaultMovieSection() {
    try {
        await hollywoodMovieFetchCall;
        displayMovieDetails(hollywoodMoviesData[2]["Poster"]);
    } catch {
        console.log("someting wrong in movies section-setting default");
    }
}
setDefaultMovieSection();

function displayMovieDetails(url) {
    var m = allFeaturedMovies.filter((item) => {
        return item["Poster"] == url;
    })[0];

    var movieSection = document.getElementById("movies");

    movieSection.innerHTML =
        '<div id="mTitle">' + m["Title"] + '</div>' +
        '<div id="mPoster"> <img src="' + m["Poster"] + '"></div>' +
        '<button id="' + m["imdbID"] + '">Add To Favourites</button>' +
        '<div id="mPlot">' + m["Plot"] + '</div>' +
        '<div id="mRating">IMDB Rating</div> <div>' + m["imdbRating"] + '</div>' +
        '<div id="mGenre">Genre</div> <div>' + m["Genre"] + '</div>' +
        '<div id="mRuntime">Run Time</div> <div>' + m["Runtime"] + '</div>' +
        '<div id="mLanguage">Languages</div> <div>' + m["Language"] + '</div>' +
        '<div id="mRelease">Release Data</div> <div>' + m["Released"] + '</div>' +
        '<div id="mCollection">Box Office Collection</div> <div>' + m["BoxOffice"] + '</div>' +
        '<div id="mActors">Actors</div> <div>' + m["Actors"] + '</div>' +
        '<div id="mDirector">Director</div> <div>' + m["Director"] + '</div>' +
        '<div id="mWriter">Writer</div> <div>' + m["Writer"] + '</div>' +
        '<div id="mAward">Awards</div> <div>' + m["Awards"] + '</div>';
}

// FAVOURITE SECTION

// Favrauite movie list
var favouriteMovies = [];
async function setDefaultFavourites() {
    try {
        await hollywoodMovieFetchCall;
        if (favouriteMovies.length == 0) {
            favouriteMovies.push(hollywoodMoviesData[0]);
            favouriteMovies.push(hollywoodMoviesData[1]);
            localStorage.setItem(0, JSON.stringify(favouriteMovies[0]));
            localStorage.setItem(1, JSON.stringify(favouriteMovies[1]));
        }
        displayFavouriteMovies();
    } catch {
        console.log("someting wrong in favourites section-setting default")
    }
}
setDefaultFavourites();

function displayFavouriteMovies() {
    var favSection = document.getElementById("favourites");
    var htmlStr = "";

    for (var i = 0; i < favouriteMovies.length; i++) {
        htmlStr += '<div id="container">' +
            '<div id="fTitle" class="secondaryHeading">' + favouriteMovies[i]["Title"] + '</div>' +
            '<div id="fPoster"><img src="' + favouriteMovies[i]["Poster"] + '"></div>' +
            '<button id="' + favouriteMovies[i]["Poster"] + '">Remove From Favourites</button>' +
            '</div>';
    }

    favSection.innerHTML = htmlStr;
}
async function addToFavourites(imdbID) {
    try{
        var exist = favouriteMovies.filter((item)=>{
            return item["imdbID"] == imdbID;
        });

        if(exist.length == 0){
            await fetchMovieFromID(imdbID,favouriteMovies)
            updateLocalStorage();
            alertNotification("Movie Added To Favourites");
        } else {
            alertNotification("Already added to Favourites")
        }
    } catch(error) {
        console.log(error);
        console.log("Error in adding movie to favourites")
    } 
}

function removeFromFavourites(url) {
    favouriteMovies = favouriteMovies.filter((item) => {
        return item["Poster"] != url;
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.clear();
    for (var i = 0; i < favouriteMovies.length; i++) {
        localStorage.setItem(i, JSON.stringify(favouriteMovies[i]));
    }
    displayFavouriteMovies();
}

function onLoadLocalStorageUpdateFav() {
    for (var i = 0; i < localStorage.length; i++) {
        favouriteMovies.push(JSON.parse(localStorage.getItem(i)));
    }
}

function alertNotification(text){
    alert(text);
}


// SEARCH FUNCTIONALITY
// function to activate search bar
var searchIcon = document.querySelector("#searchIcon>i");
var searchBar = document.querySelector("#searchIcon>input");
searchIcon.addEventListener("click", searchIconClick);

function searchIconClick() {
    var searchContainer = document.querySelector("#searchIcon");

    if (searchContainer.classList.contains("searchActive")) {
        searchContainer.classList.remove("searchActive");
        searchBar.classList.add("noDisplay");
        // If user types nothing then close the search bar
        if(searchBar.value == ""){
            return;
        }
        searchMovie(searchBar.value);
        searchBar.value = "";
    } else {
        searchContainer.classList.add("searchActive");
        searchBar.classList.remove("noDisplay");
    }
}

// Search movie when enter is pressed
function searchOnEnter(event){
    if(event.key == "Enter"){
        searchIconClick();
    }
}
searchBar.addEventListener("keydown",searchOnEnter);

// Convert text entered in search bar to valid search term
function nameToSearchTerm(title){
    var newTitle = "";
    for(let char of title){
        if(char == " "){
            newTitle += "+";
        } else {
            newTitle += char;
        }
    }
    return newTitle;
}

// Function for search bar
async function searchMovie(title){
    try{
        var movieList = [nameToSearchTerm(title)];
        await fetchMovieData(movieList,allFeaturedMovies);
        var movieDetails = allFeaturedMovies[allFeaturedMovies.length - 1];
        displayMovieDetails(movieDetails["Poster"]);
        displayActiveArticle(2);
    } catch (error){
        console.log(error);
        console.log("Not able to search for the movie");
    }
}


// Event Deligation
function eventDeligation(event) {
    if (event.target.tagName == "IMG") {
        displayMovieDetails(event.target.getAttribute("src"));
        displayActiveArticle(2);
    }

    if (event.target.tagName == "BUTTON" && event.target.textContent == "Remove From Favourites") {
        removeFromFavourites(event.target.getAttribute("id"));
    }

    if (event.target.tagName == "BUTTON" && event.target.textContent == "Add To Favourites") {
        addToFavourites(event.target.getAttribute("id"));
    }
}
window.addEventListener("click", eventDeligation);

// Initialize the movie app on load
function iniializeApp() {
    displayActiveArticle(1); // show default tab on screen
    onLoadLocalStorageUpdateFav();
}
window.addEventListener("load", iniializeApp);