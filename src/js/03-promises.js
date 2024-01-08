import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const MESSAGES = {
  fulfilled: '✅ Fulfilled',
  rejected: '❌ Rejected',
};

const NOTIFICATION_TYPES = {
  success: 'success',
  error: 'error',
};

const form = document.querySelector('form.form');

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve
        ? resolve({ position, delay })
        : reject({ position, delay });
    }, delay);
  });
};

const displayNotification = ({ position, delay }, isSuccess) => {
  const type = isSuccess
    ? NOTIFICATION_TYPES.success
    : NOTIFICATION_TYPES.error;

  const message = isSuccess ? MESSAGES.fulfilled : MESSAGES.rejected;

  iziToast[type]({ message: `${message} promise ${position} in ${delay}ms` });
};

const onSubmit = e => {
  e.preventDefault();

  const { delay: delayVal, step, amount } = form.elements;

  let delay = Number(delayVal.value);
  const delayStep = Number(step.value);
  const amountOfPromises = Number(amount.value);

  form.reset();

  for (let i = 1; i <= amountOfPromises; i += 1) {
    createPromise(i, delay)
      .then(res => displayNotification(res, true))
      .catch(res => displayNotification(res, false));

    delay += delayStep;
  }
};

form.addEventListener('submit', onSubmit);
