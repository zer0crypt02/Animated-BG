const points = [];

// Create 300 points and add them to the DOM
for (let i = 0; i < 300; i++) {
  const point = document.createElement('div');
  point.classList.add('point');
  point.style.left = Math.floor(Math.random() * 100) + 'vw';
  point.style.top = Math.floor(Math.random() * 100) + 'vh';
  document.body.appendChild(point);
  points.push(point);
}

// Connect points with lines if they are close enough
points.forEach((point, index) => {
  for (let i = index + 1; i < points.length; i++) {
    const otherPoint = points[i];
    const rect1 = point.getBoundingClientRect();
    const rect2 = otherPoint.getBoundingClientRect();
    if (Math.sqrt((rect1.left - rect2.left) ** 2 + (rect1.top - rect2.top) ** 2) < 150) {
      createLine(
        rect1.left + rect1.width / 2,
        rect1.top + rect1.height / 2,
        rect2.left + rect2.width / 2,
        rect2.top + rect2.height / 2
      );
    }
  }
});

// Highlight points and lines on mouse hover
document.addEventListener('mousemove', (e) => {
  const points = document.querySelectorAll('.point');
  points.forEach((point) => {
    const rect = point.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      point.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    } else {
      point.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }
  });

  const lines = document.querySelectorAll('.line');
  lines.forEach((line) => {
    const rect = line.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      line.style.backgroundColor = 'rgba(255, 255, 255, 1)';
      line.style.opacity = '1';
    } else {
      line.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
      line.style.opacity = '0';
    }
  });
});

// Function to create a line between two points
function createLine(x1, y1, x2, y2) {
  const line = document.createElement('div');
  line.classList.add('line');
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  line.style.width = length + 'px';
  line.style.height = '2px';
  line.style.left = x1 + 'px';
  line.style.top = y1 + 'px';
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  line.style.transform = `rotate(${angle}deg)`;
  document.body.appendChild(line);
}
