import { downloadPicture, deletePicture } from "./picturesHandler.js";
import { checkIsLIked, toggleLike } from "./likesHandler.js";

/**
 * Renders a picture card element with optional user info, social actions, and delete button
 * @param {Object} picture_data The data of the picture to render
 * @param {Object} options Options to customize rendering
 * @param {Boolean} options.showUserInfo Whether to show user info
 * @param {Boolean} options.showActions Whether to show like & download actions
 * @param {Boolean} options.showDelete Whether to show delete option
 * @returns {HTMLElement} The picture card element
 */
export async function renderPicture(picture_data, options = {
  showUserInfo: false,
  showActions: false,
  showDelete: false
}) {
  // Create figure element
  const pictureCard = document.createElement('figure');
  pictureCard.classList.add('picture');

  // Attach img to figure element
  const img = document.createElement('img');
  img.src = picture_data.url;
  img.classList.add('picture-img');
  img.addEventListener('click', () => {
    location.replace(`/pictures/${picture_data.id}`);
  })

  pictureCard.append(img);

  // Show user info
  if (options.showUserInfo) {
    const userCaption = renderUserInfo(picture_data.user);
    pictureCard.append(userCaption);
  }

  // Show social actions
  if (options.showActions) {
    // Button section
    const btnContainer = document.createElement('section');
    btnContainer.classList.add('options')

    const likeBtn = await renderLikeButton(picture_data.id);
    const downloadBtn = renderDownloadButton(picture_data.id);

    btnContainer.append(likeBtn, downloadBtn);

    if (options.showDelete) {
      const deleteBtn = renderDeleteButton(picture_data.id);
      btnContainer.append(deleteBtn)
    }

    pictureCard.append(btnContainer);
  }

  return pictureCard;
}


/**
 * Creates a figcaption component that has the username and profile picture of
 * the user that uploaded a picture
 * @param {Object} user Data of the user that uploaded the picture
 * @returns {HTMLElement} A figcaption component
 */
function renderUserInfo(user) {
  // Create caption element, which should contain user picture and username
  const caption = document.createElement('figcaption');
  caption.classList.add('caption')

  const userInfo = document.createElement('section');

  // Build user img & username elements
  const userImg = document.createElement('img');
  userImg.classList.add('profile-picture');
  userImg.src = user.profilePicture;

  const userName = document.createElement('span');
  userName.classList.add('ms-2')
  userName.innerText = user.username;

  // Attach elements to caption
  userInfo.append(userImg, userName);
  caption.append(userInfo);

  return caption;
}

/**
 * Creates a 'like' button
 * @param {Number} picture_id Id of the picture to be liked on btn click
 * @returns {HTMLButtonElement} A like button pointing to the specified picture
 */
async function renderLikeButton(picture_id) {
  // Like Btn
  const likeBtn = document.createElement('button');
  likeBtn.classList.add('btn', 'btn-sm', 'shadow-sm', 'mx-1')

  // Check if picture is liked
  const isLiked = await checkIsLIked(picture_id);
  likeBtn.classList.add(isLiked ? 'btn-outline-danger' : 'btn-outline-light')
  likeBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';

  // Like button functionality
  likeBtn.addEventListener('click', async () => {
    // Swap btn color
    likeBtn.classList.toggle('btn-outline-danger');
    likeBtn.classList.toggle('btn-outline-light');

    // Send like request
    await toggleLike(picture_id);
  })

  return likeBtn;
}

/**
 * Creates a 'download' button
 * @param {Number} picture_id Id of the picture to be downloaded on button click
 * @returns {HTMLButtonElement} A download button pointing to the specified picture
 */
function renderDownloadButton(picture_id) {
  const downloadBtn = document.createElement('button');
  downloadBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
  downloadBtn.innerHTML = `<i class="bi bi-download"></i>`;
  downloadBtn.addEventListener('click', async () => {
    if (await downloadPicture(picture_id)) {
      // Show success toast
      Toastify({
        text: "Picture downloaded successfully!",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #12bf33, #00ff17)"
        },
        gravity: "bottom"
      }).showToast()
    } else {
      // Show failure toast
      Toastify({
        text: "Error downloading picture!",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #e70202, #f43b3b)"
        },
        gravity: "bottom"
      }).showToast()
    }
  })

  return downloadBtn;
}

/**
 * Creates a 'delete' button
 * @param {Number} picture_id Id of the picture to be deleted on button click 
 * @returns {HTMLButtonElement} A delete button pointing to the specified picture
 */
function renderDeleteButton(picture_id) {
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
  deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`

  // Delete picture functionality
  deleteBtn.addEventListener('click', () => {
    Swal.fire({
      title: "Confirm action",
      text: "Are you sure you want to delete this picture (This action can't be undone!)",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      customClass: {
        actions: 'delete-actions',
        cancelButton: 'order-1',
        confirmButton: 'order-2'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePicture(picture_id);
        location.reload();
      }
    })
  })

  return deleteBtn;
}