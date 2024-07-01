import deletePicture from "./deletePicture.js";
import { downloadPicture } from "./downloadPicture.js";

export function createCard(data, container, options = {
  showUserInfo: false,
  showSocialActions: false,
  managePicture: false,
}) {
  // Create main container for card
  const figureContainer = document.createElement('div');
  figureContainer.classList.add('col-12', 'col-md-6', 'col-lg-4');

  // Attach figure element
  const figure = document.createElement('figure');
  figure.classList.add('picture');

  const img = document.createElement('img');
  img.src = data.url;
  img.classList.add('picture-img');

  figure.append(img);

  // Add user info
  if (options.showUserInfo) {
    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('caption')

    const userInfo = document.createElement('section');

    const userImg = document.createElement('img');
    userImg.classList.add('profile-picture');
    userImg.src = data.user.profilePicture;

    const userName = document.createElement('span');
    userName.classList.add('ms-2')
    userName.innerText = data.user.username;

    userInfo.append(userImg, userName);
    figcaption.append(userInfo);
    figure.append(figcaption)
  }

  // Add social buttons
  if (options.showSocialActions) {
    const btnContainer = document.createElement('section');
    btnContainer.classList.add('options')

    // Like Btn
    const likeBtn = document.createElement('button');
    if (!data.isLiked) {
      likeBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
    } else {
      likeBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'shadow-sm', 'mx-1');
    }
    likeBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';

    // Like button functionality
    likeBtn.addEventListener('click', () => {
      // Send like request

      if (data.isLiked) {
        fetch(`/api/likes?picture=${data.id}`, {
          method: 'DELETE'
        })
        likeBtn.classList.toggle('btn-outline-danger');
        likeBtn.classList.toggle('btn-outline-light');
        likeBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';
        data.isLiked = !data.isLiked

      } else {
        fetch(`/api/likes?picture=${data.id}`, {
          method: 'POST'
        })
        likeBtn.classList.toggle('btn-outline-danger');
        likeBtn.classList.toggle('btn-outline-light');
        likeBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';
        data.isLiked = !data.isLiked
      }
    })

    // Download Btn
    const downloadBtn = document.createElement('button');
    downloadBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
    downloadBtn.innerHTML = `<i class="bi bi-download"></i>`;
    downloadBtn.addEventListener('click', () => { downloadPicture(data.id) })

    btnContainer.append(likeBtn, downloadBtn);

    // Delete Btn
    if (options.managePicture) {
      const optionsBtn = document.createElement('button');
      optionsBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
      optionsBtn.setAttribute('data-bs-toggle', 'modal');
      optionsBtn.setAttribute('data-bs-target', '#deleteContent');
      optionsBtn.onclick = addEventListener('click', () => deletePicture(data.id))
      optionsBtn.innerHTML = `<i class="bi bi-trash"></i>`

      btnContainer.append(optionsBtn)
    }

    figure.append(btnContainer);
  }

  figureContainer.append(figure)

  container.append(figureContainer)
}