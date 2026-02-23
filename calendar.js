const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const now = new Date();
let current = { year: now.getFullYear(), month: now.getMonth() };

function render() {
  const { year, month } = current;
  document.getElementById(
    "month-label"
  ).textContent = `${MONTHS[month]} ${year}`;

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  // Nombres de los días
  DAYS.forEach((d) => {
    const span = document.createElement("span");
    span.className = "day-name";
    span.textContent = d;
    grid.appendChild(span);
  });

  const firstDay = new Date(year, month, 1);
  // Lunes como primer día: 0=Lun ... 6=Dom
  let startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Celdas vacías antes del primer día
  for (let i = 0; i < startOffset; i++) {
    const span = document.createElement("span");
    span.className = "day empty";
    grid.appendChild(span);
  }

  // Días del mes
  for (let d = 1; d <= daysInMonth; d++) {
    const span = document.createElement("span");
    span.className = "day";
    span.textContent = d;
    if (
      d === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear()
    ) {
      span.classList.add("today");
    }
    grid.appendChild(span);
  }
}

document.getElementById("prev").addEventListener("click", () => {
  current.month--;
  if (current.month < 0) {
    current.month = 11;
    current.year--;
  }
  render();
});

document.getElementById("next").addEventListener("click", () => {
  current.month++;
  if (current.month > 11) {
    current.month = 0;
    current.year++;
  }
  render();
});

render();
