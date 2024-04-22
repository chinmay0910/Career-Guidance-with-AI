// Function to fetch questions from the backend
async function fetchQuestions() {
  try {
    const response = await fetch('/questions');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to populate questions into the form
async function populateQuestions() {
  const questions = await fetchQuestions();
  const form = document.getElementById("aptitudeForm");
  questions.forEach((question, index) => {
    const questionHTML = `
        <div class="question">
          <p>Question ${index + 1}: ${question.questionText}</p>
          <select name="${question.selectName}">
            ${question.options.map(option => `<option value="${option.value}">${option.text}</option>`).join('')}
          </select>
        </div>
      `;
    form.insertAdjacentHTML('beforeend', questionHTML);
  });

  // Add submit button at the end of all questions
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);
}

// Event listener for form submission
document.getElementById("aptitudeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect the scores for each area
  const areas = ["verbal", "logical", "spatial", "numerical"];
  const scores = {};

  areas.forEach(area => {
    let areaScore = 0;
    for (let i = 1; i <= 5; i++) {
      const select = document.querySelector(`select[name="${area}${i}"]`);
      if (select) {
        const questionScore = parseInt(select.value);
        areaScore += questionScore;
      }
    }
    scores[area] = (areaScore / 100) * 100;
  });

  // Display the calculated percentages
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<h2>Aptitude Scores</h2><canvas id="aptitudeChart" style="width: 90%; height: 200; border: 1px solid black">`;
  areas.forEach(area => {
    resultDiv.innerHTML += `<p>${area.charAt(0).toUpperCase() + area.slice(1)}: ${scores[area]}%</p>`;
  });

  // Create a bar chart
  const ctx = document.getElementById("aptitudeChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: areas.map(area => area.charAt(0).toUpperCase() + area.slice(1)),
      datasets: [{
        label: "Aptitude Percentage",
        data: areas.map(area => scores[area]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
});

// Populate questions when the page loads
window.onload = populateQuestions;
