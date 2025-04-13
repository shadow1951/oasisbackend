import jwt from "jsonwebtoken";

const jwtVerify = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !decoded.id ||
      !decoded.email
    ) {
      return res
        .status(400)
        .json({ message: "Token data is invalid or manipulated" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default jwtVerify;
