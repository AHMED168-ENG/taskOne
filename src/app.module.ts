import { Module } from "@nestjs/common";
import { MongooseConfig } from "./modul.exports/mongoose.module";
import { configrationConfig } from "./modul.exports/configration.module";
import { MulterConfig } from "./modul.exports/multer.module";
import { APP_GUARD } from "@nestjs/core";
import { MailModule } from "./mail/mail.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { RolesGuard } from "./modul.exports/role.guard";
import { UploadFilesModel } from "./upload/upload.module";
import { SeedsModule } from "./user/seeds/module";
import { CommandModule } from "nestjs-command";

@Module({
    imports: [
        configrationConfig,
        MongooseConfig,
        MulterConfig,
        UploadFilesModel,
        MailModule,
        AuthModule,
        UserModule,
        SeedsModule,
        CommandModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}
