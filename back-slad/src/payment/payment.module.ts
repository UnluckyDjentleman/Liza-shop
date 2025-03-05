import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  providers: [SupabaseService, PaymentService]
})
export class PaymentModule {}
