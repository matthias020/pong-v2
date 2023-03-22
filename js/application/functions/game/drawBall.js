function drawBall(ballX, ballY, ballSize) {
  let ballCurrentOpacity = 255;

  if (globalVars.ball.duringFadeAnimation == "fadeIn") {
    ballCurrentOpacity = globalVars.global.fadeAnimationFrame * conf.opacityStep;
  }

  fill(conf.defaultColor, ballCurrentOpacity);


  circle(ballX, ballY, ballSize);
}