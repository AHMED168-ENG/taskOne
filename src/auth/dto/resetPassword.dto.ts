import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordInput {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
