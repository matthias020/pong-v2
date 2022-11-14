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
    amountFramesTransition: 16,
    defaultColor: 255,

    logo: {
      image: logoImage,
      URL: "https://github.com/matthias020/pong-v2/",
      goToIgnoreFade: ["exitStart", "initMenu"]
    },

    button: {
      cornerRadius: 10,
      color: {r: 255, g: 255, b: 255},
      colorHover: {r: 0, g: 0, b: 0},
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
    duringTransition: false,

    performance: {
      fpsWaitCount: 0
    },
    
    logo: {
      overlayOpacity: 0
    },

    button: {
      transitionFrame: 0
    }
  };
}


function sleep(ms) {
  const date = Date.now();
  let currentDate = null;

  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}

function drawCenterLine(viewportSize) {
  let centerLineBlockSize = {
    width: viewportSize.width / 350,
    height: viewportSize.height / 60
  };

  if (globalVars.duringTransition == "fadeIn") {
    let centerLineCurrentOpacity = globalVars.transitionFrame * conf.opacityStep;
    fill(conf.defaultColor, centerLineCurrentOpacity);
  }

  let centerLineX = viewportSize.width / 2 - centerLineBlockSize.width / 2;
  let centerLineBlockCurrentY = centerLineBlockSize.height / 2;
  while (centerLineBlockCurrentY < viewportSize.height) {
    rect(centerLineX, 
         centerLineBlockCurrentY, 
         centerLineBlockSize.width, 
         centerLineBlockSize.height);

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
  if (globalVars.duringTransition != false 
      && conf.logo.goToIgnoreFade.includes(globalVars.goTo) == false) {

    let logoCurrentOpacity = globalVars.transitionFrame * conf.opacityStep;
    if (globalVars.duringTransition == "fadeOut") {
      logoCurrentOpacity = 255 - logoCurrentOpacity;
    }
    tint(255, logoCurrentOpacity);
  }

  image(logoImage, logoX, logoY, logoSize, logoSize);
  
  mouseDistanceLogoMiddle = dist(mouseX, mouseY, logoMiddleX, logoMiddleY);
  if (mouseDistanceLogoMiddle < logoSize / 2 && globalVars.duringTransition == false) {
    if (mouseIsPressed == true && mouseButton == LEFT) {

      window.open(logoURL, '_blank').focus();
      mouseIsPressed = false;
    }

    if (globalVars.logo.overlayOpacity < 80) {
      globalVars.logo.overlayOpacity += 5;
    }
  } else if (globalVars.duringTransition == false) {
    if (globalVars.logo.overlayOpacity > 0) {
      globalVars.logo.overlayOpacity -= 5;
    }
  }

  fill(0, globalVars.logo.overlayOpacity);
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
                    buttonLink) {

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
      globalVars.goTo = buttonLink;
      mouseIsPressed = false;
    }
    
    if (globalVars.button.transitionFrame < conf.amountFramesTransition 
        && globalVars.duringTransition == false) {

      globalVars.button.transitionFrame++;
    }
  } else {
    if (globalVars.button.transitionFrame > 0 
        && globalVars.duringTransition == false) {

      globalVars.button.transitionFrame--;
    }
  }

  let buttonCurrentOpacity = 255;
  if (globalVars.duringTransition == "fadeIn") {
    buttonCurrentOpacity = globalVars.transitionFrame * conf.opacityStep;
  } else if (globalVars.duringTransition == "fadeOut") {
    buttonCurrentOpacity = 255 - globalVars.transitionFrame * conf.opacityStep;
  }

  let buttonColor = {
    r: buttonColorOriginal.r 
       + buttonTransitionPerFrame.r 
       * globalVars.button.transitionFrame,

    g: buttonColorOriginal.g 
       + buttonTransitionPerFrame.g 
       * globalVars.button.transitionFrame,

    b: buttonColorOriginal.b 
       + buttonTransitionPerFrame.b 
       * globalVars.button.transitionFrame
  };
  let buttonColorReady = color(buttonColor.r, 
                               buttonColor.g, 
                               buttonColor.b, 
                               buttonCurrentOpacity);
  let buttonTextColor = {
    r: buttonTextColorOriginal.r 
       + buttonTextTransitionPerFrame.r 
       * globalVars.button.transitionFrame,

    g: buttonTextColorOriginal.g 
       + buttonTextTransitionPerFrame.g 
       * globalVars.button.transitionFrame,

    b: buttonTextColorOriginal.b 
       + buttonTextTransitionPerFrame.b 
       * globalVars.button.transitionFrame
  };
  let buttonTextColorReady = color(buttonTextColor.r, 
                                   buttonTextColor.g, 
                                   buttonTextColor.b, 
                                   buttonCurrentOpacity);

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
  showLogo(conf.logo.image, logoX, logoY, logoSize, logoMiddleX, logoMiddleY, conf.logo.URL);

  let buttonWidth = viewportSize.width / 4;
  let buttonHeight = viewportSize.height / 6;
  let buttonX = viewportSize.width / 2 - buttonWidth / 2;
  let buttonY = viewportSize.height / 4 * 3 - buttonHeight / 2;
  let buttonTextSize = viewportSize.totalSqrt / 16.5;
  let buttonText = "Start";
  let buttonLink = "exitStart";
  drawButton(buttonX, 
             buttonY, 
             buttonWidth, 
             buttonHeight, 
             conf.button.color, 
             conf.button.colorHover, 
             conf.button.cornerRadius, 
             conf.button.textColor, 
             conf.button.textColorHover, 
             buttonTextSize, 
             conf.button.textFont, 
             buttonText,
             buttonLink);
}


function draw() {
  clear();

  let viewportSize = {
    width: windowWidth,
    height: windowHeight,
    totalSqrt: Math.sqrt(windowWidth * windowHeight)
  };
  createCanvas(viewportSize.width, viewportSize.height);
  background(0);

  fill(conf.defaultColor);
  noStroke();

  /*globalVars.fpsWaitCount++;
  let fps = frameRate();
  if (globalVars.fpsWaitCount == 20) {
  //  text("FPS: " + fps.toFixed(2), 10, height - 50);
    console.log("FPS: " + fps.toFixed(2));
    globalVars.fpsWaitCount = 0;
  }*/

  if (globalVars.goTo != "initCenterLine") {
    globalVars.duringTransition = false;
    drawCenterLine(viewportSize);
  }

  switch (globalVars.goTo) {
    case "initCenterLine":
      globalVars.duringTransition = "fadeIn";
      drawCenterLine(viewportSize);
      if (globalVars.transitionFrame == conf.amountFramesTransition) {
        globalVars.transitionFrame = 1;
        globalVars.goTo = "initStart";
      }
      globalVars.transitionFrame++;
      break;

    case "initStart":
      globalVars.duringTransition = "fadeIn";
      start(viewportSize);
      if (globalVars.transitionFrame == conf.amountFramesTransition) {
        globalVars.transitionFrame = 1;
        globalVars.goTo = "start";
      }
      globalVars.transitionFrame++;
      break;

    case "start":
      globalVars.duringTransition = false;
      start(viewportSize);
      break;

    case "exitStart":
      globalVars.duringTransition = "fadeOut";
      start(viewportSize);
      if (globalVars.transitionFrame == conf.amountFramesTransition) {
        globalVars.transitionFrame = 1;
        globalVars.goTo = "initMenu";
      }
      globalVars.transitionFrame++;
      break;
  }
}