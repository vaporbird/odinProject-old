const CANVAS_HEIGHT = 720;
const CANVAS_WIDTH = 720;
const RAINBOW_COLORS = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];

let timer;
let MouseBtnHold = 0;

const canvasSizeSlider = document.querySelector('.pick-size .slider')
const canvasSliderText = document.querySelector('.pick-size .info')
const canvasSliderPlusBtn = document.querySelector('.pick-size .plus')
const canvasSliderMinusBtn = document.querySelector('.pick-size .minus')
const options = document.querySelector('input[name = color-canvas]')
const canvas = document.querySelector('.canvas');


function RGBArray (rgbStr) {

    return rgbStr.match(/\d+/g).map(Number);
}

document.addEventListener('mousedown', (e) => {
    if (e.button === 0)
    {
        MouseBtnHold = 1;
        mouseOvered(e);
        return;
    }
    MouseBtnHold = 0;
})

document.addEventListener('mouseup', (e) => MouseBtnHold = 0)

function continuosIncrement() {
    if(+canvasSizeSlider.value < 90){
        canvasSizeSlider.value = +canvasSizeSlider.value + 1;
        canvasSliderText.textContent = `${canvasSizeSlider.value}/${canvasSizeSlider.value}`
        loadNewCanvas(canvasSizeSlider.value)
    }
    timer = setTimeout(continuosIncrement, 200);
  }

  function continuosDecrement() {
    if(+canvasSizeSlider.value > 0){
        canvasSizeSlider.value = +canvasSizeSlider.value - 1;
        canvasSliderText.textContent = `${canvasSizeSlider.value}/${canvasSizeSlider.value}`
        loadNewCanvas(canvasSizeSlider.value)
    }
    timer = setTimeout(continuosDecrement, 200);
  }

function clearTimers() {
    clearTimeout(timer);
  }

  function mouseOvered (e) {
    if (!MouseBtnHold) return;
    if (!e.srcElement.classList.contains('canvasColDiv')) return; /* idk why I need this, but without it, it fires on the body and other elements too */
    let options = document.querySelectorAll('input[name=color-canvas]')
    options.forEach(element => {
        if(!element.checked) return;
        if (element.value == 'gray'){
            e.srcElement.style.cssText += 'background-color:#808080';
            return;
        }
        if (element.value == 'rainbow'){
            let color = RAINBOW_COLORS[Math.floor(Math.random()*7)];
            e.srcElement.style.cssText += `background-color:${color}`;
            return;
        }
        if (element.value == 'darkening'){
            let color = e.srcElement.style.backgroundColor;
            colorArray = RGBArray(color);
            console.log(colorArray);
            for(let i = 0; i< colorArray.length; i++) {
                colorArray[i] -= 16;
                if (colorArray[i] < 0) colorArray[i] = 0;
            }
            e.srcElement.style.cssText += `background-color:rgb(${colorArray[0]},${colorArray[1]},${colorArray[2]})`;
            return;
        }
    })
  }

  function loadNewCanvas (canvasSize) {
    const canvas = document.querySelector('.canvas');
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
      }

    canvasSize = parseInt(canvasSize);
    if (isNaN(canvasSize)){
        canvasSize = 16;
    }

    for(let i=0; i< canvasSize; i++){
        const canvasRowDiv = document.createElement('div');
        canvasRowDiv.style.cssText = 'display:flex; background-color:#ffff00;';
        canvas.appendChild(canvasRowDiv);
        
        for(let j=0; j<canvasSize; j++){
            const canvasColDiv = document.createElement('div');
            canvasColDiv.style.cssText = `padding:${(CANVAS_HEIGHT/canvasSize)/2 - 1}px ${(CANVAS_WIDTH/canvasSize)/2 - 1}px; background-color:#ffffff;`;
            canvasColDiv.classList.add('canvasColDiv');
            canvasRowDiv.appendChild(canvasColDiv);
            canvasColDiv.addEventListener('mouseover', mouseOvered)
        }
    }
}

canvasSliderMinusBtn.addEventListener('mouseup', clearTimers);
canvasSliderMinusBtn.addEventListener('mouseleave', clearTimers); 
canvasSliderPlusBtn.addEventListener('mouseup', clearTimers);
canvasSliderPlusBtn.addEventListener('mouseleave', clearTimers); 

window.onload = loadNewCanvas(16);

canvasSizeSlider.addEventListener('change', () => {
    canvasSliderText.textContent = `${canvasSizeSlider.value}/${canvasSizeSlider.value}`;
    loadNewCanvas(canvasSizeSlider.value)
}) 

canvasSliderPlusBtn.addEventListener('mousedown', () => {
    continuosIncrement();
}) 

canvasSliderMinusBtn.addEventListener('mousedown', () => {
    continuosDecrement();
}) 
