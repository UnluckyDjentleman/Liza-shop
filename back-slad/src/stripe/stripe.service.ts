import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomerDTO } from 'src/customers/dto/customer.dto';
import { OrdersService } from 'src/orders/orders.service';
import { LineItemsDTO } from 'src/payment/dto/lineItems.dto';
import { PaymentService } from 'src/payment/payment.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private paymentService: PaymentService,
    private orderService: OrdersService
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createCustomer(dto: CustomerDTO) {
    const {email, name, phone}=dto;
    return this.stripe.customers.create({
      email,
      name,
      phone
    });
  }

  async createSubscription(customerId: string, priceId: string) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });
  }

  async createSessionCheckout(user, lineItems: LineItemsDTO){
    console.log(lineItems.lineItems[0].order_id);
    const neededOrder=await this.orderService.getOrderById(user, lineItems.lineItems[0].order_id);
    const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems.lineItems.map((el) => ({
          price_data: {
            currency: 'byn',
            product_data: {
              name: neededOrder[0].products.name,
              description: neededOrder[0].products.description.toString(),
            },
            unit_amount: neededOrder[0].products.price*100,
          },
          quantity: neededOrder[0].quantity,
        })),
        mode: 'payment',
        success_url: this.configService.get('CLIENT_URI') + 'success',
        cancel_url: this.configService.get('CLIENT_URI') + 'cancel',
      });
  
      console.log(session.payment_status);

      if(session.payment_status==="paid"){
        await this.paymentService.saveThePayment(lineItems[0], neededOrder[0].products.price*neededOrder[0].quantity);
      }

      return {id: session.id}
  }
}
