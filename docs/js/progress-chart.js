const ctx = document.getElementById('progressChart');

if (ctx) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jun 28', 'Jun 30', 'Jul 01', 'Jul 03', 'Jul 05'],
            datasets: [{
                data: [65, 78, 72, 85, 80],
                borderColor: '#005FB8',
                backgroundColor: (context) => {
                    const bgColor = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
                    bgColor.addColorStop(0, 'rgba(0, 95, 184, 0.2)');
                    bgColor.addColorStop(1, 'rgba(0, 95, 184, 0)');
                    return bgColor;
                },
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 3,
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e2a3b',
                    padding: 12,
                    cornerRadius: 10
                }
            },
            scales: {
                x: { 
                    grid: { display: false },
                    ticks: { color: '#5f7287', font: { weight: '500' } }
                },
                y: { 
                    min: 0,
                    max: 100,
                    ticks: { stepSize: 20, color: '#5f7287' },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        }
    });
}