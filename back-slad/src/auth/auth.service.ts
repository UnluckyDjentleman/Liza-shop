import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AuthDTO } from './dto/auth.dto';
import { SigninDTO } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private supabaseService: SupabaseService, private jwt: JwtService, private config: ConfigService){}

    async getUserRole(userId: string){
        console.log(userId);
        const { data, error } = await this.supabaseService
        .getClient()
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

        if (error) throw new Error(error.message);
        return data?.role.toString();
    }

    async signupUser(dto: AuthDTO, role?: string){
        const {name, email, password}=dto;
        const {data, error}=await this.supabaseService.getClient().auth.signUp({
            email,
            password,
            options:{
                data:{name}
            }
        })
        if (error) {
            console.log(error);
            throw new ForbiddenException('Sorry, cannot register you');
        }
        await this.assignRole(data.user.id, role??'user');
        return data;
    }

    async signinUser(dto: SigninDTO){
        const {email, password}=dto;
        const {data, error}=await this.supabaseService.getClient().auth.signInWithPassword({
            email,
            password
        })
        if (error) {
            console.log(error);
            throw new UnauthorizedException("Authorization failed")
        }
        return this.generateToken(data.user.email, data.user.id,);
    }

    async assignRole(userId: string, role: string) {
        const { data, error } = await this.supabaseService
          .getClient()
          .from('user_roles')
          .insert([{ user_id: userId, role }]);
        if (error) throw new Error(error.message);
        return data;
    }
    
    async addUser(dto: AuthDTO) {
    return this.signupUser(dto);
    }

    async addAdmin(dto: AuthDTO) {
    return this.signupUser(dto, 'admin');
    }
    
    async generateToken(email: string, id: string) {
        const payload = { email, id };
        const token = await this.jwt.signAsync(payload, { expiresIn: '1h', secret: this.config.get('JWT_SECRET') });
        return { token };
    }

    async refreshToken(token: string) {
        try {
            const payload = this.jwt.verify(token, {
                secret: this.config.get<string>('JWT_SECRET'),
            });
            console.log(payload);
            return this.generateToken(payload.email, payload.id);
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException('Invalid token');
        }
    }

    async logout(token: string) {
        const payload = await this.jwt.verify(token, {secret: this.config.get<string>('JWT_SECRET')})
        if (!payload) throw new UnauthorizedException('Token not found');
        return { message: 'Logged out successfully' };
    }
}
