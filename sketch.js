let time = 0;
let wave = [];
let epicycle = [];

function setup() {
  createCanvas(700, 700);
}

/**
 * Renders each frame of the animation.
 * Draws a rotating point on a circle, traces its vertical position as a wave,
 * and visualizes the relationship between circular motion and wave motion.
 * 
 * - Draws a circle centered at (200, 200).
 * - Calculates the position of a rotating point using cosine and sine.
 * - Draws a line from the center to the rotating point and a small ellipse at the point.
 * - Projects the vertical position of the rotating point as a wave to the right.
 * - Updates the wave array and animates the motion over time.
 */
/**
 * Renders an animated circle and its corresponding sine wave visualization.
 */
function draw() {
  background(0);
  translate(300, 200);
  let c = 3; // Number of circles
  let x = 0;
  let y = 0;
  let prevx = x;
  let prevy = y;

  for (let i = 1; i <= c; i++) {

    prevx = x;
    prevy = y;
    
    
    let n = (i - 1) * 2 + 1;
    let radius = 100 * (4 / (n * PI));
    
    x = prevx + radius * cos(n * time);
    y = prevy + radius * sin(n * time);

    stroke(255, i === c ? 255 : 100);
    ellipse(x, y, 2);
    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255, 100);
    line(prevx, prevy, x, y);
  }
  // Add y at the beginning of the wave array
  wave.unshift(y);
  epicycle.unshift({ x: x, y: y });

  beginShape();
  noFill();
  stroke(255, 100);
  for (let i = 0; i < epicycle.length; i++) {
    vertex(epicycle[i].x, epicycle[i].y);
  }
  endShape();
  stroke(255, 100);
  line(x, y, 0, y);
  beginShape();
  noFill();
  stroke(255);
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();
  time -= 0.0314;

  if (wave.length > 400) {
    wave.pop();
  }
  if (epicycle.length > 200) {
    epicycle.pop();
  }
}
