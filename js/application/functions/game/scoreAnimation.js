// Set color of left or right score from white to red and back when scored (increase and decrease score animation frame)
function scoreAnimation(scoreID) { 
  if (globalVars.score.colorChangeAnimation[scoreID] == "to" && 
      globalVars.score.colorChangeAnimationFrame[scoreID] < conf.amountFramesAnimations) {

    globalVars.score.colorChangeAnimationFrame[scoreID]++;


  } else if (globalVars.score.colorChangeAnimation[scoreID] == "to" && 
             globalVars.score.colorChangeAnimationFrame[scoreID] == conf.amountFramesAnimations) {

    globalVars.score.colorChangeAnimation[scoreID] = "from";


  } else if (globalVars.score.colorChangeAnimation[scoreID] == "from" && 
             globalVars.score.colorChangeAnimationFrame[scoreID] > 1) {

    globalVars.score.colorChangeAnimationFrame[scoreID]--;

    
  } else if (globalVars.score.colorChangeAnimation[scoreID] == "from" && 
             globalVars.score.colorChangeAnimationFrame[scoreID] == 1) {

    globalVars.score.colorChangeAnimationFrame[scoreID] = 0;
    globalVars.score.colorChangeAnimation[scoreID] = false;
  }
}