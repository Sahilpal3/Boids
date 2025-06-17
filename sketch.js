const flock = [];

let alignSlider, cohesionSlider, seperationSlider;
let mouseFollow = false;
let toggleButton;

function setup() {
  createCanvas(1280, 720);
  document.body.style.background = "#202020";
  document.body.style.color = "#FFD700";

  const baseY = height - 100; // starting Y position from bottom
  const spacing = 30; // space between controls

  createP("Alignment").position(10, baseY).style("color", "#FFD700");
  alignSlider = createSlider(0, 5, 1, 0.1);
  alignSlider.position(100, baseY + 15);

  createP("Cohesion")
    .position(10, baseY + spacing)
    .style("color", "#FFD700");
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider.position(100, baseY + spacing + 15);

  createP("Separation")
    .position(10, baseY + spacing * 2)
    .style("color", "#FFD700");
  seperationSlider = createSlider(0, 5, 1, 0.1);
  seperationSlider.position(100, baseY + spacing * 2 + 15);

  //mouse follow button
  toggleButton = createButton("Mouse Follow(Press M): OFF");
  toggleButton.position(10, height - 120); // adjust if it overlaps
  toggleButton.mousePressed(() => {
    mouseFollow = !mouseFollow;
    toggleButton.html(mouseFollow ? "Mouse Follow(Press M): ON" : "Mouse Follow(Press M): OFF");
  });
  toggleButton.style("background-color", "#FFD700");
  toggleButton.style("color", "#202020");

  for (let i = 0; i < 100; i++) {
    flock.push(new Boid());
  }
}

function keyPressed() {
  if (key === 'm' || key === 'M') {
    mouseFollow = !mouseFollow;
    toggleButton.html(mouseFollow ? "Mouse Follow: ON" : "Mouse Follow: OFF");
  }
}


function draw() {
  background(51);
  fill("#FFD700");
  textSize(15);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
