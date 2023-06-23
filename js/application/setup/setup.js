let conf;
let globalVarsOriginal;
let globalVars;
function setup() {
  conf = {
    amountFramesAnimations: 30, // Amount of frames every animation takes
    defaultColor: 255,
    textFont: atariFont,

    logo: {
      image: logoImage,
      URL: "https://github.com/matthias020/pong-v2/", // URL is opened when logo is clicked
    },

    button: {
      cornerRadius: 10, // Corner radius 10 pixels
      color: {r: 255, g: 255, b: 255},
      colorHover: {r: 0, g: 0, b: 0}, // Button color when hovered over
      textColor: {r: 0, g: 0, b: 0},
      textColorHover: {r: 255, g: 255, b: 255}, // Button text color when hovered over
    },

    controls: {
      // Key (mouse not yet supported)
      left: [87, 83],
      right: [UP_ARROW, DOWN_ARROW],
    },

    game: {
      standardizedWidth: 10000, // Absolute screen dimensions for window resize and online play support
      standardizedHeight: 10000,
      batSpeed: 244,
      ballStartingSpeed: 60,
      ballMaxStartingAngleDeg: 45,
    },

    score: {
      winScore: 10,
      textColor: {r: 255, g: 255, b: 255},
      pointScoredTextColor: {r: 255, g: 0, b: 0},
    },

    startButton: {
      cornerRadius: 10,
      color: {r: 0, g: 0, b: 0},
      colorHover: {r: 255, g: 255, b: 255},
      textColor: {r: 255, g: 255, b: 255},
      textColorHover: {r: 0, g: 0, b: 0},
    }
  };
  
  // How much the opacity of objects needs to change per frame so that after 
  // conf.amountFramesAnimations is reached the desired opacity is reached (fadeIn fadeOut animation)
  conf.opacityStep = 255 / conf.amountFramesAnimations;

  globalVarsOriginal = {
    global: {
      goTo: "fadeInCenterLine", // goTo decides what block of code is executed. See the switch statement in pong.js
      fadeAnimationFrame: 1, // Current frame in amountFramesAnimation (fadeIn fadeOut animation)
      duringFadeAnimation: "fadeIn", // Determines if currently in a fadeIn or fadeOut animation or not
      frameCount: 1, // For debugging
    },

    fadeAnimations: {
      centerLineOpacity: 255,
      startScreenOpacity: 255,
      gameOpacity: 255,
    },

    performance: {
      // Counter so that the framerate is printed to console 1 in n (see "Check performance" in pong.js) frames
      fpsWaitCount: 0,
    },
    
    logo: {
      // Opacity of the circular black overlay that darkens the logo when the mouse hovers over
      overlayOpacity: 0,
    },

    button: {
      colorChangeAnimationFrame: [0, 0, 0, 0], // Current frame in amountFramesAnimation (color change animations for buttons)
      duringFadeAnimation: false,
    },

    game: {
      gameMode: "", // 1PlayerGame, 2PlayerGame, or multiplayerGame after user chooses gamemode
      startGame: false,
      firstSide: 0,
    },

    bats: {
      // Default Y position of bats middle of screen
      bat1Y: conf.game.standardizedHeight / 2 - conf.game.standardizedHeight / 7 / 2,
      bat2Y: conf.game.standardizedHeight / 2 - conf.game.standardizedHeight / 7 / 2,
    },

    score: {
      score: [0,0],

      // Color changes when scored
      colorChangeAnimationFrame: [0, 0],
      colorChangeAnimation: [false, false],
    },

    ball: {
      ballX: conf.game.standardizedWidth / 2,
      ballY: conf.game.standardizedHeight / 2,
      duringFadeAnimation: false,
      speed: 0,
      angleDeg: 0,
    },
  };
  globalVars = globalVarsOriginal;

  textFont(conf.textFont);
}