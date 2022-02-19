'use strict'

var isSwitch = false
 
var gFontSize = 40

function getColor1() {
    return document.querySelector('input[name=color1]').value
}

function getColor2() {
    return document.querySelector('input[name=color2]').value
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    // gCanvas.height = elContainer.offsetHeight
}

function onClearCanvas(){
    gMeme.lines.pop()
    document.querySelector('input[name=txt-mem]').value = ''
    renderMeme(gMeme)
    focusInput()
}

function ondIncrFontSize(el){
    if(!gLine) return
    gLine.fontSize = gSets.fontSize = gSets.fontSize+10
    document.querySelector('.font-size').innerText = gSets.fontSize

    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
    
}

function onDcrsFontSize(el){
    if(!gLine) return
    gLine.fontSize =  gSets.fontSize = gSets.fontSize-10
    document.querySelector('.font-size').innerText = gSets.fontSize
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
    document.querySelector('.font-size').innerText = gSets.fontSize
}

function onClickSwitch(el){
    if(!gLine) return
    // debugger
    renderCanvas()
    if(isSwitch){
        gLine.y = gSets.y = 35
        isSwitch = !isSwitch
    }
    else{
        gLine.y = gSets.y = 384 
        isSwitch = !isSwitch
    }
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
}

function onClickLeft(el){
    if(!gLine) return
    gLine.x = gSets.x = gSets.x-10
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
}

function onClickRight(el){
    if(!gLine) return
    gLine.x = gSets.x = gSets.x+15 
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
}

function onClickUp(el){
    if(!gLine) return
    gLine.y = gSets.y = gSets.y-15
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
}

function onClickDown(el){
    if(!gLine) return
    gLine.y = gSets.y = gSets.y+15
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
}

function onAddLine(){
    var input = document.querySelector('input[name=txt-mem]').value
    if(!input) return
    if(!gLine) return
    gMeme.lines.push(gLine)
    renderMeme(gMeme)
    focusInput()
    document.querySelector('input[name=txt-mem]').value = ''
}

function onAlignL(el) {
    if(!gLine) return
    gLine.x = gSets.x = 5
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
}

function onAlignR(el) {
    if(!gLine) return
    gLine.x = gSets.x = 234
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
}

function onAlignC(el) {
    if(!gLine) return
    gLine.x = gSets.x = 128
    gLine.y = gSets.y = 168
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    focusInput()
}

function onClickColor1(){
    var color = document.querySelector('input[name=color1]')
    gLine.fillStyle = gSets.fillStyle = color.value
    renderMeme(gMeme)
    drawLine(gLine)
    focusInput()
}
function onClickColor2(){
    var color = document.querySelector('input[name=color2]')
    gLine.strokeStyle = gSets.strokeStyle = color.value
    renderMeme(gMeme)
    drawLine(gLine)
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
    document.querySelector('input[name=txt-mem]').focus()
}

