'use strict'
// var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
// var gMems = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}];

function getMemes(){
  var imgs = []
  for(var i = 0; i < imgCount; i++){
      imgs.push(
          {
              id: makeId(),
              url: `img\/images\/${imgIdx++}.jpg`,
              keywords:[]
          }
      )
  }
  return imgs
}

function getMeme(){
  return gCurrMeme
}

function setLineTxt(){
  gLastCtx = gCanvas.getContext('2d')
  var inputEl = document.querySelector('input[name=txt-mem]')
  inputEl.focus()
  inputEl.addEventListener('input', (e)=> {
      var txt = e.target.value
      drawTxt(txt)

  })
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function downloadImg(elLink) {
  var imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
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
      gImg = img
  }
  console.log('after');
  reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
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

      document.querySelector('.share-container').innerHTML = `
      <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         Share   
      </a>`
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