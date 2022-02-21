'use strict'

var isSwitch = false
var gFontSize = 40

function drawEmoji(emoji){
    var emj = document.getElementById(`emoli${emoji.id}`)
    gCtx.drawImage(emj, emoji.x, emoji.y, emoji.size, emoji.size);
}

function renderEmoji(id){
    var emj = document.getElementById(`emoli${id}`)
    gCtx.drawImage(emj, 100, 100, 100, 100);
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
}

function onClearCanvas(){
    gMeme.lines.pop()
    document.querySelector('input[name=txt-mem]').value = ''
    renderMeme(gMeme)
    focusInput()
}

function onClickEmoji(id){
    var emoji =  createEmoji(id)
    renderEmoji(id)
    gEmoji = emoji
    gClickedEmoji = emoji
    gMeme.emojis.push(emoji)
}

// onClicks
function ondIncrFontSize(el){
    if(!gLine) return
    gLine.fontSize = gSets.fontSize = gSets.fontSize+10
    document.querySelector('.font-size').innerText = gSets.fontSize

    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    // focusInput()
    
}

function onDcrsFontSize(el){

    if(gLine) {
        gLine.fontSize =  gSets.fontSize = gSets.fontSize-10
        document.querySelector('.font-size').innerText = gSets.fontSize
        renderMeme(gMeme)
        drawLine(gLine)
        setBorder(el)
        focusInput()
        document.querySelector('.font-size').innerText = gSets.fontSize
    }
    if(gEmoji){

    }
 
}

function onClickSwitch(el){
    if(!gLine) return
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
    // focusInput()
}

function onClickLeft(el){
    if(gLine) {
        gLine.x = gSets.x = gSets.x-10
        renderMeme(gMeme)
        drawLine(gLine)
        setBorder(el)
        // focusInput()
    }
    else if (gEmoji){
        gEmoji.x = gEmojiSets.x = gEmojiSets.x-10
        renderMeme(gMeme)
        drawEmoji(gEmoji)
    } 
}

function onClickRight(el){
    if(gLine){
        gLine.x = gSets.x = gSets.x+15 
        renderMeme(gMeme)
        drawLine(gLine)
        setBorder(el)
        // focusInput()
        
    }
    else if (gEmoji){
        gEmoji.x = gEmojiSets.x = gEmojiSets.x+15
        renderMeme(gMeme)
        drawEmoji(gEmoji)
    } 


}

function onClickUp(el){
    if(gLine) {
        gLine.y = gSets.y = gSets.y-15
        renderMeme(gMeme)
        drawLine(gLine)
        setBorder(el)
        // focusInput()
  
    }
    else if (gEmoji){
        gEmoji.y = gEmojiSets.y = gEmojiSets.y-15
        renderMeme(gMeme)
        drawEmoji(gEmoji)

    } 
  
}

function onClickDown(el){
    // if(!gLine) return
    if(gLine) {
        gLine.y = gSets.y = gSets.y+15
        renderMeme(gMeme)
        drawLine(gLine)
        setBorder(el)
        // focusInput()
 
    }
    else if(gEmoji){
        console.log('down');
        gEmoji.y = gEmojiSets.y = gEmojiSets.y+15
        renderMeme(gMeme)
        drawEmoji(gEmoji)

    }
   
}

function onAddLine(){ 
    if(gLine) {
        gMeme.lines.push(gLine)
        renderMeme(gMeme)
        focusInput()
        document.querySelector('input[name=txt-mem]').value = ''
        gLine = null
    }
    else if(gEmoji){
        renderMeme(gMeme)
        // focusInput()
        gEmoji = null
    }
}

function onAlignL(el) {
    if(!gLine) return
    gLine.x = gSets.x = 5
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    // focusInput()
}

function onAlignR(el) {
    if(!gLine) return
    gLine.x = gSets.x = 234
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    // focusInput()
}

function onAlignC(el) {
    if(!gLine) return
    gLine.x = gSets.x = 125
    gLine.y = gSets.y = 185
    renderMeme(gMeme)
    drawLine(gLine)
    setBorder(el)
    // focusInput()
}

function onClickColor1(){
    if(!gLine) return
    var color = getColor1()
    gLine.fillStyle = gSets.fillStyle = color
    renderMeme(gMeme)
    drawLine(gLine)
    focusInput()
}

function onClickColor2(){
    if(!gLine) return
    var color = getColor2()
    gLine.strokeStyle = gSets.strokeStyle = color
    renderMeme(gMeme)
    drawLine(gLine)
    focusInput()
}



