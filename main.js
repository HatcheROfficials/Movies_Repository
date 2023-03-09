// JSON.parst converts string to JSON
// JSON.stringify converts JSON to string

// Display the list of 5 movies from year 2018
var title = document.getElementById("title");
var poster = document.getElementById("poster");
var plot = document.getElementById("plot");

function getSearchTerm(){
    var search = document.getElementById("searchBar");
    defaultTitle = search.value;

    fetchData();
}

var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click",getSearchTerm);

var defaultTitle = "aliens";

async function fetchData(){
    try {
        const allMovies = await fetch("http://www.omdbapi.com/?s=" + defaultTitle + "&apikey=55a1897f");
        const allMoviesJson = await allMovies.json();
        const firstMovie = await fetch("http://www.omdbapi.com/?i=" + allMoviesJson.Search[0]["imdbID"] + "&apikey=55a1897f");
        const firstMovieJson = await firstMovie.json();
        displayPoster(firstMovieJson);
    } catch(error) {
        console.log(error);
    }
}
fetchData();

function displayPoster(data){
    console.log(data);

    title.textContent = data["Title"];
    poster.src = data["Poster"];
    plot.textContent = data["Plot"];
}
    
