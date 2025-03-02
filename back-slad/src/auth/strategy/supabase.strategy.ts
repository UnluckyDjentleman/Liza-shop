import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly configService: ConfigService, private readonly supabaseService: SupabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: any): Promise<any> {
    try{
      const {data, error}=await this.supabaseService.getClient().from('user_roles').select('*').eq('user_id',payload.id).single();
      if(error) throw new UnauthorizedException('JWT expired');
      return {
        id: data.user_id,
        email: payload.email,
        role: data.role,
      }
    }
    catch(e){
      console.error(e)
    }
  }

  authenticate(req) {
    super.authenticate(req)
  }
}