import { Router } from "express";
import clothesController from "../controllers/clothes.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import {
  createClothesSchema,
  updateClothesSchema,
} from "../schema/clothes.schema.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { Protected } from "../middleware/protected.middleware.js";
import { Roles } from "../middleware/roles.middleware.js";
import { ROLES } from "../constants/role.constants.js";

const clothesRouter = Router();

clothesRouter
  .get("/", 
    Protected(false),
    Roles(ROLES.ALL), 
    clothesController.getAllClothes
  )
  .get("/:id", 
    Protected(false),
    Roles(ROLES.ALL), 
    clothesController.getOneClothes
  )
  .post(
    "/",
    Protected(true),
    authenticate,
    Roles(ROLES.ALL),
    ValidationMiddleware(createClothesSchema),
    clothesController.createClothes
  )
  .patch(
    "/:id",
    Protected(true),
    authenticate,
    Roles(ROLES.STORE_OWNER, ROLES.SUPER_ADMIN),
    ValidationMiddleware(updateClothesSchema),
    clothesController.updateClothes
  )
  .delete(
    "/:id",
    Protected(true),
    Roles(ROLES.STORE_OWNER, ROLES.SUPER_ADMIN),
    authenticate,
    clothesController.deleteClothes
  );

export default clothesRouter;
