'use strict'

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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function setBorder(el){
    var btns = document.querySelectorAll('button')
    btns.forEach(btn =>{
        btn.style.border = 'none'
    })
    el.style.border = '1px solid green'
}

function focusInput(){
    document.querySelector('input[name=txt-mem]').focus()
}

function getColor1() {
    return document.querySelector('input[name=color1]').value
}

function getColor2() {
    return document.querySelector('input[name=color2]').value
}