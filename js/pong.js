let atariFont;
let logoImage;
function preload() {
  atariFont = loadFont("fonts/SF Atarian System Italic.ttf");
  logoImage = loadImage("icons/pongiconnoback.png");
}


let conf = {
  amountFramesTransition: 16,
  defaultColor: color(255),

  logo: {
    image: logoImage,
    URL: "https://github.com/matthias020/pong-v2/"
  },

  button: {
    cornerRadius: 10,
    color: {r: 255, g: 255, b: 255},
    colorHover: {r: 0, g: 0, b: 0},
    text: "Start",
    textColor: {r: 0, g: 0, b: 0},
    textColorHover: {r: 255, g: 255, b: 255},
    textFont: atariFont,
    link: "menu"
  }
};

conf.opacityStep = 255 / conf.amountFramesTransition;

let logoOpacity = 0;
let clickCounter = 0;
let frameShiftNumber = 0;
let goTo = "initCenterLine";
let currentFrameInTransparencyChange = 1;
let amountFramesPerShiftFade = 16; //
let amountFramesPerShiftElse = 16; //
//let fpsCount = 0;


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
function drawCenterLine(centerBlockSize, viewportSize, duringTransition) {
  if (duringTransition == "fadeIn") {
    let centerLineOpacityChangePerFrame = 255 / amountFramesPerShiftFade; //
    let currentOpacity = currentFrameInTransparencyChange * centerLineOpacityChangePerFrame;
    fill(255, 255, 255, currentOpacity);
    console.log("centerLine: " + currentOpacity);
  }

  let centerLineX = viewportSize.width / 2 - centerBlockSize.width / 2;
  let currentBlockY = centerBlockSize.height / 2;

  while (currentBlockY < viewportSize.height) {
    rect(centerLineX, currentBlockY, centerBlockSize.width, centerBlockSize.height);
    currentBlockY = currentBlockY + centerBlockSize.height * 2;
  }
}

function showLogo(logo, 
                  logoX, 
                  logoY, 
                  logoSize, 
                  logoMiddleX, 
                  logoMiddleY,
                  logoURL, 
                  duringTransition) {
  
  tint(255, 255);
  if (duringTransition == "fadeIn") {
    let imageOpacityChangePerFrame = 255 / amountFramesPerShiftFade;
    let currentOpacity = currentFrameInTransparencyChange * imageOpacityChangePerFrame;
    tint(255, currentOpacity);
    console.log("Logo: " + currentOpacity);
  } else if (duringTransition == "fadeOut") {
    let imageTransparencyChangePerFrame = 255 / amountFramesPerShiftFade;
    let currentOpacity = 255 - currentFrameInTransparencyChange * imageTransparencyChangePerFrame;
    tint(255, currentOpacity);
    console.log("Logo: " + currentOpacity);
  }

  image(logo, logoX, logoY, logoSize, logoSize);
  
  if (dist(mouseX, mouseY, logoMiddleX, logoMiddleY) < logoSize / 2 && duringTransition == false) {
    if (mouseIsPressed == true 
        && mouseButton == LEFT 
        && clickCounter > 15) {

      window.open(logoURL, '_blank').focus();
      clickCounter = 0;
      mouseIsPressed = false;
    }

    if (logoOpacity < 80 && duringTransition == false) {
      logoOpacity = logoOpacity + 5;
    }
  } else {
    if (logoOpacity > 0 && duringTransition == false) {
      logoOpacity = logoOpacity - 5;
    }
  }

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
                    textColorOriginalLoose, 
                    textColorHoverLoose, 
                    textSizeOwn, 
                    textFontOwn, 
                    textOwn, 
                    duringTransition, 
                    changeGoToTo) {

  let buttonColorShiftPerFrame = {
    r: (buttonColorHoverLoose.r - buttonColorOriginalLoose.r) / amountFramesPerShiftElse,
    g: (buttonColorHoverLoose.g - buttonColorOriginalLoose.g) / amountFramesPerShiftElse,
    b: (buttonColorHoverLoose.b - buttonColorOriginalLoose.b) / amountFramesPerShiftElse
  };
  let textColorShiftPerFrame = {
    r: (textColorHoverLoose.r - textColorOriginalLoose.r) / amountFramesPerShiftElse,
    g: (textColorHoverLoose.g - textColorOriginalLoose.g) / amountFramesPerShiftElse,
    b: (textColorHoverLoose.b - textColorOriginalLoose.b) / amountFramesPerShiftElse
  };

  if (mouseX > buttonX 
      && mouseX < buttonX + buttonWidth 
      && mouseY > buttonY 
      && mouseY < buttonY + buttonHeight) {
    
    if (mouseIsPressed == true && mouseButton == LEFT) {
      goTo = changeGoToTo;
      mouseIsPressed = false;
    }
    
    if (frameShiftNumber < amountFramesPerShiftElse && duringTransition == false) {
      frameShiftNumber++;
    }
  } else {
    if (frameShiftNumber > 0 && duringTransition == false) {
      frameShiftNumber--;
    }
  }

  let currentOpacity = 255;
  if (duringTransition == "fadeIn") {
    let buttonOpacityChangePerFrame = 255 / amountFramesPerShiftFade;
    currentOpacity = currentFrameInTransparencyChange * buttonOpacityChangePerFrame;
    console.log("button: " + currentOpacity);
  } else if (duringTransition == "fadeOut") {
    let buttonTransparencyChangePerFrame = 255 / amountFramesPerShiftFade;
    currentOpacity = 255 - currentFrameInTransparencyChange * buttonTransparencyChangePerFrame;
    console.log("button: " + currentOpacity);
  }

  let buttonColorLoose = {
    r: buttonColorOriginalLoose.r + buttonColorShiftPerFrame.r * frameShiftNumber,
    g: buttonColorOriginalLoose.g + buttonColorShiftPerFrame.g * frameShiftNumber,
    b: buttonColorOriginalLoose.b + buttonColorShiftPerFrame.b * frameShiftNumber
  };
  let buttonColor = color(buttonColorLoose.r, buttonColorLoose.g, buttonColorLoose.b, currentOpacity);
  let textColorLoose = {
    r: textColorOriginalLoose.r + textColorShiftPerFrame.r * frameShiftNumber,
    g: textColorOriginalLoose.g + textColorShiftPerFrame.g * frameShiftNumber,
    b: textColorOriginalLoose.b + textColorShiftPerFrame.b * frameShiftNumber
  };
  let textColor = color(textColorLoose.r, textColorLoose.g, textColorLoose.b, currentOpacity);

  fill(buttonColor);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, buttonCornerRadius);
  fill(textColor);
  textFont(textFontOwn);
  textSize(textSizeOwn);
  textAlign(CENTER, CENTER);
  text(textOwn, buttonX, buttonY, buttonWidth, buttonHeight);
}

function start(viewportSize, logo, duringTransition) {
  let logoSize = viewportSize.totalSqrt / 5.5;
  let logoX = viewportSize.width / 2 - logoSize / 2;
  let logoY = viewportSize.height / 3 - logoSize / 2;
  let logoMiddleX = viewportSize.width / 2;
  let logoMiddleY = viewportSize.height / 3;
  let logoURL = "https://github.com/matthias020/pong-v2/";
  clickCounter++;
  showLogo(logo, logoX, logoY, logoSize, logoMiddleX, logoMiddleY, logoURL, duringTransition);

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
    r: 0,
    g: 0,
    b: 0
  };
  let buttonCornerRadius = 10;
  let textColorOriginalLoose = {
    r: 0,
    g: 0,
    b: 0
  };
  let textColorHoverLoose = {
    r: 255,
    g: 255,
    b: 255
  };
  let textSizeOwn = viewportSize.totalSqrt / 16.5;
  let textFontOwn = atari;
  let textOwn = "Start";
  let changeGoToTo = "menu";
  drawButton(buttonX, 
            buttonY, 
            buttonWidth, 
            buttonHeight, 
            buttonColorOriginalLoose, 
            buttonColorHoverLoose, 
            buttonCornerRadius, 
            textColorOriginalLoose, 
            textColorHoverLoose, 
            textSizeOwn, 
            textFontOwn, 
            textOwn, 
            duringTransition,
            changeGoToTo);
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
  //  console.log("FPS: " + fps.toFixed(2));
  //  fpsCount = 0;
  //}

  let centerBlockSize = getCenterBlockSize(viewportSize);
  if (goTo != "initCenterLine") {
    let duringTransition = false;
    drawCenterLine(centerBlockSize, viewportSize, duringTransition);
  }

  if (goTo == "initCenterLine") {
    let duringTransition = "fadeIn";
    drawCenterLine(centerBlockSize, viewportSize, duringTransition);
    currentFrameInTransparencyChange++;
    if (currentFrameInTransparencyChange == amountFramesPerShiftFade) {
      currentFrameInTransparencyChange = 1;
      goTo = "initStart";
    }
  } else if (goTo == "initStart") {
    let duringTransition = "fadeIn";
    start(viewportSize, logo, duringTransition);
    currentFrameInTransparencyChange++;
    if (currentFrameInTransparencyChange == amountFramesPerShiftFade) {
      currentFrameInTransparencyChange = 1;
      goTo = "start";
    }
  } else if (goTo == "start") {
    let duringTransition = false;
    start(viewportSize, logo, duringTransition);
  } else if (goTo == "menu") {
    let duringTransition = "fadeOut";
    start(viewportSize, logo, duringTransition);
    currentFrameInTransparencyChange++;
    if (currentFrameInTransparencyChange == amountFramesPerShiftFade) {
      currentFrameInTransparencyChange = 1;
      goTo = "next";
    }
  }
}