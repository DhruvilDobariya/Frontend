function onDrag(){
    console.log("ondrag event called");
}

function onDragStart(event){
    event.dataTransfer.setData("Text", event.target.id);
    console.log("ondragstart event called");
}

function onDragOver(event){
    event.preventDefault();
    console.log("ondropover event called");
}

function onDrop(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
    console.log("ondrop event called");
}

function onDragEnter(event){
    event.target.style.borderColor  = "red";
}

function onDragLeave(event){
    event.target.style.borderColor  = "black";
}

function onDragEnd(){
    console.log("Drag ended");
}

