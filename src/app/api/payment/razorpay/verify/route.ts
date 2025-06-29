import { NextRequest, NextResponse } from 'next/server';
import { PaymentService, TransactionService } from '@/lib/payment-gateways';

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await request.json();

    const isValid = await PaymentService.verifyRazorpayPayment(
      orderId,
      paymentId,
      signature
    );

    if (isValid) {
      // Update transaction status
      const transaction = TransactionService.createTransaction({
        orderId,
        amount: 0, // You should get this from your order data
        currency: 'INR',
        status: 'success',
        gateway: 'razorpay',
        userId: 'user_id', // Get from auth context
      });

      return NextResponse.json({
        success: true,
        transactionId: transaction.id,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}