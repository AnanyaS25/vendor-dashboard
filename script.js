document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    } else {
        console.error("Dark Mode Toggle button not found!");
    }

    // Fetch CSV Data Locally
    fetchVendorData();
});

// ✅ Fetch from `vendors.csv` (Local File)
async function fetchVendorData() {
    try {
        const response = await fetch("vendors.csv"); // Local CSV file
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const csvText = await response.text();
        const data = csvToArray(csvText);
        console.log("Fetched Data:", data); // Debugging

        // Populate table & chart
        populateTable(data);
        populateChart(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// ✅ Convert CSV Text to Array
function csvToArray(str, delimiter = ",") {
    return str.trim().split("\n").map(row => row.split(delimiter));
}

// ✅ Populate Vendor Table
function populateTable(data) {
    const tableBody = document.querySelector("#vendorTable tbody");
    if (!tableBody) {
        console.error("Table body not found!");
        return;
    }

    tableBody.innerHTML = ""; // Clear previous data

    if (data.length < 2) {
        console.error("No valid data found in CSV");
        return;
    }

    // Assuming first row is headers
    for (let i = 1; i < data.length; i++) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${data[i][0]}</td> <!-- Vendor Name -->
            <td>${data[i][1]}</td> <!-- Final Score -->
            <td>${data[i][2]}</td> <!-- Final Rank -->
            <td>${data[i][3]}</td> <!-- Compliance -->
        `;

        // Highlight performance issues
        if (parseFloat(data[i][1]) < 70) row.style.backgroundColor = "#ffdddd"; // Red for low scores

        tableBody.appendChild(row);
    }
}

// ✅ KPI Trend Chart using Chart.js
function populateChart(data) {
    const ctx = document.getElementById("kpiChart").getContext("2d");
    if (!ctx) {
        console.error("Chart container not found!");
        return;
    }

    const vendorNames = data.slice(1).map(row => row[0]); // Vendor Names
    const finalScores = data.slice(1).map(row => parseFloat(row[1])); // Final Scores

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: vendorNames,
            datasets: [{
                label: "Final Score",
                data: finalScores,
                backgroundColor: "steelblue"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}
