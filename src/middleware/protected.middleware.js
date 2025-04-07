import { ACCESS_TOKEN_SECRET } from "../config/jwt.config.js";
import { BaseException } from "../exception/base.exception.js";
import jwt from "jsonwebtoken";

export const Protected = (isProtected) => {
    return (req, _, next) => {
        if(!isProtected){
            req.role = "VIEWER";
           return next();
        }
        const token = req.headers["authorization"]; // brackets notation | dot notation

        if(!token || token.includes("Bearer ") || token.split(" ")[1]) {
            next(new BaseException("Please provide a bearer token",400))
        }
        const accessToken = token.split(" ")[1];

        try {
            const decodeData = jwt.verify(accessToken,ACCESS_TOKEN_SECRET)

            req.role = decodeData.role;
            req.user = decodeData.user;

            next();
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                next(new BaseException("Token expired",406))
            }else if (error instanceof jwt.JsonWebTokenError){
                next(new BaseException("Invalid token",400))
            }else if (error instanceof jwt.NotBeforeError){
                next(new BaseException("Not before Error",409))
            }else {
                next(error)
            }
        }
    }

}