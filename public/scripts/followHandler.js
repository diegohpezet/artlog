import { currentUserId } from "./decodeToken.js";

/**
 * Gets a list of users that are following a specific user
 * @param {Number} userId User ID
 * @returns {Array[Object]} A list of followers of the current user 
 */
export async function getFollowers(userId) {
  try {
    const response = await fetch(`/api/follow/${userId}/followers`);
    if (!response.ok) {
      console.error("Something went wrong getting followers!")
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting followers");
  }
}

/**
 * Gets a list of users that are being followed by a specific user
 * @param {Number} userId User ID 
 * @returns {Array[Object]} A list of accounts the user follows
 */
export async function getFollowingUsers(userId) {
  try {
    const response = await fetch(`/api/follow/${userId}/following`);
    if (!response.ok) {
      console.error("Something went wrong followed accounts!")
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error getting followed accounts");
  }
}

/**
 * Checks if current user is following a specific user
 * @param {Number} userId The user ID to check if is being followed
 * @returns {Boolean} True if user follows the account. False otherways
 */
export async function checkIsFollowed(userId) {
  try {
    if (!currentUserId) return false;

    const followersList = await getFollowers(userId);
    const isFollowed = followersList.some(user => (user.FollowerUser.id == currentUserId));

    return isFollowed;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Follows / unfollows some given user
 * @param {Number} userId The ID of the user to follow / unfollow 
 * @returns {Boolean} True if user could be followed / unfollowed. False otherwise
 */
export async function toggleFollow(userId) {
  if (!currentUserId) {
    console.log("No current user ID");
    return false;
  }

  try {
    const isFollowed = await checkIsFollowed(userId);
    const response = await fetch(`/api/follow/${userId}`, {
      method: isFollowed ? "DELETE" : "POST"
    });

    if (!response.ok) {
      console.log("Something went wrong when trying to follow/unfollow a user");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in toggleFollow:", error);
    return false;
  }
}
