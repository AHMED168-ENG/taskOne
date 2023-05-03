import { UpdateUserInput } from "./dto/update-user.input";
import { CreateUserInput } from "./dto/create-user.input";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Model } from "mongoose";
import { UserModel } from "./model/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Roles } from "src/modul.exports/Roles";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private user: Model<UserModel>) {}

    // ======================== start create user ===============
    async create(createUserInput: CreateUserInput) {
        try {
            const user = await this.findOneByEmail(createUserInput.email);
            if (user)
                throw new HttpException(
                    "this email is registed",
                    HttpStatus.FORBIDDEN
                );

            let count = 0;
            const password: any = createUserInput.password;
            for (let x = 0; x < password.length; x++) {
                if (isNaN(password[x])) {
                    count++;
                }
            }

            if (count < 4) {
                throw new HttpException(
                    "your password should contains minimum 4 character",
                    HttpStatus.FORBIDDEN
                );
            }

            const hashPassword = bcrypt.hashSync(
                password,
                parseInt(process.env.SALAT)
            );
            createUserInput.password = hashPassword;
            return await this.user.create(createUserInput);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    // ======================== end create user ===============

    // ======================== start find All users ===============
    async findAll() {
        try {
            return await this.user.find();
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    // ======================== end find All users ===============

    // ======================== start find user ===============

    async findOne(id: string, userData) {
        try {
            const userId: string = userData.roles.includes(Roles.Admin)
                ? id
                : userData.id;

            const user = await this.user.findOne({
                _id: userId,
            });

            return user;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    // ======================== end find user ===============

    // ======================== start find user by email ===============
    async findOneByEmail(email: string, id?: string) {
        try {
            const user = await this.user.findOne({
                email: email,
                _id: { $ne: id ? id : null },
            });
            // console.log(id);
            return user;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    // ======================== end find user by email =================

    // ======================== start update user by id ===============
    async update(id: string, updateUserInput: UpdateUserInput, userData) {
        try {
            const userId: string = userData.roles.includes(Roles.Admin)
                ? id
                : userData.id;
            //======== check if email registed ========
            if (updateUserInput.email) {
                const userWithEmail = await this.findOneByEmail(
                    updateUserInput.email,
                    userId
                );
                //======== if email registed send error message ========
                if (userWithEmail) {
                    throw new HttpException(
                        "this email is registed",
                        HttpStatus.FORBIDDEN
                    );
                }
            }

            await this.user.updateOne(
                {
                    _id: userId,
                },
                { $set: updateUserInput }
            );
            return true;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    // ======================== end update user by id ===============

    // ======================== start delete user by id ===============
    async delete(id: string, userData) {
        try {
            const userId: string = userData.roles.includes(Roles.Admin)
                ? id
                : userData.id;
            await this.user.deleteOne({
                _id: userId,
            });
            return true;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    // ======================== end delete user by id ===============

    // ======================== start active user by id ===============
    async activeAcount(id: string) {
        try {
            const user = await this.user.findOneAndUpdate(
                {
                    _id: id,
                },
                { $set: { active: true } }
            );

            const tocken = await jwt.sign(
                { userId: id },
                process.env.SECRET_KEY,
                {
                    expiresIn: process.env.EXPIREDIN,
                }
            );
            return {
                tocken,
                user,
            };
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    // ======================== end active user by id ===============

    // ======================== start active user by id ===============
    async activeUser(id: string) {
        try {
            const user = await this.user.findOneAndUpdate(
                {
                    _id: id,
                },
                { $set: { active: true } }
            );

            return user;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    // ======================== end active user by id ===============
}
