import User from "../model/user..js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Name, email,phone, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "user",
    });

    const savedUser = await user.save();
    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "vehicalfleet",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gettoken = (req, res) => {
  try {
    const token = jwt.sign(
      { userId: req?.user._id, email: req?.user.email, role: req?.user.role },
      process.env.JWT_SECRET || "vehicalfleet",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      status: 200,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
