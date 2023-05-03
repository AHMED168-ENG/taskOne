import {
    IsString,
    Length,
    IsEmail,
    IsNotEmpty,
    IsAlphanumeric,
    IsOptional,
} from "class-validator";

export class CreateUserInput {
    @IsNotEmpty()
    @IsString()
    @Length(5, 25)
    name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "this filed accept email only" })
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(10, 25)
    password: string;

    @IsOptional()
    roles?: string[];
}
