$(document).ready(function(){
    $("#user").html("<b>Hi, " + sessionStorage.getItem("name") + "</b>");
});