const windyCanvas = document.getElementById('windy');
const windyCtx = windyCanvas.getContext('2d');

let windyWidth;
let windyHeight;
let windyX = (windyCanvas.width / 2) - 9.5;
let windyY = (windyCanvas.height / 2) - 14;
let windyCenterX = windyCanvas.width / 2;
let windyCenterY = windyCanvas.height / 2;
let windySpeed = 2.5;

let windy = new Image();
windy.src = 'assets/windy/walkingDownLeftFoot.png';

windy.onload = function () {
  windyWidth = this.width * 1.3;
  windyHeight = this.height * 1.3;
  windyCtx.drawImage(this, windyX, windyY, windyWidth, windyHeight);
}


let keyState = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

window.addEventListener('keydown', (e) => {
  if (e.key in keyState) {
    keyState[e.key] = true;
  }

  if (keyState.ArrowUp == true) {
    keyState.ArrowDown = false;
    keyState.ArrowLeft = false;
    keyState.ArrowRight = false;
  }

  if (keyState.ArrowDown == true) {
    keyState.ArrowUp = false;
    keyState.ArrowLeft = false;
    keyState.ArrowRight = false;
  }


  if (keyState.ArrowRight == true) {
    keyState.ArrowDown = false;
    keyState.ArrowLeft = false;
    keyState.ArrowUp = false;
  }

  if (keyState.ArrowLeft == true) {
    keyState.ArrowDown = false;
    keyState.ArrowUp = false;
    keyState.ArrowRight = false;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key in keyState) {
    keyState[e.key] = false;
  }
});

function drawWindy() {
  windyCtx.clearRect(0, 0, windyCanvas.width, windyCanvas.height);
  windyCtx.drawImage(windy, windyCenterX - windyWidth / 2, windyCenterY - windyHeight / 2, windyWidth, windyHeight);
}


let count = 0;
function windyMove() {
  if (keyState.ArrowUp) {
    windyCenterY -= windySpeed;
    if (count < 5) windy.src = 'assets/windy/walkingUpLeftFoot.png';
    else if (count < 10) windy.src = 'assets/windy/walkingUpRightFoot.png';
    else count = 0;
  }

  if (keyState.ArrowDown) {
    windyCenterY += windySpeed;
    if (count < 5) windy.src = 'assets/windy/walkingDownLeftFoot.png';
    else if (count < 10) windy.src = 'assets/windy/walkingDownRightFoot.png';
    else count = 0;
  }

  if (keyState.ArrowLeft) {
    windyCenterX -= windySpeed;
    if (count < 5) windy.src = 'assets/windy/watchingLeft.png';
    else if (count < 10) windy.src = 'assets/windy/walkingLeft.png';
    else count = 0;
  }
  if (keyState.ArrowRight) {
    windyCenterX += windySpeed;
    if (count < 5) windy.src = 'assets/windy/walkingRight.png';
    else if (count < 10) windy.src = 'assets/windy/watchingRight.png';
    else count = 0;
  }

  count++;
  drawWindy();
  requestAnimationFrame(windyMove);
}

windyMove();