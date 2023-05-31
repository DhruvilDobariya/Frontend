$(document).ready(function () {
    // use selectpicker
    $("#select").selectpicker();

    // select based on value
    $("#select").selectpicker("val", ["4"]); // select one or more based on value
    // Or
    $("#select").val("4"); // in normal way we want to render page so we use render method
    $("#select").selectpicker("render");

    // select all
    $("#select").selectpicker("selectAll"); // it will select all options
    $("#select").selectpicker("deselectAll"); // it will deselect all options

    // mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $("#select").selectpicker("mobile"); // enable mobile
    }

    // set style
    $("#select").addClass("col-md-11").selectpicker("setStyle"); // set style on container
    $("#select").selectpicker("setStyle", "btn-danger"); // set button style

    // refresh
    // $("#select").selectpicker("refresh"); // it useed when we add or remove element and we want to refresh

    // toggle
    $("#toggle").on("click", function () {
        $("#select").selectpicker("toggle"); // open/close dropdown
    });

    // hide, show
    $("#hide").on("click", function () {
        $("#select").selectpicker("hide"); // hide dropdown
    });
    $("#show").on("click", function () {
        $("#select").selectpicker("show"); // show dropdown
    });

    $("#destroy").on("click", function () {
        $("#select").selectpicker("destroy"); // destroy dropdown
    });
});
