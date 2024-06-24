import { currentUserId } from "./decodeToken.js";

const gallery = document.getElementById("gallery");

const getPictures = () => {
  fetch('http://localhost:3000/pictures')
    .then(response => response.json())
    .then(data => {
      data.forEach(picture => {
        let isLiked = false;
        if (currentUserId) {
          // Check if user liked the picture
          picture.likedBy.forEach(element => {
            if (element.user == currentUserId) {
              isLiked = true;
              return;
            }
          })
        }
        createCard({ id: picture.id, url: picture.url, user: picture.User, isLiked });
      });
    })
};

const createCard = (data) => {
  const figureContainer = document.createElement('div');
  figureContainer.classList.add('col-12', 'col-md-6', 'col-lg-4');

  const figure = document.createElement('figure');
  figure.classList.add('picture');

  const img = document.createElement('img');
  img.src = data.url;
  img.classList.add('picture-img');

  const figcaption = document.createElement('figcaption');
  figcaption.classList.add('caption')

  const userInfo = document.createElement('section');

  const userImg = document.createElement('img');
  userImg.classList.add('profile-picture');
  userImg.src = data.user.profilePicture;

  const userName = document.createElement('span');
  userName.classList.add('ms-2')
  userName.innerText = data.user.username;

  const btnContainer = document.createElement('section');
  btnContainer.classList.add('options')

  const likeBtn = document.createElement('button');
  if (!data.isLiked) {
    likeBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
  } else {
    likeBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'shadow-sm', 'mx-1');
  }
  likeBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';

  const downloadBtn = document.createElement('button');
  downloadBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
  downloadBtn.innerHTML = '<i class="bi bi-download"></i>';

  // Button functionalities
  likeBtn.addEventListener('click', () => {
    // Send like request

    if (data.isLiked) {
      fetch(`http://localhost:3000/likes?picture=${data.id}`, {
        method: 'DELETE'
      })
      likeBtn.classList.toggle('btn-outline-danger');
      likeBtn.classList.toggle('btn-outline-light');
      likeBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';
      data.isLiked = !data.isLiked

    } else {
      fetch(`http://localhost:3000/likes?picture=${data.id}`, {
        method: 'POST'
      })
      likeBtn.classList.toggle('btn-outline-danger');
      likeBtn.classList.toggle('btn-outline-light');
      likeBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';
      data.isLiked = !data.isLiked
    }
  })

  if ( currentUserId ) {
    btnContainer.append(likeBtn, downloadBtn);
  }
  userInfo.append(userImg, userName);
  figcaption.append(userInfo);
  figure.append(img, figcaption, btnContainer);
  figureContainer.append(figure)

  gallery.append(figureContainer)
};

getPictures()