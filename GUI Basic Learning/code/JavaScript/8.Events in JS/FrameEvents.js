function onLoad(){
    console.log("Image 1 load successfully!");
}

function onError(){
    console.log("Some error occured in Image 2");
}

function onAbort(){
    console.log("Image 3 aborted during lodding!");
}

function onResize(){
    console.log("Image 4 resized");
}

function resizeImage(){
    document.getElementById("img4").setAttribute("width", (document.getElementById("width").value + "px"))
    document.getElementById("img4").setAttribute("height", document.getElementById("height").value + "px")
}

// function loadImage(element){
//     element.parentElement.children[1].src = "../../Images/background.jfif";
// }

// function unLoadImage(element){
//     // element.parentElement.removeChild(element.parentElement.children[1])
//     element.parentElement.children[1].src = "";
//     element.parentElement.children[1].dispatchEvent(onunload);
// }