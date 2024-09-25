import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { isAuthenticated, generateJWT } from "../utils/authMiddleware.js";

const prisma = new PrismaClient();
const router = Router();

// Register route (hash and store password)
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, company, password } = req.body;

  try {
    // Check if user already exists by email
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return res.status(400).send({ message: "Email is already registered" });
    }

    // Generate salt and hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create and store the new user in Prisma database
    const newUser = await prisma.user.create({
      data: {
        firstName: firstname,
        lastName: lastname,
        email: email,
        company: company,
        passwordHash: passwordHash,
        salt: salt,
      },
    });

    res.send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error registering user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).send({ message: "Incorrect email." });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Incorrect password." });
    }

    // Generate JWT token
    const token = generateJWT(user.id);

    // Set JWT as an HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days expiration
      sameSite: "none",
    });

    res.send({ message: "Logged in successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging in" });
  }
});

// Protected route: Check JWT
router.get("/check", isAuthenticated, (req, res) => {
  res.send({ isAuthenticated: true, user: req.user });
});

// Logout route: Clears the JWT cookie
router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.send({ message: "Logged out successfully" });
});

export default router;
