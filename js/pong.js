let logoOpacity = 0;
let clickCounter = 0;
let frameShiftNumber = 0;
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
                  logoMiddleY,
                  logoURL) {

  image(logo, logoX, logoY, logoSize, logoSize);
  
  if (dist(mouseX, mouseY, logoMiddleX, logoMiddleY) < logoSize / 2) {
    if (mouseIsPressed == true && mouseButton == LEFT && clickCounter > 15) {
      window.open(logoURL, '_blank').focus();
      clickCounter = 0;
      mouseIsPressed = false;
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

function drawButton(buttonX, 
                    buttonY, 
                    buttonWidth, 
                    buttonHeight, 
                    buttonColorOriginalLoose, 
                    buttonColorHoverLoose, 
                    buttonCornerRadius, 
                    textColor, 
                    textColorHover, 
                    textSizeOwn, 
                    textFontOwn, 
                    textOwn,
                    amountFramesPerShift) {

  let colorShiftPerFrame = {
    r: (buttonColorHoverLoose.r - buttonColorOriginalLoose.r) / amountFramesPerShift,
    g: (buttonColorHoverLoose.g - buttonColorOriginalLoose.g) / amountFramesPerShift,
    b: (buttonColorHoverLoose.b - buttonColorOriginalLoose.b) / amountFramesPerShift
  };

  if (mouseX > buttonX 
      && mouseX < buttonX + buttonWidth 
      && mouseY > buttonY 
      && mouseY < buttonY + buttonHeight) {
    
    if (frameShiftNumber < amountFramesPerShift) {
      frameShiftNumber++;
    };
  } else {
    if (frameShiftNumber > 0) {
      frameShiftNumber--;
    };
  };

  buttonColorLoose = {
    r: buttonColorOriginalLoose.r + colorShiftPerFrame.r * frameShiftNumber,
    g: buttonColorOriginalLoose.g + colorShiftPerFrame.g * frameShiftNumber,
    b: buttonColorOriginalLoose.b + colorShiftPerFrame.b * frameShiftNumber
  };
  let buttonColor = color(buttonColorLoose.r, buttonColorLoose.g, buttonColorLoose.b);
  
  fill(buttonColor);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, buttonCornerRadius);
  fill(textColor);
  textFont(textFontOwn);
  textSize(textSizeOwn);
  textAlign(CENTER, CENTER);
  text(textOwn, buttonX, buttonY, buttonWidth, buttonHeight);
}

function start(viewportSize, logo) {
  let logoSize = viewportSize.totalSqrt / 5.5;
  let logoX = viewportSize.width / 2 - logoSize / 2;
  let logoY = viewportSize.height / 3 - logoSize / 2;
  let logoMiddleX = viewportSize.width / 2;
  let logoMiddleY = viewportSize.height / 3;
  let logoURL = "https://github.com/matthias020/pong-v2/";
  clickCounter++;
  showLogo(logo, logoX, logoY, logoSize, logoMiddleX, logoMiddleY, logoURL);

  let buttonWidth = viewportSize.width / 4;
  let buttonHeight = viewportSize.height / 6;
  let buttonX = viewportSize.width / 2 - buttonWidth / 2;
  let buttonY = viewportSize.height / 4 * 3 - buttonHeight / 2;
  let buttonColorOriginalLoose = {
    r: 255,
    g: 255,
    b: 255
  };
  let buttonColorHoverLoose = {
    r: 175,
    g: 175,
    b: 175
  };
  let buttonCornerRadius = 10;
  let textColor = color(0);
  let textColorHover = 0;
  let textSizeOwn = viewportSize.totalSqrt / 16.5;
  let textFontOwn = atari;
  let textOwn = "Start";
  let amountFramesPerShift = 16;
  drawButton(buttonX, 
            buttonY, 
            buttonWidth, 
            buttonHeight, 
            buttonColorOriginalLoose, 
            buttonColorHoverLoose, 
            buttonCornerRadius, 
            textColor, 
            textColorHover, 
            textSizeOwn, 
            textFontOwn, 
            textOwn,
            amountFramesPerShift);
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