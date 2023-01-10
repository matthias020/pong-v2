function start(viewportSize) {
  let logoSize = viewportSize.height / 3.7;
  let logoX = viewportSize.width / 2 - logoSize / 2;
  let logoY = viewportSize.height / 5 - logoSize / 2;
  let logoMiddleX = viewportSize.width / 2; // (For overlay location)
  let logoMiddleY = viewportSize.height / 5;
  showLogo(conf.logo.image, 
           logoX, 
           logoY, 
           logoSize, 
           logoMiddleX, 
           logoMiddleY, 
           conf.logo.URL, 
           conf.opacityStep);


  // Variables used by all buttons
  let buttonYIncrement = viewportSize.height / 30; // Space between buttons
  let buttonWidth = viewportSize.width / 5;
  let buttonHeight = viewportSize.height / 7.5;
  let buttonX = viewportSize.width / 2 - buttonWidth / 2;
  let buttonTextSize = viewportSize.totalSqrt / 24;
  let buttonResponse = [false, false, false];

  let buttonID = 0; // Unique identifier for animations for seperate buttons
  let buttonY = logoY + logoSize + buttonYIncrement * 1.9;
  let buttonText = "1 player";
  buttonResponse[buttonID] = drawButton(buttonX, 
                                        buttonY, 
                                        buttonWidth, 
                                        buttonHeight, 
                                        conf.button.color, 
                                        conf.button.colorHover, 
                                        conf.button.cornerRadius, 
                                        conf.button.textColor, 
                                        conf.button.textColorHover, 
                                        buttonTextSize,
                                        buttonText,
                                        buttonID,
                                        conf.amountFramesAnimations,
                                        conf.opacityStep);

  buttonID = 1;
  buttonY = buttonY + buttonHeight + buttonYIncrement;
  buttonText = "2 player";
  buttonResponse[buttonID] = drawButton(buttonX, 
                                        buttonY, 
                                        buttonWidth, 
                                        buttonHeight, 
                                        conf.button.color, 
                                        conf.button.colorHover, 
                                        conf.button.cornerRadius, 
                                        conf.button.textColor, 
                                        conf.button.textColorHover, 
                                        buttonTextSize, 
                                        buttonText,
                                        buttonID,
                                        conf.amountFramesAnimations,
                                        conf.opacityStep);

  buttonID = 2;
  buttonY = buttonY + buttonHeight + buttonYIncrement;
  buttonText = "Multiplayer";
  buttonResponse[buttonID] = drawButton(buttonX, 
                                        buttonY, 
                                        buttonWidth, 
                                        buttonHeight, 
                                        conf.button.color, 
                                        conf.button.colorHover, 
                                        conf.button.cornerRadius, 
                                        conf.button.textColor, 
                                        conf.button.textColorHover, 
                                        buttonTextSize, 
                                        buttonText,
                                        buttonID,
                                        conf.amountFramesAnimations,
                                        conf.opacityStep);
  
  // Set gamemode according to wich button was clicked (if a button was clicked)
  if (buttonResponse[0] == true) {
    globalVars.game.gameMode = "1PlayerGame";
  } else if (buttonResponse[1] == true) {
    globalVars.game.gameMode = "2PlayerGame";
  } else if (buttonResponse[2] == true) {
    globalVars.game.gameMode = "multiplayerGame";
  }

  // If a gamemode has been chosen fade out start
  if (globalVars.game.gameMode != "") { 
    globalVars.global.goTo = "exitStart";
  }
}