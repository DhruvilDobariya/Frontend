$(document).ready(function(){
    $("#btn1").click(function(){
        $("#content1").hide("slow");
        alert("Content 1 hide");
    });
    

    $("#btn2").click(function(){
        var callback = new $.Callbacks();

        callback.add(fun1);
        callback.fire();
        console.log("fun1 fired");

        callback.add(fun2);
        callback.fire("fun 2 fierd");
    });
});

function fun1(){
    $("#content2").hide("slow");
}
function fun2(){
    alert("Content 2 hide");
}