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
                    buttonText, 
                    buttonID,
                    amountFramesAnimation,
                    opacity) {
  
  // Value when button not clicked
  let returnValue = false;
  

  // Default opacity 100%

  // When in fadeIn animation increase button opacity
  if (opacity == 255) {
    if (mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > buttonY &&
        mouseY < buttonY + buttonHeight) { 

      // If mouse inside button and mouse clicked return true
      if (mouseIsPressed == true && mouseButton == LEFT) { 
        returnValue = true;
        mouseIsPressed = false;
      }
      
      // If mouse inside button and button is not yet at the desired hover color set color closer to hover color
      if (globalVars.button.colorChangeAnimationFrame[buttonID] < amountFramesAnimation) { 
        globalVars.button.colorChangeAnimationFrame[buttonID]++;
      }

    } else {
      // If mouse not inside button and and button is not yet back to default color set color closer to default color
      if (globalVars.button.colorChangeAnimationFrame[buttonID] > 0) {
        globalVars.button.colorChangeAnimationFrame[buttonID]--;
      }
    }
  }


  // How much the r, g, and b of the button color need to change per frame so that after 
  // conf.amountFramesAnimations is reached the desired hover color is reached (button hover animation)
  let buttonColorStep = {
    r: (buttonColorHover.r - buttonColorOriginal.r) / amountFramesAnimation,
    g: (buttonColorHover.g - buttonColorOriginal.g) / amountFramesAnimation,
    b: (buttonColorHover.b - buttonColorOriginal.b) / amountFramesAnimation
  };
  // See previous comment but for button text
  let buttonTextColorStep = { 
    r: (buttonTextColorHover.r - buttonTextColorOriginal.r) / amountFramesAnimation,
    g: (buttonTextColorHover.g - buttonTextColorOriginal.g) / amountFramesAnimation,
    b: (buttonTextColorHover.b - buttonTextColorOriginal.b) / amountFramesAnimation
  };

  // Set the color of the button depending on the current frame in the button hover animation
  let buttonColor = { 
    r: buttonColorOriginal.r 
       + buttonColorStep.r 
       * globalVars.button.colorChangeAnimationFrame[buttonID],

    g: buttonColorOriginal.g 
       + buttonColorStep.g 
       * globalVars.button.colorChangeAnimationFrame[buttonID],

    b: buttonColorOriginal.b 
       + buttonColorStep.b 
       * globalVars.button.colorChangeAnimationFrame[buttonID]
  };
  let buttonColorReady = color(buttonColor.r, 
                               buttonColor.g, 
                               buttonColor.b, 
                               opacity);

  // See previous comment but for button text
  let buttonTextColor = {
    r: buttonTextColorOriginal.r 
       + buttonTextColorStep.r 
       * globalVars.button.colorChangeAnimationFrame[buttonID],

    g: buttonTextColorOriginal.g 
       + buttonTextColorStep.g 
       * globalVars.button.colorChangeAnimationFrame[buttonID],

    b: buttonTextColorOriginal.b 
       + buttonTextColorStep.b 
       * globalVars.button.colorChangeAnimationFrame[buttonID]
  };
  let buttonTextColorReady = color(buttonTextColor.r, 
                                   buttonTextColor.g, 
                                   buttonTextColor.b, 
                                   opacity);


  // Apply button color and draw button
  fill(buttonColorReady);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, buttonCornerRadius);

  // Apply button text color, size, and alignment and draw text
  fill(buttonTextColorReady);
  textSize(buttonTextSize);
  textAlign(CENTER, CENTER);
  text(buttonText, buttonX, buttonY, buttonWidth, buttonHeight);
  
  
  // For debugging
  /*
  if (buttonID == 3 || buttonID == 0) {
    //console.log(buttonID + ", " + buttonCurrentOpacity);
    console.log(buttonID + ", " + buttonTextColorReady);
  }
  */

  
  // Return if button clicked: true, else false
  return returnValue;
}