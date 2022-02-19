'use strict'
var imgIdx = 1
var imgCount = 18

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