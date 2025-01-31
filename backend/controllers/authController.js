import User2 from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../mailer.js";

dotenv.config();

// Register User
export const registerUser = async (req, res) => {
  const { username, role, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User2.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //Hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user

    const newUser = await User2.create({
      username,
      role,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, type: "verification" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    //send verification email

    sendVerificationEmail(email, token);

    return res.status(201).json({
      message: "User registered. Verification email sent.",
    });
  } catch (error) {
    console.error("Error occurred in registerUser:", error.message); // Log the error
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== "verification") {
      return res.status(400).json({
        message: "Invalid token type",
      });
    }
    const userId = decoded.id;

    //update the user's verification status

    const user = await User2.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find the user by username
    const user = await User2.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // check if the user is verified

    // check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token with userId included
    const token = jwt.sign(
      { userId: user._id, type: "auth", isLogged: true },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      token,
      username: user.username,
    });
  } catch (error) {
    console.log(error.message); // Log the error
    res.status(500).send({ message: error.message });
  }
};
