const data = [];
const colorMap = {};
let pieChart;
const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

function addValue() {
    const category = document.getElementById('category').value;
    const value = document.getElementById('value').value;

    if (category && value) {
        if (!colorMap[category]) {
            colorMap[category] = randomColor();
        }

        data.push({ category, value, color: colorMap[category] });
        updateChart();
        displayPercentages();
        clearInputFields();
        updateTable();
    } else {
        alert('Please fill in all input fields.');
    }
}

function displayPercentages() {
    const percentagesContainer = document.getElementById('percentages-container');
    percentagesContainer.innerHTML = '';

    const totalValue = data.reduce((acc, item) => acc + parseFloat(item.value), 0);

    data.forEach((item, index) => {
        const percentage = ((parseFloat(item.value) / totalValue) * 100).toFixed(3);
        const percentageDiv = document.createElement('div');
        percentageDiv.textContent = `${item.category}: ${percentage}%`;
        percentagesContainer.appendChild(percentageDiv);
    });
}

function updateTable() {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = tableBody.insertRow();
        const categoryCell = row.insertCell(0);
        const valueCell = row.insertCell(1);

        categoryCell.textContent = item.category;
        valueCell.textContent = item.value;
    });
}

function clearInputFields() {
    document.getElementById('category').value = '';
    document.getElementById('value').value = '';
}

function updateChart() {
    const ctx = document.getElementById('pie-chart').getContext('2d');

    if (pieChart) {
        pieChart.destroy();
    }

    const total = data.reduce((acc, item) => acc + parseFloat(item.value), 0);

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.map(item => item.category),
            datasets: [{
                data: data.map(item => parseFloat(item.value)),
                backgroundColor: data.map(item => item.color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        const dataset = data.datasets[tooltipItem.datasetIndex];
                        const currentValue = dataset.data[tooltipItem.index];
                        const percentage = ((currentValue / total) * 100).toFixed(4);
                        return `${data.labels[tooltipItem.index]}: ${percentage}%`;
                    }
                }
            }
        }
    });
}


