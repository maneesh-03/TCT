const subjects = [
    { name:'Basic Coding', tasks: 25 },
    { name: 'C Programming', tasks: 25 },
    { name: 'CPP', tasks: 31 },
    { name: 'DBMS', tasks: 25 },
    { name: 'DSA', tasks: 59 },
    { name: 'Linux', tasks: 5 },
    { name:'Python', tasks: 57 },
    { name: 'Machine Learning', tasks: 43 },
    { name: 'Web Development', tasks: 30 },
];

const checkboxesContainer = document.getElementById('subjects');
let csum = 0;
subjects.forEach(subject => {
    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject');
    subjectDiv.innerHTML = `<h2>${subject.name}</h2>`;
    const checkboxRow = document.createElement('div');
    checkboxRow.classList.add('checkbox-row');
    for (let i = 1; i < ((subject.tasks)+1); i++) {
        const checkboxItem = document.createElement('input');
        checkboxItem.id = 'checkbox'+ (i+csum);
        checkboxItem.type = 'checkbox';
        checkboxItem.classList.add('checkbox-item');
        checkboxRow.appendChild(checkboxItem);
        const numberItem = document.createElement('span');
        numberItem.textContent = i;
        checkboxRow.appendChild(numberItem);
    }
    csum = (csum + subject.tasks);

    subjectDiv.appendChild(checkboxRow);
    checkboxesContainer.appendChild(subjectDiv);
});

function calculateCompletion() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let totalCompleted = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            totalCompleted++;
        }
    });
    const totalCompletedElement = document.getElementById('totalCompleted');
    totalCompletedElement.textContent = totalCompleted;
    const percentageCompletionElement = document.getElementById('percentageCompletion');
    const percentageCompletion = (totalCompleted / 300) * 100;
    percentageCompletionElement.textContent = percentageCompletion.toFixed(2) + '%';

    // Draw pie chart
    const ctx = document.getElementById('completionChart').getContext('2d');
    const completionChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                label: 'Task Completion',
                data: [totalCompleted, 300 - totalCompleted],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false
        }
    });
}


// Restore checked state of checkboxes from localStorage
const checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach((checkbox) => {
  const checked = localStorage.getItem(checkbox.id);
  if (checked !== null) {
    checkbox.checked = checked === 'true';
  }
});

// Save checked state of checkboxes to localStorage
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    localStorage.setItem(checkbox.id, checkbox.checked);
  });
});
