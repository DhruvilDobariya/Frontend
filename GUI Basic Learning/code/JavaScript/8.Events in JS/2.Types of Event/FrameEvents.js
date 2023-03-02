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
}

window.onbeforeinput = ()=>{
    console.log("Script will be run");
}

window.onafterprint = ()=>{
    console.log("Script run successfully");
}

window.onhashchange = ()=>{
    console.log("onhashchange is called");
}

window.onpagehide = ()=>{
    console.log("onpagehide is called");
}

window.onmessage = ()=>{
    console.log("onmessage is called");
}

window.onresize = ()=>{
    console.log("Window resized");
}

window.onoffline = ()=>{
    console.log("onoffline is called");
}

window.ononline = ()=>{
    console.log("ononline is called");
}

window.onpopstate = ()=>{
    console.log("onpopstate is called");
}

window.onstorage = ()=>{
    console.log("onstorage is called");
}

window.onscroll = ()=>{
    console.log("window scrolled");
}