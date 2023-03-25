window.onload = () => {
    // Bubbling
    document.getElementById("Parent1").addEventListener("click", ()=>{
        console.log("Parant of bubbuling triggerd!");
    });
    document.getElementById("Child1").addEventListener("click", ()=>{
        console.log("Child of bubbuling triggerd!");
    });
    // Event proogate child to parent
    
    // Capturing
    document.getElementById("Parent2").addEventListener("click", ()=>{
        console.log("Parant of capturing triggerd!");
    }, true);
    document.getElementById("Child2").addEventListener("click", ()=>{
        console.log("Child of capturing triggerd!");
    }, true);
    // Event propogate parent to child
}