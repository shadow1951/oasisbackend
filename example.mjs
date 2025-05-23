import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());

// Example route with validation
app.post(
  "/api/example",
  [
    body("name").isString().withMessage("Name must be a string"),
    body("surname").isString().withMessage("Surname must be a string"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("age").isInt({ min: 0 }).withMessage("Age must be a positive integer"),
    body("phone").isMobilePhone().withMessage("Phone number must be valid"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, age, phone } = req.body;
    res.json({
      message: "Request is valid",
      data: { name, surname, email, age, phone },
    });
  }
);

// Example GET route
app.get("/api/example", (req, res) => {
  res.json({ message: "This is an example GET request" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
