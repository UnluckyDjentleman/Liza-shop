import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SupabaseService, JwtService, AuthService, ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
