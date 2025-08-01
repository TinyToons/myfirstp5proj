let time = 0;
let wave = [];
let epicycle = [];
// r : radius, f: frequency i.e how many revolutions in one time unit
// p: phase i.e the angle at t0

function setup() {
  createCanvas(700, 700);
}

/**
 * Renders each frame of the animation.
 * 
**/
function draw() {
  background(0);
  translate(300, 200);
  let circle = [
    {r:10, f:0, p : PI},
    {r:50, f:1, p : PI/2},
    {r:50, f:-1, p : -PI/2},
    {r:40, f:3, p : PI/2},
    {r:40, f:-3, p : -PI/2},
    {r:30, f:5, p : PI/2},
    {r:30, f:-5, p : -PI/2},
    {r:20, f:7, p : PI/2},
    {r:20, f:-7, p : -PI/2}
  ];
  let x = 0;
  let y = 0;
  let prevx = x;
  let prevy = y;
  let c = circle.length;
  for (let i = 1; i <= c; i++) {

    prevx = x;
    prevy = y;
    
    
    let radius = circle[i-1].r;
    let frequency = circle[i-1].f;
    let phase = circle[i-1].p;

    x = prevx + radius * cos(frequency * time + phase);
    y = prevy + radius * sin(frequency * time + phase);

    stroke(255, i === c ? 255 : 100);
    ellipse(x, y, 2);
    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255, 100);
    line(prevx, prevy, x, y);
  }
  // Add y at the beginning of the wave array
  wave.unshift(x);
  epicycle.unshift({ x: x, y: y });

  beginShape();
  noFill();
  stroke(255, 100);
  for (let i = 0; i < epicycle.length; i++) {
    vertex(epicycle[i].x, epicycle[i].y);
  }
  endShape();
  stroke(255, 100);
  line(x, y, x, 0);
  beginShape();
  noFill();
  stroke(255);
  for (let i = 0; i < wave.length; i++) {
    vertex(wave[i], i);
  }
  endShape();
   time += 0.005;

  if (wave.length > 400) {
    wave.pop();
  }
  if (epicycle.length > 200) {
    epicycle.pop();
  }
}
