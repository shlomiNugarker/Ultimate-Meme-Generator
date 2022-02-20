'use strict'
var gCanvas
var gCtx
var gStartPos
var gLine
var gEmoji
var currLine
var gClickedLine
var gClickedEmoji
var gPrivateImg

var gImgs = []
var gMeme ={
    selectedImgId: '',
    selectedLineidx: 0,
    lines: [],
    emojis: []
}

var gSets = {
    x: 100,
    y: 150,
    fontSize: 40,
    fillStyle: '#ffffff',
    strokeStyle: '##000000',
}

var gEmojiSets = {
    x: 100,
    y: 100,
    size: 40,

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
    
    setKeywords(keywords)
    // filterGallery()

    document.querySelector('input[name=search-key-word').addEventListener('input',(e)=>{
        var imgs = gImgs.filter((img, i) => {
            var word = img.keywords[0]
            console.log(word);
            return(word.includes(e.target.value)) 
        }) 
        renderGallery(imgs)
 
         
     })
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
    meme.emojis.forEach(emoji =>{
        drawEmoji(emoji)
        console.log(emoji);
    })
}

function setLineTxt(){
    var inputEl = document.querySelector('input[name=txt-mem]')
    inputEl.focus()
    
    inputEl.addEventListener('input', (e)=> {
        renderMeme(gMeme)
        currLine = e.target.value
        gLine = createLine(currLine, gSets.x, gSets.y, gSets.fontSize, gSets.fillStyle, gSets.strokeStyle)
        drawLine(gLine) // click add-btn and push to model
        gClickedLine = null
        
    })
    
}

function onClickEmoji(id){
    var emoji =  createEmoji(id)
    renderEmoji(id)
    gEmoji = emoji
    gClickedEmoji = emoji
    gMeme.emojis.push(emoji)
}

function isEmojiClicked(pos){
    var emojis = gMeme.emojis
    emojis.some(emoji =>{
        var width = emoji.x + emoji.size
        var height = emoji.y + emoji.size
            if(pos.x >= emoji.x && pos.x <= (emoji.x + width) && pos.y >= emoji.y && pos.y <= (emoji.y+height)){
            gClickedLine = null
            gClickedEmoji = emoji
            gEmoji = emoji
            setEmojiDrag(true, emoji)
            gStartPos = pos
            document.body.style.cursor = 'grabbing'
        }
    })

}

function isLineClicked(pos){
    var lines = gMeme.lines
    lines.some(line => {
        var txtMeasure = gCtx.measureText(line.txt)
        var widthTxt = txtMeasure.width
        var heightTxt = (txtMeasure.fontBoundingBoxAscent/2)
      
        if(pos.x >= line.x && pos.x <= (line.x + widthTxt) && pos.y >= (line.y - heightTxt) && pos.y <= (line.y + heightTxt)){
            gClickedEmoji = null
            gClickedLine = line
            gLine = line
            setLineDrag(true, line)
            gStartPos = pos
            document.body.style.cursor = 'grabbing'
        }
    })
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

function onDown(ev) {

    const pos = getEvPos(ev)
    isEmojiClicked(pos)
    isLineClicked(pos)
    if(!gClickedLine && !gEmoji) {
        document.querySelector('.to-drag-msg').innerText = 'Save the line first for drag +'
        setTimeout(()=>{
         document.querySelector('.to-drag-msg').innerText = ''
        } ,1500)
     }
}

function onMove(ev){
    // if(!gClickedLine) return
    if(gClickedLine) {
        if(gClickedLine.isDrag){
            const pos = getEvPos(ev)
            const dx = pos.x - gClickedLine.x
            const dy = pos.y - gClickedLine.y
            moveLine(dx, dy)
            gStartPos = pos
            renderCanvas()
        }
    }
    else if(gClickedEmoji){
        if(gClickedEmoji.isDrag){
            const pos = getEvPos(ev)
            const dx = pos.x - gClickedEmoji.x
            const dy = pos.y - gClickedEmoji.y
            moveLine(dx, dy) //or move circle
            gStartPos = pos
            renderCanvas()
        }
    }

}

function moveLine(dx, dy) {
    if(gClickedLine) {
        gClickedLine.x += dx
        gClickedLine.y += dy
    }
    else if(gClickedEmoji) {
        gClickedEmoji.x += dx
        gClickedEmoji.y += dy
    }


}

function onUp(){
    // if(!gClickedLine) return
    if(gClickedLine) {
        console.log('onUp()');
        setLineDrag(false, gClickedLine)
        document.body.style.cursor = 'grab'
    }
    else if(gClickedEmoji) {
        setEmojiDrag(false, gClickedEmoji)
        document.body.style.cursor = 'grab'
    }

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

function setLineDrag(isDrag, clickedLine){
    clickedLine.isDrag = isDrag
}

function setEmojiDrag(isDrag, clickedEmoji) {
    clickedEmoji.isDrag = isDrag
}



function toggleMenu(){
    document.body.classList.toggle('menu-open')
    document.querySelector('.modal').classList.toggle('show-modal')
}

function toggleMoreModal(){
    document.body.classList.toggle('modal-open')
    document.querySelector('.share-container').classList.toggle('open-share-container') 
}

function onLucky(){
    var randNum = getRandomIntInclusive(0, imgCount-1)
    var imgId = gImgs[randNum].id
    onImgSelected(imgId)
}

// function filterGallery() {
//      document.querySelector('input[name=search-key-word').addEventListener('input',(e)=>{

//        var imgs = gImgs.filter((img) => {
//            var words = img.keywords
//            return e.target.value.includes(...words)
//        }) 
//        renderGallery(imgs)

        
//     })
// }
       
        


