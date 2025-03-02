import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, SupabaseService]
})
export class SupabaseModule {}
