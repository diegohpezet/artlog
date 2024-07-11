import { checkIsFollowed, getFollowers, getFollowingUsers, toggleFollow } from "./followHandler.js"
import { getUserPictures } from "./picturesHandler.js";

/**
 * Gets user follower, following and post count
 * @param {Number} userId The id of the user to extract data from
 * @returns {Object} An object containing following, followers and post amount
 */
const getSocialStats = async (userId) => {
  const followers = await getFollowers(userId);
  const following = await getFollowingUsers(userId);
  const posts = await getUserPictures(userId);

  const socialStats = {
    followers: followers.length,
    following: following.length,
    posts: posts.length
  }
  return socialStats;
}

const renderFollowBtn = async (userId) => {
  const followBtn = document.createElement('button');
  followBtn.classList.add('btn', 'mx-2');

  const isFollowed = await checkIsFollowed(userId);
  if (isFollowed) {
    followBtn.classList.add('btn-light');
    followBtn.innerText = "Following";
  } else {
    followBtn.classList.add('btn-primary');
    followBtn.innerHTML = "<i class='bi bi-plus-lg'></i> Follow"
  }

  followBtn.addEventListener('click', async () => {
    // Toggle btn color
    followBtn.classList.toggle('btn-light');
    followBtn.classList.toggle('btn-primary');
         
    const followersCount = document.getElementById("followers-count")
    if (followBtn.innerText == "Following") {
      followBtn.innerHTML = "<i class='bi bi-plus-lg'></i> Follow";
      followersCount.innerText = parseInt(followersCount.innerText) - 1
    } else {
      followBtn.innerText = "Following";
      followersCount.innerText = parseInt(followersCount.innerText) + 1
      Toastify({
        text: "You are now following this user!",
        duration: 2000,
        className: "success",
        gravity: "bottom"
      }).showToast();
    }

    await toggleFollow(userId);
  })

  return followBtn;
}

const renderShareBtn = (userId) => {
  const shareBtn = document.createElement('button');
  shareBtn.classList.add('btn', 'btn-light', 'mx-2');
  shareBtn.innerHTML = "<i class='bi bi-paperclip'></i> Share"

  shareBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(`http://localhost:3000/users/${userId}`)
    Toastify({
      text: "Profile copied to clipboard!",
      duration: 2000,
      className: "info",
      gravity: "bottom"
    }).showToast();
  })

  return shareBtn;
}

document.addEventListener('DOMContentLoaded', async () => {
  const userId = document.getElementById("user-section").getAttribute('data-user');

  // Display social stats
  const followersCount = document.getElementById("followers-count");
  const followingCount = document.getElementById("following-count");
  const postsCount = document.getElementById("posts-count");

  const userStats = await getSocialStats(userId);

  followersCount.innerText = userStats.followers;
  followingCount.innerText = userStats.following;
  postsCount.innerText = userStats.posts;

  // Social buttons building
  const socialBtnContainer = document.getElementById("socialActions");
  socialBtnContainer.append(await renderFollowBtn(userId));
  socialBtnContainer.append(renderShareBtn(userId));
})

