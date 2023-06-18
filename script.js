const containers = [...document.getElementsByClassName("container")];
const roadmapParst = [...document.getElementsByClassName("roadmap-part")];
const roadmapCircles = [...document.getElementsByClassName("roadmap-circle")];
const musicContainer = document.getElementsByClassName("music__container")[0];


const ratings = [
    {url: "https://open.spotify.com/embed/track/7Dt8Wo4xOk8nCURko8g2Jh?utm_source=generator", rating: 9},
    {url: "https://open.spotify.com/embed/track/1sg1GCp3lRZzyuqBXoy599?utm_source=generator", rating: 5},
    {url: "https://open.spotify.com/embed/track/4deOFCxaBQ9uYqmD5bhmXW?utm_source=generator", rating: 7}
]

const darkThemeColors = [
    {key: "--primary-text-color", value: "#dcdcff"},
    {key: "--secondary-text-color", value: "#ba9ffb"},
    {key: "--durability-text-color", value: "#8b8b8b"},
    {key: "--icon-color", value: "#6a737d"},
    {key: "--border-color", value: "#575757"},
    {key: "--text-decoration-color", value: "#5a4a83"},
    {key: "--hover-color", value: "#7860da"},
    {key: "--background-color", value: "#282828"},
    {key: "--soft-background-color", value: "#2b2c3d"},
]

const lightThemeColors = [
    {key: "--primary-text-color", value: "#181820"},
    {key: "--secondary-text-color", value: "#5c5c62"},
    {key: "--durability-text-color", value: "#6a737d9c"},
    {key: "--icon-color", value: "#6a737d"},
    {key: "--border-color", value: "#f5f5f5"},
    {key: "--text-decoration-color", value: "#ff9a00"},
    {key: "--hover-color", value: "#ffc400"},
    {key: "--background-color", value: "#fff"},
    {key: "--soft-background-color", value: "#ffecc3"},
]

let displayedContainers = [-1, 0, 1]; //indexes of the displayed containers

let theme = "light";

window.moveDown = () => {
    displayedContainers = displayedContainers.map(e => e + 1);
    moveContainers();
}

window.moveUp = () => {
    displayedContainers = displayedContainers.map(e => e - 1);
    moveContainers();
}


function updateRoadmap(lastActiveIndex) {

    for (const key in roadmapParst) {
        
        if(key <= lastActiveIndex && !roadmapParst[key].classList.contains("roadmap-part__active")) {
            roadmapParst[key].classList.add("roadmap-part__active");
        }
    }
    for (const key in roadmapCircles) {
        
        if(key <= lastActiveIndex && !roadmapCircles[key].classList.contains("roadmap-circle__active")) {
            roadmapCircles[key].classList.add("roadmap-circle__active");
        }
    }
}

function moveContainers() {
    updateRoadmap(displayedContainers[1])
    for (const key in containers) {

        if (Number(key) === displayedContainers[0]) {
            containers[key].style.transform = "scale(0.5,0.5)";
            containers[key].style.transform += "translate(0px,-600px)";
            containers[key].style.zIndex = "0";
        }
        else if (Number(key) === displayedContainers[1]) {
            containers[key].style.transform = "";
            containers[key].style.zIndex = "1";
        }
        else if (Number(key) === displayedContainers[2]) {
            containers[key].style.transform = "scale(0.5,0.5)";
            containers[key].style.transform += "translate(0px,600px)";
            containers[key].style.zIndex = "0";
        }
        else {
            containers[key].style.transform = "scale(0)";
        }
    }
}

window.moveContainersToPosition = (pos) => {
    displayedContainers = [pos-1, pos, pos+1]
    moveContainers();
}

window.changeTheme = () => {
    let root = document.querySelector(':root');
    
    let colors = theme === "light" ? darkThemeColors : lightThemeColors
    
    for (const color of colors) {
        root.style.setProperty(color.key, color.value);
    }

    theme = theme === "light" ? "dark" : "light";
}

function musicBuilder() {
    for (const rating of ratings) {

        let musicBlock = document.createElement("div");

        let musicIframe = document.createElement("iframe")

        let musicRating = document.createElement("div");

        musicBlock.classList.add("music__block");

        musicRating.classList.add("music-rating");

        musicIframe.src = rating.url;
        musicIframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
        musicIframe.classList.add("music-iframe");
        musicIframe.height = "80px"

        ratingBuilder(rating.rating, musicRating);

        musicBlock.appendChild(musicIframe);
        musicBlock.appendChild(musicRating);


        musicContainer.appendChild(musicBlock);
    }
} 

function ratingBuilder(rating, musicRatingElement) {
    
    for (let i = 1; i <= 10; i++) {
        
        let musicImage = document.createElement("img");
        
        musicImage.src = "assets/silly_cat.png";
        musicImage.classList.add("music-image");

        if (i > rating) {
            musicImage.classList.add("music-image__transparent")
        }
        musicRatingElement.appendChild(musicImage);
        
    }
}
musicBuilder();
moveContainers();