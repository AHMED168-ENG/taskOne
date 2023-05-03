import { Module } from "@nestjs/common";
import { UploadFiles } from "./uploadFile.controller";

@Module({
    controllers: [UploadFiles],
})
export class UploadFilesModel {}
