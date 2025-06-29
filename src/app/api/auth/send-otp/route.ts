import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone || phone.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const otp = AuthService.generateOTP();
    
    // Store OTP in session/database (for demo, we'll use a simple in-memory store)
    // In production, use Redis or database
    const otpStore = new Map();
    otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 minutes

    const sent = await AuthService.sendOTP(phone, otp);

    if (sent) {
      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send OTP' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}