const {
  gsap: {
    set,
    to,
    timeline,
    utils: { random } } } =
window;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

const container = document.querySelector('.bear-toggle-container');
if (!container) return; // Exit if bear toggle doesn't exist on page

const bear = container.querySelector('.bear');
const bearWrap = container.querySelector('.bear__wrap');
const swear = container.querySelector('.bear__swear');
const armWrap = container.querySelector('.bear__arm-wrap');
const paw = container.querySelector('.bear__paw');
const arm = container.querySelector('.bear__arm');
const bg = container.querySelector('.checkbox__bg');
const indicator = container.querySelector('.checkbox__indicator');
const checkbox = container.querySelector('input[type="checkbox"]');
const bearCheckbox = container.querySelector('.bear-checkbox');

const armDuration = 0.2;
const bearDuration = 0.25;
const checkboxDuration = 0.25;
const pawDuration = 0.1;

const SOUNDS = {
  ON: new Audio('https://assets.codepen.io/605876/switch-on.mp3'),
  OFF: new Audio('https://assets.codepen.io/605876/switch-off.mp3'),
  GROAN: new Audio('https://assets.codepen.io/605876/bear-groan.mp3') };

SOUNDS.GROAN.playbackRate = 2;

let checked = false;
let count = 1;

// Darkmode integration
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  checked = true;
  checkbox.checked = true;
  // Set initial state for lightmode
  set(bg, { backgroundColor: '#2eec71' });
  set(indicator, { x: '100%' });
}

const onHover = () => {
  to(bearWrap, bearDuration / 2, { opacity: 1 });
  to(bear, bearDuration / 2, { y: '20%' });
  to(armWrap, bearDuration / 2, { opacity: 1 });
  to(paw, bearDuration / 2, { opacity: 1 });
};

const offHover = () => {
  if (!checked) {
    to(bear, bearDuration / 2, { y: '100%' });
    to(bearWrap, bearDuration / 2, { opacity: 0 });
    to(armWrap, bearDuration / 2, { opacity: 0 });
    to(paw, bearDuration / 2, { opacity: 0 });
  }
};

const grabBearTL = () => {
  const bearTranslation = '0%';
  const onComplete = () => {
    checked = false;
    count++;
    checkbox.checked = false;
    // LIGHTMODE: Turn OFF (Return to Dark)
    body.classList.remove('lightmode');
    localStorage.setItem('theme', 'dark');
  };
  
  const onBearComplete = () => {
    SOUNDS.GROAN.play();
    showFloatingSwear();
  };

  const showFloatingSwear = () => {
    // Remove existing if any
    const existing = document.querySelector('.bear-floating-swear');
    if (existing) existing.remove();

    const rect = container.getBoundingClientRect();
    const floating = document.createElement('div');
    floating.className = 'bear-floating-swear';
    // Use the exact text from the hidden swear element
    floating.innerText = swear ? swear.innerText : "Glaub mir! Du willst keinen Lightmode!";
    document.body.appendChild(floating);

    // Position relative to the CENTER of the container
    const centerX = rect.left + (rect.width / 2);
    
    // Position: Above and slightly to the right of center
    const top = rect.top + window.scrollY - 60; 
    const left = centerX + 30; // 30px right from center

    floating.style.top = `${top}px`;
    floating.style.left = `${left}px`;

    // Animate In (Pop up)
    set(floating, { scale: 0, opacity: 0, transformOrigin: "bottom left" });
    to(floating, { duration: 0.4, opacity: 1, scale: 1, ease: 'back.out(1.7)' });

    // Animate Out after readingTime
    // Nice exit: float up slightly and fade out/scale down
    to(floating, { 
      duration: 0.5, 
      opacity: 0, 
      y: -20,       // Float up
      scale: 0.8,   // Shrink slightly
      delay: readingTime, 
      ease: "power2.in",
      onComplete: () => floating.remove() 
    });
  };

  const base = armDuration + armDuration + pawDuration;
  const preDelay = 0.3;
  const actionDelay = base + bearDuration + preDelay; 
  const readingTime = 3.0; // Last long
  // Bear retreat waits for readingTime so bear is there while speaking
  // But User said: "whole operation and bear stops... let only the speechbubble get big and last long"
  // If "operation" means flipping the switch, that happens at actionDelay.
  // If "bear stops" means bear waits around...
  // Let's try: Switch happens fast. Bubble appears. Bear waits a bit then leaves? 
  // If bear leaves immediately, bubble is floating in air.
  // I will make bear wait for the bubble.
  
  const retreatDelay = actionDelay + readingTime;
  
  const bearTL = timeline({ delay: 0, onComplete });
  
  // Keep bear visible during animation
  set(bearWrap, { opacity: 1 });
  set(armWrap, { opacity: 1 });
  set(paw, { opacity: 1 });
  
  bearTL.
  to(bear, {
    duration: bearDuration,
    onComplete: onBearComplete,
    y: '20%' }).

  to(
  armWrap,
  { x: 25, duration: armDuration },
  preDelay).

  to(arm, { scaleX: 0.7, duration: armDuration }).
  to(paw, {
    duration: pawDuration,
    scaleX: 0.8 }).
  // Original swear animation removed, handled by showFloatingSwear

  to(
  bg,
  {
    onStart: () => {
      SOUNDS.OFF.play();
    },
    duration: checkboxDuration,
    backgroundColor: '#aaa' },
  actionDelay). // Switch happens fast!

  to(
  indicator,
  { duration: checkboxDuration, x: '0%' },
  actionDelay).

  to(paw, { duration: pawDuration, scaleX: 0 }, actionDelay).
  to(
  arm,
  { duration: pawDuration, scaleX: 1 },
  actionDelay + pawDuration). // Arm retracts fast too

  to(
  armWrap,
  { duration: armDuration, x: 0 },
  actionDelay + pawDuration).

  // BEAR WAITS HERE?
  // If bear retreats now, it's fast.
  // If bear waits, it's slow.
  // User complained "bear stops".
  // Let's try: BEAR retreats immediately. Bubble floats.
  // This satisfies "operation and bear stops" complaint.
  // And "bubble gets big and lasts long" satisfied by floating element.
  
  to(
  bear,
  { duration: bearDuration, y: '100%' },
  actionDelay + pawDuration + armDuration). // Added armDuration wait? No typically happens with armWrap
  
  to(
  bearWrap,
  { duration: bearDuration, opacity: 0 },
  actionDelay + pawDuration + armDuration).
  
  to(
  armWrap,
  { duration: bearDuration, opacity: 0 },
  actionDelay + pawDuration + armDuration).
  
  to(
  paw,
  { duration: bearDuration, opacity: 0 },
  actionDelay + pawDuration + armDuration);

  return bearTL;
};

const showTimeline = () => {
  timeline({
    onStart: () => SOUNDS.ON.play() }).

  to(
  bg,
  { duration: checkboxDuration, backgroundColor: '#2eec71' },
  0).

  to(indicator, { duration: checkboxDuration, x: '100%' }, 0).
  add(grabBearTL(), checkboxDuration);
};

const onChange = () => {
  if (checked) {
    checkbox.checked = true;
    return;
  }
  checked = true;
  // LIGHTMODE: Turn ON
  body.classList.add('lightmode');
  localStorage.setItem('theme', 'light');
  showTimeline();
};

bearCheckbox.addEventListener('mouseover', onHover);
bearCheckbox.addEventListener('mouseout', offHover);
checkbox.addEventListener('change', onChange);

});
