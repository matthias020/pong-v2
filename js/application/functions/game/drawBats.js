function drawBats(bat1X, bat2X, bat1Y, bat2Y, batWidth, batHeight) {
  // Default opacity 100%
  let batsCurrentOpacity = 255;

  // When in fadeIn animation increase bat opacity
  if (globalVars.global.duringFadeAnimation == "fadeIn") { 
    batsCurrentOpacity = globalVars.global.fadeAnimationFrame * conf.opacityStep;
  }

  // Apply Opacity
  fill(conf.defaultColor, batsCurrentOpacity);

  
  // Draw left and right bat respectively
  rect(bat1X, bat1Y, batWidth, batHeight);
  rect(bat2X, bat2Y, batWidth, batHeight);
}