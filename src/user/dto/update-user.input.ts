import {
    IsEmail,
    IsOptional,
    IsString,
    Length,
    Max,
    Min,
} from "class-validator";

export class UpdateUserInput {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: "this filed accept email only" })
    email?: string;

    @IsOptional()
    age?: number;

    @IsOptional()
    @Length(10, 250)
    addres?: string;
}
