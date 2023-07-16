const tableSessions = document.getElementById("table-sessions");

const createSessionBtn = document.getElementById("create-session");

const closeAllSessionBtn = document.getElementById("close-all-sessions");

const storedData = localStorage.getItem("sessionData");
const sessionIdCookie = getCookieValue("sessionId");

const assignedPortCookie = getCookieValue("assignedPort");


// Function for adding a row to the table
function addSessionRow(sessionId, assignedPort) {
    const row = tableSessions.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    cell1.innerHTML = sessionId;
    cell2.innerHTML = assignedPort;
}

function getCookieValue(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return "";
}

// Function for retrieving saved session data from cookies
function getSavedSessionData() {
    const cookies = document.cookie.split("; ");
    const sessionData = [];
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0].startsWith("session_")) {
            const { sessionId, assignedPort } = JSON.parse(cookie[1]);
            sessionData.push({ sessionId, assignedPort });
        }
    }
    return sessionData;
}

// Function for saving session data as cookies
function saveSessionDataToCookies(sessionData) {
    for (let i = 0; i < sessionData.length; i++) {
        const { sessionId, assignedPort } = sessionData[i];
        document.cookie = `session_${i}=${JSON.stringify({ sessionId, assignedPort })}`;
    }
}

// Check if there is any saved data in the cookie
const savedSessionData = getSavedSessionData();
if (savedSessionData.length > 0) {
    for (let i = 0; i < savedSessionData.length; i++) {
        const { sessionId, assignedPort } = savedSessionData[i];
        addSessionRow(sessionId, assignedPort);
    }
}

createSessionBtn.addEventListener("click", function () {
    fetch("/create_session")
        .then(response => response.json())
        .then(data => {
            const { sessionId, assignedPort } = data;
            addSessionRow(sessionId, assignedPort);

            // Add the new session data to the saved array
            savedSessionData.push({ sessionId, assignedPort });

            // Update the saved session data in cookies
            saveSessionDataToCookies(savedSessionData);
        });
});

closeAllSessionBtn.addEventListener("click", function () {
    fetch("/close_all_sessions")
        .then(_ => {
            // delete all rows from table-sessions
            const rows = tableSessions.rows;
            for (let i = rows.length - 1; i >= 0; i--) {
                tableSessions.deleteRow(i);
            }

            // Delete previously saved cookies
            const savedSessionData = getSavedSessionData();
            for (let i = 0; i < savedSessionData.length; i++) {
                const { sessionId, assignedPort } = savedSessionData[i];
                document.cookie = `session_${i}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }

            // Delete the saved array and localStorage
            localStorage.removeItem("sessionData");

            alert("All sessions closed");
        });
});
