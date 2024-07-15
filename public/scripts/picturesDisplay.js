import { currentUserId } from "./decodeToken.js";
import { renderPicture } from "./picturesRender.js";
import { getAllPictures, getUserPictures, getLikedPictures } from "./picturesHandler.js";

/**
 * Renders a list of cards on the document based
 * on the pictures received from database
 * @param {Array[Object]} pictures A list of pictures to display
 * @param {HTMLElement} container The container to display the picture cards into 
 */
const displayPictureList = async (pictures, container) => {
  if (pictures.length < 1) {
    container.innerText = "There are no pictures to show"
  } else {
    pictures.forEach(async (picture) => {
      // Creates a grid Element to contain the picture
      const gridElement = document.createElement("div");
      gridElement.classList.add('col-12', 'col-md-6', 'col-lg-4');

      // Appends picture card HTML into the element
      gridElement.appendChild(await renderPicture({
        id: picture.id,
        url: picture.url,
        user: picture.User,
      }, {
        showUserInfo: true,
        showActions: currentUserId ? true : false,
        showDelete: currentUserId == picture.user ? true : false
      }));

      // Attach grid element to container
      container.append(gridElement);
    });
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById("gallery");
  const userGallery = document.getElementById("user-pictures");
  const userLikedPicturesGallery = document.getElementById("user-liked-pictures");

  const searchParams = new URLSearchParams(window.location.search);


  if (gallery) {
    let allPictures = []
    if (searchParams.has('category')) {
      allPictures = await getAllPictures(searchParams.get('category'));
    } else {
      allPictures = await getAllPictures();
    }
    displayPictureList(allPictures, gallery);
  }

  if (userGallery) {
    const userId = userGallery.getAttribute("data-user-id");
    const userPictures = await getUserPictures(userId);
    displayPictureList(userPictures, userGallery);
  }

  if (userLikedPicturesGallery) {
    const userId = userLikedPicturesGallery.getAttribute("data-user-id");
    const userLikedPictures = await getLikedPictures(userId);
    displayPictureList(userLikedPictures, userLikedPicturesGallery);
  }
})