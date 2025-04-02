async function fetchSheetData() {
    const url = "https://script.google.com/macros/s/AKfycbwhWXPIlprvPx1nOBNcqLYxn3gKnV0iMjamIcnv_N9JXtlXal3Xvw4oiGO6a7cgUzsdOw/exec";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging: Check if data is received

        updateTable(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateTable(data) {
    const tableBody = document.querySelector("#vendorTable tbody");
    tableBody.innerHTML = ""; // Clear previous data

    for (let i = 1; i < data.length; i++) {  // Skip header row
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data[i][0]}</td>  <!-- Vendor Name -->
            <td>${data[i][1]}</td>  <!-- Final Score -->
            <td>${data[i][2]}</td>  <!-- Final Rank -->
            <td>${data[i][3]}</td>  <!-- Compliance -->
        `;

        tableBody.appendChild(row);
    }
}

// Sorting Function
function sortTable(columnIndex) {
    const table = document.getElementById("vendorTable");
    const rows = Array.from(table.rows).slice(1); // Ignore the header row

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        return isNaN(cellA) ? cellA.localeCompare(cellB) : cellA - cellB;
    });

    rows.forEach(row => table.appendChild(row)); // Reattach rows in sorted order
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Refresh Data Button
document.getElementById("refreshData").addEventListener("click", fetchSheetData);

// Search Functionality
document.getElementById("searchBox").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll("#vendorTable tbody tr");

    rows.forEach(row => {
        const vendorName = row.cells[0].textContent.toLowerCase();
        row.style.display = vendorName.includes(searchValue) ? "" : "none";
    });
});

// Compliance Filter
document.getElementById("filterCompliance").addEventListener("change", function () {
    const selectedValue = this.value;
    const rows = document.querySelectorAll("#vendorTable tbody tr");

    rows.forEach(row => {
        const compliance = row.cells[3].textContent;
        row.style.display = (selectedValue === "all" || compliance === selectedValue) ? "" : "none";
    });
});

// Load Data When Page Loads
document.addEventListener("DOMContentLoaded", fetchSheetData);
