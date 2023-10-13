import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  input: document.getElementById('datetime-picker'),
  start: document.querySelector('button[data-start]'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
console.log(elements.days);
console.log(elements.hours);
console.log(elements.minutes);
console.log(elements.seconds);

elements.start.disabled = true; // Робимо кнопку "Start" неактивною

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      elements.start.disabled = true; // Робимо кнопку "Start" неактивною
      window.alert('Please choose a date in the future');
    } else {
      elements.start.disabled = false; // Робимо кнопку "Start" активною
    }
    // Зберегти selectedDate в об'єкті
    picker.selectedDate = selectedDate;
  },
};

//конвертує мс
function convertMs(ms) {
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
  console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
const picker = flatpickr(elements.input, options);

//Обчислення різниці часу
function lookOutTime() {
  selectedDate = picker.selectedDate;
  currentDate = new Date();
  const ms = selectedDate - currentDate;
  console.log(ms);
  convertMs(ms);

  if (ms < 1000) {
    // Час вийшов, зупиняємо інтервал
    clearInterval(interval);
  } else {
    // elements.days.textContent = days;
    // elements.hours.textContent = hours;
    // elements.minutes.textContent = minutes;
    // elements.seconds.textContent = seconds;
  }
}

// оновлює інтерфейс
function changeInterface() {}

elements.start.addEventListener('click', () => {
  // обчислює раз на секунду
  interval = setInterval(lookOutTime, 1000);

  // оновлює інтерфейс
});
