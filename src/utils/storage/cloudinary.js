const cloudinary = require('cloudinary').v2;

class Cloudinary {
  constructor() {
    this.config();
  }

  config = async () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  };

  uploadImageToCloudinary = async (file, folderName) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            use_filename: true,
            unique_filename: true,
            folder: `blog-${process.env.NODE_ENV}/${folderName}`,
          },
          (error, result) => {
            if (error) {
              return reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(file.buffer);
    });
  };

  uploadImagesToCloudinary = async (files, folderName) => {
    const urls = [];
    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              use_filename: true,
              unique_filename: true,
              folder: `blog-${process.env.NODE_ENV}/${folderName}`,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(file.buffer);
      });
      urls.push(result.secure_url);
    }
    return urls;
  };

  uploadBase64 = async (payloadString) => {
    try {
      const { mime } = await fromBuffer(
        Buffer.from(payloadString.replace(/.*base64,/, ''), 'base64')
      );
      payloadString = payloadString.startsWith('data:')
        ? payloadString
        : `data:${mime};base64,${payloadString}`;

      const upload = await cloudinary.uploader.upload(payloadString);
      return { url: upload.secure_url, mime };
    } catch (error) {
      return false;
    }
  };
}

exports.cloudinary = new Cloudinary();
