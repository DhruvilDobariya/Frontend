function onClick(){
    console.log("Click event occurred!");
}

function onDoubleClick(){
    console.log("Double Click event occurred!");
}

function onMouseEnter(){
    console.log("Mouse Eneter event occurred!");
}

function onMouseLeave(){
    console.log("Mouse Leave event occurred!");
}

function onMouseOver(){
    console.log("Mouse Over event occurred!");
}

function onMouseOut(){
    console.log("Mouse Out event occurred!");
}

function onMouseUp(){
    console.log("Mouse Up event occurred!");
}

function onMouseDown(){
    console.log("Mouse Down event occurred!");
}

function onMouseWheel(){
    console.log("Mouse Wheel event occurred!");
}

function MouseOver(element){
    element.children[0].innerHTML = "Mouse Over occurred : " + (parseInt(element.children[0].innerHTML.split(":")[1]) + 1);
}

function MouseEnter(element){
    element.children[0].innerHTML = "Mouse Over occurred : " + (parseInt(element.children[0].innerHTML.split(":")[1]) + 1);
}

function MouseOut(element){
    element.children[0].innerHTML = "Mouse Over occurred : " + (parseInt(element.children[0].innerHTML.split(":")[1]) + 1);
}

function MouseLeave(element){
    element.children[0].innerHTML = "Mouse Over occurred : " + (parseInt(element.children[0].innerHTML.split(":")[1]) + 1);
}