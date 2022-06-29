import {Controller, Get, Logger, Param, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {

}
