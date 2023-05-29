$(document).ready(function () {
    $("#select").selectpicker();

    $("#select").on("show.bs.select", function (e) {
        console.log("dropdown start to show"); // immidiatelly triggered when dropdown show event start
    });

    $("#select").on("shown.bs.select", function (e) {
        console.log("dropdown shown"); // triggered when dropdown show event end
    });

    $("#select").on("hide.bs.select", function (e) {
        console.log("dropdown start to hide"); // immidiatelly triggered when dropdown hide event start
    });

    $("#select").on("hiddem.bs.select", function (e) {
        console.log("dropdown hidden"); // triggered when dropdown hide event end
    });

    $("#select").on("refresh.bs.select", function (e) {
        console.log("dropdown refresh"); // triggered after dropdown is refresh
    });

    $("#select").on("rendered.bs.select", function (e) {
        console.log("dropdown rendered"); // triggered after dropdown is rendered
    });

    $("#select").on("loaded.bs.select", function (e) {
        console.log("dropdown shown"); // triggered after select has been initialized
    });

    $("#select").on("changed.bs.select", function (e, clickIndex, isSelected, previousValue) {
        console.log("dropdown chnaged"); // triggered after select value is changed
        console.log(clickIndex);
        console.log(isSelected);
        console.log(previousValue);
    });

    $("#hide").on("click", function () {
        $("#select").selectpicker("hide"); // hide dropdown
    });
    $("#show").on("click", function () {
        $("#select").selectpicker("show"); // show dropdown
    });
});
