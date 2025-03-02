import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabaseUrl:string = this.configService.get<string>("SUPABASE_URL");
    private supabaseAnonKey:string = this.configService.get<string>("SUPABASE_KEY");
    private supabase: SupabaseClient;

    constructor(private configService: ConfigService) {
        this.supabase = createClient(this.supabaseUrl, this.supabaseAnonKey);
    }

    getClient(): SupabaseClient {
        return this.supabase;
    }
}
