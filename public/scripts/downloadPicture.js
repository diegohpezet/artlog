const downloadToast = document.getElementById('downloadToast');
const errorToast = document.getElementById('errorToast');

export async function downloadPicture(id) {
  const resp = await fetch(`/api/pictures/${id}/download`)
  if (!resp.ok) {
    const toast = bootstrap.Toast.getOrCreateInstance(errorToast)
    toast.show();
  }

  const blob = await resp.blob();
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element to trigger the download
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `artlog_${id}.png`;

  document.body.appendChild(a);
  a.click();

  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);

  // Show success toast
  const toast = bootstrap.Toast.getOrCreateInstance(downloadToast)
  toast.show();
}