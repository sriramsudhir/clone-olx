import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const config = await request.json();

    // Validate required fields
    const requiredFields = [
      'RAZORPAY_KEY_ID',
      'RAZORPAY_KEY_SECRET',
      'PAYTM_MERCHANT_ID',
      'PAYTM_MERCHANT_KEY',
      'PHONEPE_MERCHANT_ID',
      'PHONEPE_SALT_KEY',
      'UPI_VPA',
    ];

    for (const field of requiredFields) {
      if (!config[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Read current .env file
    const envPath = join(process.cwd(), '.env');
    let envContent = '';

    try {
      const fs = require('fs');
      envContent = fs.readFileSync(envPath, 'utf8');
    } catch (error) {
      // File doesn't exist, create new content
    }

    // Update environment variables
    const envLines = envContent.split('\n');
    const updatedLines = [...envLines];

    Object.entries(config).forEach(([key, value]) => {
      const existingIndex = updatedLines.findIndex(line => 
        line.startsWith(`${key}=`)
      );

      const newLine = `${key}="${value}"`;

      if (existingIndex >= 0) {
        updatedLines[existingIndex] = newLine;
      } else {
        updatedLines.push(newLine);
      }
    });

    // Write updated .env file
    await writeFile(envPath, updatedLines.join('\n'));

    // Update runtime configuration
    Object.entries(config).forEach(([key, value]) => {
      process.env[key] = value as string;
    });

    return NextResponse.json({
      success: true,
      message: 'Payment configuration updated successfully',
    });
  } catch (error) {
    console.error('Payment config update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update configuration' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const config = {
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
      PAYTM_MERCHANT_ID: process.env.PAYTM_MERCHANT_ID || '',
      PHONEPE_MERCHANT_ID: process.env.PHONEPE_MERCHANT_ID || '',
      UPI_VPA: process.env.UPI_VPA || '',
      // Don't expose secret keys
    };

    return NextResponse.json({
      success: true,
      config,
    });
  } catch (error) {
    console.error('Get payment config error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get configuration' },
      { status: 500 }
    );
  }
}