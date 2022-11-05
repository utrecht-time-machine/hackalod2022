// @ts-nocheck
/* eslint-disable */

const SIDES = 9;
let levelCounts = [35, 47, 56, 46];
let bg, logo;
let rotx = 0;
let roty = Math.PI / 4;
let t = []; //2D array with images
let tIds = [];
const sides = 8;
const levels = 4;
let screen, hitmap, target, flathitmap;
let tex = true;
let allImages;
let imageDataById = {};
let croppedImageDataById = {};

function randomImage(level) {
  //FIXME: only call this during load otherwise you get too many open images!!!
  if (!allImages) {
    const imgId = parseInt(Math.random() * levelCounts[level] + 1);
    const img = loadImage("data/level" + level + "/" + imgId + ".png");
    return [imgId, img];
  } else {
    console.log(
      "map",
      allImages.map((img) => img.url)
    );
  }
}

function preload() {
  for (let level = 0; level < 4; level++) {
    t[level] = [];
    for (let side = 0; side < SIDES; side++) {
      const [imgId, img] = randomImage(level);
      t[level][side] = img;
      if (!(level in tIds)) {
        tIds[level] = {};
      }
      tIds[level][side] = imgId;
    }
  }
}

function onImageFilterUpdated(detail) {
  // console.log("RickyboyII On images filtered", detail);
  // allImages = detail;

  // levelCounts = [0, 0, 0, 0];

  for (let side = 0; side < 9; side++) {
    // console.log(img.)
    // layer0Coordinates: { x: number; y: number; width: number; height: number };
    for (let level = 0; level < 4; level++) {
      let randomImg = detail[Math.floor(Math.random() * detail.length)]; //detail[side];
      if (!randomImg) {
        console.warn("No img passed...", detail);
        return;
      }
      if (!imageDataById[randomImg.id]) {
        console.log(
          "loading ",
          randomImg.id,
          "into imageDataById[",
          randomImg.id,
          "]"
        );
        imageDataById[randomImg.id] = loadImage(
          "/img/torenafbeeldingen/" + randomImg.id + ".jpg",
          () => {
            setTimeout(() => {
              if (!(randomImg.id in croppedImageDataById)) {
                croppedImageDataById[randomImg.id] = [null, null, null, null];
              }

              // TODO: If this image does not have a bounding box for this layer, then use another image? Or use another layer (as a hack)..
              for (const k of [
                "layer0Coordinates",
                "layer1Coordinates",
                "layer2Coordinates",
                "layer3Coordinates",
              ]) {
              }

              if (randomImg.layer0Coordinates) {
                croppedImageDataById[randomImg.id][0] = imageDataById[
                  randomImg.id
                ].get(
                  randomImg.layer0Coordinates.x,
                  randomImg.layer0Coordinates.y,
                  randomImg.layer0Coordinates.width,
                  randomImg.layer0Coordinates.height
                );
              }
              if (randomImg.layer1Coordinates) {
                croppedImageDataById[randomImg.id][1] = imageDataById[
                  randomImg.id
                ].get(
                  randomImg.layer1Coordinates.x,
                  randomImg.layer1Coordinates.y,
                  randomImg.layer1Coordinates.width,
                  randomImg.layer1Coordinates.height
                );
              }
              if (randomImg.layer2Coordinates) {
                croppedImageDataById[randomImg.id][2] = imageDataById[
                  randomImg.id
                ].get(
                  randomImg.layer2Coordinates.x,
                  randomImg.layer2Coordinates.y,
                  randomImg.layer2Coordinates.width,
                  randomImg.layer2Coordinates.height
                );
              }
              if (randomImg.layer3Coordinates) {
                croppedImageDataById[randomImg.id][3] = imageDataById[
                  randomImg.id
                ].get(
                  randomImg.layer3Coordinates.x,
                  randomImg.layer3Coordinates.y,
                  randomImg.layer3Coordinates.width,
                  randomImg.layer3Coordinates.height
                );
              }
            });
            // imageDataById[img.id].get(
            //   img.x,
            //   img.y,
            //   img.width,
            //   img.height
            // );
          }
        );
      } else {
        // console.log("from cache ", img.id);
      }

      const levelCoords = randomImg["layer" + level + "Coordinates"];

      setTimeout(() => {
        if (croppedImageDataById[randomImg.id]) {
          t[level][side] = undefined;
          if (!(level in tIds)) {
            tIds[level] = {};
          }
          tIds[level][side] = undefined;

          if (
            level in croppedImageDataById[randomImg.id] &&
            croppedImageDataById[randomImg.id][level]
          ) {
            t[level][side] = croppedImageDataById[randomImg.id][level];
            tIds[level][side] = randomImg.id;
          }
        }
      }, 2);

      // if (levelCoords) {
      //   levelCounts[level]++; //number of images per level
      // }
      // for (let level = 0; level < 4; level++) {
      //   t[level] = [];
      //   for (let side = 0; side < SIDES; side++) {
      //     t[level][side] = randomImage(level);
      //   }
      // }
    }
  }
  // console.log(levelCounts);
}

function setup() {
  window.addEventListener("onImageFilterUpdated", (event) => {
    onImageFilterUpdated(event.detail);
  });

  myCanvas = createCanvas(900, 1000);
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

  // console.log(clr, lvl, sde);

  // scale(1.1);
  image(screen, 0, 0);

  // console.log(lvl, sde, t);
  //show tex of rollover
  // image(t[lvl][sde], 0, 0, 300, 300);
}

function mousePressed() {
  // console.log(lvl, sde, t);
  //show tex of rollover
  // image(t[lvl][sde], 0, 0, 300, 300);

  const clr = flathitmap.get(mouseX, mouseY);
  const lvl = Math.floor((red(clr) / 255) * levels);
  const sde = Math.floor((green(clr) / 255) * sides);
  console.log(clr, lvl, sde);

  if (lvl in tIds && sde in tIds[lvl]) {
    const imgId = tIds[lvl][sde];
    if (imgId) {
      window.dispatchEvent(new CustomEvent("onFaceClicked", { detail: imgId }));
    }
  } else {
    console.warn("NO ID");
  }
  // image(t[lvl][sde], 0, 0, 300, 300);
}

function render() {
  target.push();
  target.clear(0); //important!!!
  target.background(60, 9, 108);
  target.noStroke();
  target.translate(65, 250, -250);
  target.rotateX(rotx);
  target.rotateY(roty);

  if (target == screen) target.tint(255, 200); // opacity
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
    if (t && level in t) {
      if (!(side in t[level]) || !t[level][side]) {
        // No texture available, use texture of another side of this level.
        let alternativeTexture = undefined;
        for (let anotherSide = 0; anotherSide < SIDES; anotherSide++) {
          if (t[level][anotherSide]) {
            alternativeTexture = t[level][anotherSide];
            break;
          }
        }

        if (alternativeTexture) {
          target.texture(alternativeTexture);
        } else {
          target.fill(200, 200, 200);
        }
      } else {
        target.texture(t[level][side]);
      }
    } else {
      target.fill(200, 200, 200);
    }
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
    if (t && level in t) {
      if (!(side in t[level]) || !t[level][side]) {
        // No texture available, use texture of another side of this level.
        let alternativeTexture = undefined;
        for (let anotherSide = 0; anotherSide < SIDES; anotherSide++) {
          if (t[level][anotherSide]) {
            alternativeTexture = t[level][anotherSide];
            break;
          }
        }

        if (alternativeTexture) {
          target.texture(alternativeTexture);
        } else {
          target.fill(200, 200, 200);
        }
      } else {
        target.texture(t[level][side]);
      }
    } else {
      target.fill(200, 200, 200);
    }
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
    const textureIsAvailable =
      t && level in t && side in t[level] && t[level][side];

    // +Z "front" face
    if (textureIsAvailable) {
      target.texture(t[level][side]);
    } else {
      target.fill(200, 200, 200);
    }
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(1, 1, 1, 1, 1);
    target.vertex(-1, 1, 1, 0, 1);

    // -Z "back" face
    if (textureIsAvailable) {
      target.texture(t[level][side]);
    } else {
      target.fill(200, 200, 200);
    }
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(-1, 1, -1, 1, 1);
    target.vertex(1, 1, -1, 0, 1);

    //// +X "right" face
    if (textureIsAvailable) {
      target.texture(t[level][side]);
    } else {
      target.fill(200, 200, 200);
    }
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(0, -1, 0, 0.5, 0);
    target.vertex(1, 1, -1, 1, 1);
    target.vertex(1, 1, 1, 0, 1);

    //// -X "left" face
    if (textureIsAvailable) {
      target.texture(t[level][side]);
    } else {
      target.fill(200, 200, 200);
    }
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
