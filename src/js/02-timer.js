import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const inputDate = document.querySelector('#datetime-picker')
const btnStart = document.querySelector('[data-start]')
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer')

btnStart.addEventListener('click', startTimer)
const DELAY_TIMER = 1000;
let int = null;
let currentDate = null;
let selectedDate = null;
btnStart.disabled = true

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= Date.now()) {
            window.alert('"Please choose a date in the future"')
        } else {
            selectedDate = selectedDates[0].getTime();
            btnStart.disabled = false
        }
    },
};
flatpickr(inputDate, options)

function startTimer() {
    intervalId = setInterval(() => {
        currentDate = new Date().getTime();
        if (selectedDate - currentDate <= 1000) {
            clearInterval(intervalId);
            btnStart.disabled = true;
            inputDate.disabled = false;
            return
        } else {
            btnStart.disabled = true;
            inputDate.disabled = true;
            currentDate += 1000;
            deltaTime = Math.floor(selectedDate - currentDate);
            convertMs(deltaTime);
        }
    }, DELAY_TIMER);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function createMarkup({ days, hours, minutes, seconds }) {
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
    );
    createMarkup({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
}


timer.style.display = 'flex';
timer.style.gap = '20px';
timer.style.backgroundColor = 'yellow';
timer.style.marginTop = '20px';
