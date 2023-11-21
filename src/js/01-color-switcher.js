const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}
refs.btnStop.disabled = true
refs.btnStart.addEventListener('click', changeColor)
refs.btnStop.addEventListener('click', changeColorStop)

function changeColor() {
    refs.btnStart.disabled = true,
        refs.btnStop.disabled = false,
      const int = setInterval(() => {
            refs.body.style.backgroundColor = getRandomHexColor()
        }, 1000
        )
}
function changeColorStop() {
    refs.btnStart.disabled = false,
        refs.btnStop.disabled = true,
        clearInterval(int)
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}