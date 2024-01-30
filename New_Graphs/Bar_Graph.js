const dataSets = [];
let setCount = 1;
let graphModified = false;

function confirmInput() {
    const xVariable = document.getElementById('xVariable').value;
    const xUnit = document.getElementById('xUnit').value;
    const yVariable = document.getElementById('yVariable').value;
    const yUnit = document.getElementById('yUnit').value;

    if (xVariable && xUnit && yVariable && yUnit) {
        if (!dataSets[setCount]) {
            dataSets[setCount] = [];
        }

        updateTableHeaders();
        enableAddValueButton();
        clearInputFields();

        updateTable();
        updateChart();
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

    const xInput = createInput('text', 'X Value');
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
  const ctx = document.getElementById('bar-chart').getContext('2d');

  if (window.barChart) {
      window.barChart.destroy();
  }

  const chartData = {
      labels: dataSets[setCount].map(point => point.xInput.value),
      datasets: [{
          label: `Set ${setCount}`,
          data: dataSets[setCount].map(point => parseFloat(point.yInput.value)),
          backgroundColor: '#4285f4',
          borderColor: '#4285f4',
          borderWidth: 1
      }]
  };

  window.barChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
          scales: {
              x: {
                  type: 'category',
                  labels: chartData.labels
              },
              y: {
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

  graphModified = true;
}


function calculateMaxX() {
    return Math.max(...dataSets[setCount].map(point => parseFloat(point.xInput.value))) + 1;
}

function calculateMaxY() {
    return Math.max(...dataSets[setCount].map(point => parseFloat(point.yInput.value))) + 1;
}

function generateGraph() {
    updateChart();
}
