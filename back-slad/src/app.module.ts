import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { StripeModule } from './stripe/stripe.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    }), 
    StripeModule.forRoot(process.env.STRIPE_KEY, {
      apiVersion: '2025-02-24.acacia',
    }),
    AuthModule, 
    UsersModule, 
    ProductsModule, 
    CustomersModule, 
    OrdersModule, 
    StripeModule, 
    SupabaseModule, PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
