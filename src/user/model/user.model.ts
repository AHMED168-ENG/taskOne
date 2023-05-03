import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Roles } from "src/modul.exports/Roles";

// export type UserDocument = HydratedDocument<User>;

@Schema()
export class UserModel {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    image: string;

    @Prop({ default: [Roles.User] })
    roles: [string];

    @Prop({ default: false })
    active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
