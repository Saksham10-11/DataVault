import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const router = Router();
const prisma = new PrismaClient();

const SECRET = process.env.SECRET;

router.post("/", async (req, res) => {
  try {
    const token = req.cookies.jwt; // Get JWT from cookies
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.id; // Extract the user ID from the token

    const { title, description, data } = req.body; // Extract form and field data from request body
    // Create new form in the database
    const newForm = await prisma.form.create({
      data: {
        title,
        description,
        createdBy: userId, // Use the userId from the JWT token
      },
    });

    // Insert fields into the FormField table
    const newFields = await prisma.formField.createMany({
      data: data.map((field) => ({
        formId: newForm.id,
        fieldName: field.value,
        fieldType: field.type,
        required: field.required,
        options: field.options || null, // Handle optional fields
      })),
    });

    // Respond with success message
    res.status(201).json({
      message: "Form and fields created successfully",
      form: newForm,
      fields: newFields,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating form or fields", error });
  }
});

// Route to fetch all forms with user info
router.get("/all", async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Map the response to include user full name
    const response = forms.map((form) => ({
      id: form.id,
      title: form.title,
      description: form.description,
      createdAt: form.createdAt,
      createdBy: `${form.user.firstName} ${form.user.lastName}`,
    }));

    res.json(response);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred while fetching forms" });
  }
});

export default router;
