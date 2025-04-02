const API_URL = "https://script.google.com/macros/s/AKfycbwhWXPIlprvPx1nOBNcqLYxn3gKnV0iMjamIcnv_N9JXtlXal3Xvw4oiGO6a7cgUzsdOw/exec";

document.addEventListener("DOMContentLoaded", () => {
    fetchVendorData();
    document.getElementById("refreshData").addEventListener("click", fetchVendorData);
});

async function fetchVendorData() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging

        updateVendorTable(data);
    } catch (error) {
        console.error("Error fetching vendor data:", error);
    }
}

function updateVendorTable(vendors) {
    const tableBody = document.getElementById("vendorTableBody");
    tableBody.innerHTML = "";

    vendors.slice(1).forEach(vendor => { // Skip the first row (headers)
        let row = `<tr>
            <td>${vendor[0] || "N/A"}</td>  <!-- Vendor Name -->
            <td>${vendor[1] || "N/A"}</td>  <!-- Final Score -->
            <td>${vendor[2] || "N/A"}</td>  <!-- Final Rank -->
            <td>${vendor[3] || "N/A"}</td>  <!-- Compliance -->
        </tr>`;
        tableBody.innerHTML += row;
    });
}

