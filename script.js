let containers = [...document.getElementsByClassName("container")];

console.log(containers);

let displayedContainers = [-1, 0, 1]; //indexes of the displayed containers


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

moveContainers();