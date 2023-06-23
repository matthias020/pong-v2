function game(viewportSize, gameMode) {
  // Factors for scaling from standardized absolute game dimensions to relative screen dimensions
  let scaleFactor = {
    width: conf.game.standardizedWidth / viewportSize.width,
    height: conf.game.standardizedHeight / viewportSize.height
  };


  // Convert score number to string and ensure the score string is two characters long
  let score1String = globalVars.score.score[0].toString();
  let score2String = globalVars.score.score[1].toString();
  if (score1String.length == 1) {
    score1String = "0" + score1String;
  }
  if (score2String.length == 1) {
    score2String = "0" + score2String;
  }

  let scoreTextSize = viewportSize.height / 8;
  textSize(scoreTextSize); 

  let score1X = viewportSize.width / 2 - viewportSize.width / 12;
  let score2X = viewportSize.width / 2 + viewportSize.width / 12;
  let scoreY = viewportSize.height / 12;
  drawScore(score1String, score2String, score1X, score2X, scoreY);


  let batWidth = viewportSize.width / 175;
  let batHeight = viewportSize.height / 7;
  let bat1X = viewportSize.width / 45.5;
  let bat2X = viewportSize.width - viewportSize.width / 45.5 - batWidth;

  // Convert absolute positions of bats on Y-axis to relative positions based on screen dimensions
  let bat1YForDraw = globalVars.bats.bat1Y / scaleFactor.height;
  let bat2YForDraw = globalVars.bats.bat2Y / scaleFactor.height;
  drawBats(bat1X, bat2X, bat1YForDraw, bat2YForDraw, batWidth, batHeight);


  let ballSize = viewportSize.totalSqrt / 60;

  let ballXForDraw = globalVars.ball.ballX / scaleFactor.width;
  let ballYForDraw = globalVars.ball.ballY / scaleFactor.height;
  drawBall(ballXForDraw, ballYForDraw, ballSize);


  // If right bat not yet at top of screen
  if (keyIsDown(conf.controls.right[0]) && globalVars.bats.bat2Y > 0) {
    // If bat y minus bat speed smaller than 0 (top of screen) bat y is 0
    if (globalVars.bats.bat2Y - conf.game.batSpeed < 0) {
      globalVars.bats.bat2Y = 0;
    
    // Else bat y is bat y minus bat speed
    } else {
      globalVars.bats.bat2Y -= conf.game.batSpeed;
    }
  }

  // If right bat not yet at bottom of screen
  if (keyIsDown(conf.controls.right[1]) && 
      globalVars.bats.bat2Y < 
      conf.game.standardizedHeight - conf.game.standardizedHeight / 7) {
      
    // If bottom of bat plus bat speed lower than bottom of screen bottom of bat is bottom of screen
    if (globalVars.bats.bat2Y + conf.game.batSpeed > 
        conf.game.standardizedHeight - conf.game.standardizedHeight / 7) {
            
      globalVars.bats.bat2Y = conf.game.standardizedHeight 
                              - conf.game.standardizedHeight / 7;
      
    // Else bat y is bat y plus bat speed
    } else {
      globalVars.bats.bat2Y += conf.game.batSpeed;
    }
  }


  // If game in 2 player mode, activate left bats
  if (gameMode == "2PlayerGame") {
    // See comments for right bat
    if (keyIsDown(conf.controls.left[0]) && globalVars.bats.bat1Y > 0) {
      if (globalVars.bats.bat1Y - conf.game.batSpeed < 0) {
        globalVars.bats.bat1Y = 0;
      } else {
        globalVars.bats.bat1Y -= conf.game.batSpeed;
      }
    }
  
    if (keyIsDown(conf.controls.left[1]) && 
        globalVars.bats.bat1Y < 
        conf.game.standardizedHeight - conf.game.standardizedHeight / 7) {

      if (globalVars.bats.bat1Y + conf.game.batSpeed > 
          conf.game.standardizedHeight - conf.game.standardizedHeight / 7) {

        globalVars.bats.bat1Y = conf.game.standardizedHeight 
                                - conf.game.standardizedHeight / 7;

      } else {
        globalVars.bats.bat1Y += conf.game.batSpeed;
      }
    }
    //
  }


  globalVars.ball.ballX += conf.game.ballStartingSpeed;
}