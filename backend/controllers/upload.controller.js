const cloudinary = require('cloudinary');
const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = asyncHandler(async (req, res, next) => {
  const { path } = req.body;
  let files = Object.values(req.files).flat();
  let images = [];
  for (const file of files) {
    const url = await uploadToCloudinary(file, path);
    images.push(url);
    removeTmp(file.tempFilePath);
  }
  res.json(images);
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: 'Upload image failed.' });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};
