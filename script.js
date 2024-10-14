function solve() {
  // Получаем коэффициенты из таблицы
  let a00 = parseFloat(document.getElementById('a00').value);
  let a01 = parseFloat(document.getElementById('a01').value);
  let a02 = parseFloat(document.getElementById('a02').value);
  let a10 = parseFloat(document.getElementById('a10').value);
  let a11 = parseFloat(document.getElementById('a11').value);
  let a12 = parseFloat(document.getElementById('a12').value);
  let a20 = parseFloat(document.getElementById('a20').value);
  let a21 = parseFloat(document.getElementById('a21').value);
  let a22 = parseFloat(document.getElementById('a22').value);
  
  let b0 = parseFloat(document.getElementById('b0').value);
  let b1 = parseFloat(document.getElementById('b1').value);
  let b2 = parseFloat(document.getElementById('b2').value);

  // Прямой ход
  let steps = "Прямой ход:<br>";

  let m10 = a10 / a00;
  let m20 = a20 / a00;
  a10 -= m10 * a00;
  a11 -= m10 * a01;
  a12 -= m10 * a02;
  b1 -= m10 * b0;
  
  steps += `Шаг 1: Преобразуем 2-ю строку:<br>a₁₀ = ${a10.toFixed(2)}, a₁₁ = ${a11.toFixed(2)}, a₁₂ = ${a12.toFixed(2)}, b₁ = ${b1.toFixed(2)}<br>`;

  a20 -= m20 * a00;
  a21 -= m20 * a01;
  a22 -= m20 * a02;
  b2 -= m20 * b0;

  steps += `Шаг 2: Преобразуем 3-ю строку:<br>a₂₀ = ${a20.toFixed(2)}, a₂₁ = ${a21.toFixed(2)}, a₂₂ = ${a22.toFixed(2)}, b₂ = ${b2.toFixed(2)}<br>`;

  let m21 = a21 / a11;
  a21 -= m21 * a11;
  a22 -= m21 * a12;
  b2 -= m21 * b1;

  steps += `Шаг 3: Преобразуем 3-ю строку снова:<br>a₂₁ = ${a21.toFixed(2)}, a₂₂ = ${a22.toFixed(2)}, b₂ = ${b2.toFixed(2)}<br><br>`;

  // Обратный ход
  steps += "Обратный ход:<br>";
  let x2 = b2 / a22;
  let x1 = (b1 - a12 * x2) / a11;
  let x0 = (b0 - a01 * x1 - a02 * x2) / a00;

  steps += `Шаг 4: x₃ = ${x2.toFixed(2)}<br>`;
  steps += `Шаг 5: x₂ = ${x1.toFixed(2)}<br>`;
  steps += `Шаг 6: x₁ = ${x0.toFixed(2)}<br>`;

  // Вывод результата и шагов
  document.getElementById('result').innerHTML = steps + `<br>Итог: x₁ = ${x0.toFixed(2)}, x₂ = ${x1.toFixed(2)}, x₃ = ${x2.toFixed(2)}`;

  // Построение графика уравнений
  drawChart();
}

// Функция для рисования графика
function drawChart() {
  const ctx = document.getElementById('myChart').getContext('2d');

  const data = {
      labels: [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10], // Значения x
      datasets: [{
          label: '2x₁ + 3x₂ + x₃ = 5',
          data: dataPoints(-10, 10, 2, 3, 5),
          borderColor: 'red',
          fill: false
      }, {
          label: '4x₁ + x₂ - 2x₃ = -2',
          data: dataPoints(-10, 10, 4, 1, -2),
          borderColor: 'blue',
          fill: false
      }, {
          label: '-2x₁ + 3x₂ + 2x₃ = 7',
          data: dataPoints(-10, 10, -2, 3, 7),
          borderColor: 'green',
          fill: false
      }]
  };

  const options = {
      scales: {
          x: {
              title: {
                  display: true,
                  text: 'x₁'
              },
              min: -10,
              max: 10
          },
          y: {
              title: {
                  display: true,
                  text: 'x₂'
              },
              min: -10,
              max: 10
          }
      },
      plugins: {
          zoom: {
            // Настройки масштабирования
            pan: {
              enabled: true,
              mode: 'xy'
          },
            zoom:{
              enabled: true,
                    mode: 'xy',
                    rangeMin: {
                        x: -10,
                        y: -10
                    },
                    rangeMax: {
                        x: 10,
                        y: 10
                    }
              }

          }

      }
  };

  new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
  });
}

// Функция для создания точек данных
function dataPoints(min, max, a, b, c) {
  let points = [];
  for (let x = min; x <= max; x += 1) {
      let y = (c - a * x) / b; // Находим y по формуле прямой линии
      points.push(y);
  }
  return points;
}
