import cloudinary from "cloudinary";
import streamifier from "streamifier";
import axios from "axios";

export const uploadGoalImageFromUrl = async ({ imageUrl, goalId }) => {
  if (!imageUrl || !goalId) {
    throw new Error("Missing imageUrl or goalId");
  }

  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  const buffer = Buffer.from(response.data, "binary");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        public_id: `goal_${goalId}`,
        overwrite: true,
        folder: "goals",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
