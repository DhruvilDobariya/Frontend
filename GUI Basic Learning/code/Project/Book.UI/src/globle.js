$(document).ready(function () {
    if (localStorage.getItem("name") != null) {
        $("#user").html("<b>Hi, " + localStorage.getItem("name") + "</b>");
    } else {
        $("#user").html("<b>Hi, " + sessionStorage.getItem("name") + "</b>");
    }
});
