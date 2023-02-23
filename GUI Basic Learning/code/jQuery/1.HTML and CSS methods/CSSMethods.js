$(document).ready(function(){
    $("#content1").css("color","red");
    console.log($("#content1").css("color"));
    
    $("#btnAdd").click(function(){
        $("#content2").addClass("text-danger");
    });
    $("#btnRemove").click(function(){
        $("#content2").removeClass("text-danger");
    });
    $("#btnToggle").click(function(){
        $("#content2").toggleClass("text-danger");
        console.log($("#content2").hasClass("text-danger"));
    });
})