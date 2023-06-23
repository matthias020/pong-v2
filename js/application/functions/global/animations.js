function animations(){
	switch (globalVars.global.goTo) {
		case "fadeInCenterLine":
			globalVars.fadeAnimations.centerLineOpacity = conf.opacityStep * globalVars.global.fadeAnimationFrame;

			if (globalVars.global.fadeAnimationFrame == conf.amountFramesAnimations) {
				globalVars.global.goTo = "start";
				globalVars.global.fadeAnimationFrame = 0;
			} else {
				globalVars.global.fadeAnimationFrame++;
				break;
			}

			

		case "start":
			//sleep(1000);
			//console.log(globalVars.global.fadeAnimationFrame);
			globalVars.fadeAnimations.startScreenOpacity = conf.opacityStep * globalVars.global.fadeAnimationFrame;
			if (globalVars.global.fadeAnimationFrame < conf.amountFramesAnimations) {
				globalVars.global.fadeAnimationFrame++;
			}
			break;

		case "fadeOutStart":
			if (globalVars.global.fadeAnimationFrame == 0) {
				globalVars.global.goTo = "initGame";
				globalVars.global.fadeAnimationFrame = 1;
			} else {
				globalVars.global.fadeAnimationFrame--;
				globalVars.fadeAnimations.startScreenOpacity = conf.opacityStep * globalVars.global.fadeAnimationFrame;
				break;
			}

		case "initGame":
			if (globalVars.global.fadeAnimationFrame == 2) {
				globalVars.global.goTo = "gameResetAnimation";
			} else {
				globalVars.fadeAnimations.gameOpacity = conf.opacityStep * globalVars.global.fadeAnimationFrame;
				globalVars.global.fadeAnimationFrame++;
			}
			break;

		case "gameResetAnimation":
			globalVars.fadeAnimations.gameOpacity = conf.opacityStep * globalVars.global.fadeAnimationFrame;
			if (globalVars.global.fadeAnimationFrame == conf.amountFramesAnimations) {
				globalVars.global.goTo = "game";
			} else {
				globalVars.global.fadeAnimationFrame++;
			}
	}
}