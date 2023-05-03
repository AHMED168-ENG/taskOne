import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.headers.authorization) return null;
        const tocken = request.headers.authorization.split(" ")[1];
        const user: any = jwt.verify(tocken, process.env.SECRET_KEY);
        console.log(user);
        return user;
    }
);
