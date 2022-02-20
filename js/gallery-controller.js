'use strict'

function renderGallery(imgs) {
    // var strHTML = imgs.map(function(img){
    //     return `
    //         <img class="img-gallery" id='${img.id}' src="${img.url}"  onclick="onImgSelected('${img.id}')">
    //     `
    // })
    // document.querySelector('.main-gallery').innerHTML = strHTML.join('')

    var strHTML = imgs.map(function(img){
        return `
            <img class="img-gallery" id='${img.id}' src="${img.url}"  onclick="onImgSelected('${img.id}')">
        `
    })
    document.querySelector('.main-gallery').innerHTML = strHTML.join('')
}

function onImgSelected(imgId) {
    gMeme.selectedImgId = imgId
    document.querySelector('.main-gallery').classList.toggle('hide')
    document.querySelector('.main-editor').classList.toggle('hide')
    resizeCanvas()
    renderMeme(gMeme)
    setLineTxt()
}

function onClickBtnsNav(txt){
    if(txt === 'gallery') {
        document.querySelector('.main-gallery').classList.remove('hide')
        document.querySelector('.main-editor').classList.add('hide')
        document.querySelector('.main-search ').classList.remove('hide')
    }
    else {
        document.querySelector('.main-gallery').classList.add('hide')
        document.querySelector('.main-editor').classList.remove('hide')
        document.querySelector('.main-search ').classList.add('hide')
    }
}

function renderImg(imgId) {
    if(gPrivateImg){
        gCtx.drawImage(gPrivateImg, 0, 0, gCanvas.width, gCanvas.height);
        return
    }
    var imgSelected = document.getElementById(imgId)
    gCtx.drawImage(imgSelected, 0, 0, gCanvas.width, gCanvas.height);
}


