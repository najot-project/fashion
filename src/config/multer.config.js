import multer from "multer";
import { join } from "node:path";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,join(process.cwd(),"uploads"))
    },
    filename: (req, file, cb) => {
        cb(null,file.fieldname+"-"+Date.now()+`.${file.mimetype.split("/"[1])}`)
    }
})

export const upload = multer({ storage })