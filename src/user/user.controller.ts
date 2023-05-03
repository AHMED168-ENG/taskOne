import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import {
    Post,
    Controller,
    Body,
    Get,
    Param,
    Put,
    Delete,
} from "@nestjs/common";
import { Role } from "src/modul.exports/roles.decorator";
import { Roles } from "src/modul.exports/Roles";
import { UserModel } from "./model/user.model";

import { GetUser } from "src/modul.exports/getUser.decorator";

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    // ===================== start create user (only user authonticat access (admin) this route)======
    @Role(Roles.Admin)
    @Post("")
    createUser(@Body() createUserInput: CreateUserInput): Promise<UserModel> {
        return this.userService.create(createUserInput);
    }
    // ===================== end create user (only user authonticat access (admin) this route)======

    // ===================== start get all users (only user authonticat access this route)======
    @Role(Roles.User)
    @Get("/")
    findAll(): Promise<UserModel[]> {
        return this.userService.findAll();
    }
    // ===================== end get all users (only user authonticat access this route)======

    // ===================== start find user by email   ==========================
    @Role(Roles.User)
    @Get("find-by-email")
    findOneByEmail(@Body("email") email: string): Promise<UserModel> {
        return this.userService.findOneByEmail(email);
    }
    // ===================== end find user by email   ==========================

    // ===================== start find user   ==========================
    @Role(Roles.User)
    @Get("/:id")
    findOne(@Param("id") id: string, @GetUser() userData): Promise<UserModel> {
        return this.userService.findOne(id, userData);
    }
    // ===================== start find user   ==========================

    // ===================== start update user route by id   ==========================
    @Role(Roles.User)
    @Put("/:id")
    updateUser(
        @Param("id") id: string,
        @Body() updateUserInput: UpdateUserInput,
        @GetUser() userData
    ): Promise<boolean> {
        return this.userService.update(id, updateUserInput, userData);
    }
    // ===================== end update user route by id   ==========================

    // ===================== start delete user route by id   ==========================
    @Role(Roles.User)
    @Delete("/:id")
    removeUser(@Param("id") id: string, @GetUser() userData): Promise<boolean> {
        return this.userService.delete(id, userData);
    }

    // ===================== start active user with a gmail message  ==========================
    @Get("activeAcount/:id")
    activeUser(@Param("id") id: string): Promise<{
        tocken: string;
        user: UserModel;
    }> {
        return this.userService.activeAcount(id);
    }
    // ===================== end active user with a gmail message  ==========================

    // ===================== start active user with a admin   ==========================
    @Role(Roles.Admin)
    @Put("active-user/:id")
    activation(@Param("id") id: string): Promise<UserModel> {
        return this.userService.activeUser(id);
    }
    // ===================== end active user with a admin   ==========================
}
