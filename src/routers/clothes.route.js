import { Router } from "express";
import clothesController from "../controllers/clothes.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import {
  createClothesSchema,
  updateClothesSchema,
} from "../schema/clothes.schema.js";

const clothesRouter = Router();

clothesRouter
  .get("/", clothesController.getAllClothes)
  .get("/:id", clothesController.getOneClothes)
  .post(
    "/",
    ValidationMiddleware(createClothesSchema),
    clothesController.createClothes
  )
  .patch(
    "/:id",
    ValidationMiddleware(updateClothesSchema),
    clothesController.updateClothes
  )
  .delete("/:id", clothesController.deleteClothes);

export default clothesRouter;
