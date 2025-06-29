import { NextRequest, NextResponse } from 'next/server';
import { TransactionService } from '@/lib/payment-gateways';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      userId: searchParams.get('userId') || undefined,
      status: searchParams.get('status') || undefined,
      gateway: searchParams.get('gateway') || undefined,
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
    };

    const transactions = TransactionService.getTransactions(filters);
    const stats = TransactionService.getTransactionStats();

    return NextResponse.json({
      success: true,
      transactions,
      stats,
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get transactions' },
      { status: 500 }
    );
  }
}