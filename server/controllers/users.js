import bcrypt from "bcrypt";
import  User  from "../models/User.js"; 
import { v2 as cloudinary } from 'cloudinary';
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found"});
    res.json({message: "User retrieved successfully",user});
  } catch(err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updates = req.sanitizedBody;
    if(updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
    }).select("-password");

    if(!updateUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete image from Cloudinary if it exists
    if (user.profilePicture && user.profilePicture.public_id) {
      await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }

    // Delete the user from DB
    await User.findByIdAndDelete(req.userId);

    res.clearCookie("token");
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const username = user.username || "default";
    
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            public_id: `profile_${username}`,
            overwrite: true,
            folder: "profiles",
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

    let result;
    try {
      result = await streamUpload(req.file.buffer);
    } catch (cloudErr) {
      return res.status(500).json({ error: "Failed to upload profile picture to Cloudinary" });
    }

    user.profilePicture = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};


export const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const publicId = user.profilePicture?.public_id;

    if (!publicId) {
      return res.status(400).json({ message: 'No profile picture to delete' });
    }

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      return res.status(500).json({ message: 'Failed to delete image from Cloudinary' });
    }

    // Clear profilePicture field
    user.profilePicture = {}  ;
    await user.save();

    res.json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    res.status(500).json({ message: 'Server error' });
  }
};