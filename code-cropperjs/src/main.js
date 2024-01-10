import Cropper from 'cropperjs'

console.dir(Cropper)
const imgDom = document.querySelector('img')
new Cropper(imgDom)