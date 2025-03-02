import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { StripeModule } from './stripe/stripe.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    }), 
    AuthModule, 
    UsersModule, 
    ProductsModule, 
    CustomersModule, 
    OrdersModule, 
    StripeModule, 
    SupabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
