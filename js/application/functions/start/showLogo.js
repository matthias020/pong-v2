function showLogo(logoImage, 
                  logoX, 
                  logoY, 
                  logoSize, 
                  logoMiddleX, 
                  logoMiddleY,
                  logoURL,
                  opacityStep) { 
  // Note that logo opacity and overlay opacity are not the same thing

  // Default opacity 100%
  let logoCurrentOpacity = 255; 

  // When in fadeIn animation increase logo opacity
  if (globalVars.global.duringFadeAnimation == "fadeIn") { 
    logoCurrentOpacity = globalVars.global.fadeAnimationFrame * opacityStep;

  // When in fadeOut animation decrease logo opacity
  } else if (globalVars.global.duringFadeAnimation == "fadeOut") { 
    logoCurrentOpacity = globalVars.global.fadeAnimationFrame * opacityStep;
    logoCurrentOpacity = 255 - logoCurrentOpacity;
  

  // If not in fadeIn or fadeOut animation
  } else { 
    // Define distance between middle of logo and mouse position
    mouseDistanceLogoMiddle = dist(mouseX, mouseY, logoMiddleX, logoMiddleY);

    if (mouseDistanceLogoMiddle < logoSize / 2) { 
      // If mouse inside logo and mouse clicked open GitHub page in new tab
      if (mouseIsPressed == true && mouseButton == LEFT) { 
        window.open(logoURL, '_blank').focus();
        mouseIsPressed = false;
      }


      // If mouse inside logo and logo not at maximum darkness darken logo
      if (globalVars.logo.overlayOpacity < 80) { 
        globalVars.logo.overlayOpacity += 5;
      }

    } else { 
      // If mouse not inside logo and logo not at maximum brightness brighten logo
      if (globalVars.logo.overlayOpacity > 0) { 
        globalVars.logo.overlayOpacity -= 5;
      }
    }
  }

  
  // Apply logo opacity and show logo
  tint(conf.defaultColor, logoCurrentOpacity);
  image(logoImage, logoX, logoY, logoSize, logoSize);

  // Apply opacity of black overlay and draw overlay
  fill(0, globalVars.logo.overlayOpacity);
  circle(logoMiddleX, logoMiddleY, logoSize);
}