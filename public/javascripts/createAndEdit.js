const previewLoadButton = document.querySelector('#preview-load-button')
const previewImage = document.querySelector('#preview-image')
const previewProgress = document.querySelector('#preview-progress')
const createEditForm = document.querySelector('#create-edit-form')
const saveButton = document.querySelector('#save-button')
let progressValue = 0


previewLoadButton.addEventListener('click', function onPreviewLoadButtonClicked(event) {

  const newImageSource = document.querySelector('#image').value
  let timer

  if (progressValue >= 100) {
      previewProgress.innerHTML = `
      <div id="preview-progress-bar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="100" aria-valuemin="0"
      aria-valuemax="100"></div>
    `
  }
  const previewProgressBar = document.querySelector('#preview-progress-bar')

  new Promise(resolve => {
    timer = setInterval(() => {
      previewProgressBar.style.width = `${progressValue += 1}%`
      if (progressValue >= 100) resolve()
    }, 1)
  }).then(() => {
    clearInterval(timer)
    setTimeout(() => {
      previewImage.src = newImageSource
      previewProgressBar.classList.remove('progress-bar-striped', 'progress-bar-animated')
      previewProgressBar.classList.add('bg-success')
    }, 1000) 
  })

})

createEditForm.addEventListener('submit', function onCreateEditFormClicked(event) {
  if (!createEditForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }

  createEditForm.classList.add('was-validated')
})