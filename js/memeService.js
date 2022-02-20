'use strict'
function getMeme(){
  return gMeme
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

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function createEmoji(id){
  return {
      x: 100,
      y: 100,
      id: id,
      size: 100,
      isDrag: false,
  }
}

function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
  loadImageFromInput(ev, renderImg2)
}

function loadImageFromInput(ev, onImageReady) {
  document.querySelector('.share-container').innerHTML = ''
  var reader = new FileReader()

  reader.onload = function (event) {
      console.log('onload');
      var img = new Image()
      // Render on canvas
      img.onload = onImageReady.bind(null, img)
      img.src = event.target.result
      gPrivateImg = img
      //
      
  }
  console.log('after');
  reader.readAsDataURL(ev.target.files[0])
}

function renderImg2(img) {
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}
// Uploud
function uploadImg() {
  const imgDataUrl = gCanvas.toDataURL("image/jpeg");

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
      const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      console.log(encodedUploadedImgUrl);
      document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

      document.querySelector('.sharre-container').innerHTML = `
      <a class="btn-share" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}"
       title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         Share   
      </a>`
      toggleMoreModal()
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl)

  fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
  })
  .then(res => res.text())
  .then((url)=>{
      console.log('Got back live url:', url);
      onSuccess(url)
  })
  .catch((err) => {
      console.error(err)
  })
}