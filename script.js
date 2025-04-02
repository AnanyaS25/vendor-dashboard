const GOOGLE_SHEET_ID = "1YHJaJLyy8EuhaCrl0UpBz3uv3nm62YyP8WRdUTFKNzA"; 
const SHEET_NAME = "Vendor Data"; 
const API_KEY = "AIzaSyAtBVZvhYWRiuJmhVdkXlG50FU7vTie4YA"; // Replace with your new API Key

async function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    const loadingMessage = document.getElementById("loading");
    const errorMessage = document.getElementById("error");
    const tableBody = document.querySelector("#vendorTable tbody");

    try {
        // Show loading message
        loadingMessage.style.display = "block";
        errorMessage.style.display = "none";

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debugging

        if (!data.values) {
            throw new Error("No data found in the sheet.");
        }

        populateTable(data.values);
    } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.style.display = "block";
    } finally {
        loadingMessage.style.display = "none"; // Hide loading message after fetching
    }
}

function populateTable(data) {
    const tableBody = document.querySelector("#vendorTable tbody");
    tableBody.innerHTML = ""; // Clear existing data

    data.forEach((row, rowIndex) => {
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
