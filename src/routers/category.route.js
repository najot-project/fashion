import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../schema/category.schema.js";
import { Protected } from "../middleware/protected.middleware.js";


const categoryRouter = Router()

categoryRouter
.get("/", Protected(false), categoryController.getAllCategories)
.post("/", Protected(true), ValidationMiddleware(createCategorySchema), categoryController.createCategory)
.get("/:id", Protected(false), categoryController.getCategorybyId)
.put("/:id", Protected(true), ValidationMiddleware(updateCategorySchema), categoryController.updateCategory)
.delete("/:id", Protected(true), categoryController.deleteCategory)


export default categoryRouter;