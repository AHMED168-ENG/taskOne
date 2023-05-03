import { Roles } from "src/modul.exports/Roles";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import {
    Post,
    Controller,
    UseInterceptors,
    UploadedFile,
} from "@nestjs/common";
import { Role } from "src/modul.exports/roles.decorator";
@Controller("upload")
export class UploadFiles {
    // ===================== start upload file (only admin access this route) ======
    @Role(Roles.User)
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./assets",
                filename: (req, file, done) => {
                    const name = file.originalname.split(".")[0];
                    const fileExtName = extname(file.originalname);
                    const randomName = Array(4)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join("");
                    done(null, `${name}-${randomName}${fileExtName}`);
                },
            }),
            fileFilter: (req, file, done) => {
                if (!file) {
                    throw new Error("الصوره غير موجوده");
                }
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return done(
                        new Error("Only image files are allowed!"),
                        false
                    );
                }
                return done(null, true);
            },
        })
    )
    @Post("single")
    uploadFile(@UploadedFile() file): Promise<string> {
        return file ? file.path : "";
    }
    // ===================== end upload file (only admin access this route) ======
}
