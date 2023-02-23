$(document).ready(function(){
    $("#btnClick").click(function(){
        console.log("Click event occurred!");
    });

    $("#btnDoubleClick").dblclick(function(){
        console.log("Double Click event occurred!");
    });

    $("#btnMouseEnter").mouseenter(function(){
        console.log("Mouse Eneter event occurred!");
    });

    $("#btnMouseLeave").mouseleave(function(){
        console.log("Mouse Leave event occurred!");
    });

    $("#btnMouseOver").mouseover(function(){
        console.log("Mouse Over event occurred!");
    });

    $("#btnMouseOut").mouseout(function(){
        console.log("Mouse Out event occurred!");
    });
    
    $("#btnMouseUp").mouseup(function(){
        console.log("Mouse Up event occurred!");
    });

    $("#btnMouseDown").mousedown(function(){
        console.log("Mouse Down event occurred!");
    });

    $(document).scroll(function(){
        console.log("Scroll event occurred!");
    });

    $("#btnHover").hover(function(){
        console.log("Mouse hover occurred!");
    });

    $(window).mousemove(function(event){
        $("#lblMouseMove").text(event.pageX + " " + event.pageY);
    });
    
});