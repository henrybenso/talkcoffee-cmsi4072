import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async ([imagePaths]) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    };

    try {
      // Upload the image
      for (const imagePath in imagePaths) {
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result.public_id);
      }
      return result;
    } catch (error) {
      console.error(error);
    }
};

// export function uploadImage([uploadedImages]) {
//   for (const image in uploadedImages) {
//     const result = await cloudinary.uploader.upload(image, {
//       width: 400,
//       height: 300,
//       crop: "fill",
//     });
//     console.log(result.secure_url);
//   }
  // return new Promise((resolve, reject) => {
  //   uploadedFiles.map((image) => {
  //     cloudinary.uploader.upload(
  //       image,
  //       { width: 400, height: 300, crop: "fill" },
  //       (err, res) => {
  //         if (err) reject(err);
  //         resolve(res);
  //       }
  //     );
  //   });
  // });
// }
