import express from "express";
import ImagesController from "../controllers/images";
const router = express.Router();

router.get("/:fileName", async (_req, res) => {
  const controller = new ImagesController();
  try {
    const response = await controller.getImage(_req.params.fileName);
    return res.send(response);
  } catch (error: any) {
    res.status(500).send((error as Error).message);
  }
});

export default router;
