$(document).ready(function () {
    // Default:
    // $("#datepicker").datepicker();

    // Date in other months
    // $("#datepicker").datepicker({
    //     showOtherMonths: true,
    //     selectOtherMonths: true,
    // });

    // display button bar
    // $("#datepicker").datepicker({
    //     showButtonPanel: true,
    // });

    // Display month and year menu
    // $("#datepicker").datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    // });

    // Display multiple month
    // $("#datepicker").datepicker({
    //     numberOfMonths: 3,
    // });

    // show icon
    // $("#datepicker").datepicker({
    //     showOn: "button",
    //     buttonImage: "../assets/images/favicon.png",
    //     buttonImageOnly: true,
    //     buttonText: "Select data",
    // });

    // date limit
    // $("#datepicker").datepicker({
    //     minDate: -20,
    //     maxDate: "+1M +10D",
    // });

    // display week
    // $("#datepicker").datepicker({
    //     showWeek: true,
    //     firstDay: 1,
    // });

    // date format
    // $("#datepicker").datepicker({
    //     dateFormat: "dd-mm-yy",
    // });

    // animation
    // we have many animation options like, show, slideDown, fadeIn, blind, bounce, clip, drop, fold, slide
    $("#datepicker").datepicker({
        showAnim: "show",
    });
});
