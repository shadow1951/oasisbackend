import users from "./model/users.mjs";
const User = users;
export const addDummyUser = async (req, res, next) => {
  try {
    const dummyUser = new User({
      username: "testuser",
      email: "test@example.com",
      phoneNumber: "1234567890",
      password: "dummyPassword123", // hash it if needed
      role: "ViceChancellor", // ✅ changed to valid role
    });

    const savedUser = await dummyUser.save();
    res.status(201).json({ message: "Dummy user added", user: savedUser });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error adding dummy user", error: err.message });
  }
};
