/*************************************************
 * 1. Patient Data
 *************************************************/
const patientData = {
    "John Smith": {
        age: 68, id: "#0001", tests: 24, trend: "Stable",
        last: "Jan 2, 2026", rate: "95%", status: "Good",
        lineData: [74, 76, 75, 77, 78],
        notes: [{ date: "Jan 2, 2026", dr: "Dr. Anderson", text: "Patient showing consistent performance." }]
    },
    "Mary Johnson": {
        age: 72, id: "#0005", tests: 31, trend: "Improving",
        last: "Jan 3, 2026", rate: "100%", status: "Good",
        lineData: [70, 72, 75, 78, 80],
        notes: [{ date: "Jan 3, 2026", dr: "Dr. Anderson", text: "Motor coordination improved significantly." }]
    },
    "Robert Williams": {
        age: 65, id: "#0002", tests: 18, trend: "Declining",
        last: "Dec 28, 2025", rate: "78%", status: "Needs Attention",
        lineData: [82, 80, 78, 76, 74],
        notes: [{ date: "Dec 28, 2025", dr: "Dr. Anderson", text: "Tremor intensity increased in right hand." }]
    }
};

let activePatient = "John Smith";
let mainLineChart = null;
let mainBarChart = null;

/*************************************************
 * 2. Init
 *************************************************/
window.onload = () => {
    initMainCharts();
    renderSidebar();
    setupEventListeners();
    loadPatient(activePatient);
};

/*************************************************
 * 3. Sidebar & Patient Switching
 *************************************************/
function renderSidebar() {
    const list = document.getElementById("sidebarList");
    if (!list) return;

    list.innerHTML = "";

    Object.keys(patientData).forEach(name => {
        const p = patientData[name];
        const card = document.createElement("div");
        card.className = `patient-item ${name === activePatient ? "active" : ""}`;

        card.addEventListener("click", () => loadPatient(name));

        card.innerHTML = `
            <strong>${name}</strong>
            <small>Age ${p.age} • ${p.tests} tests</small>
            <span class="badge">${p.status}</span>
        `;
        list.appendChild(card);
    });
}

function loadPatient(name) {
    activePatient = name;
    const p = patientData[name];

    document.getElementById("activeName").innerText = name;
    document.getElementById("activeMeta").innerText =
        `Age: ${p.age} • ID: ${p.id} • Tests: ${p.tests}`;

    document.getElementById("trendTxt").innerText = p.trend;
    document.getElementById("lastTxt").innerText = p.last;
    document.getElementById("rateTxt").innerText = p.rate;

    renderSidebar();
    updateMainLineChart(p.lineData);
    renderNotes(p.notes);
}

/*************************************************
 * 4. Main Charts
 *************************************************/
function initMainCharts() {
    const lineCtx = document.getElementById("mainLineChart");
    if (lineCtx) {
        mainLineChart = new Chart(lineCtx, {
            type: "line",
            data: {
                labels: ["Dec 10", "Dec 17", "Dec 24", "Dec 31", "Jan 7"],
                datasets: [{
                    data: [],
                    borderColor: "#14b8a6",
                    tension: 0.4,
                    fill: true,
                    backgroundColor: "rgba(20,184,166,0.15)"
                }]
            },
            options: { plugins: { legend: { display: false } } }
        });
    }

    const barCtx = document.getElementById("mainBarChart");
    if (barCtx) {
        mainBarChart = new Chart(barCtx, {
            type: "bar",
            data: {
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                datasets: [
                    { label: "Finger Tapping", data: [75, 77, 76, 78], backgroundColor: "#14b8a6" },
                    { label: "Hand Flip", data: [78, 79, 77, 80], backgroundColor: "#3b82f6" }
                ]
            }
        });
    }
}

function updateMainLineChart(data) {
    if (!mainLineChart) return;
    mainLineChart.data.datasets[0].data = data;
    mainLineChart.update();
}

/*************************************************
 * 5. Notes
 *************************************************/
function renderNotes(notes) {
    const stack = document.getElementById("notesStack");
    if (!stack) return;

    stack.innerHTML = notes.map((n, i) => `
        <div class="note-card ${i === 0 ? "recent" : ""}">
            <strong>${n.date} – ${n.dr}</strong>
            <p>${n.text}</p>
        </div>
    `).join("");
}

/*************************************************
 * 6. Events & Modal
 *************************************************/
function setupEventListeners() {
    const viewBtn = document.getElementById("viewDetailsBtn");
    const modal = document.getElementById("detailsModal");
    const closeBtn = document.getElementById("closeModalBtn");

    if (viewBtn && modal) {
        viewBtn.addEventListener("click", () => {
            modal.style.display = "block";
            renderRadarChart();
            renderBreakdown();
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.style.display = "none");
    }
}
