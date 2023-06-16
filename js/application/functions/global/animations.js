function animations(){
	switch (globalVars.global.goTo) {
		case "fadeInCenterLine":
			globalVars.fadeAnimations.centerLineOpacity = conf.opacityStep * globalVars.global.fadeAnimationFrame;

			if (globalVars.global.fadeAnimationFrame == conf.amountFramesAnimations) {
				globalVars.global.goTo = "start";
				globalVars.global.fadeAnimationFrame = 0;
			} else {
				globalVars.global.fadeAnimationFrame++;
			}

			break;

		case "start":
			//sleep(1000);
			//console.log(globalVars.global.fadeAnimationFrame);
			globalVars.fadeAnimations.startScreenOpacity = conf.opacityStep * globalVars.global.fadeAnimationFrame;
			if (globalVars.global.fadeAnimationFrame < conf.amountFramesAnimations) {
				globalVars.global.fadeAnimationFrame++;
			}
	}
}