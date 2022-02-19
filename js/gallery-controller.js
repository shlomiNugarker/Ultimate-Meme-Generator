'use strict'

function renderGallery(imgs) {
    var strHTML = imgs.map(function(img){
        return `
            <img class="img-gallery" id='${img.id}' src="${img.url}"  onclick="onImgSelected('${img.id}')">
        `
    })
    document.querySelector('.main-gallery').innerHTML = strHTML.join('')
}

function onImgSelected(imgId) {
    resizeCanvas()
    gMeme.selectedImgId = imgId
    renderMeme(gMeme)
    setLineTxt()

    document.querySelector('.main-gallery').classList.toggle('hide')
    document.querySelector('.main-editor').classList.toggle('hide')
    // document.querySelector('.lucky').classList.toggle('hide')
}

function onClickBtnsNav(txt){
    if(txt === 'gallery') {
        document.querySelector('.main-gallery').classList.remove('hide')
        document.querySelector('.main-editor').classList.add('hide')
        document.querySelector('.lucky').classList.remove('hide')
        document.querySelector('.main-search ').classList.remove('hide')
    }
    else {
        document.querySelector('.main-gallery').classList.add('hide')
        document.querySelector('.main-editor').classList.remove('hide')
        document.querySelector('.lucky').classList.add('hide')
        document.querySelector('.main-search ').classList.add('hide')
    }
}

function renderImg(imgId) {
    var imgSelected = document.getElementById(imgId)
    gCtx.drawImage(imgSelected, 0, 0, gCanvas.width, gCanvas.height);
}

// function onLucky(){
//     var randIdx = getRandomIntInclusive(0, gImgs.length-1)
//     var randMeme = gImgs[randIdx]
//     console.log(randMeme);
//     renderMeme(randMeme.id)
//     // renderImg(randMeme.id)
//     document.querySelector('.main-search ').classList.add('hide')
// }

