function drawScore(score1, score2, score1X, score2X, scoreY) {
  // Default opacity of score 100%
  let scoreCurrentOpacity = 255; 

  // When in fade in animation increase score opacity
  if (globalVars.global.duringFadeAnimation == "fadeIn") {
    scoreCurrentOpacity = globalVars.global.fadeAnimationFrame * conf.opacityStep; 
  }
  

  // Calculate how much the color of the scores need to change per frame so that after 
  // conf.amountFramesAnimations frames the designated color is reached
  let scoreTextColorStep = { 
    r: (conf.score.pointScoredTextColor.r - conf.score.textColor.r) 
       / conf.amountFramesAnimations,

    g: (conf.score.pointScoredTextColor.g - conf.score.textColor.g) 
       / conf.amountFramesAnimations,

    b: (conf.score.pointScoredTextColor.b - conf.score.textColor.b) 
       / conf.amountFramesAnimations
  };
  
  // Increase then decrease score animation frame
  scoreAnimation(0);
  scoreAnimation(1);

  // Set the color of the scores depending on the current frame in the point scored animation
  let score1TextColor = {
    r: conf.score.textColor.r 
       + scoreTextColorStep.r * globalVars.score.colorChangeAnimationFrame[0],

    g: conf.score.textColor.g 
       + scoreTextColorStep.g * globalVars.score.colorChangeAnimationFrame[0],

    b: conf.score.textColor.b 
       + scoreTextColorStep.b * globalVars.score.colorChangeAnimationFrame[0]
  };
  let score1TextColorReady = color(score1TextColor.r, 
                                   score1TextColor.g, 
                                   score1TextColor.b, 
                                   scoreCurrentOpacity);

  let score2TextColor = {
    r: conf.score.textColor.r 
       + scoreTextColorStep.r * globalVars.score.colorChangeAnimationFrame[1],

    g: conf.score.textColor.g 
       + scoreTextColorStep.g * globalVars.score.colorChangeAnimationFrame[1],

    b: conf.score.textColor.b 
       + scoreTextColorStep.b * globalVars.score.colorChangeAnimationFrame[1]
  };
  let score2TextColorReady = color(score2TextColor.r, 
                                   score2TextColor.g, 
                                   score2TextColor.b, 
                                   scoreCurrentOpacity);

                                   
  // Apply colors and draw scores
  fill(score1TextColorReady);
  text(score1, score1X, scoreY);

  fill(score2TextColorReady);
  text(score2, score2X, scoreY);
}