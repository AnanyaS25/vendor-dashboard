async function fetchSheetData() {
    const url = "https://script.google.com/macros/s/AKfycbwhWXPIlprvPx1nOBNcqLYxn3gKnV0iMjamIcnv_N9JXtlXal3Xvw4oiGO6a7cgUzsdOw/exec"; // Working Apps Script URL

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging

        populateTable(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function populateTable(data) {
    const tableBody = document.querySelector("#vendorTable tbody");
    tableBody.innerHTML = ""; // Clear existing data

    data.forEach(row => {
        const tr = document.createElement("tr");

        row.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}

// Fetch data when the page loads
document.addEventListener("DOMContentLoaded", fetchSheetData);
