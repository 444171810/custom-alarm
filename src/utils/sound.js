const sound = document.getElementById("Audio");

export function play() {
  sound.currentTime = 0;
  sound.loop = true;
  sound.play();
}

export function stop() {
  sound.pause();
}
