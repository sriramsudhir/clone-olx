import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

// Mock user database
const users = new Map();
const otpStore = new Map();

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, message: 'Phone and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP
    const storedOtpData = otpStore.get(phone);
    
    if (!storedOtpData) {
      return NextResponse.json(
        { success: false, message: 'OTP not found or expired' },
        { status: 400 }
      );
    }

    if (storedOtpData.expiresAt < Date.now()) {
      otpStore.delete(phone);
      return NextResponse.json(
        { success: false, message: 'OTP expired' },
        { status: 400 }
      );
    }

    if (storedOtpData.otp !== otp) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // OTP verified, clean up
    otpStore.delete(phone);

    // Find or create user
    let user = users.get(phone);
    if (!user) {
      user = {
        id: `user_${Date.now()}`,
        phone,
        role: 'user',
        isVerified: true,
        createdAt: new Date(),
      };
      users.set(phone, user);
    }

    // Generate JWT token
    const token = AuthService.generateToken(user);

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}