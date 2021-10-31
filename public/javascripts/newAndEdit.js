// newAndEdit.js is only applied to new.hbs and edit.hbs
const previewLoadButton = document.querySelector('#preview-load-button')
const previewImage = document.querySelector('#preview-image')
const previewProgress = document.querySelector('#preview-progress')
const newEditForm = document.querySelector('#new-edit-form')
const saveButton = document.querySelector('#save-button')
let progressValue = 0


////// Function Section Starts Here //////
function renderPreviewProgress(element) {
  element.innerHTML = `
      <div id="preview-progress-bar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="100" aria-valuemin="0"
      aria-valuemax="100"></div>
    `
}

function previewProgressBarFinished(element) {
  element.classList.remove('progress-bar-striped', 'progress-bar-animated')
  element.classList.add('bg-success')
}

function formCheck(form, event) {
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }

  form.classList.add('was-validated')
}
////// Function Section Ends Here //////


////// Event Listener Section Starts Here //////
previewLoadButton.addEventListener('click', function onPreviewLoadButtonClicked(event) {
  // interval timer pre-declaration
  let timer
  const defaultImageSrc = 'https://via.placeholder.com/600x400?text=Recomended+size:+600+x+400'

  if (progressValue >= 100) renderPreviewProgress(previewProgress)
  const previewProgressBar = document.querySelector('#preview-progress-bar')
  const newImageSource = document.querySelector('#image').value || defaultImageSrc

  new Promise(resolve => {
    // constantly checking if progress value hits over 100%
    timer = setInterval(() => {
      previewProgressBar.style.width = `${progressValue += 1}%`
      if (progressValue >= 100) resolve()
    }, 1)
  }).then(() => {
    // clean interval timer
    clearInterval(timer)
    // change to new preview image after one sec delay
    setTimeout(() => {
      previewImage.src = newImageSource
      previewProgressBarFinished(previewProgressBar)
    }, 1000) 
  })
})

newEditForm.addEventListener('submit', function onNewEditFormClicked(event) {
  formCheck(newEditForm, event)
})
////// Event Listener Section Ends Here //////