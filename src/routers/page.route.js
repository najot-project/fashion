import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
    res.render("index");
});

pageRouter.get("/users/login", (req, res) => {
    res.render("auth/login", { error: null });
});

pageRouter.get("/users/register", (req, res) => {
    res.render("auth/register", { error: null });
});

pageRouter.get("/users/forgot-password", (req, res) => {
    res.render("auth/forgot-password", { error: null, message: null });
});

pageRouter.get("/users/reset-password", (req, res) => {
    res.render("auth/reset-password", { error: null, message: null, token });
});



export default pageRouter;