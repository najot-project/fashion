import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
    res.render("index");
});

pageRouter.get("/categories", (req, res) => {
    res.render("categories/index")
});

pageRouter.get("/categories/show", (req, res) => {
    res.render("categories/show")
});

pageRouter.get("/categories/create", (req, res) => {
    res.render("categories/create")
});

pageRouter.get("/categories/edit", (req, res) => {
    res.render("categories/edit")
});

export default pageRouter;