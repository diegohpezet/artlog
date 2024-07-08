import { getPicture } from "./picturesHandler.js";
import { renderPicture } from "./picturesRender.js";
import { currentUserId } from "./decodeToken.js";

const displaySinglePicture = async (picture, container) => {
  const { id, url, User } = picture;
  const image = await renderPicture({ id, url, user: User }, {
    showUserInfo: true,
    showActions: currentUserId ? true : false,
    showDelete: currentUserId == picture.user ? true : false
  });
  container.appendChild(image);
}

document.addEventListener('DOMContentLoaded', async () => {
  const singlePictureSection = document.getElementById("single-picture-section")
  const pictureId = singlePictureSection.getAttribute("data-picture-id");
  const picture = await getPicture(pictureId);
  console.log(picture)
  await displaySinglePicture(picture, singlePictureSection);
})