import Notiflix from 'notiflix';

// Отримуємо посилання на елементи форми
const elements = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  btn: document.querySelector('button[type=submit]'),
  form: document.querySelector('.form'),
};

console.log(elements.delay);
console.log(elements.step);
console.log(elements.amount);
console.log(elements.btn);

elements.form.addEventListener('submit', evt => {
  evt.preventDefault();

  // Отримуємо введені значення
  const firstDelay = Number(elements.delay.value);
  const step = Number(elements.step.value);
  const amount = Number(elements.amount.value);

  // Створюємо проміси і обробляємо їх
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + step * i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
