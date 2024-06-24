import { currentUserId } from "./decodeToken.js";
import { createCard } from "./createCard.js";

const picturesPane = document.getElementById("user-pictures");
const likedPicturesPane = document.getElementById("user-liked-pictures");

const getPictures = async () => {
  const userId = picturesPane.getAttribute("data-user-id");
  const response = await fetch(`/users/${userId}/pictures`);
  if (!response.ok) {
    console.log("An error has occurred");
  }

  const data = await response.json();
  if (data.length < 1) {
    picturesPane.innerHTML = "This user hasn't uploaded any pictures yet.";
  } else {
    picturesPane.innerHTML = "";
    data.forEach(picture => {
      createCard(picture, picturesPane, {showUserInfo: false, showSocialActions: currentUserId ? true : false})
    });
  }
  
}

const getLikedPictures = async () => {
  const userId = likedPicturesPane.getAttribute("data-user-id");
  const response = await fetch(`/users/${userId}/pictures/liked`);
  if (!response.ok) {
    console.log("An error has ocurred");
  }

  const data = await response.json();
  if (data.length < 1) {
    likedPicturesPane.innerHTML = "This user hasn't liked any pictures yet.";
  } else {
    likedPicturesPane.innerHTML = ""
    data.forEach(picture => {
      console.log(picture)
      createCard(picture.Picture, likedPicturesPane, {showUserInfo: true, showSocialActions: currentUserId ? true : false})
    })
  }
}

getLikedPictures()
getPictures()