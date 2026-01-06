/** * 1. Data Object for Patients 
 * Contains all metrics and historical clinical notes for each patient.
 */
const patientData = {
    "John Smith": {
        age: 68, id: "#0001", tests: 24, trend: "Stable", 
        last: "Jan 2, 2026", rate: "95%", status: "Good",
        lineData: [74, 76, 75, 77, 78],
        notes: [
            { date: "Jan 2, 2026", dr: "Dr. Anderson", text: "Patient showing consistent performance across all motor tasks. Finger tapping shows slight improvement over the past two weeks.", recent: true },
            { date: "Dec 19, 2025", dr: "Dr. Anderson", text: "Initial assessment completed. Patient demonstrates good compliance with home testing protocol.", recent: false }
        ]
    },
    "Robert Williams": {
        age: 65, id: "#0002", tests: 18, trend: "Declining", 
        last: "Dec 28, 2025", rate: "78%", status: "Needs Attention",
        lineData: [82, 80, 78, 76, 74],
        notes: [
            { date: "Dec 28, 2025", dr: "Dr. Anderson", text: "Tremor intensity increased in right hand. Adjusting medication window.", recent: true }
        ]
    },
    "Mary Johnson": {
        age: 72, id: "#0005", tests: 31, trend: "Improving", 
        last: "Jan 3, 2026", rate: "100%", status: "Good",
        lineData: [70, 72, 75, 78, 80],
        notes: [
            { date: "Jan 3, 2026", dr: "Dr. Anderson", text: "Patient reaches 100% compliance. Motor coordination improved significantly.", recent: true }
        ]
    }
};

let activePatient = "John Smith";
let mainLineChart = null;
let modalRadarChart = null;

/** * 2. Initialization 
 */
window.onload = () => {
    initMainCharts();
    renderSidebar();
    setupEventListeners();
    loadPatient(activePatient);
};

/** * 3. Patient Management & Switching
 */
function loadPatient(name) {
    activePatient = name;
    const data = patientData[name];

    // Update Header and Metadata
    document.getElementById('activeName').innerText = name;
    document.getElementById('activeMeta').innerText = `Age: ${data.age} • Patient ID: ${data.id} • Total Tests: ${data.tests}`;
    
    // Update Summary Boxes
    document.getElementById('trendTxt').innerText = data.trend;
    document.getElementById('lastTxt').innerText = data.last;
    document.getElementById('rateTxt').innerText = data.rate;

    // Update Trend Icon
    const iconEl = document.getElementById('trendIcon');
    if (data.trend === "Stable") {
        iconEl.innerText = "—";
    } else if (data.trend === "Improving") {
        iconEl.innerHTML = "<i class='bx bx-trending-up'></i>";
    } else {
        iconEl.innerHTML = "<i class='bx bx-trending-down'></i>";
    }

    // Refresh Sidebar and Components
    renderSidebar();
    updateMainCharts(data.lineData);
    renderNotes(data.notes);
}

/** * 4. Search and Sidebar Rendering
 */
function renderSidebar() {
    const list = document.getElementById('sidebarList');
    list.innerHTML = "";
    Object.keys(patientData).forEach(name => {
        const p = patientData[name];
        const card = document.createElement('div');
        card.className = `patient-item ${name === activePatient ? 'active' : ''}`;
        card.onclick = () => loadPatient(name);
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between">
                <strong>${name}</strong> 
                <i class='bx ${p.trend === 'up' ? 'bx-trending-up text-green' : p.trend === 'down' ? 'bx-trending-down text-red' : 'bx-minus text-blue'}'></i>
            </div>
            <small>Age ${p.age} • ${p.tests} tests</small>
            <div style="display:flex; justify-content:space-between; margin-top:8px">
                <span class="p-badge ${p.status === 'Good' ? 'good' : 'danger'}">${p.status}</span>
                <span style="font-size:12px">Comp: ${p.rate}</span>
            </div>
            <div class="mini-progress-bar"><div class="fill" style="width: ${p.rate}"></div></div>
        `;
        list.appendChild(card);
    });
}

function setupEventListeners() {
    // Search Bar filtering
    document.getElementById('patientSearch').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.patient-item').forEach(card => {
            const name = card.querySelector('strong').innerText.toLowerCase();
            card.style.display = name.includes(term) ? 'block' : 'none';
        });
    });

    // Modal triggers
    document.getElementById('viewDetailsBtn').onclick = openModal;
    document.getElementById('closeModal').onclick = closeModal;
}

/** * 5. Clinical Notes Logic
 * Highlights the most recent note with a "Recent" badge.
 */
function renderNotes(notes) {
    const container = document.getElementById('notesStack');
    container.innerHTML = notes.map(note => `
        <div class="note-item ${note.recent ? 'latest' : ''}">
            <div class="note-meta">${note.date} - ${note.dr} ${note.recent ? '<span class="badge-recent">Recent</span>' : ''}</div>
            <p>${note.text}</p>
        </div>
    `).join('');
}

function addNewNote() {
    const text = prompt("Enter clinical observation for " + activePatient + ":");
    if (text) {
        const newNote = { 
            date: "Jan 4, 2026", 
            dr: "Dr. Anderson", 
            text: text, 
            recent: true 
        };
        // Reset previous notes to older state
        patientData[activePatient].notes.forEach(n => n.recent = false);
        patientData[activePatient].notes.unshift(newNote);
        renderNotes(patientData[activePatient].notes);
    }
}

/** * 6. Charts & Visualization 
 * Uses Chart.js for Overall Trends and Radar profiles.
 */
function initMainCharts() {
    const ctxLine = document.getElementById('mainLineChart');
    mainLineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{ 
                label: 'Performance Score', 
                data: [], 
                borderColor: '#14b8a6', 
                backgroundColor: 'rgba(20, 184, 166, 0.1)',
                tension: 0.4, 
                fill: true 
            }]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 70, max: 85 } } }
    });
}

function updateMainCharts(newData) {
    if (mainLineChart) {
        mainLineChart.data.datasets[0].data = newData;
        mainLineChart.update();
    }
}

/** * 7. Modal Management 
 */
function openModal() {
    document.getElementById('detailsModal').style.display = 'block';
    renderRadar(); 
}

function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

function renderRadar() {
    const ctx = document.getElementById('radarChart');
    if (modalRadarChart) modalRadarChart.destroy();
    modalRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Speed', 'Amplitude', 'Consistency', 'Coordination', 'Endurance'],
            datasets: [{
                data: [82, 76, 88, 74, 79],
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                borderColor: '#14b8a6'
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });
}

function downloadReport() {
    alert("Generating PDF report for " + activePatient + "...");
}
function initMainLineChart(data) {
    const ctx = document.getElementById('mainLineChart').getContext('2d');
    
    // Create soft teal gradient for the fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(20, 184, 166, 0.15)');
    gradient.addColorStop(1, 'rgba(20, 184, 166, 0.01)');

    if (mainLineChart) mainLineChart.destroy();

    mainLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Dec 10', 'Dec 17', 'Dec 24', 'Dec 31', 'Jan 7'],
            datasets: [{
                data: data,
                borderColor: '#14b8a6', // Primary Teal
                borderWidth: 3,
                backgroundColor: gradient,
                fill: true,
                tension: 0.4, // Smooth Monotone Curve
                pointBackgroundColor: '#14b8a6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    min: 70, max: 85, // Focused domain
                    ticks: { stepSize: 4, color: '#64748b' },
                    grid: { borderDash: [5, 5], color: '#e2e8f0' }
                },
                x: {
                    ticks: { color: '#64748b' },
                    grid: { display: false }
                }
            }
        }
    });
}
function initMainBarChart() {
    const ctx = document.getElementById('mainBarChart');
    if (mainBarChart) mainBarChart.destroy();

    mainBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                { label: 'Finger Tapping', data: [75, 77, 76, 78], backgroundColor: '#14b8a6', borderRadius: 4 },
                { label: 'Hand Flip', data: [78, 79, 77, 80], backgroundColor: '#3b82f6', borderRadius: 4 },
                { label: 'Hand Open/Close', data: [72, 74, 73, 75], backgroundColor: '#8b5cf6', borderRadius: 4 },
                { label: 'Finger to Nose', data: [80, 81, 79, 82], backgroundColor: '#f59e0b', borderRadius: 4 }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, padding: 20, color: '#64748b' } }
            },
            scales: {
                y: {
                    beginAtZero: true, max: 100, // Full scale
                    ticks: { stepSize: 25, color: '#64748b' },
                    grid: { borderDash: [5, 5], color: '#e2e8f0' }
                },
                x: {
                    ticks: { color: '#64748b' },
                    grid: { display: false }
                }
            }
        }
    });
}