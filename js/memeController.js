'use strict'

var isLineDown = false
var isLineLeft = true
var isLineCenter =false
var gFontSize = 40

function onAddTxt() {

}

function onSaveStep(){

}

function renderMeme(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gLastCtx = gCanvas.getContext('2d')
}



function getColor1() {
    var color = document.querySelector('input[name=color1]').value
    return color
}

function getColor2() {
    var color = document.querySelector('input[name=color2]').value
    return color
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function drawTxt(txt,x=10 ,y=100){
    y = isLineDown? 350: 100;
    x = isLineLeft? 10: 350;
    if(isLineCenter){
        x = 100
        y = 150
    }

    gCtx.font = `${gFontSize}px Impact`;
    gCtx.fillStyle = getColor1();
    gCtx.strokeStyle = getColor2();
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onClearCanvas(){
    clearCanvas()
    var meme = getMeme()
    gCtx.drawImage(meme, 0, 0, gCanvas.width, gCanvas.height);
    focusInput()
}

function onClickFontSize(bool, el){
    if(bool) gFontSize = gFontSize + 3
    else gFontSize = gFontSize - 3
    setBorder(el)
    document.querySelector('.font-size').innerText = gFontSize
    focusInput()
}

// Switch
function onClickSwitch(el){
    isLineDown = !isLineDown
    setBorder(el)
    focusInput()
}

function onClickLeft(el){
    isLineLeft = true
    isLineCenter = false
    setBorder(el)
    focusInput()
}

function onClickRight(el){
    isLineLeft = false
    isLineCenter = false
    isLineCenter = false
    setBorder(el)
    focusInput()
}

function onClickCenter(el){
    isLineCenter = true
    isLineLeft = false
    setBorder(el)
    focusInput()
}

function setBorder(el){
    var btns = document.querySelectorAll('button')
    btns.forEach(btn =>{
        btn.style.border = 'none'
    })
    el.style.border = '1px solid green'
}

function focusInput(){
    document.querySelector('input[name=txt-mem]').value = ''
    document.querySelector('input[name=txt-mem]').focus()
}

function saveCanvasCtx() {
    gCurrCtx = gCanvas.getContext('2d')
}




////grab the context from your destination canvas
// var destCtx = destinationCanvas.getContext('2d');

////call its drawImage() function passing it the source canvas directly
// destCtx.drawImage(sourceCanvas, 0, 0);