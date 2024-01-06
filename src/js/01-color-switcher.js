const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

const ATTRIBUTES = {
  disabled: 'disabled',
};

let intervalId;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const toggleAttribute = (attr, elements) => {
  elements.forEach(element => element.toggleAttribute(attr));
};

const handleStart = () => {
  toggleAttribute(ATTRIBUTES.disabled, [refs.startBtn, refs.stopBtn]);

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  console.log('Active interval id:', intervalId);
};

const handleStop = () => {
  clearInterval(intervalId);
  toggleAttribute(ATTRIBUTES.disabled, [refs.startBtn, refs.stopBtn]);

  console.log('Clear active interval id:', intervalId);

  intervalId = null;
};

refs.startBtn.addEventListener('click', handleStart);
refs.stopBtn.addEventListener('click', handleStop);
