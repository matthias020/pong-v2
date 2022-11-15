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
      transitionFrame: [0,0,0],
      goTo: ""
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
  if (globalVars.duringTransition != false) {
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
                    buttonLink,
                    buttonNumber) {

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
      globalVars.button.goTo = buttonLink;
      mouseIsPressed = false;
    }
    
    if (globalVars.button.transitionFrame[buttonNumber] < conf.amountFramesTransition 
        && globalVars.duringTransition == false) {
      
      globalVars.button.transitionFrame[buttonNumber]++;
    }
  } else {
    if (globalVars.button.transitionFrame[buttonNumber] > 0 
        && globalVars.duringTransition == false) {

      globalVars.button.transitionFrame[buttonNumber]--;
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
       * globalVars.button.transitionFrame[buttonNumber],

    g: buttonColorOriginal.g 
       + buttonTransitionPerFrame.g 
       * globalVars.button.transitionFrame[buttonNumber],

    b: buttonColorOriginal.b 
       + buttonTransitionPerFrame.b 
       * globalVars.button.transitionFrame[buttonNumber]
  };
  let buttonColorReady = color(buttonColor.r, 
                               buttonColor.g, 
                               buttonColor.b, 
                               buttonCurrentOpacity);
  let buttonTextColor = {
    r: buttonTextColorOriginal.r 
       + buttonTextTransitionPerFrame.r 
       * globalVars.button.transitionFrame[buttonNumber],

    g: buttonTextColorOriginal.g 
       + buttonTextTransitionPerFrame.g 
       * globalVars.button.transitionFrame[buttonNumber],

    b: buttonTextColorOriginal.b 
       + buttonTextTransitionPerFrame.b 
       * globalVars.button.transitionFrame[buttonNumber]
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
  let logoSize = viewportSize.height / 3.7;
  let logoX = viewportSize.width / 2 - logoSize / 2;
  let logoY = viewportSize.height / 5 - logoSize / 2;
  let logoMiddleX = logoX + logoSize / 2;
  let logoMiddleY = logoY + logoSize / 2;
  showLogo(conf.logo.image, logoX, logoY, logoSize, logoMiddleX, logoMiddleY, conf.logo.URL);


  let buttonYIncrement = viewportSize.height / 30;
  let buttonWidth = viewportSize.width / 5;
  let buttonHeight = viewportSize.height / 7.5;
  let buttonX = viewportSize.width / 2 - buttonWidth / 2;
  let buttonTextSize = viewportSize.totalSqrt / 24;

  let buttonNumber = 0;
  let buttonY = logoY + logoSize + buttonYIncrement * 1.9;
  let buttonText = "1 player";
  let buttonLink = "1Player";
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
             buttonLink,
             buttonNumber);

  buttonNumber = 1;
  buttonY = buttonY + buttonHeight + buttonYIncrement;
  buttonText = "2 player";
  buttonLink = "2Player";
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
             buttonLink,
             buttonNumber);

  buttonNumber = 2;
  buttonY = buttonY + buttonHeight + buttonYIncrement;
  buttonText = "Multiplayer";
  buttonLink = "multiplayer";
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
             buttonLink,
             buttonNumber);
  
  if (globalVars.button.goTo != "") {
    globalVars.goTo = "exitStart";
  }
}

function drawBats(bat1X, bat1Y, bat1Width, bat1Height, bat2X, bat2Y, bat2Width, bat2Height) {

}

function localGame(viewportSize, amountPlayers) {
  drawBats();
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
        if (globalVars.button.goTo == "multiplayer") {
          globalVars.goTo = "initMultiplayerGame";
        } else {
          globalVars.goTo = "initLocalGame"
        }
      }
      globalVars.transitionFrame++;
      break;

    case "initLocalGame":
      globalVars.duringTransition = "fadeIn";
      localGame(viewportSize, 0);
      break;
    
    case "initMultiplayerGame":
      console.log("Starting multiplayer game");
      break;
  }
}