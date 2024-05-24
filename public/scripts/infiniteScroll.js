const masonryContainer = document.getElementById("masonry-container");

const createCard = (data) => {
  const item = document.createElement('div');
  item.classList.add('masonry-item');
  const card = document.createElement('div');
  card.classList.add('card', 'border-0', 'shadow');

  const figure = document.createElement('figure');
  figure.classList.add('m-0');

  const img = document.createElement('img');
  img.classList.add('card-img');
  img.src = data.url;

  img.onload = () => {
    figure.appendChild(img);
    card.appendChild(figure);
    item.appendChild(card);
    masonryContainer.appendChild(item);
  };

  // Optional: handle image loading errors
  img.onerror = () => {
    console.error('Image failed to load:', data.url);
  };
};

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
});