import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import { VolidationMiddleware } from "../middleware/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../schema/category.schema.js";


const categoryRouter = Router()

categoryRouter
.get("/",categoryController.getAllCategories)
.post("/", VolidationMiddleware(createCategorySchema), categoryController.createCategory)
.get("/:id", categoryController.getCategorybyId)
.put("/:id", VolidationMiddleware(updateCategorySchema), categoryController.updateCategory)
.delete("/:id", categoryController.deleteCategory)


export default categoryRouter;