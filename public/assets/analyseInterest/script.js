document.getElementById("interestForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect the scores for each field
  const fields = ["agriculture", "arts", "commerce", "finearts", "health", "technical", "uniformed"];
  const scores = {};

  fields.forEach(field => {
      const fieldScore = Array.from(document.getElementsByName(field + "1")).reduce((acc, select) => acc + parseInt(select.value), 0);
      scores[field] = (fieldScore / 10) * 100;
  });

  // Display the calculated percentages
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<h1>Interest Percentage</h1><canvas id="interestChart" style="width: 90%; height: 200; border: 1px solid black"></canvas>`;
  fields.forEach(field => {
      resultDiv.innerHTML += `<p>${field}: ${scores[field]}%</p>`;
  });

  // Create a bar chart
  const ctx = document.getElementById("interestChart").getContext("2d");
  new Chart(ctx, {
      type: "bar",
      data: {
          labels: fields,
          datasets: [{
              label: "Interest Percentage",
              data: fields.map(field => scores[field]),
              backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(100, 100, 100, 0.2)"
              ],
              borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(100, 100, 100, 1)"
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