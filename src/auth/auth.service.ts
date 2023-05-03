import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";
import * as jwt from "jsonwebtoken";
import { MailService } from "src/mail/mail.service";
import { LoginUserInput } from "./dto/login.dto";
import { CreateUserInput } from "src/user/dto/create-user.input";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private mailservice: MailService
    ) {}
    /*============================ start login function  ============================*/
    async signIn(loginUserInput: LoginUserInput) {
        try {
            const user = await this.userService.findOneByEmail(
                loginUserInput.email
            );
            if (user) {
                if (user.active != true)
                    throw new HttpException(
                        "this email not active go to your gmail and active him",
                        HttpStatus.FORBIDDEN
                    );
                const isAuth = bcrypt.compareSync(
                    loginUserInput.password,
                    user.password
                );
                if (isAuth) {
                    const tocken = await jwt.sign(
                        { id: user.id, roles: user.roles },
                        process.env.SECRET_KEY,
                        loginUserInput.expired
                            ? {}
                            : { expiresIn: process.env.EXPIREDIN }
                    );
                    return {
                        tocken,
                        user,
                    };
                } else {
                    throw new HttpException(
                        "this password not correct",
                        HttpStatus.UNAUTHORIZED
                    );
                }
            } else {
                throw new HttpException(
                    "this email not registed",
                    HttpStatus.UNAUTHORIZED
                );
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    /*============================ end login function  ============================*/

    /*============================ start register function  /*============================*/

    async signUp(createUserInput: CreateUserInput) {
        try {
            const text = `hi ${createUserInput.name} welcome hir in our comunity we send this email to mack you active your account and for security else`;

            return this.userService
                .create(createUserInput)
                .then(async (result) => {
                    await this.mailservice.main({
                        email: result.email,
                        supject: "Confirmation Message",
                        text: text,
                        htmlMessage: `<h2>${result.email}</h2><p>${text}</p><a style="padding:4px 10px;color:#fff;background:#555" href="http://localhost:3000/users/activeAcount/${result.id}">Active Account</a>`,
                    });
                    return result;
                });
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    /*============================ end register function  ============================*/
}
