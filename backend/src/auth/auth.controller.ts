
import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; companyName: string }) {
    const { email, password, companyName } = body;

    if (!email || !password || !companyName) {
      throw new UnauthorizedException('Tous les champs sont requis');
    }

    if (password.length < 6) {
      throw new UnauthorizedException('Le mot de passe doit contenir au moins 6 caractères');
    }

    return this.authService.register(email, password, companyName);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (!email || !password) {
      throw new UnauthorizedException('Email et mot de passe requis');
    }

    return this.authService.login(email, password);
  }

  @Get('me')
  async getCurrentUser(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }

    const token = authHeader.substring(7);
    return this.authService.validateToken(token);
  }
}
