// @ts-nocheck
/* eslint-disable */

const SIDES = 9;
const levelCounts = [35, 47, 56, 46];
let bg, logo;
let rotx = 0;
let roty = Math.PI / 4;
let t = [];
const sides = 8;
const levels = 4;
let screen, hitmap, target, flathitmap;
let tex = true;

function randomImage(level) {
  //FIXME: only call this during load otherwise you get too many open images!!!
  return loadImage(
    "data/level" +
      level +
      "/" +
      parseInt(Math.random() * levelCounts[level] + 1) +
      ".png"
  );
}

function preload() {
  console.log("HELLO");
  for (let level = 0; level < 4; level++) {
    t[level] = [];
    for (let side = 0; side < SIDES; side++) {
      t[level][side] = randomImage(level);
    }
  }
}

function setup() {
  myCanvas = createCanvas(800, 800);
  myCanvas.parent("dom-container");

  screen = createGraphics(width, height, WEBGL);
  hitmap = createGraphics(width, height, WEBGL);
  flathitmap = createGraphics(width, height);

  target = screen;

  screen.textureMode(NORMAL);
}

function draw() {
  roty -= 0.005; //25;

  target = hitmap;
  render();
  target = screen;
  render();
  flathitmap.image(hitmap, 0, 0);

  const clr = flathitmap.get(mouseX, mouseY);
  const lvl = Math.floor((red(clr) / 255) * levels);
  const sde = Math.floor((green(clr) / 255) * sides);

  console.log(clr, lvl, sde);

  image(screen, 0, 0);

  //show tex of rollover
  image(t[lvl][sde], 0, 0, 300, 300);
}

function render() {
  target.push();
  target.clear(); //important!!!
  target.background(0);
  target.noStroke();
  target.translate(65, 350, -250);
  target.rotateX(rotx);
  target.rotateY(roty);

  if (target == screen) target.tint(255, 175);
  else target.tint(255);

  domtoren_level(0, 0, 0, 0, 90, 130, 90);
  domtoren_level(1, 0, -250, 0, 80, 120, 80);
  domtoren_level(2, 0, -460, 0, 65, 100, 65);
  domtoren_level(3, 0, -625, 0, 55, 70, 55);

  target.pop();
}

function domtoren_level(level, x, y, z, sx, sy, sz) {
  target.push();
  target.translate(x, y, z);
  target.scale(sx, sy, sz);
  if (level < 3) drawTexturedCube(level);
  else drawTexturedPyramid(level);
  target.pop();
}

function mouseDragged() {
  let rate = 0.01;
  rotx += (pmouseY - mouseY) * rate;
  roty += (mouseX - pmouseX) * rate;
}

function drawTriangle(target, level, side, a, b, c, ta, tb, tc) {
  target.push();
  target.beginShape(TRIANGLES);
  if (target == screen) {
    target.texture(t[level][side]);
    target.vertex(a[0], a[1], a[2], ta[0], ta[1]);
    target.vertex(b[0], b[1], b[2], tb[0], tb[1]);
    target.vertex(c[0], c[1], c[2], tc[0], tc[1]);
  } else {
    // target.fill(level/levels*255,side/sides*255,0);
    target.fill((level / levels) * 255, (side / sides) * 255, 0);
    target.vertex(a[0], a[1], a[2]);
    target.vertex(b[0], b[1], b[2]);
    target.vertex(c[0], c[1], c[2]);
  }
  target.endShape();
  target.pop();
  side++;
}

function drawQuad(target, level, side, a, b, c, d, ta, tb, tc, td) {
  target.push();
  target.beginShape(QUADS);
  if (target == screen) {
    target.texture(t[level][side]);
    target.vertex(a[0], a[1], a[2], ta[0], ta[1]);
    target.vertex(b[0], b[1], b[2], tb[0], tb[1]);
    target.vertex(c[0], c[1], c[2], tc[0], tc[1]);
    target.vertex(d[0], d[1], d[2], td[0], td[1]);
  } else {
    target.fill((level / levels) * 255, (side / sides) * 255, 0);
    target.vertex(a[0], a[1], a[2]);
    target.vertex(b[0], b[1], b[2]);
    target.vertex(c[0], c[1], c[2]);
    target.vertex(d[0], d[1], d[2]);
  }

  target.endShape();
  target.pop();
  side++;
}

function drawTexturedCube(level) {
  let side = 0;

  drawTriangle(
    target,
    level,
    side++,
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [0, 0],
    [1, 0],
    [1, 1]
  ); // +Z "front" face
  drawTriangle(
    target,
    level,
    side++,
    [-1, -1, 1],
    [-1, 1, 1],
    [1, 1, 1],
    [0, 0],
    [0, 1],
    [1, 1]
  ); //   +Z "front" face 2
  drawTriangle(
    target,
    level,
    side++,
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [0, 0],
    [1, 0],
    [1, 1]
  ); //     // -Z "back" face
  drawTriangle(
    target,
    level,
    side++,
    [-1, -1, -1],
    [-1, 1, -1],
    [1, 1, -1],
    [0, 0],
    [0, 1],
    [1, 1]
  ); //     // -Z "back" face 2
  drawQuad(
    target,
    level,
    side++,
    [1, -1, 1],
    [1, -1, -1],
    [1, 1, -1],
    [1, 1, 1],
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1]
  ); //     // +X "right" face
  drawQuad(
    target,
    level,
    side++,
    [-1, -1, -1],
    [-1, -1, 1],
    [-1, 1, 1],
    [-1, 1, -1],
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1]
  ); //     // +X "left" face
  drawQuad(
    target,
    level,
    side++,
    [-1, 1, 1],
    [1, 1, 1],
    [1, 1, -1],
    [-1, 1, -1],
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1]
  ); //     // +X "bottom" face
  drawQuad(
    target,
    level,
    side++,
    [-1, -1, -1],
    [1, -1, -1],
    [1, -1, 1],
    [-1, -1, 1],
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1]
  ); //     // +X "top" face
}

function drawTexturedPyramid(level) {
  target.beginShape(QUADS); //all 4 sides share the same texture
  let side = 0;

  if (target == screen) {
    // +Z "front" face
    target.texture(t[level][side]);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(1, 1, 1, 1, 1);
    target.vertex(-1, 1, 1, 0, 1);

    // -Z "back" face
    target.texture(t[level][side]);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(-1, 1, -1, 1, 1);
    target.vertex(1, 1, -1, 0, 1);

    //// +X "right" face
    target.texture(t[level][side]);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(1, 1, -1, 1, 1);
    target.vertex(1, 1, 1, 0, 1);

    //// -X "left" face
    target.texture(t[level][side]);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(-1, 1, 1, 1, 1);
    target.vertex(-1, 1, -1, 0, 1);
  } else {
    target.fill((level / levels) * 255, (side / sides) * 255, 0);
    // +Z "front" face
    target.vertex(0, -1, 0);
    target.vertex(0, -1, 0);
    target.vertex(1, 1, 1);
    target.vertex(-1, 1, 1);

    // -Z "back" face
    target.vertex(0, -1, 0);
    target.vertex(0, -1, 0);
    target.vertex(-1, 1, -1);
    target.vertex(1, 1, -1);

    //// +X "right" face
    target.vertex(0, -1, 0);
    target.vertex(0, -1, 0);
    target.vertex(1, 1, -1);
    target.vertex(1, 1, 1);

    //// -X "left" face
    target.vertex(0, -1, 0);
    target.vertex(0, -1, 0);
    target.vertex(-1, 1, 1);
    target.vertex(-1, 1, -1);
  }

  target.endShape();
}
