'use strict'
var gCanvas
var gCtx
var gStartPos
var gLine
var currLine
var gClickedLine

var gImgs = []
var gEmojis = []
var gMeme ={
    selectedImgId: '',
    selectedLineidx: 0,
    lines: []
}
var gSets = {
    x: 100,
    y: 150,
    fontSize: 40,
    fillStyle: '#ffffff',
    strokeStyle: '##000000'
}

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');

    resizeCanvas()
    gImgs = getImgs()
    renderGallery(gImgs)

    addListeners()
    renderCanvas()
}

function renderCanvas() {
    if(!gMeme.selectedImgId) return
    gCtx.fillStyle = "#ede5ff"
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    renderMeme(gMeme)
}

function renderMeme(meme){
    renderImg(meme.selectedImgId)
    console.log('render Meme');
    meme.lines.forEach(line =>{
        drawLine(line)
        console.log(line);
    })
}

function setLineTxt(){
    var inputEl = document.querySelector('input[name=txt-mem]')
    inputEl.focus()
    
      inputEl.addEventListener('input', (e)=> {
        renderMeme(gMeme)
        currLine = e.target.value
        gLine = createLine(currLine, gSets.x, gSets.y, gSets.fontSize, gSets.fillStyle, gSets.strokeStyle)
        drawLine(gLine)

      })
}

function createLine(txt='hello',x, y, fontSize, fillStyle, strokeStyle){
    return {
        txt,
        x,
        y,
        fontSize,
        fillStyle,
        strokeStyle,
        isDrag: false,
    }
}

function drawLine(line){
    gCtx.font = `${line.fontSize}px Impact`;
    gCtx.fillStyle = line.fillStyle;
    gCtx.strokeStyle = line.strokeStyle;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
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
    return pos
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    // debugger
    console.log(pos);
    console.log(isLineClicked(pos));
    isLineClicked(pos)
}



// function createEmoji(el){/////////
//     var emoji = {
//         x: 100,
//         y: 100,
//         id: makeId(),
//         size: 100,
//         isDrag: false,
//         src: el.src

//     }
//     gEmojis.push(emoji)
// }

// function renderEmoji(el, id){
//     var emoji = createEmoji(el)

//     var emj = document.getElementById(`emoli${id}`)
//     console.log(emj);
//     // gCtx.drawImage(emoji, gCanvas.width/4, gCanvas.height/4, gCanvas.width/4, gCanvas.height/4);
//     gCtx.drawImage(emj, 100, 100, 100, 100);
    
    
// }

// function isEmojiClicked(){

// }

function isLineClicked(pos){
    var lines = gMeme.lines
    lines.some(line => {
        var txtMeasure = gCtx.measureText(line.txt)
        var widthTxt = txtMeasure.width
        var heightTxt = (txtMeasure.fontBoundingBoxAscent/2)
      
        if(pos.x >= line.x && pos.x <= (line.x + widthTxt) && pos.y >= (line.y - heightTxt) && pos.y <= (line.y + heightTxt)){
            gClickedLine = line
            setLineDrag(true, line)
            gStartPos = pos
            document.body.style.cursor = 'grabbing'
        }
      
    })
}

function onMove(ev){
    if(!gClickedLine) return
    console.log('onMove');

    if(gClickedLine.isDrag){
        const pos = getEvPos(ev)
        const dx = pos.x - gClickedLine.x
        const dy = pos.y - gClickedLine.y
        moveLine(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function moveLine(dx, dy) {
    gClickedLine.x += dx
    gClickedLine.y += dy

}

function onUp(){
    if(!gClickedLine) return
    console.log('onUp()');
    setLineDrag(false, gClickedLine)
    document.body.style.cursor = 'grab'
}


function setLineDrag(isDrag, clickedLine){
    clickedLine.isDrag = isDrag
}


