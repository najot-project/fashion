import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
    res.render("index");
});

pageRouter.get("/users/login", (req, res) => {
    res.render("login");
});

pageRouter.get("/users/register", (req, res) => {
    res.render("register");
});

export default pageRouter;