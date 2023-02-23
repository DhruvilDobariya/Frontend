$(document).ready(function(){
    // Get text, html, value, attribute and proparty
    console.log($("#content1").text());
    console.log($("#content1").html());
    console.log($("#input1").val());
    console.log($("#input1").attr("type"));
    
    // Set text, html and value
    $("#content2").text("New Text");
    $("#content2").html('New Text <b>New HTMl</b> <input type="text" name="" id="input2" value="Dhruvil Dobariya">');
    $("#input2").val("New Dhruvil Dobariya");
    $("#input2").removeAttr("type"); // Remove HTML attribute
    $("#input2").attr("placeholder", "Name");
    $("#input1").removeProp("id"); // Remove DOM proparty
    $("#input1").prop("placeholder", "Name");

    // Prepend, Append and After, Before and PrependTo, AppendTo and insert
    $("#list1").prepend('<li id="item5">5</li>');
    $("#list1").append('<li id="item6">6</li>');

    $("#item2").after('<li id="item7">7</li>');
    $("#item2").before('<li id="item8">8</li>');

    $('<li id="item9">9</li>').prependTo("#item4");
    $('<li id="item10">10</li>').appendTo("#item4");

    $('<li id="item11">11</li>').prependTo("#item3");
    $('<li id="item12">12</li>').appendTo("#item3");

    // Emprty : remove all child
    $("#list2").empty();

    // Clone
    $("#div").clone().appendTo("body");

    // Detach
    $("#detach").detach();

    // Offset
    console.log($("#offset").offset());
    $("#offset").offset().top = 800;
    $("#offset").offset().left = 20;
    console.log($("#offset").offsetParent());

    // Position
    console.log($("#position").position());
    $("#position").position().top = 800;
    $("#position").position().left = 20;
    
    // Remove
    $("#remove").remove();

    // Replace
    $("<i>Replace All</i>").replaceAll(".replaceAll");
    $(".replaceWith").replaceWith("<b>Replace with</b>");
});