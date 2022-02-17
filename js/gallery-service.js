'use strict'

var imgCount = 18
var imgIdx = 1

function loadMemsFromGallery(img, renderMeme){
    var memeSrc = img.getAttribute('src')
    var newMeme = new Image()
    gCurrMeme = newMeme 
    newMeme.src = memeSrc
    renderMeme(newMeme)
}

