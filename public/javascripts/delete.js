// delete.js is only applied to index.hbs and edit.hbs
const deleteButtons = document.querySelectorAll('.delete-button')


deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', function onDeleteButtonClicked(event) {
    const id = deleteButton.dataset.id

    Swal.fire({
      title: '確定要刪除嗎?',
      text: "一但執行，刪除的檔案是無法恢復的唷!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定!',
      cancelButtonText: '取消!'
    }).then(result => {
      if (result.isConfirmed) {
        return Swal.fire(
          '檔案已經刪除!',
          '指定的餐廳相關資訊已經完全被刪除了。',
          'success'
        )
      }
    }).then(result => {
      if (result) {
        axios.delete(`/restaurants/${id}`)
          .then(() => window.location.href = '/')
          .catch(err => console.log(err))
      }
    })
  })
})
