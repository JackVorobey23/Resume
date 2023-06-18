let containers = [...document.getElementsByClassName("container")];

let displayedContainers = [-1, 0, 1]; //indexes of the displayed containers

let theme = "light";

let darkThemeColors = [
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

let lightThemeColors = [
    {key: "--primary-text-color", value: "#181820"},
    {key: "--secondary-text-color", value: "#5c5c62"},
    {key: "--durability-text-color", value: "#6a737d9c"},
    {key: "--icon-color", value: "#6a737d"},
    {key: "--border-color", value: "#f5f5f5"},
    {key: "--text-decoration-color", value: "#ff9a00"},
    {key: "--hover-color", value: "#ffc400"},
    {key: "--background-color", value: "#fff"},
    {key: "--soft-background-color", value: "#2b2c3d"},
]
/*
    --primary-text-color: #181820;
    --secondary-text-color: #5c5c62;
    --durability-text-color: #6a737d9c;
    --icon-color: #6a737d;
    --border-color: #f5f5f5;
    --text-decoration-color: #ff9a00;
    --hover-color: #ffc400;
    --background-color: #fff;
    --soft-background-color: #2b2c3d;
*/
window.moveDown = () => {
    displayedContainers = displayedContainers.map(e => e + 1);
    moveContainers();
}

window.moveUp = () => {
    displayedContainers = displayedContainers.map(e => e - 1);
    moveContainers();
}


function updateRoadmap(lastActiveIndex) {
    let roadmapParst = [...document.getElementsByClassName("roadmap-part")];
    let roadmapCircles = [...document.getElementsByClassName("roadmap-circle")];

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
        console.log(key);

        if (Number(key) === displayedContainers[0]) {
            containers[key].style.transform = "scale(0.5,0.5)";
            containers[key].style.transform += "translate(0px,-600px)";
            containers[key].style.zIndex = "0";

            console.log("asd")
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

moveContainers();