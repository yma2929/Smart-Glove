// 1. Line Chart: Overall Performance Trend
const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Dec 10', 'Dec 17', 'Dec 24', 'Dec 31', 'Jan 7'],
        datasets: [{
            label: 'Total Score',
            data: [74, 76, 75, 77, 78],
            borderColor: '#00bfa6',
            backgroundColor: 'rgba(0, 191, 166, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { min: 70, max: 85 } }
    }
});

// 2. Bar Chart: Task-Specific Weekly Comparison
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            { label: 'Finger Tapping', data: [75, 77, 76, 78], backgroundColor: '#00bfa6' },
            { label: 'Hand Flip', data: [78, 79, 77, 80], backgroundColor: '#005FB8' },
            { label: 'Hand Open/Close', data: [72, 74, 73, 75], backgroundColor: '#6f42c1' },
            { label: 'Finger to Nose', data: [81, 82, 80, 83], backgroundColor: '#fd7e14' }
        ]
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true, max: 100 } }
    }
});

/**
 * Generates and downloads a basic clinical report
 */
function downloadReport(patientName) {
    const reportContent = `SMART GLOVE - CLINICAL CASE REPORT\n` +
                          `==================================\n` +
                          `Patient: ${patientName.replace('_', ' ')}\n` +
                          `Status: Stable | Compliance: 95%\n\n` +
                          `LATEST OBSERVATION:\n` +
                          `Patient showing consistent performance across all motor tasks.`;
                          
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patientName}_Report.txt`;
    a.click();
}