function addTableRow(name, email) {
    const tableBody = document.querySelector("tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
    `;
    tableBody.appendChild(newRow);
}

document.getElementById("addButton").addEventListener("click", () => {
    // Load the popup content into the modal
    // $.get("./popup.html", function (data) {
    //     $("#popupContainer").html(data);
    //     // Show the modal
    //     $("#popupModal").modal("show");
    // });

    fetch("./popup.html")
        .then(response => response.text())
        .then(html => {
            console.log(html);
            $("#container").html(html);
            openPopup();
            $("#popupModal").modal("show");
            // const scriptUrl = "./popup.js?nocache=" + new Date().getTime();
            // loadScript(scriptUrl, function () {
            //     // Now that popup.js is loaded, you can show the modal
            //     $("#popupModal").modal("show");
            // });
        })
        .catch(error => {
            console.error("Error loading content:", error);
        });
});

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = callback;

    document.head.appendChild(script);
}
