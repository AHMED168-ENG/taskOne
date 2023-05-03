import { Command } from "nestjs-command";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";
import { Roles } from "src/modul.exports/Roles";
@Injectable()
export class UserSeed {
    constructor(private readonly userService: UserService) {}

    @Command({
        command: "create:user",
        describe: "create a user",
    })
    async create() {
        const user = await this.userService.create({
            name: "ahmed Reda",
            email: "ahmed12@ahmed.com",
            password: "01024756410ahmed",
            roles: [Roles.Admin, Roles.User],
        });
        return user;
    }
}
