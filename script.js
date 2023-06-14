const orb = document.querySelector('.orb');
const colorPairs = [
  { inner: '#f6e30a', outer: '#a58d07' },
  { inner: '#6a0db0', outer: '#450071' },
  { inner: '#07a320', outer: '#064c14' },
  { inner: '#d1a906', outer: '#846205' },
  { inner: '#e60000', outer: '#990000' },
  { inner: '#0057e6', outer: '#003b99' },
];

let currentGradientIndex = 0;

function getNextGradientIndex() {
  return (currentGradientIndex + 1) % colorPairs.length;
}

function updateGradient(progressInner, progressOuter) {
  const currentColors = colorPairs[currentGradientIndex];
  const nextColors = colorPairs[getNextGradientIndex()];

  const currentInner = currentColors.inner;
  const currentOuter = currentColors.outer;
  const nextInner = nextColors.inner;
  const nextOuter = nextColors.outer;

  const newInnerColor = blendColors(currentInner, nextInner, progressInner);
  const newOuterColor = blendColors(currentOuter, nextOuter, progressOuter);

  orb.style.background = `radial-gradient(circle at center, ${newInnerColor} 30%, ${newOuterColor} 60%, transparent 100%)`;
  orb.style.boxShadow = `0 0 30px ${newOuterColor}, 0 0 50px ${newOuterColor}, 0 0 70px ${newOuterColor}`;
}


function blendColors(color1, color2, percentage) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r3 = Math.round(r1 + (r2 - r1) * percentage);
  const g3 = Math.round(g1 + (g2 - g1) * percentage);
  const b3 = Math.round(b1 + (b2 - b1) * percentage);

  const blendedColor = ((r3 << 16) | (g3 << 8) | b3).toString(16);

  // Ensure the blended color is always 6 characters long
  return '#' + blendedColor.padStart(6, '0');
}


function animateGradient() {
  let startTime = null;
  let duration = 6000;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsedTime = (timestamp - startTime);
    const progressInner = (elapsedTime % duration) / duration;
    const progressOuter = ((elapsedTime + duration / 2) % duration) / duration;

    updateGradient(progressInner, progressOuter);

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

animateGradient();
