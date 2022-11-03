function sleep(ms) {
  const date = Date.now();
  let currentDate = null;

  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}

function getViewportSize() {
  let viewportSize = {
    width: $(window).width(),
    height: $(window).height()
  };

  return viewportSize;
}

function getCenterBlockSize(viewportSize) {
  let centerBlockSize = {
    width: viewportSize.width / 350,
    height: viewportSize.height / 60
  };

  return centerBlockSize;
}
function drawCenterLine(centerBlockSize, viewportSize) {
  let centerLineX = viewportSize.width / 2 - centerBlockSize.width / 2;
  let currentBlockY = centerBlockSize.height / 2;

  while (currentBlockY < viewportSize.height) {
    rect(centerLineX, currentBlockY, centerBlockSize.width, centerBlockSize.height);
    currentBlockY = currentBlockY + centerBlockSize.height * 2;
  }
}


function setup() {

}

function draw() {
  clear();

  let viewportSize = getViewportSize();
  createCanvas(viewportSize.width, viewportSize.height);
  background(0);

  let shapeColor = color(255);
  fill(shapeColor);
  noStroke();

  let centerBlockSize = getCenterBlockSize(viewportSize);
  drawCenterLine(centerBlockSize, viewportSize);
}
