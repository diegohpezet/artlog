import { currentUserId } from "./decodeToken.js";
import { createCard } from "./createCard.js";

const gallery = document.getElementById("gallery");

const getPictures = () => {
  fetch('/api/pictures')
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
        createCard({ 
          id: picture.id, 
          url: picture.url, 
          user: picture.User, 
          isLiked 
        }, gallery, { 
          showUserInfo: true,
          showSocialActions: currentUserId ? true : false
        });
      });
    })
};

getPictures()