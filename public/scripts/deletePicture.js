const deleteToast = document.getElementById('deleteToast');
const errorToast = document.getElementById('errorToast');


export default function deletePicture(id) {
  const deleteBtnModal = document.getElementById("deleteBtnModal");
  deleteBtnModal.addEventListener('click', async () => {
    const response = await fetch(`/api/pictures/${id}/delete`, {
      method: 'delete'
    });
    if (!response.ok) {
      const toast = bootstrap.Toast.getOrCreateInstance(errorToast);
      toast.show();
    }
    // Show success toast
    const toast = bootstrap.Toast.getOrCreateInstance(deleteToast);
    toast.show();

    setTimeout(() => {
      location.reload();
    }, 1000)
  })
}