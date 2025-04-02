const GOOGLE_SHEET_ID = '1YHJaJLyy8EuhaCrl0UpBz3uv3nm62YyP8WRdUTFKNzA'; // Your actual Sheet ID
const SHEET_NAME = 'Vendor Data'; // Your actual Sheet Name
const API_KEY = 'AIzaSyBKH7XpxttQJOK-WUxyu7z7dVr7YF8ZXu0'; // Your actual API Key

async function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        processSheetData(data.values);
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
    }
}

function processSheetData(values) {
    if (!values || values.length === 0) {
        console.error('No data found in the sheet.');
        return;
    }

    const headers = values[0].map(header => header.trim().toLowerCase());
    const vendorData = values.slice(1).map(row => {
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] || ''; // Assign each row value to its respective column header
        });
        return obj;
    });

    console.log("Fetched Vendor Data:", vendorData); // Debugging
    displayTable(vendorData);
}

function displayTable(data) {
    const tableBody = document.querySelector('#vendorTable tbody');
    tableBody.innerHTML = ''; // Clear existing data

    data.forEach(vendor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vendor['vendor name'] || 'N/A'}</td>
            <td>${vendor['final score'] || 'N/A'}</td>
            <td>${vendor['final rank'] || 'N/A'}</td>
            <td>${vendor['compliance'] || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Call fetch function on page load
document.addEventListener('DOMContentLoaded', fetchSheetData);
