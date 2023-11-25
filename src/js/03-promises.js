import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  startBtn: document.querySelector('button'),
  form: document.querySelector('.form'),
  delay: document.querySelector('[name = "delay"]'),
  step: document.querySelector('[name = "step"]'),
  amount: document.querySelector('[name = "amount"]')
}
refs.startBtn.addEventListener('click', handleCreatePromise)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}
function handleCreatePromise(e) {
  e.preventDefault();
  let delayValue = Number(refs.delay.value);
  let stepValue = Number(refs.step.value);
  let amountValue = Number(refs.amount.value);

  for (let i = 0; i < amountValue; i += 1) {
    let promiseDelay = delayValue + stepValue * i;

    createPromise(i + 1, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}