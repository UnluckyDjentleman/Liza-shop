import { Body, Controller, Post, RawBodyRequest, Req, Res, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import {Request, Response} from 'express';
import { LineItemsDTO } from 'src/payment/dto/lineItems.dto';
import { GetUser } from 'src/auth/decorator/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('stripe')
export class StripeController {
    constructor(private stripeService: StripeService) {}
    @Post('create-session-checkout')
    async createCheckoutSession(@GetUser() user, @Body() lineItems: LineItemsDTO) {
        return await this.stripeService.createSessionCheckout(user, lineItems);
    }
}
