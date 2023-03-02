const ufo = document.getElementById('ufo');
let isClicked = false;
let ufoClicks = 0;

const initWidth = window.innerWidth;
const initHeight = window.innerHeight;

function floatUFO() {
    if (!isClicked) {
        let x = Math.max(Math.random() * initWidth, ufo.offsetWidth);
        let y = Math.max(Math.random() * initHeight, ufo.offsetHeight);
        x = Math.min(x, initWidth - ufo.offsetWidth);
        y = Math.min(y, initHeight - ufo.offsetHeight);
        ufo.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(floatUFO, 1000);
    } else {
        setTimeout(() => {
            ufo.classList.remove('clicked');
            isClicked = false;
            floatUFO();
        }, Math.random() * (10000) + 25000);
    }
}

ufo.addEventListener('click', () => {
    ufo.classList.add('clicked');
    isClicked = true;
    ufoClicks++;
    document.getElementById("ufoScore").innerHTML = ufoClicks;
});

floatUFO();
