/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build our Functions */
// togglePlay() plays and pauses the video when the video is
//   played/paused by something that has an eventListener attached
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

// updateButton() updates the button based on whether the video
//   is playing or paused
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// skip() moves the video forward/backward based on the amount
//   of time that the element requires skipping
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// updateRange() updates the volume and playbackRate elements
//   based on the slider's value
function updateRange() {
  video[this.name] = this.value;
}

// updateProgress() updates the progress bar as time passes
function updateProgress() {
  const percent =  (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// scrub(e) uses the event e to find where the mouse was clicked
//   and moves the video to that point in time
function scrub(e) {
  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newTime;
}

/* Hook Up Event Listeners */
// For adding the click event to the toggle and video elements
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// For changing the play/paused buttons when appropriate
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// For skipping back and forth in the video
skipButtons.forEach(button => button.addEventListener('click', skip));

// For changing the values of the volume/speed sliders
ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

// For each call of timeupdate which runs every so often, we update the
// progress bar
video.addEventListener('timeupdate', updateProgress);

// For moving the video based on clicking and dragging the progress bar
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
