var gameOverOriginal = function () {};

// Control Panel Enabled Listener
document.getElementById("hacksEnabled").addEventListener("change", (e) => {
  const enabled = e.currentTarget.checked;
  document.getElementById("myContent").style.display = enabled
    ? "inherit"
    : "none";
});

// On Load / Autoplay Listener
window.addEventListener("load", (e) => {
  setInterval(function () {
    if (document.getElementById("autoplay").checked) {
      const KEY_CODE_SPACE_BAR = 32;
      const KEY_CODE_ARROW_DOWN = 40;
      const CANVAS_HEIGHT = Runner.instance_.dimensions.HEIGHT;
      const DINO_HEIGHT = Runner.instance_.tRex.config.HEIGHT;

      const obstacle = Runner.instance_.horizon.obstacles[0];
      const speed = Runner.instance_.currentSpeed;

      if (obstacle) {
        const w = obstacle.width;
        const x = obstacle.xPos; // measured from left of canvas
        const y = obstacle.yPos; // measured from top of canvas
        const yFromBottom = CANVAS_HEIGHT - y - obstacle.typeConfig.height;
        const isObstacleNearby = x < 25 * speed - w / 2;

        if (isObstacleNearby) {
          if (yFromBottom > DINO_HEIGHT) {
            // Pterodactyl going from above, do nothing
          } else if (y > CANVAS_HEIGHT / 2) {
            // Jump
            dispatchKey("keyup", KEY_CODE_ARROW_DOWN);
            dispatchKey("keydown", KEY_CODE_SPACE_BAR);
          } else {
            // Duck
            dispatchKey("keydown", KEY_CODE_ARROW_DOWN);
          }
        }
      }
    }
  }, Runner.instance_.msPerFrame);
  // For immortality reversal
  gameOverOriginal = Runner.prototype.gameOver;
});

// Immortality Enabled Listener
document.getElementById("immortal").addEventListener("change", (e) => {
  const enabled = e.currentTarget.checked;
  Runner.prototype.gameOver = enabled ? function () {} : gameOverOriginal;
});

// Levitation Enabled Listener
document.getElementById("levitation").addEventListener("change", (e) => {
  const enabled = e.currentTarget.checked;
  Runner.instance_.tRex.groundYPos = enabled ? 0 : 93;
  dispatchKey("keydown", 32);
});

// Speed Listener
document.getElementById("speed").addEventListener("change", (e) => {
    Runner.instance_.setSpeed(document.getElementById("speed").value)
});

// Jump Height Change Listener
document.getElementById("jumpHeight").addEventListener("change", (e) => {
    Runner.instance_.tRex.setJumpVelocity(document.getElementById("jumpHeight").value)
});

function dispatchKey(type, key) {
  document.dispatchEvent(new KeyboardEvent(type, { keyCode: key }));
}
