import { Controller, Body, Post } from "@nestjs/common";
import { LoginUserInput } from "./dto/login.dto";
import { UserModel } from "src/user/model/user.model";
import { AuthService } from "./auth.service";
import { CreateUserInput } from "src/user/dto/create-user.input";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // start login route
    @Post("login")
    signIn(@Body() loginUserInput: LoginUserInput): Promise<{
        tocken: string;
        user: UserModel;
    }> {
        return this.authService.signIn(loginUserInput);
    }

    // start register route
    @Post("register")
    signUp(@Body() createUserInput: CreateUserInput): Promise<UserModel> {
        return this.authService.signUp(createUserInput);
    }
}
