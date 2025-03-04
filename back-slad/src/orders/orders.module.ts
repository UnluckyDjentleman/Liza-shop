import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [SupabaseService, JwtService, AuthService, OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
