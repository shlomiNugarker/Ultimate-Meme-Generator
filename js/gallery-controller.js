'use strict'

function renderGallery() {
    var imgs = getMemes()
    var strHTML = imgs.map(function(img){
        return `
        <img src="${img.url}" onclick="onImgSelected(this)">
        `
    })
    document.querySelector('.image-gallery').innerHTML = strHTML.join('')
}

function onImgSelected(imgEl) {
    loadMemsFromGallery(imgEl,renderMeme)
    document.querySelector('.gallery-container').classList.toggle('hide')
    document.querySelector('.meme-editor').classList.toggle('hide')
    setLineTxt()
}




