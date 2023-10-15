import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  input: document.getElementById('datetime-picker'),
  start: document.querySelector('button[data-start]'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),

  timer: document.querySelector('.timer'),
};

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
      Notiflix.Notify.warning('Please choose a date in the future');
      elements.start.disabled = true; // Робимо кнопку "Start" неактивною
    } else {
      Notiflix.Notify.success('Lets go? Click Start! ');
      elements.start.disabled = false; // Робимо кнопку "Start" активною
    }
    // Зберегти selectedDate в об'єкті
    picker.selectedDate = selectedDate;
  },
};

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

    elements.days.textContent = '00';
    elements.hours.textContent = '00';
    elements.minutes.textContent = '00';
    elements.seconds.textContent = '00';
  } else {
    // оновлює інтерфейс
    const timeObject = convertMs(ms);

    elements.days.textContent = addLeadingZero(timeObject.days);
    elements.hours.textContent = addLeadingZero(timeObject.hours);
    elements.minutes.textContent = addLeadingZero(timeObject.minutes);
    elements.seconds.textContent = addLeadingZero(timeObject.seconds);
  }
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

elements.start.addEventListener('click', () => {
  // обчислює раз на секунду
  interval = setInterval(lookOutTime, 1000);
});

//styles

const styles = `
a{
    font-size: 12px;
  color: #888;
}
body {
  font-family: Arial, sans-serif;
  color: #222;
  background-color: #ececec;
  margin:0 auto;
  padding: 0;
}

.inner-wrapper{
    text-align: center;
    display: block;
    margin:0 auto;
}
.timer {
  display: flex;
  justify-content: center;
  gap:30px;
  align-items: center;
  margin-top: 20px;
}

.field {
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.field:not(:last-child)::after {
    content: ':';
    font-size: 30px;
    position: absolute;
    top: 10px;
    left: 60px;
}
.value {
  font-size: 46px;
  font-weight: bold;
}

.label {
  font-size: 12px;
  color: #888;
}
.input {
    appearance: none;
    display: inline-block;
    height:20px;
    border: 1px solid transparent;
    border-radius: 0.2rem;
    padding: 0.1rem 0.2rem;
    font-family: inherit;
    transition: all 0.2s;
}

`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;

document.head.appendChild(styleElement);
