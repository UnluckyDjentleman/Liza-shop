import { BadRequestException, Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UsersService {
    constructor(private supabaseService: SupabaseService){}

    async GetMe(user){
        return user;
    }

    async GetAllUsers() {
        const {data: {users}, error}=await this.supabaseService
        .getClient().auth.admin.listUsers({
            page: 1,
            perPage: 1000,
          });
        if(error) throw new BadRequestException(error.message);
        return users;
    }
}
