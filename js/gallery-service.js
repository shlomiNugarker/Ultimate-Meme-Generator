'use strict'
var imgIdx = 1
var imgCount = 12

function getImgs(){
    gImgs = []
    for(var i = 0; i < imgCount; i++){
        gImgs.push(
            {
                id: makeId(),
                url: `img\/images\/${imgIdx++}.jpg`,
                keywords:[]
            }
        )
    }
    return gImgs
}


var keywords = [
    'trump',
    'dog',
    'baby',
    'cat',
    'funny',
    'nice',
    'baby',
    'comics',
    'cute',
    'obama',
    'box',
    'tv',
    'movie',
    'ok',
    'wine',
    'matrix',
    'good',
    'baby',
    'putin',
    'toy',
]



function setKeywords(keywords){
    gImgs.forEach((img, i) => {
        gImgs[i].keywords.push(keywords[i])
    })
}