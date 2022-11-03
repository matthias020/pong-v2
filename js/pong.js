function sleep(ms) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < ms);
  }

function getViewportSize() {
    let viewportSize = {
        viewportWidth: $(window).width(),
        viewportHeight: $(window).height()
    };
    
    return viewportSize;
}


function setup() {

}

function draw() {
    let viewportSize = getViewportSize();
    console.log(viewportSize);
    sleep(1000);
}