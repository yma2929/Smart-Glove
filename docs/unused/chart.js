/*************************************************
 * Modal Charts Only
 *************************************************/

let radarChart = null;
let waveformChart = null;

/*************************************************
 * Radar Chart
 *************************************************/
function renderRadarChart() {
    const ctx = document.getElementById("radarChart");
    if (!ctx) return;

    if (radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Speed", "Amplitude", "Consistency", "Coordination", "Endurance"],
            datasets: [{
                data: [82, 76, 88, 74, 79],
                backgroundColor: "rgba(20,184,166,0.25)",
                borderColor: "#14b8a6",
                pointBackgroundColor: "#14b8a6"
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });
}

/*************************************************
 * Breakdown Bars
 *************************************************/
function renderBreakdown() {
    const metrics = [
        { label: "Speed", val: 82 },
        { label: "Amplitude", val: 76 },
        { label: "Consistency", val: 88 },
        { label: "Coordination", val: 74 },
        { label: "Endurance", val: 79 }
    ];

    const el = document.getElementById("breakdownBars");
    if (!el) return;

    el.innerHTML = metrics.map(m => `
        <div class="breakdown-item">
            <div class="b-label">
                <span>${m.label}</span>
                <span>${m.val}%</span>
            </div>
            <div class="b-track">
                <div class="b-fill" style="width:${m.val}%"></div>
            </div>
        </div>
    `).join("");
}

/*************************************************
 * Waveform Chart (Advanced Analytics)
 *************************************************/
function renderWaveformChart() {
    const ctx = document.getElementById("waveformChart");
    if (!ctx) return;

    if (waveformChart) waveformChart.destroy();

    waveformChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [0,1,2,3,4,5,6,7,8,9],
            datasets: [
                {
                    label: "Tap Frequency (Hz)",
                    data: [4.1,4.3,4.2,4,3.8,4.1,4.2,4.1,3.8,4],
                    borderColor: "#14b8a6",
                    tension: 0.3
                },
                {
                    label: "Amplitude (cm)",
                    data: [2.1,2.3,2.2,2,1.9,2.1,2.2,2.1,1.8,2],
                    borderColor: "#3b82f6",
                    tension: 0.3
                }
            ]
        },
        options: { maintainAspectRatio: false }
    });
}
