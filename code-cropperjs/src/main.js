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

// 上传图片读取exif信息
const inputDom = document.querySelector('#imgInput')
inputDom.addEventListener('change', (file) => {
  const fr = new FileReader()
  fr.addEventListener('load', () => {
    const imgBase64Data = fr.result;
    const imgBase64Content = imgBase64Data.replace(/^data.*,/, '')
    const imgBinary = atob(imgBase64Content)
    const imgArrayBuffer = new ArrayBuffer(imgBinary.length)
    const imgUint8 = new Uint8Array(imgArrayBuffer)

    for (let i = 0; i < imgBinary.length; i++) {
      imgUint8[i] = imgBinary.charCodeAt(i)
    }
    const imgDataView = new DataView(imgArrayBuffer)
    try {
      let offset = 2;
      let app1Start;
      console.log(imgDataView)
      while (offset + 1 < imgDataView.byteLength) {
        if (imgDataView.getUint8(offset) === 0xFF && imgDataView.getUint8(offset + 1) === 0xE1) {
          console.log(offset)
          app1Start = offset
          break;
        }
        offset += 1
      }
      if (app1Start) { }
    } catch (err) {
      console.log(err)
    }
  })
  fr.readAsDataURL(file.target.files[0])
})


/**
 * https://blog.csdn.net/bohu83/article/details/100005147
 * https://blog.csdn.net/ling620/article/details/103731878
 */
/**
 * 源码中关于resetAndGetOrientation方法解析
 */
// const canvasDom = document.createElement('canvas')
// canvasDom.width = imgDom1.width
// canvasDom.height = imgDom1.height
// const ctx = canvasDom.getContext('2d')
// ctx.drawImage(imgDom1, 0, 0, imgDom1.width, imgDom1.height)
// document.body.appendChild(canvasDom)
// const canvasDataUrl = canvasDom.toDataURL('image/jpeg')
// const base64Data = canvasDataUrl.replace(/^data.*,/, '')
// const canvasBinary = atob(base64Data)
// const arrayBuffer = new ArrayBuffer(canvasBinary.length)
// const canvasUint8Array = new Uint8Array(arrayBuffer)
// for (let i = 0; i < canvasUint8Array.length; i++) {
//   canvasUint8Array[i] = canvasBinary.charCodeAt(i)
// }
// const dataView = new DataView(arrayBuffer)
// console.log(dataView.byteLength)
// try {
//   let offset = 2;
//   let app1Start;
//   while (offset + 1 < dataView.byteLength) {
//     if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
//       console.log(offset)
//       app1Start = offset
//       break;
//     }
//     offset += 1
//   }
//   if (app1Start){}
// } catch (err) {
//   console.log(err)
// }
// console.log(canvasUint8Array)
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