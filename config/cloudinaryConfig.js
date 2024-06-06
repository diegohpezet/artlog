const cloudinary = require('cloudinary').v2

// Cloudinary set-up
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// Cloudinary Image Upload
const cloudinaryUpload = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      folder: "artlog/pictures",
      format: "webp",
    })
    return data
  } catch (error) {
    console.log(error)
    throw new Error(`Internal server error(cloudinary): ${error}`)
  }
}

// Cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (cloudinary)");
  }
};

module.exports = {
  cloudinaryUpload,
  cloudinaryRemoveImage
}