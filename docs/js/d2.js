// /** * 1. Data Object for Patients 
//  * Contains all metrics and historical clinical notes for each patient.
//  */
// const patientData = {
//     "John Smith": {
//         age: 68, id: "#0001", tests: 24, trend: "Stable", 
//         last: "Jan 2, 2026", rate: "95%", status: "Good",
//         lineData: [74, 76, 75, 77, 78],
//         notes: [{ date: "Jan 2, 2026", dr: "Dr. Anderson", text: "Patient showing consistent performance.", recent: true }]
//     },
//     "Mary Johnson": {
//         age: 72, id: "#0005", tests: 31, trend: "Improving", 
//         last: "Jan 3, 2026", rate: "100%", status: "Good",
//         lineData: [70, 72, 75, 78, 80],
//         notes: [{ date: "Jan 3, 2026", dr: "Dr. Anderson", text: "Motor coordination improved significantly.", recent: true }]
//     },
//     "Robert Williams": {
//         age: 65, id: "#0002", tests: 18, trend: "Declining", 
//         last: "Dec 28, 2025", rate: "78%", status: "Needs Attention",
//         lineData: [82, 80, 78, 76, 74],
//         notes: [{ date: "Dec 28, 2025", dr: "Dr. Anderson", text: "Tremor intensity increased in right hand.", recent: true }]
//     },
//     "James Davis": {
//         age: 70, id: "#0009", tests: 12, trend: "Stable", 
//         last: "Dec 20, 2025", rate: "85%", status: "Overdue Test",
//         lineData: [75, 75, 76, 75, 75],
//         notes: [{ date: "Dec 20, 2025", dr: "Dr. Anderson", text: "Adherence is declining; patient missed last two sessions.", recent: true }]
//     },
//     "Patricia Brown": {
//         age: 64, id: "#0012", tests: 42, trend: "Improving", 
//         last: "Jan 4, 2026", rate: "98%", status: "Good",
//         lineData: [68, 70, 74, 78, 81],
//         notes: [{ date: "Jan 4, 2026", dr: "Dr. Anderson", text: "Excellent response to new medication window.", recent: true }]
//     },
//     "Michael Miller": {
//         age: 75, id: "#0007", tests: 29, trend: "Declining", 
//         last: "Jan 1, 2026", rate: "62%", status: "Needs Attention",
//         lineData: [78, 75, 72, 70, 65],
//         notes: [{ date: "Jan 1, 2026", dr: "Dr. Anderson", text: "Significant fatigue reported during hand flip tasks.", recent: true }]
//     }
// };

// let activePatient = "John Smith";
// let mainLineChart = null;
// let mainBarChart = null;

// /** * 2. Unified Initialization 
//  */
// window.onload = () => {
//     initMainCharts();
//     renderSidebar();
//     setupEventListeners();
//     loadPatient(activePatient);
// };


 

// /** * 3. Switching Patients & Rendering Sidebar
//  */
// function renderSidebar() {
//     const list = document.getElementById('sidebarList');
//     if (!list) return;
//     list.innerHTML = "";

//     Object.keys(patientData).forEach(name => {
//         const p = patientData[name];
//         const card = document.createElement('div');
        
//         // Dynamic class for selected state
//         card.className = `patient-item ${name === activePatient ? 'active' : ''}`;
//         card.onclick = () => loadPatient(name);
        
//         // Define trend icons and status colors
//         const trendIcon = p.trend === 'Improving' ? 'bx-trending-up text-green' : 
//                           p.trend === 'Declining' ? 'bx-trending-down text-red' : 'bx-minus text-blue';
        
//         const badgeClass = p.status === 'Good' ? 'good' : 
//                            p.status === 'Needs Attention' ? 'danger' : 'warning';

//         card.innerHTML = `
//             <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
//                 <strong>${name}</strong> 
//                 <i class='bx ${trendIcon}'></i>
//             </div>
//             <small class="metadata" style="color: #64748b; font-size: 14px;">Age ${p.age} • ${p.tests} tests</small>
//             <div class="status-row" style="display:flex; justify-content:space-between; margin-top:10px; align-items:center;">
//                 <span class="p-badge ${badgeClass}" style="font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px;">
//                     ${p.status}
//                 </span>
//                 <span style="font-size: 12px; color: #64748b;">Comp: ${p.rate}</span>
//             </div>
//             <div class="mini-progress-bar" style="height: 6px; background: #e2e8f0; border-radius: 10px; margin-top: 10px; overflow: hidden;">
//                 <div class="fill" style="width: ${p.rate}; height: 100%; background: #14b8a6; transition: width 0.5s ease;"></div>
//             </div>
//         `;
//         list.appendChild(card);
//     });
// }

// function loadPatient(name) {
//     activePatient = name;
//     const data = patientData[name];

//     // Update Header
//     document.getElementById('activeName').innerText = name;
//     document.getElementById('activeMeta').innerText = `Age: ${data.age} • Patient ID: ${data.id} • Total Tests: ${data.tests}`;
    
//     // Update Profile Stats
//     document.getElementById('trendTxt').innerText = data.trend;
//     document.getElementById('lastTxt').innerText = data.last;
//     document.getElementById('rateTxt').innerText = data.rate;

//     // Update Trend Icon
//     const iconEl = document.getElementById('trendIcon');
//     if (data.trend === "Stable") iconEl.innerText = "—";
//     else if (data.trend === "Improving") iconEl.innerHTML = "<i class='bx bx-trending-up'></i>";
//     else iconEl.innerHTML = "<i class='bx bx-trending-down'></i>";

//     renderSidebar();
//     updateMainLineChart(data.lineData);
//     renderNotes(data.notes);
// }

// /** * 4. Charts Management
//  */
// function initMainCharts() {
//     const ctxLine = document.getElementById('mainLineChart');
//     if (ctxLine) {
//         mainLineChart = new Chart(ctxLine, {
//             type: 'line',
//             data: {
//                 labels: ['Dec 10', 'Dec 17', 'Dec 24', 'Dec 31', 'Jan 7'],
//                 datasets: [{ label: 'Score', data: [], borderColor: '#14b8a6', tension: 0.4, fill: true, backgroundColor: 'rgba(20, 184, 166, 0.1)' }]
//             },
//             options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 70, max: 85 } } }
//         });
//     }

//     const ctxBar = document.getElementById('mainBarChart');
//     if (ctxBar) {
//         mainBarChart = new Chart(ctxBar, {
//             type: 'bar',
//             data: {
//                 labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//                 datasets: [
//                     { label: 'Finger Tapping', data: [75, 77, 76, 78], backgroundColor: '#14b8a6' },
//                     { label: 'Hand Flip', data: [78, 79, 77, 80], backgroundColor: '#3b82f6' }
//                 ]
//             },
//             options: { maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
//         });
//     }
// }

// function updateMainLineChart(newData) {
//     if (mainLineChart) {
//         mainLineChart.data.datasets[0].data = newData;
//         mainLineChart.update();
//     }
// }

// /** * 5. Event Listeners & Notes
//  */
// function setupEventListeners() {
//     // Search Bar
//     const searchInput = document.getElementById('patientSearch');
//     if (searchInput) {
//         searchInput.addEventListener('input', (e) => {
//             const term = e.target.value.toLowerCase();
//             document.querySelectorAll('.patient-item').forEach(card => {
//                 card.style.display = card.innerText.toLowerCase().includes(term) ? 'block' : 'none';
//             });
//         });
//     }

//     // Single Logic for opening the "View Details" Modal
//     const viewBtn = document.getElementById('viewDetailsBtn');
//     if (viewBtn) {
//         viewBtn.onclick = () => {
//             const modal = document.getElementById('detailsModal');
//             modal.style.display = 'block';
            
//             // Auto-expand the KPI section and render charts
            
//             renderRadarChart();
//             renderBreakdown();
//         };
//     }

// }

// const closeModal = document.getElementById('closeModalBtn');
// const detailsModal = document.getElementById('detailsModal');

// if (closeModal && detailsModal) {
//     closeModal.onclick = () => detailsModal.style.display = 'none';
// }


//  function renderBreakdown() {
//     const data = [
//         { label: "Speed", val: 82 }, { label: "Amplitude", val: 76 },
//         { label: "Consistency", val: 88 }, { label: "Coordination", val: 74 },
//         { label: "Endurance", val: 79 }
//     ];
//     const container = document.getElementById('breakdownBars');
//     if (container) {
//         container.innerHTML = data.map(item => `
//             <div class="breakdown-item">
//                 <div class="b-label"><span>${item.label}</span><span>${item.val}%</span></div>
//                 <div class="b-track"><div class="b-fill" style="width: ${item.val}%"></div></div>
//             </div>
//         `).join('');
//     }
// }


// // Function to render notes for a specific patient
// function renderNotes(notes) {
//     const stack = document.getElementById('notesStack');
//     if (!stack) return;

//     stack.innerHTML = notes.map((note, index) => `
//         <div class="note-card ${index === 0 ? 'recent' : ''}">
//             <div class="note-header">
//                 <span>${note.date} - ${note.dr}</span>
//                 ${index === 0 ? '<span class="recent-badge">Recent</span>' : ''}
//             </div>
//             <p class="note-content">${note.text}</p>
//         </div>
//     `).join('');
// }

// // Logic for the "+ Add New Note" button
// const addBtn = document.getElementById('addNoteTrigger');
// if(addBtn){
// addBtn.addEventListener('click', () => {
//     const text = prompt(`Enter clinical observation for ${activePatient}:`);
    
//     if (text && text.trim() !== "") {
//         const newNote = {
//             // Generates current date: e.g., "Jan 4, 2026"
//             date: new Date().toLocaleDateString('en-US', { 
//                 month: 'short', 
//                 day: 'numeric', 
//                 year: 'numeric' 
//             }),
//             dr: "Dr. Anderson",
//             text: text
//         };

//         // 1. Add new note to the beginning of the active patient's array
//         patientData[activePatient].notes.unshift(newNote);

//         // 2. Re-render the notes section to reflect the change
//         renderNotes(patientData[activePatient].notes);
//     }
// });
// }
// /** * Modal & Tab Flow Logic
//  */



// // Switch Tab Logic
// document.querySelectorAll('.tab-btn').forEach(btn => {
//     btn.onclick = () => {
//         document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
//         document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
//         btn.classList.add('active');
//         const tabId = btn.getAttribute('data-tab');
//         document.getElementById(tabId).classList.add('active');

//         // Render charts for Advanced Analytics when tab is clicked
//         if(tabId === 'analytics') renderWaveformChart();
//     };
// });

// /** * Radar Chart: Motor Function Profile
//  */

// let radarChart = null;

// function renderRadarChart() {
    
//     const ctx = document.getElementById('radarChart');
    
//     if (!ctx) return;

//     if (radarChart) radarChart.destroy();

//     radarChart =new Chart(ctx, {
//         type: 'radar',
//         data: {
//             labels: ['Speed', 'Amplitude', 'Consistency', 'Coordination', 'Endurance'],
//             datasets: [{
//                 data: [82, 76, 88, 74, 79],
//                 backgroundColor: 'rgba(20, 184, 166, 0.2)',
//                 borderColor: '#14b8a6',
//                 pointBackgroundColor: '#14b8a6'
//             }]
//         },
//         options: { plugins: { legend: { display: false } } }
//     });
// }

// /** * Waveform Chart: Advanced Analytics
//  */
// let waveformChart = null;

// function renderWaveformChart() {
//     const ctx = document.getElementById('waveformChart');
//     if (!ctx) return;

//     if (waveformChart) waveformChart.destroy();

//     waveformChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: [0,1,2,3,4,5,6,7,8,9],
//             datasets: [
//                 { label: 'Tap Frequency (Hz)', data: [4.1,4.3,4.2,4,3.8,4.1,4.2,4.1,3.8,4], borderColor: '#14b8a6', tension: 0.3 },
//                 { label: 'Amplitude (cm)', data: [2.1,2.3,2.2,2,1.9,2.1,2.2,2.1,1.8,2], borderColor: '#3b82f6', tension: 0.3 }
//             ]
//         },
//         options: { maintainAspectRatio: false }
//     });
// }



/** * 1. Data Object for Patients 
 * Contains all metrics and historical clinical notes for each patient.
 */
const patientData = {
    "John Smith": {
        age: 68, id: "#0001", tests: 24, trend: "Stable", 
        last: "Jan 2, 2026", rate: "95%", status: "Good",
        lineData: [74, 76, 75, 77, 78],
        notes: [{ date: "Jan 2, 2026", dr: "Dr. Anderson", text: "Patient showing consistent performance.", recent: true }]
    },
    "Mary Johnson": {
        age: 72, id: "#0005", tests: 31, trend: "Improving", 
        last: "Jan 3, 2026", rate: "100%", status: "Good",
        lineData: [70, 72, 75, 78, 80],
        notes: [{ date: "Jan 3, 2026", dr: "Dr. Anderson", text: "Motor coordination improved significantly.", recent: true }]
    },
    "Robert Williams": {
        age: 65, id: "#0002", tests: 18, trend: "Declining", 
        last: "Dec 28, 2025", rate: "78%", status: "Needs Attention",
        lineData: [82, 80, 78, 76, 74],
        notes: [{ date: "Dec 28, 2025", dr: "Dr. Anderson", text: "Tremor intensity increased in right hand.", recent: true }]
    },
    "James Davis": {
        age: 70, id: "#0009", tests: 12, trend: "Stable", 
        last: "Dec 20, 2025", rate: "85%", status: "Overdue Test",
        lineData: [75, 75, 76, 75, 75],
        notes: [{ date: "Dec 20, 2025", dr: "Dr. Anderson", text: "Adherence is declining; patient missed last two sessions.", recent: true }]
    },
    "Patricia Brown": {
        age: 64, id: "#0012", tests: 42, trend: "Improving", 
        last: "Jan 4, 2026", rate: "98%", status: "Good",
        lineData: [68, 70, 74, 78, 81],
        notes: [{ date: "Jan 4, 2026", dr: "Dr. Anderson", text: "Excellent response to new medication window.", recent: true }]
    },
    "Michael Miller": {
        age: 75, id: "#0007", tests: 29, trend: "Declining", 
        last: "Jan 1, 2026", rate: "62%", status: "Needs Attention",
        lineData: [78, 75, 72, 70, 65],
        notes: [{ date: "Jan 1, 2026", dr: "Dr. Anderson", text: "Significant fatigue reported during hand flip tasks.", recent: true }]
    }
};

let activePatient = "John Smith";
let mainLineChart = null;

/** * 2. Unified Initialization 
 */
window.onload = () => {
    initMainCharts();
    renderSidebar();
    setupEventListeners();
    loadPatient(activePatient);
};

/** * 3. Switching Patients & Rendering Sidebar
 */
function renderSidebar() {
    const list = document.getElementById('sidebarList');
    if (!list) return;
    list.innerHTML = "";

    Object.keys(patientData).forEach(name => {
        const p = patientData[name];
        const card = document.createElement('div');
        
        card.className = `patient-item ${name === activePatient ? 'active' : ''}`;
        card.onclick = () => loadPatient(name);
        
        const trendIcon = p.trend === 'Improving' ? 'bx-trending-up text-green' : 
                          p.trend === 'Declining' ? 'bx-trending-down text-red' : 'bx-minus text-blue';
        
        const badgeClass = p.status === 'Good' ? 'good' : 
                           p.status === 'Needs Attention' ? 'danger' : 'warning';

        card.innerHTML = `
            <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
                <strong>${name}</strong> 
                <i class='bx ${trendIcon}'></i>
            </div>
            <small class="metadata" style="color: #64748b; font-size: 14px;">Age ${p.age} • ${p.tests} tests</small>
            <div class="status-row" style="display:flex; justify-content:space-between; margin-top:10px; align-items:center;">
                <span class="p-badge ${badgeClass}" style="font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px;">
                    ${p.status}
                </span>
                <span style="font-size: 12px; color: #64748b;">Comp: ${p.rate}</span>
            </div>
            <div class="mini-progress-bar" style="height: 6px; background: #e2e8f0; border-radius: 10px; margin-top: 10px; overflow: hidden;">
                <div class="fill" style="width: ${p.rate}; height: 100%; background: #14b8a6; transition: width 0.5s ease;"></div>
            </div>
        `;
        list.appendChild(card);
    });
}

function loadPatient(name) {
    activePatient = name;
    const data = patientData[name];

    document.getElementById('activeName').innerText = name;
    document.getElementById('activeMeta').innerText = `Age: ${data.age} • Patient ID: ${data.id} • Total Tests: ${data.tests}`;
    
    document.getElementById('trendTxt').innerText = data.trend;
    document.getElementById('lastTxt').innerText = data.last;
    document.getElementById('rateTxt').innerText = data.rate;

    const iconEl = document.getElementById('trendIcon');
    if (data.trend === "Stable") iconEl.innerText = "—";
    else if (data.trend === "Improving") iconEl.innerHTML = "<i class='bx bx-trending-up'></i>";
    else iconEl.innerHTML = "<i class='bx bx-trending-down'></i>";

    renderSidebar();
    updateMainLineChart(data.lineData);
    renderNotes(data.notes);
}

/** * 4. Charts Management
 */
function initMainCharts() {
    const ctxLine = document.getElementById('mainLineChart');
    if (ctxLine) {
        mainLineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['Dec 10', 'Dec 17', 'Dec 24', 'Dec 31', 'Jan 7'],
                datasets: [{ label: 'Score', data: [], borderColor: '#14b8a6', tension: 0.4, fill: true, backgroundColor: 'rgba(20, 184, 166, 0.1)' }]
            },
            options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 70, max: 85 } } }
        });
    }
    // Bar Chart initialization removed
}

function updateMainLineChart(newData) {
    if (mainLineChart) {
        mainLineChart.data.datasets[0].data = newData;
        mainLineChart.update();
    }
}

/** * 5. Event Listeners & Notes
 */
function setupEventListeners() {
    const searchInput = document.getElementById('patientSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.patient-item').forEach(card => {
                card.style.display = card.innerText.toLowerCase().includes(term) ? 'block' : 'none';
            });
        });
    }

    const viewBtn = document.getElementById('viewDetailsBtn');
    if (viewBtn) {
        viewBtn.onclick = () => {
            const modal = document.getElementById('detailsModal');
            modal.style.display = 'block';
            renderRadarChart();
            renderBreakdown();
        };
    }
}

const closeModal = document.getElementById('closeModalBtn');
const detailsModal = document.getElementById('detailsModal');

if (closeModal && detailsModal) {
    closeModal.onclick = () => detailsModal.style.display = 'none';
}

function renderBreakdown() {
    const data = [
        { label: "Speed", val: 82 }, { label: "Amplitude", val: 76 },
        { label: "Consistency", val: 88 }, { label: "Coordination", val: 74 },
        { label: "Endurance", val: 79 }
    ];
    const container = document.getElementById('breakdownBars');
    if (container) {
        container.innerHTML = data.map(item => `
            <div class="breakdown-item">
                <div class="b-label"><span>${item.label}</span><span>${item.val}%</span></div>
                <div class="b-track"><div class="b-fill" style="width: ${item.val}%"></div></div>
            </div>
        `).join('');
    }
}

function renderNotes(notes) {
    const stack = document.getElementById('notesStack');
    if (!stack) return;

    stack.innerHTML = notes.map((note, index) => `
        <div class="note-card ${index === 0 ? 'recent' : ''}">
            <div class="note-header">
                <span>${note.date} - ${note.dr}</span>
                ${index === 0 ? '<span class="recent-badge">Recent</span>' : ''}
            </div>
            <p class="note-content">${note.text}</p>
        </div>
    `).join('');
}

const addBtn = document.getElementById('addNoteTrigger');
if(addBtn){
    addBtn.addEventListener('click', () => {
        const text = prompt(`Enter clinical observation for ${activePatient}:`);
        
        if (text && text.trim() !== "") {
            const newNote = {
                date: new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                }),
                dr: "Dr. Anderson",
                text: text
            };
            patientData[activePatient].notes.unshift(newNote);
            renderNotes(patientData[activePatient].notes);
        }
    });
}

// Switch Tab Logic
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        if(tabId === 'analytics') renderWaveformChart();
    };
});

/** * Radar Chart: Motor Function Profile
 */
let radarChart = null;

function renderRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;
    if (radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Speed', 'Amplitude', 'Consistency', 'Coordination', 'Endurance'],
            datasets: [{
                data: [82, 76, 88, 74, 79],
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                borderColor: '#14b8a6',
                pointBackgroundColor: '#14b8a6'
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });
}

/** * Waveform Chart: Advanced Analytics
 */
let waveformChart = null;

function renderWaveformChart() {
    const ctx = document.getElementById('waveformChart');
    if (!ctx) return;
    if (waveformChart) waveformChart.destroy();

    waveformChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0,1,2,3,4,5,6,7,8,9],
            datasets: [
                { label: 'Tap Frequency (Hz)', data: [4.1,4.3,4.2,4,3.8,4.1,4.2,4.1,3.8,4], borderColor: '#14b8a6', tension: 0.3 },
                { label: 'Amplitude (cm)', data: [2.1,2.3,2.2,2,1.9,2.1,2.2,2.1,1.8,2], borderColor: '#3b82f6', tension: 0.3 }
            ]
        },
        options: { maintainAspectRatio: false }
    });
}