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
  }
}

function drawButton(buttonX, 
                    buttonY, 
                    buttonWidth, 
                    buttonHeight, 
                    buttonColor, 
                    buttonColorHover, 
                    buttonCornerRadius, 
                    textColor, 
                    textColorHover, 
                    textSizeOwn, 
                    textFontOwn, 
                    textOwn) {

  fill(buttonColor);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, buttonCornerRadius);
  fill(textColor);
  textFont(textFontOwn);
  textSize(textSizeOwn);
  textAlign(CENTER, CENTER)
  text(textOwn, buttonX, buttonY, buttonWidth, buttonHeight);
}
function start(viewportSize, logo) {
  //logoSize = viewportSize.height / 8 * 2.3;
  //logoSize = viewportSize.width / 8;
  logoSize = viewportSize.totalSqrt / 5.33284526805;
  //console.log(viewportSize.total);
  logoX = viewportSize.width / 2 - logoSize / 2;
  logoY = viewportSize.height / 3 - logoSize / 2;
  image(logo, logoX, logoY, logoSize, logoSize);

  let buttonWidth = viewportSize.width / 4;
  let buttonHeight = viewportSize.height / 6;
  let buttonX = viewportSize.width / 2 - buttonWidth / 2;
  let buttonY = viewportSize.height / 4 * 3 - buttonHeight / 2;
  let buttonColor = color(255);
  let buttonColorHover = 0;
  let buttonCornerRadius = 10;
  let textColor = color(0);
  let textColorHover = 0;
  //let textSizeOwn = viewportSize.width / 25;
  let textSizeOwn = viewportSize.totalSqrt / 16.6651414627;
  let textFontOwn = atari;
  let textOwn = "Start";
  drawButton(buttonX, 
            buttonY, 
            buttonWidth, 
            buttonHeight, 
            buttonColor, 
            buttonColorHover, 
            buttonCornerRadius, 
            textColor, 
            textColorHover, 
            textSizeOwn, 
            textFontOwn, 
            textOwn);
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

  start(viewportSize, logo);
}