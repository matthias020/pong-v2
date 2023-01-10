function drawCenterLine(viewportSize) {
  // Defines the size of one block of the center line
  let centerLineBlockSize = {
    width: viewportSize.width / 350,
    height: viewportSize.height / 60
  };


  // Default opacity 100%
  let centerLineCurrentOpacity = 255;

  // If during fadeIn animation fade in center line over the span of conf.amountFramesAnimations frames
  if (globalVars.global.duringFadeAnimation == "fadeIn") {
    centerLineCurrentOpacity = globalVars.global.fadeAnimationFrame * conf.opacityStep;
  }

  // Apply opacity
  fill(conf.defaultColor, centerLineCurrentOpacity); 

  
  // Middle of screen
  let centerLineX = viewportSize.width / 2 - centerLineBlockSize.width / 2;

  // y coordinate of the first block
  let centerLineBlockCurrentY = centerLineBlockSize.height / 2;

  // Continue till bottom of screen
  while (centerLineBlockCurrentY < viewportSize.height) { 
    // Draw current block
    rect(centerLineX, 
         centerLineBlockCurrentY, 
         centerLineBlockSize.width, 
         centerLineBlockSize.height);

    // Increase current y coordinate of next block by two block heights (create a dashed line)
    centerLineBlockCurrentY = centerLineBlockCurrentY + centerLineBlockSize.height * 2; 
  }
}