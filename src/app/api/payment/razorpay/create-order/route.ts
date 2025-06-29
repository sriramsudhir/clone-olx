import { NextRequest, NextResponse } from 'next/server';
import { PaymentService } from '@/lib/payment-gateways';

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const order = await PaymentService.createRazorpayOrder(amount);

    if (order.success) {
      return NextResponse.json({
        success: true,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
      });
    } else {
      return NextResponse.json(
        { success: false, error: order.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}