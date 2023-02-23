$(document).ready(function(){
    // It use pixel unit.
    // Get Dimension
    console.log($("#img1").height()); // Content height
    console.log($("#img1").width()); // Content width
    console.log($("#img1").innerHeight()); // Content height with padding
    console.log($("#img1").innerWidth()); // Content width with padding
    console.log($("#img1").outerHeight()); // Content height with padding and border
    console.log($("#img1").outerWidth()); // Content width with padding and border
    console.log($("#img1").outerHeight(true)); // Content height with padding, border and margin
    console.log($("#img1").outerWidth(true)); // Content width with padding, border and margin

    // Set Dimension
    $("#img2").height(100);
    $("#img2").width(200);
    $("#img2").innerHeight(110);
    $("#img2").innerWidth(220);
    $("#img2").outerHeight(112);
    $("#img2").outerWidth(222);
    $("#img2").outerHeight(133.5,true);
    $("#img2").outerWidth(245,true);
});