$(document).ready(function () {
    // Initial column definition
    var initialColumns = {
        column1: { title: "Column 1", width: "30%" },
        column2: { title: "Column 2", width: "70%" },
        // Add more columns as needed
    };

    // Initialize jTable
    $("#table").jtable({
        title: "Table Title",
        fields: initialColumns,
    });

    // Function to update jTable columns based on dropdown selection
    function updateColumns() {
        var updatedColumns = {
            column3: { title: "Column 3", width: "30%" },
            column4: { title: "Column 4", width: "70%" },
        };

        // Update jTable's fields
        $("#table").jtable("option", "fields", updatedColumns);

        // Refresh jTable to reflect the changes
        $("#table").jtable("load");
        // $("#table").jtable("destroy");

        // $("#table").jtable({
        //     title: "Table Title",
        //     fields: updatedColumns,
        // });
    }

    // Event listener for dropdown change
    $("#btnLoad").on("click", function () {
        updateColumns();
    });
});
