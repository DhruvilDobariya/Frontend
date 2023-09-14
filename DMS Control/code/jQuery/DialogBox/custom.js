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
    fetch("./popup.html")
        .then(response => response.text())
        .then(html => {
            console.log(html);
            $("#container").html(html);
            prepareHTML();
            prepareDialog();
        })
        .catch(error => {
            console.error("Error loading content:", error);
        });
});
