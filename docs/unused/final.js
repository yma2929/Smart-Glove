let radarChart = null;

/* ===============================
   Render Radar Chart (Chart.js)
   =============================== */
function renderRadarChart() {
    const ctx = document.getElementById("radarChart");
    if (!ctx) return;

    // Prevent duplicate charts
    if (radarChart) {
        radarChart.destroy();
    }

    radarChart = new Chart(ctx, {
        type: "radar",
        data: {
            labels: [
                "Speed",
                "Amplitude",
                "Consistency",
                "Coordination",
                "Endurance"
            ],
            datasets: [{
                data: [82, 76, 88, 74, 79],
                backgroundColor: "rgba(20, 184, 166, 0.25)",
                borderColor: "#14b8a6",
                pointBackgroundColor: "#14b8a6"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

/* =====================================
   Render Performance Breakdown (HTML)
   ===================================== */
function renderBreakdown() {
    const data = [
        { label: "Speed", value: 82 },
        { label: "Amplitude", value: 76 },
        { label: "Consistency", value: 88 },
        { label: "Coordination", value: 74 },
        { label: "Endurance", value: 79 }
    ];

    const container = document.getElementById("breakdownBars");
    if (!container) return;

    container.innerHTML = data.map(item => `
        <div class="breakdown-item">
            <div class="b-label">
                <span>${item.label}</span>
                <span>${item.value}%</span>
            </div>
            <div class="b-track">
                <div class="b-fill" style="width:${item.value}%"></div>
            </div>
        </div>
    `).join("");
}
