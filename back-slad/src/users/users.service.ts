import { BadRequestException, Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UsersService {
    constructor(private supabaseService: SupabaseService){}

    async GetMe(user){
        return user;
    }
}
