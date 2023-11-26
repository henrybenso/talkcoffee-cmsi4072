const cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});

// export function uploadImage(imageUploaded) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       imageUploaded,
//       { width: 400, height: 300, crop: "fill" },
//       (err, res) => {
//         if (err) reject(err);
//         resolve(res);
//       }
//     );
//   });
// }

export async function uploadImage(imageUploaded) {
  // const byteArrayBuffer = fs.readFileSync(imageUploaded)
  const uploadResult = await new Promise((resolve) => {
    cloudinary.v2.upload_stream({folder: "avatar"}, function(error, uploadResult) {
      return resolve(uploadResult);
      console.log(error, result)
    })

    streamifier.createReadStream(req.file.buffer).pipe(uploadResult)
})}



// let cld_upload_stream = cloudinary.uploader.upload_stream(
//     {
//       folder: "foo"
//     },
//     function(error, result) {
//         console.log(error, result);
//     }
// );

// streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);

