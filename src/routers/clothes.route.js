import { Router } from "express";
import clothesController from "../controllers/clothes.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createClothesSchema, updateClothesSchema } from "../schema/clothes.schema.js";
import { authenticate } from "../middleware/auth.middleware.js";

const clothesRouter = Router();

clothesRouter
  .get("/", clothesController.getAllClothes)
  .get("/:id", clothesController.getOneClothes)
  .post(
    "/",
    authenticate, 
    ValidationMiddleware(createClothesSchema),
    clothesController.createClothes
  )
  .patch(
    "/:id",
    authenticate, 
    ValidationMiddleware(updateClothesSchema),
    clothesController.updateClothes
  )
  .delete("/:id", authenticate, clothesController.deleteClothes); 

export default clothesRouter;
