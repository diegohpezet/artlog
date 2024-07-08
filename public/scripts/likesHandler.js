import { currentUserId } from "./decodeToken.js";
import { getLikedPictures } from "./picturesHandler.js";

/**
 * Tells whether a user had liked a picture or not
 * @param {Number} pictureId The picture to evaluate whether it is liked or not
 * @returns {Boolean} True if user liked picture. False otherways
 */
export async function checkIsLIked(pictureId) {
  if (!currentUserId) return;

  const likedPicturesList = await getLikedPictures(currentUserId);
  const isLiked = likedPicturesList.some(el => el.id === pictureId)

  return isLiked
}

/**
 * Access database to like/unlike a picture
 * @param {Number} pictureId Id of the picture to be liked  
 * @returns {Boolean} True if like request was executed correctly. False otherways
 */
export async function toggleLike(pictureId) {
  try {
    if (!currentUserId) return false;

    const isLiked = await checkIsLIked(pictureId);

    const response = await fetch(`/api/likes?picture=${pictureId}`, {
      method: isLiked ? "DELETE" : "POST"
    });

    if (!response.ok) {
      console.log("Error sending like request!")
      return false
    }

    return true;
  } catch (error) {
    console.error("Error sending like request!")
    return false;
  }
}