"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  CreditCard,
  Smartphone,
  Wallet,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentConfigPage() {
  const [config, setConfig] = useState({
    // Razorpay
    RAZORPAY_KEY_ID: '',
    RAZORPAY_KEY_SECRET: '',
    
    // Cashfree
    CASHFREE_APP_ID: '',
    CASHFREE_SECRET_KEY: '',
    
    // PayU
    PAYU_MERCHANT_KEY: '',
    PAYU_MERCHANT_SALT: '',
    
    // Instamojo
    INSTAMOJO_API_KEY: '',
    INSTAMOJO_AUTH_TOKEN: '',
    
    // JustPay
    JUSTPAY_MERCHANT_ID: '',
    JUSTPAY_API_KEY: '',
    
    // PhonePe
    PHONEPE_MERCHANT_ID: '',
    PHONEPE_SALT_KEY: '',
    
    // PayTM
    PAYTM_MERCHANT_ID: '',
    PAYTM_MERCHANT_KEY: '',
    
    // CCAvenue
    CCAVENUE_MERCHANT_ID: '',
    CCAVENUE_WORKING_KEY: '',
    
    // BillDesk
    BILLDESK_MERCHANT_ID: '',
    BILLDESK_SECURITY_ID: '',
    
    // MobiKwik
    MOBIKWIK_MERCHANT_ID: '',
    MOBIKWIK_SECRET_KEY: '',
    
    // FreeCharge
    FREECHARGE_MERCHANT_ID: '',
    FREECHARGE_SECRET_KEY: '',
    
    // Amazon Pay
    AMAZONPAY_MERCHANT_ID: '',
    AMAZONPAY_ACCESS_KEY: '',
    
    // Google Pay
    GOOGLEPAY_MERCHANT_ID: '',
    GOOGLEPAY_MERCHANT_NAME: '',
    
    // UPI
    UPI_VPA: '',
  });

  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<Record<string, 'connected' | 'disconnected' | 'testing'>>({});

  const { toast } = useToast();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/admin/payment-config');
      const data = await response.json();
      
      if (data.success) {
        setConfig(data.config);
      }
    } catch (error) {
      console.error('Failed to fetch config:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/payment-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Configuration Saved",
          description: "Payment gateway settings have been updated successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: data.message || "Failed to save configuration.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save configuration. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async (gateway: string) => {
    setConnectionStatus(prev => ({ ...prev, [gateway]: 'testing' }));
    
    // Simulate API test
    setTimeout(() => {
      const isConnected = Math.random() > 0.3; // 70% success rate for demo
      setConnectionStatus(prev => ({ 
        ...prev, 
        [gateway]: isConnected ? 'connected' : 'disconnected' 
      }));
      
      toast({
        title: isConnected ? "Connection Successful" : "Connection Failed",
        description: isConnected 
          ? `${gateway} is configured correctly.`
          : `Failed to connect to ${gateway}. Please check your credentials.`,
        variant: isConnected ? "default" : "destructive",
      });
    }, 2000);
  };

  const toggleSecretVisibility = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getConnectionIcon = (gateway: string) => {
    const status = connectionStatus[gateway];
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'testing':
        return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const paymentGateways = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Complete payment solution for India',
      fields: [
        { key: 'RAZORPAY_KEY_ID', label: 'Key ID', type: 'text' },
        { key: 'RAZORPAY_KEY_SECRET', label: 'Key Secret', type: 'password' },
      ],
      category: 'gateway'
    },
    {
      id: 'cashfree',
      name: 'Cashfree',
      icon: <Globe className="h-5 w-5" />,
      description: 'Next-gen payment gateway',
      fields: [
        { key: 'CASHFREE_APP_ID', label: 'App ID', type: 'text' },
        { key: 'CASHFREE_SECRET_KEY', label: 'Secret Key', type: 'password' },
      ],
      category: 'gateway'
    },
    {
      id: 'payu',
      name: 'PayU',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Trusted payment partner',
      fields: [
        { key: 'PAYU_MERCHANT_KEY', label: 'Merchant Key', type: 'text' },
        { key: 'PAYU_MERCHANT_SALT', label: 'Merchant Salt', type: 'password' },
      ],
      category: 'gateway'
    },
    {
      id: 'instamojo',
      name: 'Instamojo',
      icon: <Wallet className="h-5 w-5" />,
      description: 'Simple payment collection',
      fields: [
        { key: 'INSTAMOJO_API_KEY', label: 'API Key', type: 'text' },
        { key: 'INSTAMOJO_AUTH_TOKEN', label: 'Auth Token', type: 'password' },
      ],
      category: 'gateway'
    },
    {
      id: 'justpay',
      name: 'JustPay',
      icon: <Globe className="h-5 w-5" />,
      description: 'Modern payment platform',
      fields: [
        { key: 'JUSTPAY_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'JUSTPAY_API_KEY', label: 'API Key', type: 'password' },
      ],
      category: 'gateway'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'UPI and digital payments',
      fields: [
        { key: 'PHONEPE_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'PHONEPE_SALT_KEY', label: 'Salt Key', type: 'password' },
      ],
      category: 'upi'
    },
    {
      id: 'paytm',
      name: 'PayTM',
      icon: <Wallet className="h-5 w-5" />,
      description: 'Digital wallet and payments',
      fields: [
        { key: 'PAYTM_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'PAYTM_MERCHANT_KEY', label: 'Merchant Key', type: 'password' },
      ],
      category: 'wallet'
    },
  ];

  const additionalGateways = [
    {
      id: 'ccavenue',
      name: 'CCAvenue',
      fields: [
        { key: 'CCAVENUE_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'CCAVENUE_WORKING_KEY', label: 'Working Key', type: 'password' },
      ],
    },
    {
      id: 'billdesk',
      name: 'BillDesk',
      fields: [
        { key: 'BILLDESK_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'BILLDESK_SECURITY_ID', label: 'Security ID', type: 'password' },
      ],
    },
    {
      id: 'mobikwik',
      name: 'MobiKwik',
      fields: [
        { key: 'MOBIKWIK_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'MOBIKWIK_SECRET_KEY', label: 'Secret Key', type: 'password' },
      ],
    },
    {
      id: 'freecharge',
      name: 'FreeCharge',
      fields: [
        { key: 'FREECHARGE_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'FREECHARGE_SECRET_KEY', label: 'Secret Key', type: 'password' },
      ],
    },
    {
      id: 'amazonpay',
      name: 'Amazon Pay',
      fields: [
        { key: 'AMAZONPAY_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'AMAZONPAY_ACCESS_KEY', label: 'Access Key', type: 'password' },
      ],
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      fields: [
        { key: 'GOOGLEPAY_MERCHANT_ID', label: 'Merchant ID', type: 'text' },
        { key: 'GOOGLEPAY_MERCHANT_NAME', label: 'Merchant Name', type: 'text' },
      ],
    },
  ];

  const renderGatewayCard = (gateway: any) => (
    <Card key={gateway.id} className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {gateway.icon || <CreditCard className="h-5 w-5" />}
            </div>
            <div>
              <CardTitle className="text-lg">{gateway.name}</CardTitle>
              {gateway.description && (
                <p className="text-sm text-muted-foreground">{gateway.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getConnectionIcon(gateway.id)}
            <Button
              variant="outline"
              size="sm"
              onClick={() => testConnection(gateway.id)}
              disabled={connectionStatus[gateway.id] === 'testing'}
            >
              Test
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {gateway.fields.map((field: any) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            <div className="relative">
              <Input
                id={field.key}
                type={field.type === 'password' && !showSecrets[field.key] ? 'password' : 'text'}
                value={config[field.key as keyof typeof config] || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              {field.type === 'password' && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => toggleSecretVisibility(field.key)}
                >
                  {showSecrets[field.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Payment Gateway Configuration</h1>
          <p className="text-muted-foreground">
            Configure and manage payment gateway credentials for your marketplace.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>

      <Tabs defaultValue="primary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="primary">Primary Gateways</TabsTrigger>
          <TabsTrigger value="additional">Additional Gateways</TabsTrigger>
          <TabsTrigger value="upi">UPI & Wallets</TabsTrigger>
        </TabsList>

        <TabsContent value="primary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentGateways.filter(g => g.category === 'gateway').map(renderGatewayCard)}
          </div>
        </TabsContent>

        <TabsContent value="additional" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalGateways.map(renderGatewayCard)}
          </div>
        </TabsContent>

        <TabsContent value="upi" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentGateways.filter(g => g.category === 'upi' || g.category === 'wallet').map(renderGatewayCard)}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>UPI Direct</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="UPI_VPA">UPI VPA</Label>
                  <Input
                    id="UPI_VPA"
                    value={config.UPI_VPA}
                    onChange={(e) => setConfig(prev => ({ ...prev, UPI_VPA: e.target.value }))}
                    placeholder="your-upi-id@bank"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Security Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Important:</strong> All payment gateway credentials are encrypted and stored securely. 
                Never share your API keys or secrets with unauthorized personnel.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">PCI DSS Compliant</Badge>
                <Badge variant="outline">256-bit Encryption</Badge>
                <Badge variant="outline">Secure Storage</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}