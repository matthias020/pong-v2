let atariFont;
let logoImage;
function preload() {
  atariFont = loadFont("fonts/SF Atarian System Italic.ttf");
  logoImage = loadImage("icons/pongiconnoback.png");
}

let conf;
let globalVars;
function setup() {
  conf = {
    amountFramesTransition: 16, //
    defaultColor: 255,

    logo: {
      image: logoImage, //
      URL: "https://github.com/matthias020/pong-v2/" //
    },

    button: {
      cornerRadius: 10, //
      color: {r: 255, g: 255, b: 255},
      colorHover: {r: 0, g: 0, b: 0},
      text: "Start",
      textColor: {r: 0, g: 0, b: 0},
      textColorHover: {r: 255, g: 255, b: 255},
      textFont: atariFont,
      link: "exitStart"
    }
  };
  conf.opacityStep = 255 / conf.amountFramesTransition;

  globalVars = {
    goTo: "initCenterLine",
    transitionFrame: 0,
    duringTransition: false, //

    logo: {
      overlayOpacity: 0,
      clickDisableCount: 0
    },

    button: {
      transitionFrame: 0
    }
  };
}

//let logoOpacity = 0;
//let clickCounter = 0;
//let transitionFrame = 0;
//let goTo = "initCenterLine";
//let currentFrameInTransparencyChange = 1;
//let amountFramesPerShiftFade = 16; //
//let amountFramesPerShiftElse = 16; //
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

//function getcenterLineBlockSize(viewportSize) {
//  let centerLineBlockSize = {
//    width: viewportSize.width / 350,
//    height: viewportSize.height / 60
//  };

//  return centerLineBlockSize;
//}
function drawCenterLine(viewportSize) {
  let centerLineBlockSize = {
    width: viewportSize.width / 350,
    height: viewportSize.height / 60
  };

  if (globalVars.duringTransition == "fadeIn") {
    let centerLineCurrentOpacity = globalVars.transitionFrame * conf.opacityStep;
    fill(255, 255, 255, centerLineCurrentOpacity);
    console.log("centerLine: " + centerLineCurrentOpacity);
  }

  let centerLineX = viewportSize.width / 2 - centerLineBlockSize.width / 2;
  let centerLineBlockCurrentY = centerLineBlockSize.height / 2;

  while (centerLineBlockCurrentY < viewportSize.height) {
    rect(centerLineX, centerLineBlockCurrentY, centerLineBlockSize.width, centerLineBlockSize.height);
    centerLineBlockCurrentY = centerLineBlockCurrentY + centerLineBlockSize.height * 2;
  }
}

function showLogo(logoImage, 
                  logoX, 
                  logoY, 
                  logoSize, 
                  logoMiddleX, 
                  logoMiddleY,
                  logoURL) {
  
  tint(255, 255);

  if (globalVars.duringTransition != false) {
    let logoOverlayCurrentTransparency = globalVars.transitionFrame * conf.opacityStep;

    if (globalVars.duringTransition == "fadeOut") {
      logoOverlayCurrentTransparency = 255 - logoOverlayCurrentTransparency;
    }

    tint(255, logoOverlayCurrentTransparency);
    console.log("Logo: " + logoOverlayCurrentTransparency);
  }

  image(logoImage, logoX, logoY, logoSize, logoSize);
  
  mouseDistanceLogoMiddle = dist(mouseX, mouseY, logoMiddleX, logoMiddleY);
  if (mouseDistanceLogoMiddle < logoSize / 2 && globalVars.duringTransition == false) {
    if (mouseIsPressed == true 
        && mouseButton == LEFT 
        && globalVars.logo.clickDisableCount > 15) {

      window.open(logoURL, '_blank').focus();
      globalVars.logo.clickDisableCount = 0;
      mouseIsPressed = false;
    }

    if (globalVars.logo.overlayOpacity < 80 && globalVars.duringTransition == false) {
      globalVars.logo.overlayOpacity += 5;
    }
  } else {
    if (globalVars.logo.overlayOpacity > 0 && globalVars.duringTransition == false) {
      globalVars.logo.overlayOpacity -= 5;
    }
  }

  fill(0, 0, 0, globalVars.logo.overlayOpacity);
  circle(logoMiddleX, logoMiddleY, logoSize);
}

function drawButton(buttonX, 
                    buttonY, 
                    buttonWidth, 
                    buttonHeight, 
                    buttonColorOriginal, 
                    buttonColorHover, 
                    buttonCornerRadius, 
                    buttonTextColorOriginal, 
                    buttonTextColorHover, 
                    buttonTextSize, 
                    buttonTextFont, 
                    buttonText, 
                    changeGoToTo) {

  let buttonTransitionPerFrame = {
    r: (buttonColorHover.r - buttonColorOriginal.r) / conf.amountFramesTransition,
    g: (buttonColorHover.g - buttonColorOriginal.g) / conf.amountFramesTransition,
    b: (buttonColorHover.b - buttonColorOriginal.b) / conf.amountFramesTransition
  };
  let buttonTextTransitionPerFrame = {
    r: (buttonTextColorHover.r - buttonTextColorOriginal.r) / conf.amountFramesTransition,
    g: (buttonTextColorHover.g - buttonTextColorOriginal.g) / conf.amountFramesTransition,
    b: (buttonTextColorHover.b - buttonTextColorOriginal.b) / conf.amountFramesTransition
  };

  if (mouseX > buttonX 
      && mouseX < buttonX + buttonWidth 
      && mouseY > buttonY 
      && mouseY < buttonY + buttonHeight) {
    
    if (mouseIsPressed == true && mouseButton == LEFT) {
      globalVars.goTo = changeGoToTo;
      mouseIsPressed = false;
    }
    
    if (globalVars.button.transitionFrame < conf.amountFramesTransition && globalVars.duringTransition == false) {
      globalVars.button.transitionFrame++;
    }
  } else {
    if (globalVars.button.transitionFrame > 0 && globalVars.duringTransition == false) {
      globalVars.button.transitionFrame--;
    }
  }

  let buttonCurrentOpacity = 255;
  if (globalVars.duringTransition == "fadeIn") {
    buttonCurrentOpacity = globalVars.transitionFrame * conf.opacityStep;
    console.log("button: " + buttonCurrentOpacity);
  } else if (globalVars.duringTransition == "fadeOut") {
    buttonCurrentOpacity = 255 - globalVars.transitionFrame * conf.opacityStep;
    console.log("button: " + buttonCurrentOpacity);
  }

  let buttonColor = {
    r: buttonColorOriginal.r + buttonTransitionPerFrame.r * globalVars.button.transitionFrame,
    g: buttonColorOriginal.g + buttonTransitionPerFrame.g * globalVars.button.transitionFrame,
    b: buttonColorOriginal.b + buttonTransitionPerFrame.b * globalVars.button.transitionFrame
  };
  let buttonColorReady = color(buttonColor.r, buttonColor.g, buttonColor.b, buttonCurrentOpacity);
  let buttonTextColor = {
    r: buttonTextColorOriginal.r + buttonTextTransitionPerFrame.r * globalVars.button.transitionFrame,
    g: buttonTextColorOriginal.g + buttonTextTransitionPerFrame.g * globalVars.button.transitionFrame,
    b: buttonTextColorOriginal.b + buttonTextTransitionPerFrame.b * globalVars.button.transitionFrame
  };
  let buttonTextColorReady = color(buttonTextColor.r, buttonTextColor.g, buttonTextColor.b, buttonCurrentOpacity);

  fill(buttonColorReady);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, buttonCornerRadius);
  fill(buttonTextColorReady);
  textFont(buttonTextFont);
  textSize(buttonTextSize);
  textAlign(CENTER, CENTER);
  text(buttonText, buttonX, buttonY, buttonWidth, buttonHeight);
}

function start(viewportSize) {
  let logoSize = viewportSize.totalSqrt / 5.5;
  let logoX = viewportSize.width / 2 - logoSize / 2;
  let logoY = viewportSize.height / 3 - logoSize / 2;
  let logoMiddleX = viewportSize.width / 2;
  let logoMiddleY = viewportSize.height / 3;
  globalVars.logo.clickDisableCount++;
  showLogo(conf.logo.image, logoX, logoY, logoSize, logoMiddleX, logoMiddleY, conf.logo.URL);

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
  let textFontOwn = atariFont;
  let textOwn = "Start";
  let changeGoToTo = "exitStart";
  drawButton(buttonX, 
            buttonY, 
            buttonWidth, 
            buttonHeight, 
            buttonColorOriginalLoose, 
            buttonColorHoverLoose, 
            conf.button.cornerRadius, 
            textColorOriginalLoose, 
            textColorHoverLoose, 
            textSizeOwn, 
            textFontOwn, 
            textOwn,
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

  //let centerLineBlockSize = getcenterLineBlockSize(viewportSize);
  if (globalVars.goTo != "initCenterLine") {
    globalVars.duringTransition = false;
    drawCenterLine(viewportSize);
  }

  if (globalVars.goTo == "initCenterLine") {
    globalVars.duringTransition = "fadeIn";
    drawCenterLine(viewportSize);
    if (globalVars.transitionFrame == conf.amountFramesTransition) {
      globalVars.transitionFrame = 1;
      globalVars.goTo = "initStart";
    }
    globalVars.transitionFrame++;
  } else if (globalVars.goTo == "initStart") {
    globalVars.duringTransition = "fadeIn";
    start(viewportSize);
    if (globalVars.transitionFrame == conf.amountFramesTransition) {
      globalVars.transitionFrame = 1;
      globalVars.goTo = "start";
    }
    globalVars.transitionFrame++;
  } else if (globalVars.goTo == "start") {
    globalVars.duringTransition = false;
    start(viewportSize);
  } else if (globalVars.goTo == "exitStart") {
    globalVars.duringTransition = "fadeOut";
    start(viewportSize);
    if (globalVars.transitionFrame == conf.amountFramesTransition) {
      globalVars.transitionFrame = 1;
      globalVars.goTo = "next";
    }
    globalVars.transitionFrame++;
  }
}