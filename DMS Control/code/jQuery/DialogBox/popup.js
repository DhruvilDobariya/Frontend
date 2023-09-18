function prepareHTML() {
    const controlInstances = [$("<div>").append($("<label>").text("Name"), $("<input>").attr({ type: "text", id: "name", class: "form-control" })), $("<div>").append($("<label>").text("Email"), $("<input>").attr({ type: "email", id: "email", class: "form-control" }))];
    controlInstances.push($("<div>").append($("<button>").attr({ type: "button", class: "btn btn-primary", id: "saveBtn" }).text("Save")));

    controlInstances.forEach(control => {
        $("#popupContainer").append(control);
    });
    $("#saveBtn").on("click", function () {
        let name = $("#name").val();
        let email = $("#email").val();
        addTableRow(name, email);
        $("#popupContainer").dialog("close");
    });
}

function prepareDialog() {
    $("#popupContainer").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        // button: {},
    });
}
