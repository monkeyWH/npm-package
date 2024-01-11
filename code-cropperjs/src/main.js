import Cropper from 'cropperjs'

console.dir(Cropper)
const imgDom1 = document.querySelector('#img1')
const imgDom2 = document.querySelector('#img2')
const btn = document.querySelector('button')
const cropper = new Cropper(
  imgDom1,
)
cropper.getCroppedCanvas().toBlob((blob) => {
  console.log(blob)
})

btn.addEventListener('click', () => {
  cropper.getCroppedCanvas().toBlob((blob => {
    console.log(blob)
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      console.log(reader.result)
      imgDom2.setAttribute('src', reader.result)
    })
    reader.readAsDataURL(blob)  
  }))
})
