function draw() {
  sleep(1000)

  // Clear drawings of previous frame
  clear();


  // For debugging
  
  if (globalVars.global.frameCount <= 2000) {
    console.log("Framecount: " + globalVars.global.frameCount);
    console.log(globalVars.global.fadeAnimationFrame);
    globalVars.global.frameCount++;
  }


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



  // Go to current step in program
  switch (globalVars.global.goTo) {
    // Fade in center line
    case "fadeInCenterLine":
      drawCenterLine(viewportSize, globalVars.fadeAnimations.centerLineOpacity);
      break;


    // Start
    case "start":
      drawCenterLine(viewportSize, globalVars.fadeAnimations.centerLineOpacity);
      //console.log(globalVars.fadeAnimations.startScreenOpacity)
      start(viewportSize, globalVars.fadeAnimations.startScreenOpacity);
      break;


    case "fadeOutStart":
      drawCenterLine(viewportSize);
      start(viewportSize);
      break;


    // Fade in game
    case "initGame":
      prepareGame();
      gameResetAnimation();
      break;
    

    case "gameResetAnimation":
      gameResetAnimation();
      break;


    // Game
    case "game":
      game(viewportSize, globalVars.game.gameMode);
      break;
  }

  animations();
}