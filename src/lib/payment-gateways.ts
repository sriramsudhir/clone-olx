import Razorpay from 'razorpay';
import crypto from 'crypto';

export interface PaymentGatewayConfig {
  razorpay: {
    keyId: string;
    keySecret: string;
  };
  paytm: {
    merchantId: string;
    merchantKey: string;
  };
  phonepe: {
    merchantId: string;
    saltKey: string;
  };
  cashfree: {
    appId: string;
    secretKey: string;
  };
  payu: {
    merchantKey: string;
    merchantSalt: string;
  };
  instamojo: {
    apiKey: string;
    authToken: string;
  };
  ccavenue: {
    merchantId: string;
    workingKey: string;
  };
  billdesk: {
    merchantId: string;
    securityId: string;
  };
  justpay: {
    merchantId: string;
    apiKey: string;
  };
  mobikwik: {
    merchantId: string;
    secretKey: string;
  };
  freecharge: {
    merchantId: string;
    secretKey: string;
  };
  amazonpay: {
    merchantId: string;
    accessKey: string;
  };
  googlepay: {
    merchantId: string;
    merchantName: string;
  };
  upi: {
    vpa: string;
  };
}

export class PaymentService {
  private static config: PaymentGatewayConfig = {
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID || '',
      keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    },
    paytm: {
      merchantId: process.env.PAYTM_MERCHANT_ID || '',
      merchantKey: process.env.PAYTM_MERCHANT_KEY || '',
    },
    phonepe: {
      merchantId: process.env.PHONEPE_MERCHANT_ID || '',
      saltKey: process.env.PHONEPE_SALT_KEY || '',
    },
    cashfree: {
      appId: process.env.CASHFREE_APP_ID || '',
      secretKey: process.env.CASHFREE_SECRET_KEY || '',
    },
    payu: {
      merchantKey: process.env.PAYU_MERCHANT_KEY || '',
      merchantSalt: process.env.PAYU_MERCHANT_SALT || '',
    },
    instamojo: {
      apiKey: process.env.INSTAMOJO_API_KEY || '',
      authToken: process.env.INSTAMOJO_AUTH_TOKEN || '',
    },
    ccavenue: {
      merchantId: process.env.CCAVENUE_MERCHANT_ID || '',
      workingKey: process.env.CCAVENUE_WORKING_KEY || '',
    },
    billdesk: {
      merchantId: process.env.BILLDESK_MERCHANT_ID || '',
      securityId: process.env.BILLDESK_SECURITY_ID || '',
    },
    justpay: {
      merchantId: process.env.JUSTPAY_MERCHANT_ID || '',
      apiKey: process.env.JUSTPAY_API_KEY || '',
    },
    mobikwik: {
      merchantId: process.env.MOBIKWIK_MERCHANT_ID || '',
      secretKey: process.env.MOBIKWIK_SECRET_KEY || '',
    },
    freecharge: {
      merchantId: process.env.FREECHARGE_MERCHANT_ID || '',
      secretKey: process.env.FREECHARGE_SECRET_KEY || '',
    },
    amazonpay: {
      merchantId: process.env.AMAZONPAY_MERCHANT_ID || '',
      accessKey: process.env.AMAZONPAY_ACCESS_KEY || '',
    },
    googlepay: {
      merchantId: process.env.GOOGLEPAY_MERCHANT_ID || '',
      merchantName: process.env.GOOGLEPAY_MERCHANT_NAME || '',
    },
    upi: {
      vpa: process.env.UPI_VPA || '',
    },
  };

  static updateConfig(newConfig: Partial<PaymentGatewayConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Razorpay Integration
  static async createRazorpayOrder(amount: number, currency: string = 'INR') {
    try {
      const razorpay = new Razorpay({
        key_id: this.config.razorpay.keyId,
        key_secret: this.config.razorpay.keySecret,
      });

      const order = await razorpay.orders.create({
        amount: amount * 100, // Amount in paise
        currency,
        receipt: `receipt_${Date.now()}`,
      });

      return {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      };
    } catch (error) {
      console.error('Razorpay order creation failed:', error);
      return {
        success: false,
        error: 'Failed to create payment order',
      };
    }
  }

  static async verifyRazorpayPayment(
    orderId: string,
    paymentId: string,
    signature: string
  ) {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', this.config.razorpay.keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      return expectedSignature === signature;
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }

  // Cashfree Integration
  static async createCashfreeOrder(amount: number, orderId: string) {
    try {
      const orderData = {
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: 'customer_123',
          customer_name: 'Customer Name',
          customer_email: 'customer@example.com',
          customer_phone: '9999999999',
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cashfree/callback`,
        },
      };

      const response = await fetch('https://sandbox.cashfree.com/pg/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': this.config.cashfree.appId,
          'x-client-secret': this.config.cashfree.secretKey,
          'x-api-version': '2022-09-01',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      return {
        success: true,
        orderId: data.order_id,
        paymentSessionId: data.payment_session_id,
        orderToken: data.order_token,
      };
    } catch (error) {
      console.error('Cashfree order creation failed:', error);
      return {
        success: false,
        error: 'Failed to create Cashfree order',
      };
    }
  }

  // PayU Integration
  static async createPayUOrder(amount: number, orderId: string) {
    try {
      const txnid = `TXN_${Date.now()}`;
      const productinfo = 'Product Info';
      const firstname = 'Customer';
      const email = 'customer@example.com';
      const phone = '9999999999';

      const hashString = `${this.config.payu.merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${this.config.payu.merchantSalt}`;
      const hash = crypto.createHash('sha512').update(hashString).digest('hex');

      return {
        success: true,
        txnid,
        hash,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        merchantKey: this.config.payu.merchantKey,
      };
    } catch (error) {
      console.error('PayU order creation failed:', error);
      return {
        success: false,
        error: 'Failed to create PayU order',
      };
    }
  }

  // Instamojo Integration
  static async createInstamojoOrder(amount: number, orderId: string) {
    try {
      const orderData = {
        purpose: 'Payment for order',
        amount: amount,
        buyer_name: 'Customer Name',
        email: 'customer@example.com',
        phone: '9999999999',
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/instamojo/callback`,
        webhook: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/instamojo/webhook`,
      };

      const response = await fetch('https://test.instamojo.com/api/1.1/payment-requests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Api-Key': this.config.instamojo.apiKey,
          'X-Auth-Token': this.config.instamojo.authToken,
        },
        body: new URLSearchParams(orderData).toString(),
      });

      const data = await response.json();

      return {
        success: true,
        paymentRequestId: data.payment_request.id,
        longurl: data.payment_request.longurl,
      };
    } catch (error) {
      console.error('Instamojo order creation failed:', error);
      return {
        success: false,
        error: 'Failed to create Instamojo order',
      };
    }
  }

  // JustPay Integration
  static async createJustPayOrder(amount: number, orderId: string) {
    try {
      const orderData = {
        merchant_id: this.config.justpay.merchantId,
        order_id: orderId,
        amount: amount,
        currency: 'INR',
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/justpay/callback`,
        customer: {
          name: 'Customer Name',
          email: 'customer@example.com',
          phone: '9999999999',
        },
      };

      const signature = crypto
        .createHmac('sha256', this.config.justpay.apiKey)
        .update(JSON.stringify(orderData))
        .digest('hex');

      const response = await fetch('https://api.justpay.io/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.justpay.apiKey}`,
          'X-Signature': signature,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      return {
        success: true,
        orderId: data.order_id,
        paymentUrl: data.payment_url,
      };
    } catch (error) {
      console.error('JustPay order creation failed:', error);
      return {
        success: false,
        error: 'Failed to create JustPay order',
      };
    }
  }

  // PhonePe Integration
  static async createPhonePeOrder(amount: number, orderId: string) {
    try {
      const merchantTransactionId = `TXN_${Date.now()}`;
      const payload = {
        merchantId: this.config.phonepe.merchantId,
        merchantTransactionId,
        merchantUserId: 'MUID123',
        amount: amount * 100, // Amount in paise
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/phonepe/callback`,
        redirectMode: 'POST',
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/phonepe/webhook`,
        paymentInstrument: {
          type: 'PAY_PAGE',
        },
      };

      const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
      const checksum = crypto
        .createHash('sha256')
        .update(base64Payload + '/pg/v1/pay' + this.config.phonepe.saltKey)
        .digest('hex') + '###1';

      const response = await fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
        body: JSON.stringify({
          request: base64Payload,
        }),
      });

      const data = await response.json();

      return {
        success: true,
        merchantTransactionId,
        paymentUrl: data.data.instrumentResponse.redirectInfo.url,
      };
    } catch (error) {
      console.error('PhonePe order creation failed:', error);
      return {
        success: false,
        error: 'Failed to create PhonePe order',
      };
    }
  }

  // PayTM Integration
  static async createPayTMOrder(amount: number, orderId: string) {
    try {
      const paytmParams = {
        MID: this.config.paytm.merchantId,
        WEBSITE: 'WEBSTAGING',
        INDUSTRY_TYPE_ID: 'Retail',
        CHANNEL_ID: 'WEB',
        ORDER_ID: orderId,
        CUST_ID: 'CUST_001',
        TXN_AMOUNT: amount.toString(),
        CALLBACK_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/paytm/callback`,
      };

      // Generate checksum (simplified - use PayTM's checksum utility in production)
      const checksumHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(paytmParams) + this.config.paytm.merchantKey)
        .digest('hex');

      return {
        success: true,
        orderId,
        params: { ...paytmParams, CHECKSUMHASH: checksumHash },
      };
    } catch (error) {
      console.error('PayTM order creation failed:', error);
      return {
        success: false,
        error: 'Failed to create PayTM order',
      };
    }
  }

  // UPI Direct Link Generation
  static generateUPILink(amount: number, note: string = 'Payment') {
    const upiUrl = `upi://pay?pa=${this.config.upi.vpa}&pn=TradeZone&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    return upiUrl;
  }

  // Google Pay Integration
  static generateGooglePayLink(amount: number, orderId: string) {
    const googlePayUrl = `tez://upi/pay?pa=${this.config.upi.vpa}&pn=${this.config.googlepay.merchantName}&am=${amount}&cu=INR&tn=Payment for ${orderId}`;
    return googlePayUrl;
  }

  // Get Available Payment Methods
  static getAvailablePaymentMethods() {
    const methods = [];

    if (this.config.razorpay.keyId) methods.push({ id: 'razorpay', name: 'Razorpay', type: 'gateway' });
    if (this.config.cashfree.appId) methods.push({ id: 'cashfree', name: 'Cashfree', type: 'gateway' });
    if (this.config.payu.merchantKey) methods.push({ id: 'payu', name: 'PayU', type: 'gateway' });
    if (this.config.instamojo.apiKey) methods.push({ id: 'instamojo', name: 'Instamojo', type: 'gateway' });
    if (this.config.justpay.merchantId) methods.push({ id: 'justpay', name: 'JustPay', type: 'gateway' });
    if (this.config.phonepe.merchantId) methods.push({ id: 'phonepe', name: 'PhonePe', type: 'upi' });
    if (this.config.paytm.merchantId) methods.push({ id: 'paytm', name: 'PayTM', type: 'wallet' });
    if (this.config.upi.vpa) methods.push({ id: 'upi', name: 'UPI Direct', type: 'upi' });
    if (this.config.googlepay.merchantId) methods.push({ id: 'googlepay', name: 'Google Pay', type: 'upi' });

    return methods;
  }
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  gateway: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod?: string;
  transactionId?: string;
}

export class TransactionService {
  private static transactions: Transaction[] = [];

  static createTransaction(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
    const transaction: Transaction = {
      ...data,
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.transactions.push(transaction);
    return transaction;
  }

  static updateTransaction(id: string, updates: Partial<Transaction>): Transaction | null {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) return null;

    this.transactions[index] = {
      ...this.transactions[index],
      ...updates,
      updatedAt: new Date(),
    };

    return this.transactions[index];
  }

  static getTransactions(filters?: {
    userId?: string;
    status?: string;
    gateway?: string;
    startDate?: Date;
    endDate?: Date;
  }): Transaction[] {
    let filtered = this.transactions;

    if (filters?.userId) {
      filtered = filtered.filter(t => t.userId === filters.userId);
    }

    if (filters?.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    if (filters?.gateway) {
      filtered = filtered.filter(t => t.gateway === filters.gateway);
    }

    if (filters?.startDate) {
      filtered = filtered.filter(t => t.createdAt >= filters.startDate!);
    }

    if (filters?.endDate) {
      filtered = filtered.filter(t => t.createdAt <= filters.endDate!);
    }

    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  static getTransactionStats() {
    const total = this.transactions.length;
    const successful = this.transactions.filter(t => t.status === 'success').length;
    const pending = this.transactions.filter(t => t.status === 'pending').length;
    const failed = this.transactions.filter(t => t.status === 'failed').length;
    
    const totalAmount = this.transactions
      .filter(t => t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0);

    const gatewayStats = this.transactions.reduce((acc, t) => {
      acc[t.gateway] = (acc[t.gateway] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      successful,
      pending,
      failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      totalAmount,
      gatewayStats,
    };
  }
}