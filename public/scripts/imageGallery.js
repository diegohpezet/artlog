const gallery = document.getElementById("gallery");

const getPictures = () => {
  fetch('http://localhost:3000/pictures')
    .then(response => response.json())
    .then(data => {
      data.forEach(picture => {
        createCard({ url: picture.url, user: picture.User });
      });
    })
}

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
  likeBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
  likeBtn.innerHTML = '<i class="bi bi-heart"></i>';

  const downloadBtn = document.createElement('button');
  downloadBtn.classList.add('btn', 'btn-outline-light', 'btn-sm', 'shadow-sm', 'mx-1');
  downloadBtn.innerHTML = '<i class="bi bi-download"></i>';

  btnContainer.append(likeBtn, downloadBtn);
  userInfo.append(userImg, userName);
  figcaption.append(userInfo);
  figure.append(img, figcaption, btnContainer);
  figureContainer.append(figure)

  gallery.append(figureContainer)
};

getPictures()

/* 
setTimeout(() => {
  for (let i = 0; i <= 40; i++) {
    let random = Math.floor(Math.random() * (1200 - 500 + 1) + 500);
    let random2 = Math.floor(Math.random() * (1200 - 500 + 1) + 500);

    createCard({ url: `https://picsum.photos/${random}/${random2}?random=1` });
  }
  masonryContainer.classList.remove('visually-hidden');
}, 2000);

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 6) {
    setTimeout(() => {
      for (let i = 0; i <= 6; i++) {
        let random = Math.floor(Math.random() * (1200 - 500 + 1) + 500);
        let random2 = Math.floor(Math.random() * (1200 - 500 + 1) + 500);

        createCard({ url: `https://picsum.photos/${random}/${random2}?random=1` });
      }
    }, 500);
  }
}); */