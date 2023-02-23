$(document).ready(function(){
    $("#btn1").click({x:1},function(event){
        console.log(event.target);
        console.log(event.currentTarget);
        console.log(event.data.x);
        console.log(event.delegateTarget);
        console.log(event.timeStamp);
        console.log(event.type);
        console.log(event.which);
    });

    $("#txt1").keyup(function(event){
        console.log(event.which);
    });

    $(window).mousemove(function(event){
        $("#lblPosition").text(event.pageX + " " + event.pageY);
    });

    $("#action1").click(function(event){
        event.preventDefault(); // prevent default event, that means it prevent redirection of action tag
        console.log(event.isDefaultPrevented()); // it give boolean value based on event is prevent or not.
    })

    $("#btn2").click(function(event){
        event.stopPropagation();
        console.log("this is")
    });
    
    $("#div1, #p1").mouseenter(function(event){
        console.log(event.relatedTarget.nodeName);
    });
    
    $("#btn3").click(function(){
        ans = parseInt($("#num1").val()) + parseInt($("#num2").val());
        return ans;
    });
    $("#btn3").click(function(event){
        console.log(event.result);
    });

    // Diffrence between stopPropagation and stopImmediatePropagation
    // Say, if you have a <table>, with <tr>, and then <td>. Now, let's say you set 3 event handlers for the <td> element, then if you do event.stopPropagation() in the first event handler you set for <td>, then all event handlers for <td> will still run, but the event just won't propagate to <tr> or <table> (and won't go up and up to <body>, <html>, document, and window).

    // Now, however, if you use event.stopImmediatePropagation() in your first event handler, then, the other two event handlers for <td> WILL NOT run, and won't propagate up to <tr>, <table> (and won't go up and up to <body>, <html>, document, and window).

    // stopPropagation
    $("#span1").click(function(event){
        alert("Span clicked");
        event.stopPropagation();
        console.log(event.isPropagationStopped());
        // here we can also use stopImmediatePropagation.
    });
    $("#p2").click(function(){
        alert("Paragraph clicked");
    });
    $("#div2").click(function(){
        alert("div clicked");
    });

    // stopImmediatePropagation
    $("#div3").click(function(event){
        alert("handler 1 exicuted");
        event.stopImmediatePropagation();
        console.log(event.isImmediatePropagationStopped());
        // here we can't use stopPropagation
    });
    $("#div3").click(function(){
        alert("handler 2 exicuted");
    });
    $("#div3").click(function(){
        alert("handler 3 exicuted");
    });
});