// Frame or Windows Events

window.onload = ()=>{
    console.log("Windows loaded successfully!");
}

window.onerror = ()=>{
    console.log("Some error occured in Windows");
}

window.onabort = ()=>{
    console.log("Window aborted during lodding!");
}

window.onunload = ()=>{
    console.log("Windows unloaded successfully!");
}

window.onbeforeunload = ()=>{
    console.log("Windows will be reload");
    // it occurred befor reload window.
}


window.onscroll = ()=>{
    console.log("window scrolled");
    // When we scroll the page
}

window.onresize = ()=>{
    console.log("Window resized");
    // When windows resized
}


window.onoffline = ()=>{
    console.log("onoffline is called");
    // when page is going to be offline
}

window.ononline = ()=>{
    console.log("ononline is called");
    // when page is coming to be online
}


window.onbeforeprint = ()=>{
    console.log("You called print command");
    // befor we press ctrl+p and print something
}
window.onafterprint = ()=>{
    console.log("Your document is printed successfully");
    // after we press ctrl+p and print something
}


window.onmessage = ()=>{
    console.log("onmessage is called");
    // when a message is received through an event source.
}

window.onpopstate = ()=>{
    console.log("onpopstate is called");
    // When window histry will be changed.
}

window.onstorage = ()=>{
    console.log("onstorage is called");
    //  when web Storage area is updated
}


window.undo = ()=>{
    console.log("You are redo something");
}
window.redo = ()=>{
    console.log("You are undo something");
}

window.onreadystatechange = ()=>{
    console.log("window is ready to change thire state");
    // when the readyState attribute of a document has changed.
}


