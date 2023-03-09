var hamburger = document.querySelector(".hamburger");

function responsiveMenu(){
    var navMenu = document.querySelector(".topNav");
    if(navMenu.classList.contains("responsive")){
        navMenu.classList.remove("responsive");
    } else{
        navMenu.classList.add("responsive");
    }
}

hamburger.addEventListener("click",responsiveMenu);

// Select Nav Menu Item
function navMenuItemSelect(event){
    var navMenuList = document.querySelectorAll(".topNav li");

    for(var i=0; i<navMenuList.length; i++){
        if(navMenuList[i].classList.contains("active")){
            var currentActive = navMenuList[i];
        }
    }
    
    currentActive.classList.remove("active");
    event.target.classList.add("active");

    displayActiveArticle(event.target.getAttribute("data-id"));
}

// Display active content in the content area
function displayActiveArticle(activeDataId){
    var articles = document.querySelectorAll("#content>article");

    for(var i=0; i<articles.length; i++){
        if(articles[i].getAttribute("data-id") == activeDataId){
            articles[i].style.display = "";
            // articles[i].style.width = "100%";
            // articles[i].style.height = "100%";
        } else{
            articles[i].style.display = "none";
        }
    }
}

// Apply event listner to nav menu item
var navItem = document.querySelectorAll(".topNav li:not(:first-child)");
navItem.forEach((item) => {
    item.addEventListener("click",navMenuItemSelect);
})

// display default tab
document.addEventListener("load",displayActiveArticle(1));