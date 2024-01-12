import Cropper from 'cropperjs'

console.dir(Cropper)
const imgDom1 = document.querySelector('#img1')
const imgDom2 = document.querySelector('#img2')
const btn = document.querySelector('button')
const cropper = new Cropper(
  imgDom1,
)

btn.addEventListener('click', () => {
  cropper.getCroppedCanvas().toBlob((blob => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      imgDom2.setAttribute('src', reader.result)
    })
    reader.readAsDataURL(blob)  
  }))
})
/**
 * https://blog.csdn.net/bohu83/article/details/100005147
 * https://blog.csdn.net/ling620/article/details/103731878
 */
/**
 * 源码中关于resetAndGetOrientation方法解析
 */
const canvasDom = document.createElement('canvas')
canvasDom.width = imgDom1.width
canvasDom.height = imgDom1.height
const ctx = canvasDom.getContext('2d')
ctx.drawImage(imgDom1, 0, 0, imgDom1.width, imgDom1.height)

document.body.appendChild(canvasDom)
const canvasDataUrl = canvasDom.toDataURL('image/jpeg')
const base64Data = canvasDataUrl.replace(/^data.*,/, '')
const canvasBinary = atob(base64Data)
const arrayBuffer = new ArrayBuffer(canvasBinary.length)
const canvasUint8Array = new Uint8Array(arrayBuffer)
for (let i = 0; i < canvasUint8Array.length; i++) {
  canvasUint8Array[i] = canvasBinary.charCodeAt(i)
}
const dataView = new DataView(arrayBuffer)
console.log(dataView)
console.log(dataView.getInt8(0))
console.log(dataView.getUint8(0))
console.log(dataView.getUint16(0))
// const canvasBlobData = canvasDom.toBlob(
//   (blob) => {
//     console.log(blob)
//     const arraybuffer = new ArrayBuffer(blob.size)
//     const uint8array = new Uint8Array(arraybuffer)
//     for (let i = 0; i < uint8array.length; i ++) {
//       uint8array[0] = window.charc(blob[i])
//     }
//     console.log(arraybuffer)
//   },
//   'image/jepg',
//   1.0
// )