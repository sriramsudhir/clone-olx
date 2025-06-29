import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  phone: string;
  role: 'super_admin' | 'admin' | 'manager' | 'user';
  isVerified: boolean;
  createdAt: Date;
}

export interface JWTPayload {
  userId: string;
  phone: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  static generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      phone: user.phone,
      role: user.role,
    };
    
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async sendOTP(phone: string, otp: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.msg91.com/api/v5/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authkey': process.env.MSG91_API_KEY || '',
        },
        body: JSON.stringify({
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: phone,
          authkey: process.env.MSG91_API_KEY,
          otp: otp,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('OTP sending failed:', error);
      return false;
    }
  }

  static hasPermission(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = {
      'super_admin': 4,
      'admin': 3,
      'manager': 2,
      'user': 1,
    };

    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    return userLevel >= requiredLevel;
  }
}