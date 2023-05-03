import { Module } from "@nestjs/common";
import { UserSeed } from "./user.seed";
import { UserService } from "../user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "../model/user.model";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserModel.name, schema: UserSchema },
        ]),
    ],
    providers: [UserSeed, UserService],
})
export class SeedsModule {}
