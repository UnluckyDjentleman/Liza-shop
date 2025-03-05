import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { OrdersService } from 'src/orders/orders.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  providers: [SupabaseService, PaymentService, ConfigService, OrdersService, StripeService],
  controllers: [StripeController]
})
export class StripeModule {
    static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
        const stripe = new Stripe(apiKey, config);
    
        const stripeProvider: Provider = {
          provide: 'STRIPE_CLIENT',
          useValue: stripe,
        };
    
        return {
          module: StripeModule,
          providers: [stripeProvider],
          controllers: [StripeController],
          exports: [stripeProvider],
          global: true,
        };
      }
    
}
