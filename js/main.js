'use strict'
var gLastCtx
var gCurrCtx
var gCurrMeme
var gCanvas
var gCtx
var gMeme

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas()
  
    window.addEventListener('resize', () => {
        console.log('resized')
        resizeCanvas()
    })
    renderGallery()
}






function renderCanvas() {
    gCtx.save()
    gCtx.fillStyle = "#ede5ff"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    // renderCircle()
    gCtx.restore()
}

function renderCircle() {
    const { pos, color, size } = getCircle()
    drawArc(pos.x, pos.y, size, color)
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    } 
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
}