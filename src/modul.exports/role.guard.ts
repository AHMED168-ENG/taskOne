import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from "jsonwebtoken";
import { Roles } from "./Roles";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            throw new ForbiddenException();
        }
        const tocken = request.headers.authorization.split(" ")[1];
        const { roles }: any = jwt.verify(tocken, process.env.SECRET_KEY);
        if (requiredRoles.some((role) => roles?.includes(role))) {
            return true;
        } else {
            throw new ForbiddenException();
        }
    }
}
