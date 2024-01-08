import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import {
  ATTRIBUTES,
  ATTRIBUTE_METHODS,
  handleAttributeMethods,
} from './common';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  timePicker: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

let selectedDateAndTime;
let currentDateAndTime;
let activeIntervalId;

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = timeProps =>
  Object.fromEntries(
    Object.entries(timeProps).map(([key, value]) => [
      key,
      value.toString().padStart(2, '0'),
    ])
  );

const handlePickResult = () => {
  const isReady = currentDateAndTime < selectedDateAndTime;

  if (!isReady) {
    iziToast.warning({
      message: 'Please choose a date in the future',
      position: 'topCenter',
      timeout: 2500,
    });
    selectedDateAndTime = currentDateAndTime;
  }

  handleAttributeMethods(
    ATTRIBUTES.disabled,
    isReady ? ATTRIBUTE_METHODS.remove : ATTRIBUTE_METHODS.set,
    refs.startBtn
  );
};

const startTimer = () => {
  currentDateAndTime = new Date().getTime();
  handleAttributeMethods(ATTRIBUTES.disabled, ATTRIBUTE_METHODS.set, [
    refs.startBtn,
    refs.timePicker,
  ]);
  updateTimer();

  activeIntervalId = setInterval(() => {
    if (selectedDateAndTime - currentDateAndTime < 1000) {
      clearInterval(activeIntervalId);
      handleAttributeMethods(
        ATTRIBUTES.disabled,
        ATTRIBUTE_METHODS.remove,
        refs.timePicker
      );
      return;
    }

    currentDateAndTime += 1000;
    updateTimer();
  }, 1000);
};

const updateTimer = () => {
  const timeDifference = selectedDateAndTime - currentDateAndTime;
  const convertedMs = convertMs(timeDifference);
  const { days, hours, minutes, seconds } = addLeadingZero(convertedMs);

  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
};

const pickDate = selectedDates => {
  if (selectedDates) {
    selectedDateAndTime = selectedDates[0].getTime();
    currentDateAndTime = new Date().getTime();

    handlePickResult();
  }
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: pickDate,
  //   disable: [{ from: new Date(0), to: new Date().getTime() }], // Block all dates before current
};

flatpickr(refs.timePicker, flatpickrOptions);

handleAttributeMethods(
  ATTRIBUTES.disabled,
  ATTRIBUTE_METHODS.set,
  refs.startBtn
);

refs.startBtn.addEventListener('click', startTimer);
