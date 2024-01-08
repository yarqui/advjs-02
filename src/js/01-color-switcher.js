import {
  ATTRIBUTES,
  ATTRIBUTE_METHODS,
  handleAttributeMethods,
} from './common';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let intervalId;
const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const handleStart = () => {
  handleAttributeMethods(ATTRIBUTES.disabled, ATTRIBUTE_METHODS.toggle, [
    refs.startBtn,
    refs.stopBtn,
  ]);

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  console.log('Active interval id:', intervalId);
};

const handleStop = () => {
  clearInterval(intervalId);
  handleAttributeMethods(ATTRIBUTES.disabled, ATTRIBUTE_METHODS.toggle, [
    refs.startBtn,
    refs.stopBtn,
  ]);

  console.log('Clear active interval id:', intervalId);

  intervalId = null;
};

refs.startBtn.addEventListener('click', handleStart);
refs.stopBtn.addEventListener('click', handleStop);
