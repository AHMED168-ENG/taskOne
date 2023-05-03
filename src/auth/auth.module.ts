import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "src/user/model/user.model";
import { UserService } from "src/user/user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserModel.name, schema: UserSchema },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
})
export class AuthModule {}
