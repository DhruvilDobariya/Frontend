function openPopup() {
    const controlInstances = [$("<div>").append($("<label>").text("Name"), $("<input>").attr({ type: "text", id: "name", class: "form-control" })), $("<div>").append($("<label>").text("Email"), $("<input>").attr({ type: "email", id: "email", class: "form-control" }))];
    controlInstances.push($("<div>").append($("<button>").attr({ type: "button", class: "btn btn-primary", id: "saveBtn" }).text("Save")));

    controlInstances.forEach(control => {
        if (control.children().first().attr("type") === "button") {
            $("#popupFTContainer").append(control);
        } else {
            $("#popupContainer").append(control);
        }
    });
    $("#saveBtn").on("click", function () {
        const name = $("#name").val();
        const email = $("#email").val();
        addTableRow(name, email);
        $("#popupModal").modal("hide");
    });
}
