import { addHall } from "../queries/hallQuery.mjs";
import { deleteHall } from "../queries/hallQuery.mjs";

export const addHallCtrl = async (req, res) => {
  const hallData = req.body;
  try {
    const result = await addHall(hallData);
    return res.status(201).json({
      message: "Hall added successfully.",
      data: result,
    });
  } catch (error) {
    if (error.message.includes("The following required fields are missing")) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message.includes("A hall with this name already exists")) {
      return res.status(409).json({ error: error.message });
    }

    console.error("Unexpected Error in addHallCtrl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteHallCtrl = async (req, res) => {
  const { hallId } = req.params;

  try {
    const result = await deleteHall(hallId);
    return res.status(200).json({
      message: "Hall deleted successfully.",
      data: result,
    });
  } catch (error) {
    if (error.message.includes("Hall not found")) {
      return res.status(404).json({ error: error.message });
    }
    console.error("Unexpected Error in deleteHallCtrl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
