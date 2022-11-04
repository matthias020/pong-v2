let logoOpacity = 0;
let clickCounter = 0;
//let fpsCount = 0;

let atari;
let logo;
function preload() {
  atari = loadFont("fonts/SF Atarian System Italic.ttf");
  logo = loadImage("icons/pongiconnoback.png");
}

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
    height: $(window).height(),
    totalSqrt: Math.sqrt($(window).width() * $(window).height())
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
  };
}

function showLogo(logo, 
                  logoX, 
                  logoY, 
                  logoSize, 
                  logoMiddleX, 
                  logoMiddleY) {

  image(logo, logoX, logoY, logoSize, logoSize);
  
  let logoURL = "https://github.com/matthias020/pong-v2/";

  if (dist(mouseX, mouseY, logoMiddleX, logoMiddleY) < logoSize / 2) {
    if (mouseIsPressed == true && mouseButton == LEFT) {
      if (clickCounter > 15) {
        window.open(logoURL, '_blank').focus();
        clickCounter = 0;
        mouseIsPressed = false;
      };      
    };

    if (logoOpacity < 80) {
      logoOpacity = logoOpacity + 5;
    };

  } else {
    if (logoOpacity > 0) {
      logoOpacity = logoOpacity - 5;
    };
  };

  fill(0, 0, 0, logoOpacity);
  circle(logoMiddleX, logoMiddleY, logoSize);
}

function start(viewportSize, logo) {
  let logoSize = viewportSize.totalSqrt / 5.5;
  let logoX = viewportSize.width / 2 - logoSize / 2;
  let logoY = viewportSize.height / 3 - logoSize / 2;
  let logoMiddleX = viewportSize.width / 2;
  let logoMiddleY = viewportSize.height / 3;
  clickCounter++;
  showLogo(logo, logoX, logoY, logoSize, logoMiddleX, logoMiddleY);
}


function draw() {
  clear();

  let viewportSize = getViewportSize();
  createCanvas(viewportSize.width, viewportSize.height);
  background(0);

  let shapeColor = color(255);
  fill(shapeColor);
  noStroke();

  //fpsCount++;
  //let fps = frameRate();
  //if (fpsCount == 20) {
  //  text("FPS: " + fps.toFixed(2), 10, height - 50);
  //  fpsCount = 0;
  //};

  let centerBlockSize = getCenterBlockSize(viewportSize);
  drawCenterLine(centerBlockSize, viewportSize);

  start(viewportSize, logo);
}