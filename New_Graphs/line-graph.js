const dataSets = [];
let setCount = 1;
let graphModified = false;
var xUnit
var yUnit

function confirmInput() {
    xVariable = document.getElementById('xVariable').value;
    xUnit = document.getElementById('xUnit').value;
    yVariable = document.getElementById('yVariable').value;
    yUnit = document.getElementById('yUnit').value;

    if (xVariable && xUnit && yVariable && yUnit) {
        if (!dataSets[setCount]) {
            dataSets[setCount] = [];
        }

        updateTableHeaders();
        enableAddValueButton();
        clearInputFields();
    } else {
        alert('Please fill in all input fields.');
    }
}

function updateTableHeaders() {
    const xHeader = document.getElementById('xHeader');
    const yHeader = document.getElementById('yHeader');

    const xVariable = document.getElementById('xVariable').value;
    const xUnit = document.getElementById('xUnit').value;
    const yVariable = document.getElementById('yVariable').value;
    const yUnit = document.getElementById('yUnit').value;

    xHeader.textContent = `${xVariable} (${xUnit})`;
    xHeader.style.color = "white";
    yHeader.textContent = `${yVariable} (${yUnit})`;
    yHeader.style.color = "white";
}

function enableAddValueButton() {
    const addValueBtn = document.getElementById('add-value-btn');
    addValueBtn.style.backgroundColor = '#AD105F';
    addValueBtn.style.cursor = 'pointer';
}

function clearInputFields() {
    document.getElementById('xVariable').value = '';
    document.getElementById('xUnit').value = '';
    document.getElementById('yVariable').value = '';
    document.getElementById('yUnit').value = '';
}

function addValue() {
    const dataSet = dataSets[setCount];
    const tableBody = document.getElementById('data-table-body');
    const row = tableBody.insertRow();
    const xVariableCell = row.insertCell(0);
    const yVariableCell = row.insertCell(1);

    const xInput = createInput('number', 'X Value');
    const yInput = createInput('number', 'Y Value');

    xVariableCell.appendChild(xInput);
    yVariableCell.appendChild(yInput);

    xInput.addEventListener('input', () => enableAddValueButton());
    yInput.addEventListener('input', () => enableAddValueButton());

    dataSet.push({ xInput, yInput });

    document.getElementById('add-value-btn').style.backgroundColor = 'gray';
    document.getElementById('add-value-btn').style.cursor = 'not-allowed';

    xInput.focus();
}

function createInput(type, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.classList.add('table-input');
    input.placeholder = placeholder;
    return input;
}

function updateTable() {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';

    dataSets.forEach((dataSet, index) => {
        dataSet.forEach((point, pointIndex) => {
            const row = tableBody.insertRow();
            const xLabelCell = row.insertCell(0);
            const yLabelCell = row.insertCell(1);
            const xValueCell = row.insertCell(2);
            const yValueCell = row.insertCell(3);

            xLabelCell.textContent = document.getElementById('xVariable').value;
            yLabelCell.textContent = document.getElementById('yVariable').value;
            xValueCell.appendChild(point.xInput);
            yValueCell.appendChild(point.yInput);
        });
    });
}

function updateChart() {
    const ctx = document.getElementById('scatter-plot').getContext('2d');
    const chartData = {
        datasets: dataSets[setCount].map((point, index) => {
            return {
                label: `Set ${setCount} - Point ${index + 1}`,
                data: [{ x: parseFloat(point.xInput.value), y: parseFloat(point.yInput.value) }],
                backgroundColor: '#4285f4',
                borderColor: '#4285f4',
                borderWidth: 1
            };
        })
    };

    const lineOfBestFit = calculateLineOfBestFit();
    if (lineOfBestFit) {
        chartData.datasets.push(lineOfBestFit);
    }

    const chart = new Chart(ctx, {
        type: 'scatter',
        data: chartData,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: document.getElementById('xVariable').value +
                            (document.getElementById('xUnit').value ? ` (${document.getElementById('xUnit').value})` : '')
                    },
                    min: 0,
                    max: calculateMaxX()
                },
                y: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: document.getElementById('yVariable').value +
                            (document.getElementById('yUnit').value ? ` (${document.getElementById('yUnit').value})` : '')
                    },
                    min: 0,
                    max: calculateMaxY()
                }
            }
        }
    });
  
    document.getElementById('gradient').textContent = `${calculateGradient().toFixed(2)} ${yUnit}/${xUnit}`;
    gradient.style.color = "white";
    graphModified = true;
}


function calculateMaxX() {
    return Math.max(...dataSets[setCount].map(point => parseFloat(point.xInput.value))) + 1;
}

function calculateMaxY() {
    return Math.max(...dataSets[setCount].map(point => parseFloat(point.yInput.value))) + 1;
}

function calculateGradient() {
    const xValues = dataSets[setCount].map(point => parseFloat(point.xInput.value));
    const yValues = dataSets[setCount].map(point => parseFloat(point.yInput.value));

    const n = xValues.length;
    const sumXY = xValues.reduce((acc, x, index) => acc + x * yValues[index], 0);
    const sumX = xValues.reduce((acc, x) => acc + x, 0);
    const sumY = yValues.reduce((acc, y) => acc + y, 0);
    const sumXSquare = xValues.reduce((acc, x) => acc + x ** 2, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = n * sumXSquare - sumX ** 2;

    return numerator / denominator;
}

function calculateLineOfBestFit() {
    const xValues = dataSets[setCount].map(point => parseFloat(point.xInput.value));
    const yValues = dataSets[setCount].map(point => parseFloat(point.yInput.value));

    const gradient = calculateGradient();
    const yIntercept = calculateYIntercept(gradient, xValues, yValues);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);

    const minY = calculateY(gradient, yIntercept, minX);
    const maxY = calculateY(gradient, yIntercept, maxX);

    return {
        label: 'Line of Best Fit',
        data: [{ x: minX, y: minY }, { x: maxX, y: maxY }],
        type: 'line',
        borderColor: '#f44336',
        borderWidth: 2,
        fill: false
    };
}

function calculateY(gradient, yIntercept, x) {
    return gradient * x + yIntercept;
}

function calculateYIntercept(gradient, xValues, yValues) {
    const meanX = xValues.reduce((acc, x) => acc + x, 0) / xValues.length;
    const meanY = yValues.reduce((acc, y) => acc + y, 0) / yValues.length;

    return meanY - gradient * meanX;
  
}

function generateGraph() {
    updateChart();
}