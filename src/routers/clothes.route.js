import { Router } from "express";
import clothesController from "../controllers/clothes.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createClothesSchema, updateClothesSchema } from "../schema/clothes.schema.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { Protected } from "../middleware/protected.middleware.js";

const clothesRouter = Router();

clothesRouter
  .get("/", Protected(false), clothesController.getAllClothes)
  .get("/:id", Protected(false), clothesController.getOneClothes)
  .post(
    "/", 
    Protected(true),
    authenticate, 
    ValidationMiddleware(createClothesSchema),
    clothesController.createClothes
  )
  .patch(
    "/:id",
    Protected(true),
    authenticate, 
    ValidationMiddleware(updateClothesSchema),
    clothesController.updateClothes
  )
  .delete("/:id", Protected(true), authenticate, clothesController.deleteClothes); 

export default clothesRouter;
