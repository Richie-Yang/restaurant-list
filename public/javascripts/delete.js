// delete.js is only applied to index.hbs and edit.hbs
const deleteButtons = document.querySelectorAll('.delete-button')


// loop all queried delete buttons DOM object
deleteButtons.forEach(deleteButton => {
  // attach event listeners for each of them 
  deleteButton.addEventListener('click', function onDeleteButtonClicked(event) {
    const id = deleteButton.dataset.id

    // trigger SweetAlert package for dialogue
    Swal.fire({
      // SweetAlert dialogue configuration
      title: '確定要刪除嗎?',
      text: "一但執行，刪除的檔案是無法恢復的唷!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定!',
      cancelButtonText: '取消!'
    }).then(result => {
      // if confirmed, then return something
      if (result.isConfirmed) {
        return Swal.fire(
          '檔案已經刪除!',
          '指定的餐廳相關資訊已經完全被刪除了。',
          'success'
        )
      }
    }).then(result => {
      // if catch returned object, then delete
      if (result) {
        axios.delete(`/restaurants/${id}`)
          .then(() => window.location.href = '/')
          .catch(err => console.log(err))
      }
    })
  })
})
