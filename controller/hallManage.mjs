import { Hall } from "../model/hall.mjs";

export const addHallCtrl = async (req, res) => {
  const hallData = req.body;

  if (!hallData || Object.keys(hallData).length === 0) {
    return res.status(400).json({ error: "Missing Data field" });
  }

  try {
    const result = await addHall(hallData);
    return res
      .status(201)
      .json({ message: "Hall added successfully", data: result });
  } catch (error) {
    if (error.message.includes("The following required fields are missing")) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message.includes("Hall with this name already exists.")) {
      return res.status(409).json({ error: error.message });
    }
    console.error("Unexpected Error in addHallCtrl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
