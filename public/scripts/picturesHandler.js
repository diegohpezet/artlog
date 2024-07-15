/**
 * Gets all pictures data from database
 * @returns {Array[Object]} A list of picture objects
 */
export async function getAllPictures(category = null) {
  console.log('Category:', category)
  let url = '/api/pictures'
  if (category) url += `?category=${category}`;

  console.log(url)

  const response = await fetch(url);
  const pictures = await response.json();

  return pictures
}

/**
 * Gets data from a single picture
 * @param {Number} pictureId The id of the picture to get
 * @returns {Object} An object describing the picture
 */
export async function getPicture(pictureId) {
  const response = await fetch(`/api/pictures/${pictureId}`);
  const pictureData = await response.json();

  return pictureData
}

/**
 * Gets data from pictures uploaded by a specific user
 * @param {Number} userId The target user's ID
 * @returns {Array[Object]} A list of pictures uploaded by the user
 */
export async function getUserPictures(userId) {
  const response = await fetch(`/api/pictures?user=${userId}`);
  if (!response.ok) {
    console.log("An error has occurred");
  }

  const userPictures = await response.json();
  return userPictures
}

/**
 * Gets liked pictures from a given user.
 * @param {Number} userId The user id to get liked pictures from. 
 * @returns {Array[Object]} Array of liked pictures
 */
export async function getLikedPictures(userId) {
  if (!userId) return;

  const response = await fetch(`/api/pictures/?likedBy=${userId}`, { method: "GET" });
  if (!response.ok) {
    console.error("Something went wrong getting liked pictures!")
  }

  const likedPictures = await response.json()

  return likedPictures
}

/**
 * Uploads a picture to database
 * @returns {Boolean} True if picture could be uploaded. False otherwise
 */
export async function uploadPicture() {
  try {
    const response = await fetch('/api/pictures', {
      method: "POST",
      body: {}
    })

    if (!response.ok) {
      console.log("Error uploading picture!")
      return false;
    }

    const createdPicture = await response.json();
    return true;
  } catch (error) {
    console.log("Error uploading picture!", error)
    return false;
  }
}

/**
 * Deletes a picture from database
 * @param {Number} pictureId The id of the picture to be removed
 * @returns {Boolean} True if picture could be deleted. False otherways
 */
export async function deletePicture(pictureId) {
  const response = await fetch(`/api/pictures/${pictureId}/delete`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    console.log("Could not remove picture");
    return false;
  }

  return true;
}

/**
 * Downloads a picture
 * @param {Number} pictureId The id of the picture to be downloaded 
 * @returns {Boolean} True if picture could be downloaded. False otherways
 */
export async function downloadPicture(pictureId) {
  try {
    const response = await fetch(`/api/pictures/${pictureId}/download`)
    if (!response.ok) {
      console.log("Error downloading picture");
      return false;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `artlog_${pictureId}.png`;

    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return true; // Success
  } catch (error) {
    console.log("Error downloading picture", error);
    return false;
  }

}