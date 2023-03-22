function prepareGame() {
  firstSide = Math.round(Math.random());
  if (firstSide == 0) {
    globalVars.ball.speed = -conf.game.ballStartingSpeed;
  } else {
    globalVars.ball.speed = conf.game.ballStartingSpeed;
  }

  let ballMaxStartingAngleDeg = conf.game.ballMaxStartingAngleDeg;
  let ballMinStartingAngleDeg = -conf.game.ballMaxStartingAngleDeg;

  globalVars.ball.angleDeg = Math.floor(Math.random() * (ballMaxStartingAngleDeg - ballMinStartingAngleDeg + 1)) + ballMinStartingAngleDeg;

}