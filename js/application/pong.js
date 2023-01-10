function draw() {
  // Clear drawings of previous frame
  clear();


  // For debugging
  /*
  if (globalVars.global.frameCount <= 1300) {
    console.log("Framecount: " + globalVars.global.frameCount)
    globalVars.global.frameCount++
  }
  */


  // Check performance
  /*
  globalVars.performance.fpsWaitCount++;
  let fps = frameRate();
  if (globalVars.performance.fpsWaitCount == 20) {
  //  text("FPS: " + fps.toFixed(2), 10, height - 50);
    console.log("FPS: " + fps.toFixed(2));
    globalVars.performance.fpsWaitCount = 0;
  }
  */
  

  let viewportSize = {
    width: windowWidth,
    height: windowHeight,

    // totalSqrt makes it possible to alter the size of some object using viewport width and height combined
    totalSqrt: Math.sqrt(windowWidth * windowHeight)
  };
  createCanvas(viewportSize.width, viewportSize.height);

  // Canvas background black
  background(0);


  // Apply default color and no borders around objects
  fill(conf.defaultColor);
  noStroke();


  // Only fade in centerline at program start
  if (globalVars.global.goTo != "initCenterLine") { 
    globalVars.global.duringFadeAnimation = false;
    drawCenterLine(viewportSize);
  }


  // Go to current step in program
  switch (globalVars.global.goTo) {
    // Fade in center line
    case "initCenterLine":
      globalVars.global.duringFadeAnimation = "fadeIn";

      drawCenterLine(viewportSize);

      // If animation done proceed to next step
      if (globalVars.global.fadeAnimationFrame == conf.amountFramesAnimations) { 
        globalVars.global.fadeAnimationFrame = 1;
        globalVars.global.goTo = "initStart";

      // Else increase frame in animation
      } else {
        globalVars.global.fadeAnimationFrame++;
      }

      break;

    
    // Fade in start
    case "initStart": 
      globalVars.global.duringFadeAnimation = "fadeIn";

      start(viewportSize);

      if (globalVars.global.fadeAnimationFrame == conf.amountFramesAnimations - 1) {
        globalVars.global.fadeAnimationFrame = 1;
        globalVars.global.goTo = "start";
      } else {
        globalVars.global.fadeAnimationFrame++;
      }

      break;


    // Start
    case "start": 
      globalVars.global.duringFadeAnimation = false;
      start(viewportSize);
      break;


    // Fade out start
    case "exitStart":
      globalVars.global.duringFadeAnimation = "fadeOut";

      start(viewportSize);

      if (globalVars.global.fadeAnimationFrame == conf.amountFramesAnimations) {
        globalVars.global.fadeAnimationFrame = 1;
        globalVars.global.goTo = "initGame";
      } else {
        globalVars.global.fadeAnimationFrame++;
      }

      break;
    

    // Fade in game
    case "initGame":
      globalVars.global.duringFadeAnimation = "fadeIn";

      game(viewportSize, false);

      if (globalVars.global.fadeAnimationFrame == conf.amountFramesAnimations - 1) {
        globalVars.global.fadeAnimationFrame = 0;
        globalVars.global.goTo = "game";
      } else {
        globalVars.global.fadeAnimationFrame++;
      }

      break;
    

    // Game
    case "game":
      globalVars.global.duringFadeAnimation = false;
      game(viewportSize, globalVars.game.gameMode);
      break;
  }
}