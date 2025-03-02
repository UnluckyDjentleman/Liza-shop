import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { SupabaseStrategy } from './strategy/supabase.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
@Module({
    imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'JWT_SECRET' })],
    providers: [SupabaseService, JwtService, ConfigService, AuthService, SupabaseStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
